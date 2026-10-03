"""Cloche de notifications, dérivées du journal des demandes et limitées au périmètre de l'utilisateur.

GET  /notifications?unread_only=&limit=   liste + nombre de non lues (pour le badge de la cloche)
POST /notifications/{key}/read            marque une notification comme lue (au clic)
POST /notifications/read-all              tout marquer comme lu
"""

from fastapi import APIRouter, Depends, Path, Query
from fastapi import status as http_status
from sqlalchemy.orm import Session

from src.domain.citizen_request import Actor
from src.domain.notification import NotificationRepository
from src.features.notification.schemas import NotificationListOut, NotificationOut
from src.features.notification.use_cases import (
    list_notifications,
    mark_all_notifications_read,
    mark_notification_read,
)
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.notification_repository import (
    SqlAlchemyNotificationRepository,
)
from src.infrastructure.security.deps import get_current_actor

router = APIRouter(prefix="/notifications", tags=["notifications"])


def get_notification_repo(db: Session = Depends(get_db)) -> NotificationRepository:
    return SqlAlchemyNotificationRepository(db)


@router.get("", response_model=NotificationListOut)
def list_notifications_endpoint(
    unread_only: bool = False,
    limit: int = Query(default=30, ge=1, le=100),
    actor: Actor = Depends(get_current_actor),
    repo: NotificationRepository = Depends(get_notification_repo),
) -> NotificationListOut:
    items, unread_count = list_notifications(actor, repo, unread_only=unread_only, limit=limit)

    return NotificationListOut(
        items=[NotificationOut.model_validate(item) for item in items],
        unread_count=unread_count,
    )


# Route fixe avant la route paramétrée.
@router.post("/read-all", status_code=http_status.HTTP_204_NO_CONTENT)
def read_all_endpoint(
    actor: Actor = Depends(get_current_actor),
    repo: NotificationRepository = Depends(get_notification_repo),
) -> None:
    mark_all_notifications_read(actor, repo)


@router.post("/{key}/read", status_code=http_status.HTTP_204_NO_CONTENT)
def mark_read_endpoint(
    key: str = Path(min_length=1, max_length=80),
    actor: Actor = Depends(get_current_actor),
    repo: NotificationRepository = Depends(get_notification_repo),
) -> None:
    mark_notification_read(actor, key, repo)
