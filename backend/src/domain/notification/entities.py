"""Entité notification : dérivée du journal d'événements des demandes, d'un retard, ou d'une
alerte officielle publiée."""

from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum


class NotificationKind(StrEnum):
    """Les événements de demande notifiés, plus le retard (calculé, sans événement)."""

    CREATED = "created"
    STATUS_CHANGED = "status_changed"
    REJECTED = "rejected"
    ASSIGNED = "assigned"
    RESOLVED = "resolved"
    LATE = "late"
    ALERT = "alert"  # alerte ou message officiel publié (F30)


@dataclass(frozen=True, slots=True)
class Notification:
    # Clé stable : id de l'événement, « late:<id demande> » pour un retard, « alert:<id> ».
    key: str
    kind: NotificationKind
    title: str
    message: str
    request_id: str | None
    created_at: datetime
    is_read: bool = False
    alert_id: str | None = None
