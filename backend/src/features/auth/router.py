"""Endpoints HTTP d'authentification.

Le refresh token voyage dans un cookie HttpOnly (illisible par JavaScript → résistant au XSS),
limité au chemin /api/v1/auth. L'access token est renvoyé dans le JSON et gardé en mémoire côté front.
"""

from fastapi import APIRouter, BackgroundTasks, Cookie, Depends, Request, Response, status

from src.domain.account_security import KnownDeviceRepository, SecurityAlertSender
from src.domain.user import (
    AccessTokenService,
    AuthPolicy,
    PasswordHasher,
    RefreshTokenRepository,
    User,
    UserRepository,
)
from src.domain.user.entities import Channel
from src.domain.user.ports import CodeHasher, GoogleIdentityVerifier
from src.features.account_security.use_cases import (
    link_current_device,
    notify_new_device,
    record_login,
)
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
from src.infrastructure.security.device_tracking import (
    DEVICE_COOKIE,
    get_device_repo,
    get_security_alerts,
    login_context,
    set_device_cookie,
)
from src.infrastructure.security.email_verification import (
    get_code_hasher,
    get_email_verifier,
    get_google_verifier,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/config")
def auth_config(
    response: Response, settings: Settings = Depends(get_settings)
) -> dict[str, str | None]:
    """Configuration publique uniquement : aucun secret SMTP ou OAuth."""
    response.headers["Cache-Control"] = "no-store"
    return {"google_client_id": settings.google_client_id}


REFRESH_COOKIE = "refresh_token"
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
    session: AuthSession, response: Response, settings: Settings, resolve: ActorResolver
) -> TokenOut:
    _set_refresh_cookie(response, session.refresh_token, settings)
    response.headers["Cache-Control"] = "no-store"

    return TokenOut(
        access_token=session.access_token.value,
        expires_in=session.access_token.expires_in,
        user=_profile(session.user, resolve),
    )


def _track_device(
    session: AuthSession,
    request: Request,
    response: Response,
    background: BackgroundTasks,
    devices: KnownDeviceRepository,
    hasher: CodeHasher,
    alerts: SecurityAlertSender,
    settings: Settings,
) -> None:
    """Reconnaît l'appareil de cette connexion ; s'il est nouveau, alerte après la réponse."""
    login = record_login(session.user, session.family_id, login_context(request), devices, hasher)
    set_device_cookie(response, login.device_token, settings)
    if login.is_new:
        background.add_task(notify_new_device, session.user, login.device, alerts)


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
    request: Request,
    response: Response,
    background: BackgroundTasks,
    users: UserRepository = Depends(get_user_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    hasher: PasswordHasher = Depends(get_password_hasher),
    tokens: AccessTokenService = Depends(get_token_service),
    policy: AuthPolicy = Depends(get_auth_policy),
    verifier: EmailVerifier = Depends(get_email_verifier),
    settings: Settings = Depends(get_settings),
    resolve: ActorResolver = Depends(get_actor_resolver),
    devices: KnownDeviceRepository = Depends(get_device_repo),
    code_hasher: CodeHasher = Depends(get_code_hasher),
    alerts: SecurityAlertSender = Depends(get_security_alerts),
) -> TokenOut | ChallengeOut:
    result = login(payload, users, refresh_repo, hasher, tokens, policy, verifier)
    if isinstance(result, VerificationChallenge):
        response.status_code = status.HTTP_202_ACCEPTED

        return _challenge_out(result, response)

    _track_device(result, request, response, background, devices, code_hasher, alerts, settings)
    return _respond(result, response, settings, resolve)


@router.post("/google", response_model=ChallengeOut)
def google_login_endpoint(
    payload: GoogleLoginIn,
    response: Response,
    users: UserRepository = Depends(get_user_repo),
    google: GoogleIdentityVerifier = Depends(get_google_verifier),
    verifier: EmailVerifier = Depends(get_email_verifier),
) -> ChallengeOut:
    """Valide l'ID token Google puis envoie le code par email (à chaque connexion)."""
    return _challenge_out(start_google_login(payload, users, google, verifier), response)


@router.post("/verify-code", response_model=TokenOut)
def verify_code_endpoint(
    payload: VerifyCodeIn,
    request: Request,
    response: Response,
    background: BackgroundTasks,
    users: UserRepository = Depends(get_user_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    verifier: EmailVerifier = Depends(get_email_verifier),
    tokens: AccessTokenService = Depends(get_token_service),
    policy: AuthPolicy = Depends(get_auth_policy),
    settings: Settings = Depends(get_settings),
    resolve: ActorResolver = Depends(get_actor_resolver),
    devices: KnownDeviceRepository = Depends(get_device_repo),
    code_hasher: CodeHasher = Depends(get_code_hasher),
    alerts: SecurityAlertSender = Depends(get_security_alerts),
) -> TokenOut:
    """Valide le code reçu par email (inscription, email non confirmé ou Google) et ouvre la session."""
    session = verify_code(payload, users, refresh_repo, verifier, tokens, policy)
    _track_device(session, request, response, background, devices, code_hasher, alerts, settings)

    return _respond(session, response, settings, resolve)


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
    refresh_token: str | None = Cookie(default=None, alias=REFRESH_COOKIE),
    users: UserRepository = Depends(get_user_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    tokens: AccessTokenService = Depends(get_token_service),
    policy: AuthPolicy = Depends(get_auth_policy),
    settings: Settings = Depends(get_settings),
    resolve: ActorResolver = Depends(get_actor_resolver),
) -> TokenOut:
    session = refresh(refresh_token, users, refresh_repo, tokens, policy)

    return _respond(session, response, settings, resolve)


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


@router.get("/me", response_model=ProfileOut)
def me_endpoint(
    response: Response,
    user: User = Depends(get_current_user),
    resolve: ActorResolver = Depends(get_actor_resolver),
) -> ProfileOut:
    response.headers["Cache-Control"] = "no-store"
    return _profile(user, resolve)


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
    devices: KnownDeviceRepository = Depends(get_device_repo),
    device_token: str | None = Cookie(default=None, alias=DEVICE_COOKIE),
) -> TokenOut:
    session = change_password(user, payload, users, refresh_repo, hasher, tokens, policy)
    link_current_device(session.user, session.family_id, device_token, devices)

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
    devices: KnownDeviceRepository = Depends(get_device_repo),
    device_token: str | None = Cookie(default=None, alias=DEVICE_COOKIE),
) -> TokenOut:
    session = update_profile(user, payload, users, refresh_repo, hasher, tokens, policy)
    link_current_device(session.user, session.family_id, device_token, devices)
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
    response.headers["Cache-Control"] = "no-store"
