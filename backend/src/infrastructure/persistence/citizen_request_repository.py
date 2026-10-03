"""Implémentation SQLAlchemy du repository de demandes citoyennes."""

from datetime import UTC, datetime

from sqlalchemy import ColumnElement, false, func, or_, select
from sqlalchemy.orm import Session

from src.domain.citizen_request import (
    CitizenRequest,
    CitizenRequestRepository,
    RequestCategory,
    RequestPriority,
    RequestScope,
    RequestSortBy,
    RequestStatus,
    SortOrder,
)
from src.infrastructure.persistence.models import CitizenRequestModel


def scope_conditions(scope: RequestScope) -> list[ColumnElement[bool]]:
    """Traduction SQL du périmètre de l'Actor, partagée par toutes les lectures de demandes."""
    if scope.is_empty:
        return [false()]

    conditions: list[ColumnElement[bool]] = []
    if scope.citizen_id is not None:
        conditions.append(CitizenRequestModel.citizen_id == scope.citizen_id)
    if scope.agent_id is not None:
        conditions.append(CitizenRequestModel.assigned_agent_id == scope.agent_id)
    if scope.institut_id is not None:
        conditions.append(CitizenRequestModel.institut_id == scope.institut_id)

    return conditions


def as_utc(value: datetime) -> datetime:
    # SQLite ne conserve pas le fuseau : on garantit un datetime UTC « aware » partout.
    return value.replace(tzinfo=UTC) if value.tzinfo is None else value.astimezone(UTC)


class SqlAlchemyCitizenRequestRepository(CitizenRequestRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, request_id: str) -> CitizenRequest | None:
        model = self.db.get(CitizenRequestModel, request_id)

        return to_entity(model) if model else None

    def list_page(
        self,
        *,
        page: int,
        page_size: int,
        search: str | None,
        category: RequestCategory | None,
        priority: RequestPriority | None,
        status: RequestStatus | None,
        scope: RequestScope,
        sort_by: RequestSortBy,
        sort_order: SortOrder,
    ) -> tuple[list[CitizenRequest], int]:
        filters = scope_conditions(scope)
        if search is not None:
            search_pattern = f"%{search.strip()}%"
            filters.append(
                or_(
                    CitizenRequestModel.title.ilike(search_pattern),
                    CitizenRequestModel.description.ilike(search_pattern),
                    CitizenRequestModel.location.ilike(search_pattern),
                )
            )
        if category is not None:
            filters.append(CitizenRequestModel.category == category.value)
        if priority is not None:
            filters.append(CitizenRequestModel.priority == priority.value)
        if status is not None:
            filters.append(CitizenRequestModel.status == status.value)

        total = self.db.scalar(
            select(func.count()).select_from(CitizenRequestModel).where(*filters)
        )
        sort_column = getattr(CitizenRequestModel, sort_by.value)
        order_expression = sort_column.asc() if sort_order is SortOrder.ASC else sort_column.desc()
        models = self.db.scalars(
            select(CitizenRequestModel)
            .where(*filters)
            .order_by(order_expression, CitizenRequestModel.id.asc())
            .offset((page - 1) * page_size)
            .limit(page_size)
        ).all()

        return [to_entity(model) for model in models], total or 0

    def list_by_agent(self, agent_id: str) -> list[CitizenRequest]:
        models = self.db.scalars(
            select(CitizenRequestModel)
            .where(CitizenRequestModel.assigned_agent_id == agent_id)
            .order_by(CitizenRequestModel.created_at.desc(), CitizenRequestModel.id.asc())
        )

        return [to_entity(model) for model in models]

    def add(self, request: CitizenRequest) -> CitizenRequest:
        model = _to_model(request)
        self.db.add(model)
        self.db.commit()

        return to_entity(model)

    def update(self, request: CitizenRequest) -> CitizenRequest:
        model = self.db.merge(_to_model(request))
        self.db.commit()

        return to_entity(model)

    def delete(self, request_id: str) -> None:
        model = self.db.get(CitizenRequestModel, request_id)
        if model is not None:
            self.db.delete(model)
            self.db.commit()


def to_entity(model: CitizenRequestModel) -> CitizenRequest:
    return CitizenRequest(
        id=model.id,
        title=model.title,
        description=model.description,
        category=RequestCategory(model.category),
        priority=RequestPriority(model.priority),
        status=RequestStatus(model.status),
        citizen_id=model.citizen_id,
        created_at=as_utc(model.created_at),
        updated_at=as_utc(model.updated_at),
        location=model.location,
        latitude=model.latitude,
        longitude=model.longitude,
        assigned_agent_id=model.assigned_agent_id,
        resolved_at=as_utc(model.resolved_at) if model.resolved_at else None,
        scheduled_at=as_utc(model.scheduled_at) if model.scheduled_at else None,
        urgency=model.urgency,
        affected_citizens=model.affected_citizens,
        priority_score=model.priority_score,
        institut_id=model.institut_id,
    )


def _to_model(request: CitizenRequest) -> CitizenRequestModel:
    return CitizenRequestModel(
        id=request.id,
        title=request.title,
        description=request.description,
        category=request.category.value,
        priority=request.priority.value,
        status=request.status.value,
        citizen_id=request.citizen_id,
        created_at=request.created_at,
        updated_at=request.updated_at,
        location=request.location,
        latitude=request.latitude,
        longitude=request.longitude,
        assigned_agent_id=request.assigned_agent_id,
        resolved_at=request.resolved_at,
        scheduled_at=request.scheduled_at,
        urgency=request.urgency,
        affected_citizens=request.affected_citizens,
        priority_score=request.priority_score,
        institut_id=request.institut_id,
    )
