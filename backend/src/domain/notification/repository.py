from typing import Protocol

from src.domain.citizen_request.access import Actor
from src.domain.notification.entities import Notification


class NotificationRepository(Protocol):
    """Notifications dérivées du journal d'événements, limitées au périmètre de l'Actor (scope_for)."""

    def list_for(
        self, actor: Actor, *, unread_only: bool, limit: int
    ) -> tuple[list[Notification], int]:
        """Notifications du plus récent au plus ancien, et nombre total de non lues."""
        ...

    def mark_read(self, user_id: str, key: str) -> None: ...

    def mark_all_read(self, actor: Actor) -> int: ...
