"""Implémentation SQLAlchemy de CitizenRequestAnalytics : agrégats du dashboard et points de carte."""

from collections import Counter
from datetime import UTC, datetime, timedelta, tzinfo
from enum import StrEnum

from sqlalchemy import ColumnElement, case, func, select
from sqlalchemy.orm import InstrumentedAttribute, Session

from src.domain.citizen_request import (
    CitizenRequestAnalytics,
    DailyCount,
    DashboardStats,
    MapPoint,
    RequestCategory,
    RequestPriority,
    RequestScope,
    RequestStatus,
)
from src.infrastructure.persistence.citizen_request_repository import as_utc, scope_conditions
from src.infrastructure.persistence.models import AgentModel, CitizenRequestModel, UserModel

_CLOSED = (RequestStatus.RESOLVED.value, RequestStatus.REJECTED.value)
_PRIORITY_RANK = case(
    {p.value: i for i, p in enumerate(RequestPriority)}, value=CitizenRequestModel.priority
)


class SqlAlchemyCitizenRequestAnalytics(CitizenRequestAnalytics):
    def __init__(self, db: Session) -> None:
        self.db = db

    # ─── Dashboard ──────────────────────────────────────────────────

    def dashboard_stats(
        self, scope: RequestScope, now: datetime, tz: tzinfo, days: int
    ) -> DashboardStats:
        scoped = scope_conditions(scope)
        by_status = self._count_by(CitizenRequestModel.status, RequestStatus, scoped)
        by_category = self._count_by(CitizenRequestModel.category, RequestCategory, scoped)
        by_priority = self._count_by(CitizenRequestModel.priority, RequestPriority, scoped)

        total = sum(by_status.values())
        resolved = by_status[RequestStatus.RESOLVED]
        rejected = by_status[RequestStatus.REJECTED]

        # « Aujourd'hui » et les jours du graphique suivent le fuseau de la municipalité, pas UTC.
        today_start_local = now.astimezone(tz).replace(hour=0, minute=0, second=0, microsecond=0)
        today_start = today_start_local.astimezone(UTC)
        tomorrow_start = (today_start_local + timedelta(days=1)).astimezone(UTC)

        interventions_today = self._count(
            *scoped,
            CitizenRequestModel.assigned_agent_id.is_not(None),
            CitizenRequestModel.scheduled_at >= today_start,
            CitizenRequestModel.scheduled_at < tomorrow_start,
        )
        resolved_today = self._count(
            *scoped,
            CitizenRequestModel.status == RequestStatus.RESOLVED.value,
            CitizenRequestModel.resolved_at >= today_start,
            CitizenRequestModel.resolved_at < tomorrow_start,
        )

        return DashboardStats(
            total=total,
            open=total - resolved - rejected,
            in_progress=by_status[RequestStatus.IN_PROGRESS],
            resolved=resolved,
            rejected=rejected,
            resolution_rate=round(resolved * 100 / total, 1) if total else 0.0,
            interventions_today=interventions_today,
            resolved_today=resolved_today,
            pending_count=by_status[RequestStatus.NEW],
            by_status=by_status,
            by_category=by_category,
            by_priority=by_priority,
            daily=self._daily(scoped, today_start_local, tz, days),
        )

    def _count(self, *conditions: ColumnElement[bool]) -> int:
        statement = select(func.count()).select_from(CitizenRequestModel).where(*conditions)
        return self.db.scalar(statement) or 0

    def _count_by[E: StrEnum](
        self,
        column: InstrumentedAttribute[str],
        enum: type[E],
        scoped: list[ColumnElement[bool]],
    ) -> dict[E, int]:
        counts = {member: 0 for member in enum}  # zéros inclus : graphiques stables
        rows = self.db.execute(select(column, func.count()).where(*scoped).group_by(column))
        for value, count in rows:
            if value in enum._value2member_map_:
                counts[enum(value)] = count

        return counts

    def _daily(
        self,
        scoped: list[ColumnElement[bool]],
        today_start_local: datetime,
        tz: tzinfo,
        days: int,
    ) -> list[DailyCount]:
        first_day_local = today_start_local - timedelta(days=days - 1)
        window_start = first_day_local.astimezone(UTC)

        created = Counter(
            as_utc(value).astimezone(tz).date()
            for value in self.db.scalars(
                select(CitizenRequestModel.created_at).where(
                    *scoped, CitizenRequestModel.created_at >= window_start
                )
            )
        )
        resolved = Counter(
            as_utc(value).astimezone(tz).date()
            for value in self.db.scalars(
                select(CitizenRequestModel.resolved_at).where(
                    *scoped,
                    CitizenRequestModel.status == RequestStatus.RESOLVED.value,
                    CitizenRequestModel.resolved_at >= window_start,
                )
            )
        )

        result = []
        for offset in range(days):
            day = (first_day_local + timedelta(days=offset)).date()
            result.append(DailyCount(day=day, created=created[day], resolved=resolved[day]))

        return result

    # ─── Carte ──────────────────────────────────────────────────────

    def map_points(
        self,
        scope: RequestScope,
        *,
        status: RequestStatus | None,
        category: RequestCategory | None,
        active_only: bool,
        limit: int,
    ) -> list[MapPoint]:
        conditions = [
            *scope_conditions(scope),
            CitizenRequestModel.latitude.is_not(None),
            CitizenRequestModel.longitude.is_not(None),
        ]
        if status:
            conditions.append(CitizenRequestModel.status == status.value)
        elif active_only:
            conditions.append(CitizenRequestModel.status.not_in(_CLOSED))
        if category:
            conditions.append(CitizenRequestModel.category == category.value)

        statement = (
            select(CitizenRequestModel, UserModel.name.label("agent_name"))
            .join(AgentModel, CitizenRequestModel.assigned_agent_id == AgentModel.id, isouter=True)
            .join(UserModel, UserModel.id == AgentModel.user_id, isouter=True)
            .where(*conditions)
            # Si la limite tronque le résultat, on garde les plus urgentes puis les plus récentes.
            .order_by(
                _PRIORITY_RANK.desc(), CitizenRequestModel.created_at.desc(), CitizenRequestModel.id
            )
            .limit(limit)
        )

        return [
            MapPoint(
                id=row.id,
                title=row.title,
                category=RequestCategory(row.category),
                priority=RequestPriority(row.priority),
                status=RequestStatus(row.status),
                latitude=row.latitude,
                longitude=row.longitude,
                created_at=as_utc(row.created_at),
                location=row.location,
                assigned_agent_id=row.assigned_agent_id,
                agent_name=agent_name,
            )
            for row, agent_name in self.db.execute(statement)
        ]
