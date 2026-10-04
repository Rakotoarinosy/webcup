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
    # F84 : nouveau message public (réponse de la mairie, ou du citoyen pour les agents).
    MESSAGE_POSTED = "message_posted"
    # F75 : la demande de l'habitant a été regroupée avec une demande similaire.
    MARKED_DUPLICATE = "marked_duplicate"
    # F52 : une demande que l'habitant soutient a changé d'état.
    SUPPORTED_UPDATE = "supported_update"


@dataclass(frozen=True, slots=True)
class Notification:
    # Clé stable : id de l'événement, « late:<id demande> » pour un retard,
    # « support:<id événement> » pour l'évolution d'une demande soutenue.
    key: str
    kind: NotificationKind
    title: str
    message: str
    request_id: str
    created_at: datetime
    is_read: bool = False
