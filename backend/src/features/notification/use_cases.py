"""Notifications de l'utilisateur connecté, dans son périmètre."""

from src.domain.citizen_request import Actor
from src.domain.notification.entities import Notification
from src.domain.notification.repository import NotificationRepository


def list_notifications(
    actor: Actor, repo: NotificationRepository, *, unread_only: bool, limit: int
) -> tuple[list[Notification], int]:
    return repo.list_for(actor, unread_only=unread_only, limit=limit)


def mark_notification_read(actor: Actor, key: str, repo: NotificationRepository) -> None:
    repo.mark_read(actor.user_id, key)


def mark_all_notifications_read(actor: Actor, repo: NotificationRepository) -> int:
    return repo.mark_all_read(actor)
