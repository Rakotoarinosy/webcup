"""Use cases d'authentification. Ne dépendent que du domaine : ni HTTP, ni SQL.

Refresh tokens : opaques, stockés hachés (SHA-256), rotatifs (un usage), groupés en « familles ».
La réutilisation d'un token déjà consommé révoque toute la famille (détection de vol).

Confirmation par code : l'inscription (email ou téléphone), la connexion et la connexion Google
envoient un code à 6 chiffres (email ou SMS) ; la session n'est délivrée qu'après `verify_code`.
Voir verification.py.
"""

import hashlib
import secrets
import uuid
from dataclasses import dataclass, replace
from datetime import UTC, datetime, timedelta

from src.domain.user import (
    AccessToken,
    AccessTokenService,
    AccountLockedError,
    AuthPolicy,
    IncorrectPasswordError,
    InvalidCredentialsError,
    InvalidTokenError,
    PasswordHasher,
    PasswordReuseError,
    RefreshToken,
    RefreshTokenRepository,
    Role,
    User,
    UserAlreadyExistsError,
    UserRepository,
)
from src.domain.user.entities import Channel
from src.domain.user.exceptions import (
    GoogleEmailNotVerifiedError,
    InvalidVerificationCodeError,
    UserConflictError,
)
from src.domain.user.ports import GoogleIdentityVerifier, GoogleProfile
from src.domain.user.rules import is_email_identifier, normalize_email
from src.features.auth.schemas import (
    ChangePasswordIn,
    GoogleLoginIn,
    LoginIn,
    RegisterIn,
    ResendCodeIn,
    UpdateProfileIn,
    VerifyCodeIn,
)
from src.features.auth.verification import EmailVerifier, VerificationChallenge
from src.features.user.use_cases import delete_own_account, update_own_profile

GOOGLE_NAME_MAX_LENGTH = 100


@dataclass(frozen=True)
class AuthSession:
    user: User
    access_token: AccessToken
    refresh_token: str  # valeur brute : à poser dans le cookie, jamais stockée en clair


def _hash_token(raw: str) -> str:
    return hashlib.sha256(raw.encode()).hexdigest()


def _issue_session(
    user: User,
    family_id: str,
    refresh_repo: RefreshTokenRepository,
    tokens: AccessTokenService,
    policy: AuthPolicy,
    now: datetime,
) -> AuthSession:
    raw = secrets.token_urlsafe(48)
    refresh_repo.add(
        RefreshToken(
            id=str(uuid.uuid4()),
            user_id=user.id,
            family_id=family_id,
            token_hash=_hash_token(raw),
            expires_at=now + timedelta(days=policy.refresh_ttl_days),
            created_at=now,
        )
    )

    return AuthSession(user=user, access_token=tokens.create(user.id), refresh_token=raw)


def register(
    dto: RegisterIn,
    users: UserRepository,
    hasher: PasswordHasher,
    verifier: EmailVerifier | None = None,
) -> User | VerificationChallenge:
    """Crée le compte (non confirmé) et envoie le code. La session vient après `verify_code`.

    Le code part par email si un email est fourni, par SMS si c'est un numéro.
    """
    if dto.email is not None:
        channel, identifier = Channel.EMAIL, dto.email
        existing = users.get_by_email(identifier)
    else:
        assert dto.phone is not None  # garanti par RegisterIn
        channel, identifier = Channel.SMS, dto.phone
        existing = users.get_by_phone(identifier)

    if existing is None:
        confirmed = verifier is None
        user = users.add(
            User(
                id=str(uuid.uuid4()),
                email=dto.email,
                phone=dto.phone,
                name=dto.name,
                created_at=datetime.now(UTC),
                password_hash=hasher.hash(dto.password),
                role=Role.CITIZEN,  # toujours CITIZEN : seul un admin peut changer le rôle
                email_verified=confirmed,
                phone_verified=confirmed,
            )
        )

        return verifier.start(user, channel) if verifier else user

    if verifier is None or not _is_pending_signup(existing):
        raise UserAlreadyExistsError(identifier)

    # Inscription jamais confirmée (faute de frappe, abandon, ou squat de l'email / du numéro
    # d'autrui) : on la reprend avec les nouvelles données plutôt que de bloquer l'identifiant
    # pour toujours. `strict=True` AVANT la mise à jour : pendant le délai anti-spam on ne touche
    # à rien, donc personne ne peut écraser le mot de passe d'une inscription en cours de
    # confirmation. Le nouveau code invalide l'ancien challenge : seul le dernier inscrit confirme.
    challenge = verifier.start(existing, channel, strict=True)
    users.update(replace(existing, name=dto.name, password_hash=hasher.hash(dto.password)))

    return challenge


def _is_pending_signup(user: User) -> bool:
    return not user.has_verified_contact and user.google_id is None and user.is_active


