"""Endpoints HTTP d'authentification.

Le refresh token voyage dans un cookie HttpOnly (illisible par JavaScript → résistant au XSS),
limité au chemin /api/v1/auth. L'access token est renvoyé dans le JSON et gardé en mémoire côté front.
"""

import base64
import hashlib
import hmac
import time
from dataclasses import replace

from fastapi import APIRouter, Cookie, Depends, HTTPException, Request, Response, UploadFile, status

from src.domain.user import (
    AccessTokenService,
    AuthPolicy,
    PasswordHasher,
    RefreshTokenRepository,
    User,
    UserRepository,
)
from src.domain.user.entities import Channel
from src.domain.user.ports import GoogleIdentityVerifier
from src.features.auth.schemas import (
    ChallengeOut,
    ChangePasswordIn,
    DeleteAccountIn,
    GoogleLoginIn,
    LoginIn,
    ProfileOut,
    RegisterIn,
    ResendCodeIn,
    TokenOut,
    UpdateProfileIn,
    VerifyCodeIn,
)
from src.features.auth.use_cases import (
    AuthSession,
    change_password,
    delete_account,
    login,
    logout,
    logout_all,
    refresh,
    register,
    resend_code,
    start_google_login,
    update_profile,
    verify_code,
)
from src.features.auth.verification import EmailVerifier, VerificationChallenge
from src.infrastructure.config.settings import Settings, get_settings
from src.infrastructure.security.deps import (
    ActorResolver,
    get_actor_resolver,
    get_auth_policy,
    get_current_user,
    get_password_hasher,
    get_refresh_token_repo,
    get_token_service,
    get_user_repo,
)
from src.infrastructure.security.email_verification import get_email_verifier, get_google_verifier
from src.infrastructure.storage import ImageRejected, ImageTooLarge, save_profile_image

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/config")
def auth_config(
    response: Response, settings: Settings = Depends(get_settings)
) -> dict[str, str | None]:
    """Configuration publique uniquement : aucun secret SMTP ou OAuth."""
    response.headers["Cache-Control"] = "no-store"
    return {"google_client_id": settings.google_client_id}


REFRESH_COOKIE = "refresh_token"
TRUSTED_DEVICE_COOKIE = "trusted_device"
REFRESH_COOKIE_PATH = "/api/v1/auth"


def _set_refresh_cookie(response: Response, token: str, settings: Settings) -> None:
    response.set_cookie(
        key=REFRESH_COOKIE,
        value=token,
        max_age=settings.refresh_token_ttl_days * 86400,
        httponly=True,
        secure=settings.cookie_secure,
        samesite=settings.cookie_samesite,
        path=REFRESH_COOKIE_PATH,
    )


def _clear_refresh_cookie(response: Response, settings: Settings) -> None:
    response.delete_cookie(
        key=REFRESH_COOKIE,
        httponly=True,
        secure=settings.cookie_secure,
        samesite=settings.cookie_samesite,
        path=REFRESH_COOKIE_PATH,
    )


def _set_trusted_device_cookie(response: Response, user_id: str, fingerprint: str, settings: Settings) -> None:
    expires_at = int(time.time()) + settings.refresh_token_ttl_days * 86400
    data = f"{user_id}|{fingerprint}|{expires_at}"
    payload = base64.urlsafe_b64encode(data.encode()).decode().rstrip("=")
    signature = hmac.new(settings.secret_key.encode(), payload.encode(), hashlib.sha256).hexdigest()
    response.set_cookie(
        key=TRUSTED_DEVICE_COOKIE,
        value=f"{payload}.{signature}",
        max_age=settings.refresh_token_ttl_days * 86400,
        httponly=True,
        secure=settings.cookie_secure,
        samesite=settings.cookie_samesite,
        path=REFRESH_COOKIE_PATH,
    )


def _clear_trusted_device_cookie(response: Response, settings: Settings) -> None:
    response.delete_cookie(
        key=TRUSTED_DEVICE_COOKIE,
        httponly=True,
        secure=settings.cookie_secure,
        samesite=settings.cookie_samesite,
        path=REFRESH_COOKIE_PATH,
    )


