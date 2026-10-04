"""Sécurité du compte : appareils connus, alertes de nouvelle connexion, révocation.

Une « session » est une famille de refresh tokens (voir features/auth) ; chaque session est
rattachée à l'appareil qui l'a ouverte. Révoquer un appareil ferme ses sessions.
"""

import hashlib
import logging
import secrets
import uuid
from dataclasses import dataclass, replace
from datetime import UTC, datetime

from src.domain.account_security import (
    CurrentDeviceRevocationError,
    DeviceNotFoundError,
    KnownDevice,
    KnownDeviceRepository,
    LoginContext,
    LoginRecord,
    SecurityAlertSender,
    display_network,
    network_prefix,
    parse_user_agent,
)
from src.domain.audit import AuditAction, AuditTarget
from src.domain.user import RefreshTokenRepository, User
from src.domain.user.ports import CodeHasher
from src.features.audit.recording import AuditTrail, record

logger = logging.getLogger("security")

MAX_DEVICES_PER_USER = 20


def hash_device_token(raw: str) -> str:
    return hashlib.sha256(raw.encode()).hexdigest()


def _fingerprint(user: User, context: LoginContext, hasher: CodeHasher) -> str:
    profile = parse_user_agent(context.user_agent)
    material = f"device|{profile.browser}|{profile.os}|{network_prefix(context.ip)}"
    return hasher.hash(user.id, material)


def record_login(
    user: User,
    family_id: str,
    context: LoginContext,
    devices: KnownDeviceRepository,
    hasher: CodeHasher,
    now: datetime | None = None,
) -> LoginRecord:
    """Reconnaît (ou enregistre) l'appareil de la connexion et y rattache la session.

    Le tout premier appareil d'un compte n'est pas une alerte (inscription, ou premier usage
    après la mise en place de cette fonctionnalité).
    """
    now = now or datetime.now(UTC)
    profile = parse_user_agent(context.user_agent)
    fingerprint = _fingerprint(user, context, hasher)
    token = context.device_token or secrets.token_urlsafe(32)
    token_hash = hash_device_token(token)

    device = devices.find_by_token(user.id, token_hash) if context.device_token else None
    if device is None:
        device = devices.find_by_fingerprint(user.id, fingerprint)

    network = display_network(context.ip)
    if device is None:
        first_device = devices.count_for_user(user.id) == 0
        device = devices.add(
            KnownDevice(
                id=str(uuid.uuid4()),
                user_id=user.id,
                token_hash=token_hash,
                fingerprint=fingerprint,
                label=profile.label,
                kind=profile.kind,
                network=network,
                location=context.location,
                first_seen_at=now,
                last_seen_at=now,
                acknowledged=first_device,
            )
        )
        is_new = not first_device
        devices.prune(user.id, MAX_DEVICES_PER_USER)
    else:
        device = devices.update(
            replace(
                device,
                token_hash=token_hash,
                fingerprint=fingerprint,
                label=profile.label,
                kind=profile.kind,
                network=network or device.network,
                location=context.location or device.location,
                last_seen_at=now,
            )
        )
        is_new = False

    devices.link_session(device.id, user.id, family_id, now)
    if is_new:
        logger.info("new device login", extra={"user_id": user.id, "device_id": device.id})
    return LoginRecord(device=device, is_new=is_new, device_token=token)


def link_current_device(
    user: User, family_id: str, device_token: str | None, devices: KnownDeviceRepository
) -> None:
    """Après un changement de mot de passe ou de profil, la nouvelle session reste sur l'appareil."""
    if not device_token:
        return
    device = devices.find_by_token(user.id, hash_device_token(device_token))
    if device is not None:
        devices.link_session(device.id, user.id, family_id, datetime.now(UTC))


