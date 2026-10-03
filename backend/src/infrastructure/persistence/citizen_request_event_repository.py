"""Implémentation SQLAlchemy de CitizenRequestEventRepository."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from src.domain.citizen_request import (
    CitizenRequestEvent,
    CitizenRequestEventRepository,
    RequestEventType,
)
from src.infrastructure.persistence.citizen_request_repository import as_utc
from src.infrastructure.persistence.models import CitizenRequestEventModel


class SqlAlchemyCitizenRequestEventRepository(CitizenRequestEventRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def add(self, event: CitizenRequestEvent) -> CitizenRequestEvent:
        self.db.add(
            CitizenRequestEventModel(
                id=event.id,
                request_id=event.request_id,
                type=event.type.value,
                actor_id=event.actor_id,
                actor_name=event.actor_name,
                payload=event.payload,
                created_at=event.created_at,
            )
        )
        self.db.commit()

        return event

    def list_for_request(self, request_id: str) -> list[CitizenRequestEvent]:
        models = self.db.scalars(
            select(CitizenRequestEventModel)
            .where(CitizenRequestEventModel.request_id == request_id)
            .order_by(CitizenRequestEventModel.created_at, CitizenRequestEventModel.id)
        )

        return [
            CitizenRequestEvent(
                id=m.id,
                request_id=m.request_id,
                type=RequestEventType(m.type),
                created_at=as_utc(m.created_at),
                actor_id=m.actor_id,
                actor_name=m.actor_name,
                payload=dict(m.payload or {}),
            )
            for m in models
        ]
