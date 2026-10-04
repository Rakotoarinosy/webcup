"""Entité notification : dérivée du journal d'événements des demandes (ou d'un retard)."""

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


@dataclass(frozen=True, slots=True)
class Notification:
    # Clé stable : id de l'événement, ou « late:<id demande> » pour un retard.
    key: str
    kind: NotificationKind
    title: str
    message: str
    request_id: str
    created_at: datetime
    is_read: bool = False