def notify_new_device(user: User, device: KnownDevice, alerts: SecurityAlertSender) -> None:
    """Exécuté après la réponse : un échec d'envoi n'est jamais un échec de connexion."""
    try:
        channels = alerts.new_device_login(user, device)
    except Exception:
        logger.exception("new device alert failed", extra={"user_id": user.id})
        return
    if not channels:
        logger.warning("new device alert not delivered", extra={"user_id": user.id})


def current_device_id(
    family_id: str | None, device_token: str | None, user: User, devices: KnownDeviceRepository
) -> str | None:
    if family_id:
        device_id = devices.device_for_session(family_id)
        if device_id:
            return device_id
    if device_token:
        device = devices.find_by_token(user.id, hash_device_token(device_token))
        if device is not None:
            return device.id
    return None


@dataclass(frozen=True)
class SecurityOverview:
    devices: list[KnownDevice]
    current_device_id: str | None

    @property
    def alerts(self) -> list[KnownDevice]:
        """Connexions depuis un nouvel appareil pas encore confirmées (hors appareil courant)."""
        return [d for d in self.devices if not d.acknowledged and d.id != self.current_device_id]


def security_overview(
    user: User, current_id: str | None, devices: KnownDeviceRepository
) -> SecurityOverview:
    return SecurityOverview(devices.list_for_user(user.id, datetime.now(UTC)), current_id)


def _get(user: User, device_id: str, devices: KnownDeviceRepository) -> KnownDevice:
    device = devices.get(user.id, device_id)
    if device is None:
        raise DeviceNotFoundError(device_id)
    return device


def confirm_device(user: User, device_id: str, devices: KnownDeviceRepository) -> KnownDevice:
    """« C'était moi » : l'alerte disparaît, l'appareil reste connu."""
    device = _get(user, device_id, devices)
    if not device.acknowledged:
        device = devices.update(replace(device, acknowledged=True))
    return device


def revoke_device(
    user: User,
    device_id: str,
    current_id: str | None,
    devices: KnownDeviceRepository,
    refresh_repo: RefreshTokenRepository,
    trail: AuditTrail | None = None,
) -> int:
    """Ferme les sessions ouvertes depuis cet appareil et l'oublie (prochaine connexion = alerte)."""
    device = _get(user, device_id, devices)
    if device.id == current_id:
        raise CurrentDeviceRevocationError()
    now = datetime.now(UTC)
    families = devices.session_families(device.id)
    for family_id in families:
        refresh_repo.revoke_family(family_id, now)
    devices.delete(device.id)
    record(
        trail,
        AuditAction.ACCOUNT_DEVICE_REVOKED,
        AuditTarget.ACCOUNT,
        user.id,
        user.name,
        details={"device": device.label},
    )
    logger.info("device revoked", extra={"user_id": user.id, "device_id": device.id})
    return len(families)


def report_not_me(
    user: User,
    device_id: str | None,
    current_family_id: str | None,
    devices: KnownDeviceRepository,
    trail: AuditTrail | None = None,
) -> int:
    """« Ce n'était pas moi » : ferme toutes les sessions sauf celle en cours, oublie l'appareil.

    L'habitant est ensuite invité à changer son mot de passe (le frontend l'y conduit).
    """
    device = _get(user, device_id, devices) if device_id else None
    closed = devices.revoke_sessions_except(user.id, current_family_id, datetime.now(UTC))
    if device is not None:
        devices.delete(device.id)
    record(
        trail,
        AuditAction.ACCOUNT_SUSPICIOUS_LOGIN_REPORTED,
        AuditTarget.ACCOUNT,
        user.id,
        user.name,
        details={"device": device.label if device else None, "sessions_closed": closed},
    )
    logger.warning(
        "suspicious login reported",
        extra={"user_id": user.id, "device_id": device.id if device else None},
    )
    return closed


def revoke_other_sessions(
    user: User,
    current_family_id: str | None,
    devices: KnownDeviceRepository,
) -> int:
    return devices.revoke_sessions_except(user.id, current_family_id, datetime.now(UTC))
