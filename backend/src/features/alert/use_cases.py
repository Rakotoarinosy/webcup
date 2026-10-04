"""Use cases des alertes et messages officiels.

Lecture : publique (bandeau sur toutes les pages, sans connexion).
Écriture : administrateur et managers (un manager gère les alertes qu'il a publiées,
l'administrateur toutes). Chaque opération est tracée dans le journal d'audit.
"""

import logging
import uuid
from datetime import UTC, datetime, timedelta

from src.domain.alert import (
    LEVEL_RANK,
    Alert,
    AlertMailer,
    AlertNotFoundError,
    AlertRecommender,
    AlertRepository,
    RecommendationRequest,
)
from src.domain.audit import AuditAction, AuditTarget
from src.domain.user import ForbiddenError, Role, User, UserRepository
from src.features.alert.schemas import AlertIn, RecommendationIn
from src.features.audit.recording import AuditTrail, field_changes, record

logger = logging.getLogger(__name__)

HISTORY_DAYS = 30
_TRACKED_FIELDS = (
    "title",
    "message",
    "instructions",
    "level",
    "audience",
    "zone",
    "issuer",
    "starts_at",
    "ends_at",
)


# ─── Lecture publique ───────────────────────────────────────────────


def list_current_alerts(repo: AlertRepository, now: datetime | None = None) -> list[Alert]:
    """La plus grave d'abord, puis la plus récente."""
    now = now or datetime.now(UTC)
    alerts = repo.list_current(now)
    return sorted(alerts, key=lambda alert: (LEVEL_RANK[alert.level], -alert.starts_at.timestamp()))


def list_alert_history(
    repo: AlertRepository, days: int = HISTORY_DAYS, now: datetime | None = None
) -> list[Alert]:
    now = now or datetime.now(UTC)
    return repo.list_since(now - timedelta(days=days), now)


# ─── Gestion ────────────────────────────────────────────────────────


def can_manage(user: User, alert: Alert) -> bool:
    if user.role is Role.ADMIN:
        return True
    return user.role is Role.MANAGER and alert.author_id == user.id


def list_alerts_for_staff(user: User, repo: AlertRepository) -> list[Alert]:
    _ensure_publisher(user)
    return repo.list_all()


def create_alert(
    user: User,
    dto: AlertIn,
    repo: AlertRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Alert:
    _ensure_publisher(user)
    now = now or datetime.now(UTC)
    alert = Alert(
        id=str(uuid.uuid4()),
        author_id=user.id,
        author_name=user.name,
        created_at=now,
        updated_at=now,
        **_fields(dto, now),
    )
    saved = repo.add(alert)
    record(
        audit,
        AuditAction.ALERT_PUBLISHED,
        AuditTarget.ALERT,
        saved.id,
        saved.title,
        details={"level": saved.level.value, "audience": saved.audience.value},
    )
    return saved


def update_alert(
    alert_id: str,
    dto: AlertIn,
    user: User,
    repo: AlertRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Alert:
    alert = _load_managed(alert_id, user, repo)
    now = now or datetime.now(UTC)
    before = Alert(**vars(alert))
    for name, value in _fields(dto, alert.starts_at).items():
        setattr(alert, name, value)
    alert.validate()
    alert.updated_at = now
    saved = repo.update(alert)
    changes = field_changes(before, saved, _TRACKED_FIELDS)
    if changes:
        record(
            audit,
            AuditAction.ALERT_UPDATED,
            AuditTarget.ALERT,
            saved.id,
            saved.title,
            details={name: _plain(change) for name, change in changes.items()},
        )
    return saved


def end_alert(
    alert_id: str,
    user: User,
    repo: AlertRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Alert:
    alert = _load_managed(alert_id, user, repo)
    alert.end(now or datetime.now(UTC))
    saved = repo.update(alert)
    record(audit, AuditAction.ALERT_ENDED, AuditTarget.ALERT, saved.id, saved.title)
    return saved


def delete_alert(
    alert_id: str, user: User, repo: AlertRepository, audit: AuditTrail | None = None
) -> None:
    """Réservé à l'administrateur (alerte publiée par erreur) : sinon, on la termine."""
    if user.role is not Role.ADMIN:
        raise ForbiddenError()
    alert = _load(alert_id, repo)
    repo.delete(alert.id)
    record(
        audit,
        AuditAction.ALERT_DELETED,
        AuditTarget.ALERT,
        alert.id,
        alert.title,
        details={"level": alert.level.value},
    )


# ─── IA (F31) ───────────────────────────────────────────────────────


def suggest_recommendations(
    user: User, dto: RecommendationIn, recommender: AlertRecommender
) -> str:
    """Proposition seulement : l'auteur relit et modifie avant de publier."""
    _ensure_publisher(user)
    return recommender.recommend(
        RecommendationRequest(
            title=dto.title.strip(),
            message=dto.message.strip(),
            level=dto.level,
            audience=dto.audience,
            zone=(dto.zone or "").strip() or None,
        )
    )


# ─── Email (F30) ────────────────────────────────────────────────────


def email_recipients(users: UserRepository) -> list[tuple[str, str]]:
    """Habitants joignables par email : comptes citoyens actifs avec une adresse confirmée."""
    return [
        (user.email, user.name)
        for user in users.list_citizens()
        if user.is_active and user.email and user.email_verified
    ]


def send_alert_emails(alert: Alert, recipients: list[tuple[str, str]], mailer: AlertMailer) -> int:
    """Envoi en tâche de fond : un échec est journalisé, jamais propagé (l'alerte est publiée)."""
    sent = 0
    for email, name in recipients:
        try:
            mailer.send_alert(email, name, alert)
            sent += 1
        except Exception:  # SMTP indisponible, adresse refusée… : on continue avec les autres
            logger.warning("alert email failed", extra={"alert_id": alert.id})
    return sent


# ─── Interne ────────────────────────────────────────────────────────


def _fields(dto: AlertIn, default_start: datetime) -> dict[str, object]:
    zone = (dto.zone or "").strip() or None
    return {
        "title": dto.title.strip(),
        "message": dto.message.strip(),
        "instructions": dto.instructions.strip(),
        "level": dto.level,
        "audience": dto.audience,
        "zone": zone,
        "issuer": dto.issuer.strip(),
        "starts_at": _utc(dto.starts_at) if dto.starts_at else default_start,
        "ends_at": _utc(dto.ends_at) if dto.ends_at else None,
    }


def _utc(value: datetime) -> datetime:
    return value.replace(tzinfo=UTC) if value.tzinfo is None else value.astimezone(UTC)


def _plain(change: dict[str, object]) -> dict[str, object]:
    return {
        key: value.isoformat() if isinstance(value, datetime) else value
        for key, value in change.items()
    }


def _ensure_publisher(user: User) -> None:
    if not (user.is_active and user.role in (Role.ADMIN, Role.MANAGER)):
        raise ForbiddenError()


def _load(alert_id: str, repo: AlertRepository) -> Alert:
    alert = repo.get_by_id(alert_id)
    if alert is None:
        raise AlertNotFoundError(alert_id)
    return alert


def _load_managed(alert_id: str, user: User, repo: AlertRepository) -> Alert:
    _ensure_publisher(user)
    alert = _load(alert_id, repo)
    if not can_manage(user, alert):
        raise ForbiddenError()
    return alert