def login(
    dto: LoginIn,
    users: UserRepository,
    refresh_repo: RefreshTokenRepository,
    hasher: PasswordHasher,
    tokens: AccessTokenService,
    policy: AuthPolicy,
    verifier: EmailVerifier | None = None,
) -> AuthSession | VerificationChallenge:
    now = datetime.now(UTC)
    by_email = is_email_identifier(dto.identifier)
    channel = Channel.EMAIL if by_email else Channel.SMS
    user = (
        users.get_by_email(dto.identifier) if by_email else users.get_by_phone(dto.identifier)
    )

    if user is None:
        hasher.hash(dto.password)  # égalise le temps de réponse (anti-énumération de comptes)
        raise InvalidCredentialsError()

    if user.is_locked(now):
        raise AccountLockedError()

    if not hasher.verify(dto.password, user.password_hash):
        attempts = user.failed_login_attempts + 1
        lock = attempts >= policy.max_failed_attempts
        users.update(
            replace(
                user,
                failed_login_attempts=0 if lock else attempts,
                locked_until=now + timedelta(minutes=policy.lockout_minutes) if lock else None,
            )
        )
        raise InvalidCredentialsError()

    # Compte désactivé : même erreur qu'un mauvais mot de passe, après vérification du mot de passe.
    if not user.is_active:
        raise InvalidCredentialsError()

    rehash = hasher.needs_rehash(user.password_hash)
    if user.failed_login_attempts or user.locked_until or rehash:
        user = users.update(
            replace(
                user,
                failed_login_attempts=0,
                locked_until=None,
                password_hash=hasher.hash(dto.password) if rehash else user.password_hash,
            )
        )

    if verifier is not None:
        # Chaque connexion exige un code, même si le contact est déjà confirmé.
        return verifier.start(user, channel)

    if not user.has_verified_contact:
        raise InvalidCredentialsError()

    refresh_repo.delete_expired(now)

    return _issue_session(user, str(uuid.uuid4()), refresh_repo, tokens, policy, now)


def start_google_login(
    dto: GoogleLoginIn,
    users: UserRepository,
    google: GoogleIdentityVerifier,
    verifier: EmailVerifier,
) -> VerificationChallenge:
    """Valide l'ID token Google, crée/retrouve/lie le compte, puis envoie le code par email.

    Le code est demandé à CHAQUE connexion Google (double authentification).
    """
    profile = google.verify(dto.credential)
    if not profile.email_verified:
        raise GoogleEmailNotVerifiedError()

    user = users.get_by_google_id(profile.subject)
    if user is None:
        by_email = users.get_by_email(normalize_email(profile.email))
        if by_email is None:
            user = _create_google_user(profile, users)
        else:
            user = _link_google(by_email, profile, users)
    elif profile.picture and profile.picture != user.avatar_url:
        user = users.update(replace(user, avatar_url=profile.picture))

    if not user.is_active:
        raise InvalidCredentialsError()  # même réponse qu'un mauvais mot de passe

    return verifier.start(user, Channel.EMAIL)


def _create_google_user(profile: GoogleProfile, users: UserRepository) -> User:
    email = normalize_email(profile.email)
    name = (profile.name or "").strip() or email.split("@")[0]

    return users.add(
        User(
            id=str(uuid.uuid4()),
            email=email,
            name=name[:GOOGLE_NAME_MAX_LENGTH],
            created_at=datetime.now(UTC),
            password_hash="",  # compte Google : pas de mot de passe
            role=Role.CITIZEN,
            email_verified=False,  # passe à True à la première confirmation du code
            google_id=profile.subject,
            avatar_url=profile.picture,
        )
    )


def _link_google(user: User, profile: GoogleProfile, users: UserRepository) -> User:
    """Rattache Google à un compte existant ayant le même email (Google a vérifié cet email)."""
    if user.google_id is not None and user.google_id != profile.subject:
        raise UserConflictError()
    if not user.is_active:
        raise InvalidCredentialsError()

    return users.update(
        replace(
            user,
            google_id=profile.subject,
            avatar_url=user.avatar_url or profile.picture,
            # Anti « pré-piratage » : un compte jamais confirmé a pu être créé par un tiers avec
            # un mot de passe qu'il connaît. Le vrai propriétaire de l'email arrive via Google :
            # on efface ce mot de passe.
            password_hash=user.password_hash if user.email_verified else "",
        )
    )


def verify_code(
    dto: VerifyCodeIn,
    users: UserRepository,
    refresh_repo: RefreshTokenRepository,
    verifier: EmailVerifier,
    tokens: AccessTokenService,
    policy: AuthPolicy,
) -> AuthSession:
    """Valide le code (inscription, connexion Google, email ou SMS) et ouvre la session."""
    checked = verifier.check(dto.challenge_id, dto.code)

    now = datetime.now(UTC)
    user = users.get_by_id(checked.user_id)
    if user is None or not user.is_active:
        raise InvalidVerificationCodeError()
    if user.is_locked(now):
        raise AccountLockedError()

    # Le code prouve la possession du contact par lequel il est arrivé.
    if checked.channel is Channel.EMAIL and not user.email_verified:
        user = users.update(replace(user, email_verified=True))
    elif checked.channel is Channel.SMS and not user.phone_verified:
        user = users.update(replace(user, phone_verified=True))

    refresh_repo.delete_expired(now)

    return _issue_session(user, str(uuid.uuid4()), refresh_repo, tokens, policy, now)


