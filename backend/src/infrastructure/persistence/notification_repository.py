"""Notifications dérivées du journal d'événements des demandes.

Pas de table de notifications à alimenter : une notification est un événement
(citizen_request_events) ou un retard (calculé), limité au périmètre du destinataire
(access.scope_for). Seul l'état « lu » est stocké (notification_reads).

S'y ajoutent, pour un habitant, les changements d'état des demandes qu'il soutient (F52).
Messages (F84) : le citoyen est notifié des réponses de la mairie, les agents et gestionnaires des
messages du citoyen ; les notes internes ne notifient personne.
"""

from dataclasses import replace
from datetime import UTC, datetime, timedelta

from sqlalchemy import and_, or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from src.domain.citizen_request import Actor, RequestEventType, RequestStatus, scope_for
from src.domain.citizen_request.priority import NEW_MAX_AGE, WAITING_MAX_AGE, late_since
from src.domain.notification import Notification, NotificationKind
from src.domain.user import Role
from src.infrastructure.persistence.citizen_request_repository import as_utc, scope_conditions
from src.infrastructure.persistence.models import (
    CitizenRequestEventModel,
    CitizenRequestModel,
    CitizenRequestSupportModel,
    NotificationReadModel,
)

EVENT_WINDOW = timedelta(days=14)
MAX_ITEMS = 200

_AUDIENCE_EVENTS = {
    "staff": (
        RequestEventType.CREATED,
        RequestEventType.ASSIGNED,
        RequestEventType.RESOLVED,
        RequestEventType.MESSAGE_POSTED,
    ),
    "citizen": (
        RequestEventType.STATUS_CHANGED,
        RequestEventType.REJECTED,
        RequestEventType.ASSIGNED,
        RequestEventType.RESOLVED,
        RequestEventType.MESSAGE_POSTED,
        RequestEventType.MARKED_DUPLICATE,
    ),
    "agent": (RequestEventType.ASSIGNED, RequestEventType.MESSAGE_POSTED),
}
_TITLES = {
    RequestEventType.CREATED: "Nouvelle demande #{ref}",
    RequestEventType.STATUS_CHANGED: "Demande #{ref} mise à jour",
    RequestEventType.REJECTED: "Demande #{ref} rejetée",
    RequestEventType.ASSIGNED: "Demande #{ref} assignée",
    RequestEventType.RESOLVED: "Demande #{ref} résolue",
    RequestEventType.MESSAGE_POSTED: "Nouveau message sur la demande #{ref}",
    RequestEventType.MARKED_DUPLICATE: "Demande #{ref} regroupée avec une demande similaire",
}
_LATE_TITLE = "Demande #{ref} en retard"
# Évolutions d'une demande soutenue dont l'habitant est prévenu (F52).
_SUPPORTED_EVENTS = {
    RequestEventType.ASSIGNED: "Demande soutenue #{ref} prise en charge",
    RequestEventType.STATUS_CHANGED: "Demande soutenue #{ref} mise à jour",
    RequestEventType.RESOLVED: "Demande soutenue #{ref} résolue",
    RequestEventType.REJECTED: "Demande soutenue #{ref} close",
    RequestEventType.MARKED_DUPLICATE: "Demande soutenue #{ref} regroupée",
}


def _audience(actor: Actor) -> str:
    if actor.role in (Role.ADMIN, Role.MANAGER):
        return "staff"

    return "agent" if actor.role is Role.AGENT else "citizen"


def _ref(request_id: str) -> str:
    return request_id[:8]


def _concerns(audience: str, event_type: RequestEventType, payload: dict) -> bool:
    """Affinage par le contenu de l'événement (payload JSON, filtré ici pour rester portable)."""
    if event_type is RequestEventType.MESSAGE_POSTED:
        # Le citoyen est prévenu des réponses de la mairie ; la mairie, des messages du citoyen.
        return bool(payload.get("from_staff")) is (audience == "citizen")
    if event_type is RequestEventType.MARKED_DUPLICATE:
        return payload.get("role") == "duplicate"
    return True


