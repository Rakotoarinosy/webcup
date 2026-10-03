from datetime import datetime

from pydantic import BaseModel, ConfigDict

from src.domain.notification import NotificationKind


class NotificationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    key: str
    kind: NotificationKind
    title: str
    message: str
    request_id: str
    created_at: datetime
    is_read: bool


class NotificationListOut(BaseModel):
    items: list[NotificationOut]
    unread_count: int
