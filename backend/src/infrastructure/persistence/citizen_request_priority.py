"""Priorisation automatique : recalcul des scores et file triée par score décroissant."""

from datetime import UTC, datetime

from sqlalchemy import case, func, select, update
from sqlalchemy.orm import Session

from src.domain.citizen_request import (
    OPEN_STATUSES,
    RequestCategory,
    RequestEventType,
    RequestPriority,
    RequestScope,
    RequestStatus,
)
from src.domain.citizen_request.priority import (
    PriorityItem,
    PriorityRepository,
    compute_score,
    is_late,
    priority_for,
)
from src.infrastructure.persistence.citizen_request_repository import as_utc, scope_conditions
from src.infrastructure.persistence.models import CitizenRequestEventModel, CitizenRequestModel

_OPEN_VALUES = [status.value for status in OPEN_STATUSES]


class SqlAlchemyPriorityRepository(PriorityRepository):
    def __init__(self, db: Session) -> None:
        self._db = db

    def refresh_scores(self, *, request_id: str | None = None, now: datetime | None = None) -> int:
        now = now or datetime.now(UTC)
        stmt = select(CitizenRequestModel).where(CitizenRequestModel.status.in_(_OPEN_VALUES))
        if request_id is not None:
            stmt = stmt.where(CitizenRequestModel.id == request_id)

        level_changes = 0
        for row in self._db.scalars(stmt).all():
            total = compute_score(
                urgency=row.urgency,
                affected_citizens=row.affected_citizens,
                created_at=row.created_at,
                category=RequestCategory(row.category),
                now=now,
                supporters=row.support_count or 0,
            ).total
            level = priority_for(total).value
            if total == row.priority_score and level == row.priority:
                continue

            if level != row.priority:
                level_changes += 1
                self._db.add(
                    CitizenRequestEventModel(
                        request_id=row.id,
                        type=RequestEventType.PRIORITY_CHANGED.value,
                        actor_id=None,
                        actor_name="Système",
                        payload={"from": row.priority, "to": level, "score": total, "auto": True},
                    )
                )
            # updated_at=lui-même : un recalcul automatique ne compte pas comme une modification.
            self._db.execute(
                update(CitizenRequestModel)
                .where(CitizenRequestModel.id == row.id)
                .values(
                    priority=level, priority_score=total, updated_at=CitizenRequestModel.updated_at
                )
                .execution_options(synchronize_session=False)
            )

        self._db.commit()

        return level_changes

    def get_item(self, request_id: str) -> PriorityItem | None:
        self._db.expire_all()
        row = self._db.get(CitizenRequestModel, request_id)

        return _to_item(row, datetime.now(UTC)) if row else None

    def ranked(
        self,
        *,
        scope: RequestScope,
        status: RequestStatus | None,
        include_closed: bool,
        page: int,
        page_size: int,
    ) -> tuple[list[PriorityItem], int]:
        conditions = scope_conditions(scope)
        if status is not None:
            conditions.append(CitizenRequestModel.status == status.value)
        elif not include_closed:
            conditions.append(CitizenRequestModel.status.in_(_OPEN_VALUES))

        total = self._db.scalar(
            select(func.count()).select_from(CitizenRequestModel).where(*conditions)
        )
        open_first = case((CitizenRequestModel.status.in_(_OPEN_VALUES), 0), else_=1)
        rows = self._db.scalars(
            select(CitizenRequestModel)
            .where(*conditions)
            .order_by(
                open_first,
                CitizenRequestModel.priority_score.desc(),
                CitizenRequestModel.created_at.asc(),
            )
            .limit(page_size)
            .offset((page - 1) * page_size)
        ).all()
        now = datetime.now(UTC)

        return [_to_item(row, now) for row in rows], total or 0


def _to_item(row: CitizenRequestModel, now: datetime) -> PriorityItem:
    status = RequestStatus(row.status)
    return PriorityItem(
        id=row.id,
        title=row.title,
        category=RequestCategory(row.category),
        status=status,
        priority=RequestPriority(row.priority),
        priority_score=row.priority_score,
        urgency=row.urgency,
        affected_citizens=row.affected_citizens,
        created_at=as_utc(row.created_at),
        assigned_agent_id=row.assigned_agent_id,
        location=row.location,
        support_count=row.support_count or 0,
        is_late=is_late(
            status,
            created_at=row.created_at,
            scheduled_at=row.scheduled_at,
            updated_at=row.updated_at,
            now=now,
        ),
    )
