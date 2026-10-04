"""Sécurité du compte (F54) et jetons anti-robots des formulaires (F81).

GET    /auth/security/overview                appareils, alertes à confirmer, appareil courant
POST   /auth/security/devices/{id}/confirm    « C'était moi »
DELETE /auth/security/devices/{id}            déconnecter un appareil (et l'oublier)
POST   /auth/security/not-me                  « Ce n'était pas moi » : ferme les autres sessions
POST   /auth/security/sessions/revoke-others  déconnecter tous les autres appareils
GET    /security/form-token                   jeton signé à renvoyer avec un formulaire public

Les routes /auth/security reçoivent le cookie de session (chemin /api/v1/auth) : c'est ainsi
que l'appareil courant est reconnu et épargné.
"""

import hashlib

from fastapi import APIRouter, Cookie, Depends, Path, Response

from src.domain.account_security import KnownDevice, KnownDeviceRepository
from src.domain.user import RefreshTokenRepository, User
from src.features.account_security.schemas import (
    DeviceOut,
    FormTokenOut,
    NotMeIn,
    SecurityOverviewOut,
    SessionsClosedOut,
)
from src.features.account_security.use_cases import (
    confirm_device,
    current_device_id,
    report_not_me,
    revoke_device,
    revoke_other_sessions,
    security_overview,
)
from src.features.audit.recording import AuditTrail
from src.features.audit.router import get_audit_trail
from src.infrastructure.config import get_settings
from src.infrastructure.security.deps import get_current_user, get_refresh_token_repo
from src.infrastructure.security.device_tracking import DEVICE_COOKIE, get_device_repo
from src.infrastructure.security.form_guard import FormTokenSigner

router = APIRouter(prefix="/auth/security", tags=["account security"])
form_router = APIRouter(prefix="/security", tags=["account security"])

REFRESH_COOKIE = "refresh_token"
DeviceId = Path(min_length=1, max_length=36)


def _current_family(raw: str | None, refresh_repo: RefreshTokenRepository) -> str | None:
    if not raw:
        return None
    stored = refresh_repo.get_by_hash(hashlib.sha256(raw.encode()).hexdigest())
    return stored.family_id if stored and stored.revoked_at is None else None


def _out(device: KnownDevice, current_id: str | None) -> DeviceOut:
    return DeviceOut(
        id=device.id,
        label=device.label,
        kind=device.kind,
        network=device.network,
        location=device.location,
        first_seen_at=device.first_seen_at,
        last_seen_at=device.last_seen_at,
        acknowledged=device.acknowledged,
        active_sessions=device.active_sessions,
        current=device.id == current_id,
    )


@router.get("/overview", response_model=SecurityOverviewOut)
def overview_endpoint(
    response: Response,
    user: User = Depends(get_current_user),
    devices: KnownDeviceRepository = Depends(get_device_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    refresh_token: str | None = Cookie(default=None, alias=REFRESH_COOKIE),
    device_token: str | None = Cookie(default=None, alias=DEVICE_COOKIE),
) -> SecurityOverviewOut:
    response.headers["Cache-Control"] = "no-store"
    family = _current_family(refresh_token, refresh_repo)
    current = current_device_id(family, device_token, user, devices)
    view = security_overview(user, current, devices)
    return SecurityOverviewOut(
        devices=[_out(device, current) for device in view.devices],
        alerts=[_out(device, current) for device in view.alerts],
        current_device_id=current,
    )


@router.post("/devices/{device_id}/confirm", response_model=DeviceOut)
def confirm_device_endpoint(
    device_id: str = DeviceId,
    user: User = Depends(get_current_user),
    devices: KnownDeviceRepository = Depends(get_device_repo),
) -> DeviceOut:
    return _out(confirm_device(user, device_id, devices), None)


@router.delete("/devices/{device_id}", response_model=SessionsClosedOut)
def revoke_device_endpoint(
    device_id: str = DeviceId,
    user: User = Depends(get_current_user),
    devices: KnownDeviceRepository = Depends(get_device_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    refresh_token: str | None = Cookie(default=None, alias=REFRESH_COOKIE),
    device_token: str | None = Cookie(default=None, alias=DEVICE_COOKIE),
    audit: AuditTrail = Depends(get_audit_trail),
) -> SessionsClosedOut:
    family = _current_family(refresh_token, refresh_repo)
    current = current_device_id(family, device_token, user, devices)
    closed = revoke_device(user, device_id, current, devices, refresh_repo, audit)
    return SessionsClosedOut(
        sessions_closed=closed, message="Cet appareil a été déconnecté de votre compte."
    )


@router.post("/not-me", response_model=SessionsClosedOut)
def not_me_endpoint(
    payload: NotMeIn,
    user: User = Depends(get_current_user),
    devices: KnownDeviceRepository = Depends(get_device_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    refresh_token: str | None = Cookie(default=None, alias=REFRESH_COOKIE),
    audit: AuditTrail = Depends(get_audit_trail),
) -> SessionsClosedOut:
    family = _current_family(refresh_token, refresh_repo)
    closed = report_not_me(user, payload.device_id, family, devices, audit)
    return SessionsClosedOut(
        sessions_closed=closed,
        password_change_recommended=True,
        message=(
            "Toutes les autres sessions ont été fermées. "
            "Changez maintenant votre mot de passe pour protéger votre compte."
        ),
    )


@router.post("/sessions/revoke-others", response_model=SessionsClosedOut)
def revoke_others_endpoint(
    user: User = Depends(get_current_user),
    devices: KnownDeviceRepository = Depends(get_device_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    refresh_token: str | None = Cookie(default=None, alias=REFRESH_COOKIE),
) -> SessionsClosedOut:
    family = _current_family(refresh_token, refresh_repo)
    closed = revoke_other_sessions(user, family, devices)
    return SessionsClosedOut(
        sessions_closed=closed, message="Vos autres appareils ont été déconnectés."
    )


@form_router.get("/form-token", response_model=FormTokenOut)
def form_token_endpoint(response: Response) -> FormTokenOut:
    settings = get_settings()
    signer = FormTokenSigner(
        settings.secret_key, settings.form_min_fill_seconds, settings.form_token_max_age_seconds
    )
    response.headers["Cache-Control"] = "no-store"
    return FormTokenOut(token=signer.issue(), min_delay_seconds=settings.form_min_fill_seconds)