def resend_code(
    dto: ResendCodeIn, users: UserRepository, verifier: EmailVerifier
) -> VerificationChallenge:
    stored = verifier.get_challenge(dto.challenge_id)
    user = users.get_by_id(stored.user_id)
    if user is None or not user.is_active:
        raise InvalidVerificationCodeError()

    return verifier.start(user, stored.channel, strict=True)


def refresh(
    raw_token: str | None,
    users: UserRepository,
    refresh_repo: RefreshTokenRepository,
    tokens: AccessTokenService,
    policy: AuthPolicy,
) -> AuthSession:
    if not raw_token:
        raise InvalidTokenError()

    now = datetime.now(UTC)
    stored = refresh_repo.get_by_hash(_hash_token(raw_token))
    if stored is None:
        raise InvalidTokenError()

    if stored.revoked_at is not None:
        # Token déjà consommé : vol probable → on coupe toute la session.
        refresh_repo.revoke_family(stored.family_id, now)
        raise InvalidTokenError()

    if stored.expires_at <= now:
        raise InvalidTokenError()

    if not refresh_repo.revoke(stored.id, now):  # course : un autre appel l'a consommé avant
        refresh_repo.revoke_family(stored.family_id, now)
        raise InvalidTokenError()

    user = users.get_by_id(stored.user_id)
    if user is None or not user.is_active:
        refresh_repo.revoke_family(stored.family_id, now)
        raise InvalidTokenError()

    return _issue_session(user, stored.family_id, refresh_repo, tokens, policy, now)


def logout(raw_token: str | None, refresh_repo: RefreshTokenRepository) -> None:
    """Idempotent : ne lève jamais d'erreur si le token est absent ou inconnu."""
    if not raw_token:
        return

    stored = refresh_repo.get_by_hash(_hash_token(raw_token))
    if stored:
        refresh_repo.revoke_family(stored.family_id, datetime.now(UTC))


def logout_all(user: User, refresh_repo: RefreshTokenRepository) -> None:
    refresh_repo.revoke_all_for_user(user.id, datetime.now(UTC))


def change_password(
    user: User,
    dto: ChangePasswordIn,
    users: UserRepository,
    refresh_repo: RefreshTokenRepository,
    hasher: PasswordHasher,
    tokens: AccessTokenService,
    policy: AuthPolicy,
) -> AuthSession:
    user = _verify_current_password(user, dto.current_password, users, hasher, policy)
    if dto.new_password == dto.current_password:
        raise PasswordReuseError()

    now = datetime.now(UTC)
    user = users.update(replace(user, password_hash=hasher.hash(dto.new_password)))
    refresh_repo.revoke_all_for_user(user.id, now)  # déconnecte tous les autres appareils

    return _issue_session(user, str(uuid.uuid4()), refresh_repo, tokens, policy, now)


def _verify_current_password(
    user: User, password: str, users: UserRepository, hasher: PasswordHasher, policy: AuthPolicy
) -> User:
    now = datetime.now(UTC)
    if user.is_locked(now):
        raise AccountLockedError()
    if not hasher.verify(password, user.password_hash):
        attempts = user.failed_login_attempts + 1
        locked = attempts >= policy.max_failed_attempts
        users.update(
            replace(
                user,
                failed_login_attempts=0 if locked else attempts,
                locked_until=now + timedelta(minutes=policy.lockout_minutes) if locked else None,
            )
        )
        raise IncorrectPasswordError()
    if user.failed_login_attempts or user.locked_until:
        user = users.update(replace(user, failed_login_attempts=0, locked_until=None))
    return user


def update_profile(
    user: User,
    dto: UpdateProfileIn,
    users: UserRepository,
    refresh_repo: RefreshTokenRepository,
    hasher: PasswordHasher,
    tokens: AccessTokenService,
    policy: AuthPolicy,
) -> AuthSession:
    user = _verify_current_password(user, dto.current_password, users, hasher, policy)
    updated = update_own_profile(user, dto, users)
    now = datetime.now(UTC)
    refresh_repo.revoke_all_for_user(user.id, now)
    return _issue_session(updated, str(uuid.uuid4()), refresh_repo, tokens, policy, now)


def delete_account(
    user: User,
    password: str,
    users: UserRepository,
    hasher: PasswordHasher,
    policy: AuthPolicy,
) -> None:
    user.require_personal_account_deletion()
    user = _verify_current_password(user, password, users, hasher, policy)
    delete_own_account(user, users)
