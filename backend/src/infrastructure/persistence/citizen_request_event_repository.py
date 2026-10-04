"""Implémentation SQLAlchemy de CitizenRequestEventRepository."""

from sqlalchemy import ColumnElement, func, or_, select
from sqlalchemy.orm import Session

from src.domain.citizen_request import (
    ActivityQuery,
    CitizenRequestEvent,
    CitizenRequestEventRepository,
    RequestActivity,
    RequestActivityLog,
    RequestEventType,
    RequestScope,
    RequestStatus,
)
from src.infrastructure.persistence.citizen_request_repository import as_utc, scope_conditions
from src.infrastructure.persistence.models import CitizenRequestEventModel, CitizenRequestModel


class SqlAlchemyCitizenRequestEventRepository(CitizenRequestEventRepository, RequestActivityLog):
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

        return [_to_entity(m) for m in models]

    def list_activity(
        self, scope: RequestScope, query: ActivityQuery
    ) -> tuple[list[RequestActivity], int]:
        conditions = [*scope_conditions(scope), *_activity_conditions(query)]
        joined = select(CitizenRequestEventModel, CitizenRequestModel).join(
            CitizenRequestModel, CitizenRequestModel.id == CitizenRequestEventModel.request_id
        )
        total = self.db.scalar(
            select(func.count())
            .select_from(CitizenRequestEventModel)
            .join(
                CitizenRequestModel, CitizenRequestModel.id == CitizenRequestEventModel.request_id
            )
            .where(*conditions)
        )
        rows = self.db.execute(
            joined.where(*conditions)
            .order_by(CitizenRequestEventModel.created_at.desc(), CitizenRequestEventModel.id)
            .offset((query.page - 1) * query.page_size)
            .limit(query.page_size)
        )
        items = [
            RequestActivity(
                event=_to_entity(event),
                request_title=request.title,
                request_status=RequestStatus(request.status),
            )
            for event, request in rows
        ]
        return items, total or 0


def _activity_conditions(query: ActivityQuery) -> list[ColumnElement[bool]]:
    conditions: list[ColumnElement[bool]] = []
    if query.types:
        conditions.append(CitizenRequestEventModel.type.in_([t.value for t in query.types]))
    if query.exclude_types:
        conditions.append(
            CitizenRequestEventModel.type.not_in([t.value for t in query.exclude_types])
        )
    if query.since is not None:
        conditions.append(CitizenRequestEventModel.created_at >= query.since)
    if query.until is not None:
        conditions.append(CitizenRequestEventModel.created_at < query.until)
    if query.search:
        pattern = f"%{query.search.strip().lower()}%"
        conditions.append(
            or_(
                func.lower(CitizenRequestModel.title).like(pattern),
                func.lower(CitizenRequestEventModel.actor_name).like(pattern),
            )
        )
    return conditions


def _to_entity(m: CitizenRequestEventModel) -> CitizenRequestEvent:
    return CitizenRequestEvent(
        id=m.id,
        request_id=m.request_id,
        type=RequestEventType(m.type),
        created_at=as_utc(m.created_at),
        actor_id=m.actor_id,
        actor_name=m.actor_name,
        payload=dict(m.payload or {}),
    )
