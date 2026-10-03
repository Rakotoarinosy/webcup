"""Entité notification : dérivée du journal d'événements des demandes (ou d'un retard)."""

from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True, slots=True)
class Notification:
    # Clé stable : id de l'événement, ou « late:<id demande> » pour un retard.
    key: str
    kind: str
    title: str
    message: str
    request_id: str
    created_at: datetime
    is_read: bool = False
