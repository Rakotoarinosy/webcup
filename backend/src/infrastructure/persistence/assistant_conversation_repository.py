from datetime import UTC

from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from src.domain.virtual_assistant import (
    AssistantMessage,
    AssistantReply,
    AssistantReplyFormat,
    AssistantTurnRole,
)
from src.infrastructure.persistence.models import AssistantMessageModel


class SqlAlchemyAssistantConversationRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_messages(self, user_id: str, limit: int = 100) -> list[AssistantMessage]:
        rows = self.db.scalars(select(AssistantMessageModel).where(AssistantMessageModel.user_id == user_id).order_by(AssistantMessageModel.created_at.desc()).limit(limit)).all()
        return [self._entity(row) for row in reversed(rows)]

    def add(self, message: AssistantMessage) -> AssistantMessage:
        row = AssistantMessageModel(id=message.id, user_id=message.user_id, role=message.role.value, content=message.content, reply=_payload(message.reply), created_at=message.created_at)
        self.db.add(row)
        self.db.commit()
        return self._entity(row)

    def clear(self, user_id: str) -> None:
        self.db.execute(delete(AssistantMessageModel).where(AssistantMessageModel.user_id == user_id))
        self.db.commit()

    def _entity(self, row: AssistantMessageModel) -> AssistantMessage:
        payload = row.reply
        reply = None if payload is None else AssistantReply(
            format=AssistantReplyFormat(str(payload["format"])), title=str(payload["title"]), message=str(payload["message"]),
            steps=tuple(map(str, payload.get("steps", []))), notes=tuple(map(str, payload.get("notes", []))),
            follow_up=str(payload.get("follow_up", "")), service_ids=tuple(map(str, payload.get("service_ids", []))),
            navigation_key=str(payload["navigation_key"]) if payload.get("navigation_key") else None,
        )
        return AssistantMessage(id=row.id, user_id=row.user_id, role=AssistantTurnRole(row.role), content=row.content, created_at=row.created_at.replace(tzinfo=row.created_at.tzinfo or UTC), reply=reply)


def _payload(reply: AssistantReply | None) -> dict[str, object] | None:
    if reply is None:
        return None
    return {"format": reply.format.value, "title": reply.title, "message": reply.message, "steps": list(reply.steps), "notes": list(reply.notes), "follow_up": reply.follow_up, "service_ids": list(reply.service_ids), "navigation_key": reply.navigation_key}