def _trusted_device_user_id(raw: str | None, fingerprint: str, settings: Settings) -> str | None:
    if not raw or "." not in raw:
        return None
    payload, signature = raw.rsplit(".", 1)
    expected = hmac.new(settings.secret_key.encode(), payload.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(signature, expected):
        return None
    try:
        padded = payload + "=" * (-len(payload) % 4)
        user_id, stored_fingerprint, expires_at = base64.urlsafe_b64decode(padded).decode().split("|", 2)
    except ValueError:
        return None
    if stored_fingerprint != fingerprint or int(expires_at) <= int(time.time()):
        return None
    return user_id


def _device_fingerprint(request: Request) -> str:
    user_agent = request.headers.get("user-agent", "")
    return hashlib.sha256(user_agent.encode()).hexdigest()


def _profile(user: User, resolve: ActorResolver) -> ProfileOut:
    actor = resolve(user)
    return ProfileOut(
        id=user.id,
        email=user.email,
        phone=user.phone,
        name=user.name,
        role=user.role,
        created_at=user.created_at,
        agent_id=actor.agent_id,
        institut_id=actor.institut_id,
        email_verified=user.email_verified,
        phone_verified=user.phone_verified,
        avatar_url=user.avatar_url,
    )


def _respond(
    session: AuthSession,
    response: Response,
    settings: Settings,
    resolve: ActorResolver,
    request: Request | None = None,
) -> TokenOut:
    _set_refresh_cookie(response, session.refresh_token, settings)
    if request is not None:
        _set_trusted_device_cookie(response, session.user.id, _device_fingerprint(request), settings)
    response.headers["Cache-Control"] = "no-store"

    return TokenOut(
        access_token=session.access_token.value,
        expires_in=session.access_token.expires_in,
        user=_profile(session.user, resolve),
    )


def _challenge_out(challenge: VerificationChallenge, response: Response) -> ChallengeOut:
    response.headers["Cache-Control"] = "no-store"

    return ChallengeOut(
        challenge_id=challenge.challenge_id,
        channel=challenge.channel.value,
        destination=challenge.destination,
        email=challenge.destination if challenge.channel is Channel.EMAIL else None,
        expires_in=challenge.expires_in,
        resend_after=challenge.resend_after,
    )


@router.post(
    "/register", response_model=ProfileOut | ChallengeOut, status_code=status.HTTP_201_CREATED
)
def register_endpoint(
    payload: RegisterIn,
    response: Response,
    users: UserRepository = Depends(get_user_repo),
    hasher: PasswordHasher = Depends(get_password_hasher),
    verifier: EmailVerifier = Depends(get_email_verifier),
    settings: Settings = Depends(get_settings),
    resolve: ActorResolver = Depends(get_actor_resolver),
) -> ProfileOut | ChallengeOut:
    result = register(payload, users, hasher, verifier)
    if isinstance(result, VerificationChallenge):
        return _challenge_out(result, response)
    response.headers["Cache-Control"] = "no-store"
    return _profile(result, resolve)


@router.post(
    "/login",
    response_model=TokenOut | ChallengeOut,
    responses={
        202: {
            "model": ChallengeOut,
            "description": "Double authentification : un code a été envoyé",
        }
    },
)
def login_endpoint(
    payload: LoginIn,
    response: Response,
    request: Request,
    users: UserRepository = Depends(get_user_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    hasher: PasswordHasher = Depends(get_password_hasher),
    tokens: AccessTokenService = Depends(get_token_service),
    policy: AuthPolicy = Depends(get_auth_policy),
    verifier: EmailVerifier = Depends(get_email_verifier),
    settings: Settings = Depends(get_settings),
    resolve: ActorResolver = Depends(get_actor_resolver),
    trusted_device: str | None = Cookie(default=None, alias=TRUSTED_DEVICE_COOKIE),
) -> TokenOut | ChallengeOut:
    result = login(
        payload,
        users,
        refresh_repo,
        hasher,
        tokens,
        policy,
        verifier,
        trusted_device_user_id=_trusted_device_user_id(trusted_device, _device_fingerprint(request), settings),
        device_fingerprint=_device_fingerprint(request),
    )
    if isinstance(result, VerificationChallenge):
        response.status_code = status.HTTP_202_ACCEPTED

        return _challenge_out(result, response)

    return _respond(result, response, settings, resolve, request)


@router.post("/google", response_model=TokenOut | ChallengeOut)
def google_login_endpoint(
    payload: GoogleLoginIn,
    response: Response,
    request: Request,
    users: UserRepository = Depends(get_user_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    google: GoogleIdentityVerifier = Depends(get_google_verifier),
    verifier: EmailVerifier = Depends(get_email_verifier),
    tokens: AccessTokenService = Depends(get_token_service),
    policy: AuthPolicy = Depends(get_auth_policy),
    settings: Settings = Depends(get_settings),
    resolve: ActorResolver = Depends(get_actor_resolver),
    trusted_device: str | None = Cookie(default=None, alias=TRUSTED_DEVICE_COOKIE),
) -> TokenOut | ChallengeOut:
    """Valide l'ID token Google puis envoie le code sauf appareil deja reconnu."""
    result = start_google_login(
        payload,
        users,
        google,
        verifier,
        refresh_repo,
        tokens,
        policy,
        trusted_device_user_id=_trusted_device_user_id(trusted_device, _device_fingerprint(request), settings),
        device_fingerprint=_device_fingerprint(request),
    )
    if isinstance(result, VerificationChallenge):
        return _challenge_out(result, response)
    return _respond(result, response, settings, resolve, request)


@router.post("/verify-code", response_model=TokenOut)
def verify_code_endpoint(
    payload: VerifyCodeIn,
    response: Response,
    request: Request,
    users: UserRepository = Depends(get_user_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    verifier: EmailVerifier = Depends(get_email_verifier),
    tokens: AccessTokenService = Depends(get_token_service),
    policy: AuthPolicy = Depends(get_auth_policy),
    settings: Settings = Depends(get_settings),
    resolve: ActorResolver = Depends(get_actor_resolver),
) -> TokenOut:
    """Valide le code reçu par email (inscription, email non confirmé ou Google) et ouvre la session."""
    session = verify_code(payload, users, refresh_repo, verifier, tokens, policy, _device_fingerprint(request))

    return _respond(session, response, settings, resolve, request)


@router.post("/resend-code", response_model=ChallengeOut)
def resend_code_endpoint(
    payload: ResendCodeIn,
    response: Response,
    users: UserRepository = Depends(get_user_repo),
    verifier: EmailVerifier = Depends(get_email_verifier),
) -> ChallengeOut:
    """Renvoie un code (nouveau challenge_id). 429 pendant le délai anti-spam."""
    return _challenge_out(resend_code(payload, users, verifier), response)


@router.post("/refresh", response_model=TokenOut)
def refresh_endpoint(
    response: Response,
    request: Request,
    refresh_token: str | None = Cookie(default=None, alias=REFRESH_COOKIE),
    users: UserRepository = Depends(get_user_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    tokens: AccessTokenService = Depends(get_token_service),
    policy: AuthPolicy = Depends(get_auth_policy),
    settings: Settings = Depends(get_settings),
    resolve: ActorResolver = Depends(get_actor_resolver),
) -> TokenOut:
    session = refresh(refresh_token, users, refresh_repo, tokens, policy)

    return _respond(session, response, settings, resolve, request)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout_endpoint(
    response: Response,
    refresh_token: str | None = Cookie(default=None, alias=REFRESH_COOKIE),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    settings: Settings = Depends(get_settings),
) -> None:
    logout(refresh_token, refresh_repo)
    _clear_refresh_cookie(response, settings)


@router.post("/logout-all", status_code=status.HTTP_204_NO_CONTENT)
def logout_all_endpoint(
    response: Response,
    user: User = Depends(get_current_user),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    settings: Settings = Depends(get_settings),
) -> None:
    logout_all(user, refresh_repo)
    _clear_refresh_cookie(response, settings)
    _clear_trusted_device_cookie(response, settings)


@router.get("/me", response_model=ProfileOut)
def me_endpoint(
    response: Response,
    user: User = Depends(get_current_user),
    resolve: ActorResolver = Depends(get_actor_resolver),
) -> ProfileOut:
    response.headers["Cache-Control"] = "no-store"
    return _profile(user, resolve)


@router.post("/me/avatar", response_model=ProfileOut)
def upload_avatar_endpoint(
    response: Response,
    file: UploadFile,
    user: User = Depends(get_current_user),
    users: UserRepository = Depends(get_user_repo),
    resolve: ActorResolver = Depends(get_actor_resolver),
) -> ProfileOut:
    try:
        url = save_profile_image(file.file)
    except ImageTooLarge as error:
        raise HTTPException(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, str(error)) from error
    except ImageRejected as error:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, str(error)) from error

    saved = users.update(replace(user, avatar_url=url))
    response.headers["Cache-Control"] = "no-store"
    return _profile(saved, resolve)


@router.post("/change-password", response_model=TokenOut)
def change_password_endpoint(
    payload: ChangePasswordIn,
    response: Response,
    user: User = Depends(get_current_user),
    users: UserRepository = Depends(get_user_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    hasher: PasswordHasher = Depends(get_password_hasher),
    tokens: AccessTokenService = Depends(get_token_service),
    policy: AuthPolicy = Depends(get_auth_policy),
    settings: Settings = Depends(get_settings),
    resolve: ActorResolver = Depends(get_actor_resolver),
) -> TokenOut:
    session = change_password(user, payload, users, refresh_repo, hasher, tokens, policy)

    return _respond(session, response, settings, resolve)


@router.patch("/me", response_model=TokenOut)
def update_profile_endpoint(
    payload: UpdateProfileIn,
    response: Response,
    user: User = Depends(get_current_user),
    users: UserRepository = Depends(get_user_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    hasher: PasswordHasher = Depends(get_password_hasher),
    tokens: AccessTokenService = Depends(get_token_service),
    policy: AuthPolicy = Depends(get_auth_policy),
    settings: Settings = Depends(get_settings),
    resolve: ActorResolver = Depends(get_actor_resolver),
) -> TokenOut:
    session = update_profile(user, payload, users, refresh_repo, hasher, tokens, policy)
    return _respond(session, response, settings, resolve)


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_account_endpoint(
    payload: DeleteAccountIn,
    response: Response,
    user: User = Depends(get_current_user),
    users: UserRepository = Depends(get_user_repo),
    hasher: PasswordHasher = Depends(get_password_hasher),
    policy: AuthPolicy = Depends(get_auth_policy),
    settings: Settings = Depends(get_settings),
) -> None:
    delete_account(user, payload.current_password, users, hasher, policy)
    _clear_refresh_cookie(response, settings)
    _clear_trusted_device_cookie(response, settings)
    response.headers["Cache-Control"] = "no-store"