class SqlAlchemyNotificationRepository:
    def __init__(self, db: Session) -> None:
        self._db = db

    def list_for(
        self, actor: Actor, *, unread_only: bool, limit: int
    ) -> tuple[list[Notification], int]:
        scope = scope_for(actor)
        if scope.is_empty:
            return [], 0

        now = datetime.now(UTC)
        items = self._event_notifications(actor, now) + self._late_notifications(actor, now)
        if actor.role is Role.CITIZEN:
            items += self._supported_notifications(actor, now)
        items.sort(key=lambda item: item.created_at, reverse=True)
        items = items[:MAX_ITEMS]

        read_keys = self._read_keys(actor.user_id, [item.key for item in items])
        items = [replace(item, is_read=item.key in read_keys) for item in items]
        unread_count = sum(1 for item in items if not item.is_read)
        if unread_only:
            items = [item for item in items if not item.is_read]

        return items[:limit], unread_count

    def mark_read(self, user_id: str, key: str) -> None:
        if self._db.get(NotificationReadModel, (user_id, key)) is not None:
            return
        self._db.add(NotificationReadModel(user_id=user_id, key=key))
        try:
            self._db.commit()
        except IntegrityError:  # marquée en parallèle : le résultat est le même
            self._db.rollback()

    def mark_all_read(self, actor: Actor) -> int:
        unread, _ = self.list_for(actor, unread_only=True, limit=MAX_ITEMS)
        for item in unread:
            self._db.add(NotificationReadModel(user_id=actor.user_id, key=item.key))
        self._db.commit()

        return len(unread)

    # ─── sources ────────────────────────────────────────────────────

    def _event_notifications(self, actor: Actor, now: datetime) -> list[Notification]:
        audience = _audience(actor)
        types = [event_type.value for event_type in _AUDIENCE_EVENTS[audience]]
        stmt = (
            select(
                CitizenRequestEventModel.id,
                CitizenRequestEventModel.type,
                CitizenRequestEventModel.request_id,
                CitizenRequestEventModel.created_at,
                CitizenRequestModel.title,
                CitizenRequestEventModel.payload,
            )
            .join(
                CitizenRequestModel, CitizenRequestModel.id == CitizenRequestEventModel.request_id
            )
            .where(
                *scope_conditions(scope_for(actor)),
                CitizenRequestEventModel.type.in_(types),
                CitizenRequestEventModel.created_at >= now - EVENT_WINDOW,
                # On ne notifie pas quelqu'un de ses propres actions.
                or_(
                    CitizenRequestEventModel.actor_id.is_(None),
                    CitizenRequestEventModel.actor_id != actor.user_id,
                ),
            )
            .order_by(CitizenRequestEventModel.created_at.desc())
            .limit(MAX_ITEMS)
        )

        return [
            Notification(
                key=str(event_id),
                kind=NotificationKind(event_type),
                title=_TITLES[RequestEventType(event_type)].format(ref=_ref(request_id)),
                message=title,
                request_id=request_id,
                created_at=as_utc(created_at),
            )
            for event_id, event_type, request_id, created_at, title, payload in self._db.execute(
                stmt
            )
            if _concerns(audience, RequestEventType(event_type), payload or {})
        ]

    def _supported_notifications(self, actor: Actor, now: datetime) -> list[Notification]:
        """Évolutions, après le soutien, des demandes que l'habitant soutient."""
        stmt = (
            select(
                CitizenRequestEventModel.id,
                CitizenRequestEventModel.type,
                CitizenRequestEventModel.request_id,
                CitizenRequestEventModel.created_at,
                CitizenRequestModel.title,
                CitizenRequestEventModel.payload,
            )
            .join(
                CitizenRequestModel, CitizenRequestModel.id == CitizenRequestEventModel.request_id
            )
            .join(
                CitizenRequestSupportModel,
                and_(
                    CitizenRequestSupportModel.request_id == CitizenRequestEventModel.request_id,
                    CitizenRequestSupportModel.citizen_id == actor.user_id,
                ),
            )
            .where(
                CitizenRequestEventModel.type.in_([t.value for t in _SUPPORTED_EVENTS]),
                CitizenRequestEventModel.created_at >= now - EVENT_WINDOW,
                CitizenRequestEventModel.created_at >= CitizenRequestSupportModel.created_at,
                CitizenRequestModel.citizen_id != actor.user_id,
            )
            .order_by(CitizenRequestEventModel.created_at.desc())
            .limit(MAX_ITEMS)
        )

        return [
            Notification(
                key=f"support:{event_id}",
                kind=NotificationKind.SUPPORTED_UPDATE,
                title=_SUPPORTED_EVENTS[RequestEventType(event_type)].format(ref=_ref(request_id)),
                message=title,
                request_id=request_id,
                created_at=as_utc(created_at),
            )
            for event_id, event_type, request_id, created_at, title, payload in self._db.execute(
                stmt
            )
            if RequestEventType(event_type) is not RequestEventType.MARKED_DUPLICATE
            or (payload or {}).get("role") == "duplicate"
        ]

    def _late_notifications(self, actor: Actor, now: datetime) -> list[Notification]:
        overdue = or_(
            and_(
                CitizenRequestModel.status == RequestStatus.NEW.value,
                CitizenRequestModel.created_at <= now - NEW_MAX_AGE,
            ),
            and_(
                CitizenRequestModel.status == RequestStatus.IN_PROGRESS.value,
                CitizenRequestModel.scheduled_at.is_not(None),
                CitizenRequestModel.scheduled_at <= now,
            ),
            and_(
                CitizenRequestModel.status == RequestStatus.PENDING.value,
                CitizenRequestModel.updated_at <= now - WAITING_MAX_AGE,
            ),
        )
        stmt = (
            select(CitizenRequestModel)
            .where(*scope_conditions(scope_for(actor)), overdue)
            .limit(MAX_ITEMS)
        )

        notifications = []
        for row in self._db.scalars(stmt).all():
            since = late_since(
                RequestStatus(row.status),
                created_at=row.created_at,
                scheduled_at=row.scheduled_at,
                updated_at=row.updated_at,
            )
            if since is None:
                continue
            notifications.append(
                Notification(
                    key=f"late:{row.id}",
                    kind=NotificationKind.LATE,
                    title=_LATE_TITLE.format(ref=_ref(row.id)),
                    message=row.title,
                    request_id=row.id,
                    created_at=since,
                )
            )

        return notifications

    def _read_keys(self, user_id: str, keys: list[str]) -> set[str]:
        if not keys:
            return set()
        stmt = select(NotificationReadModel.key).where(
            NotificationReadModel.user_id == user_id, NotificationReadModel.key.in_(keys)
        )

        return set(self._db.scalars(stmt).all())
