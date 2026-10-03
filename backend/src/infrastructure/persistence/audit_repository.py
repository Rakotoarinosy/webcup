"""Implémentation SQLAlchemy du journal d'audit."""

from sqlalchemy import ColumnElement, func, or_, select
from sqlalchemy.orm import Session

from src.domain.audit import AuditAction, AuditEntry, AuditLog, AuditQuery, AuditTarget
from src.infrastructure.persistence.citizen_request_repository import as_utc
from src.infrastructure.persistence.models import AuditEntryModel


class SqlAlchemyAuditLog(AuditLog):
    def __init__(self, db: Session) -> None:
        self.db = db

    def record(self, entry: AuditEntry) -> AuditEntry:
        self.db.add(
            AuditEntryModel(
                id=entry.id,
                action=entry.action.value,
                occurred_at=entry.occurred_at,
                target_type=entry.target_type.value,
                target_id=entry.target_id,
                target_label=entry.target_label,
                actor_id=entry.actor_id,
                actor_name=entry.actor_name,
                actor_role=entry.actor_role,
                institut_id=entry.institut_id,
                details=entry.details,
            )
        )
        self.db.commit()
        return entry

    def search(self, query: AuditQuery) -> tuple[list[AuditEntry], int]:
        conditions = _conditions(query)
        total = self.db.scalar(select(func.count()).select_from(AuditEntryModel).where(*conditions))
        models = self.db.scalars(
            select(AuditEntryModel)
            .where(*conditions)
            .order_by(AuditEntryModel.occurred_at.desc(), AuditEntryModel.id)
            .offset((query.page - 1) * query.page_size)
            .limit(query.page_size)
        )
        return [_to_entity(model) for model in models], total or 0


def _conditions(query: AuditQuery) -> list[ColumnElement[bool]]:
    conditions: list[ColumnElement[bool]] = []
    if query.actions:
        conditions.append(AuditEntryModel.action.in_([a.value for a in query.actions]))
    if query.target_type is not None:
        conditions.append(AuditEntryModel.target_type == query.target_type.value)
    if query.target_id is not None:
        conditions.append(AuditEntryModel.target_id == query.target_id)
    if query.institut_id is not None:
        conditions.append(AuditEntryModel.institut_id == query.institut_id)
    if query.since is not None:
        conditions.append(AuditEntryModel.occurred_at >= query.since)
    if query.until is not None:
        conditions.append(AuditEntryModel.occurred_at < query.until)
    if query.search:
        pattern = f"%{query.search.strip().lower()}%"
        conditions.append(
            or_(
                func.lower(AuditEntryModel.actor_name).like(pattern),
                func.lower(AuditEntryModel.target_label).like(pattern),
            )
        )
    return conditions


def _to_entity(model: AuditEntryModel) -> AuditEntry:
    return AuditEntry(
        id=model.id,
        action=AuditAction(model.action),
        occurred_at=as_utc(model.occurred_at),
        target_type=AuditTarget(model.target_type),
        target_id=model.target_id,
        target_label=model.target_label,
        actor_id=model.actor_id,
        actor_name=model.actor_name,
        actor_role=model.actor_role,
        institut_id=model.institut_id,
        details=dict(model.details or {}),
    )
