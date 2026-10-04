"""Implémentation SQLAlchemy de AlertRepository. Le mapping Model ↔ Entity reste privé ici."""

from datetime import datetime

from sqlalchemy import ColumnElement, and_, or_, select
from sqlalchemy.orm import Session

from src.domain.alert import Alert, AlertAudience, AlertLevel, AlertRepository
from src.infrastructure.persistence.citizen_request_repository import as_utc
from src.infrastructure.persistence.models import AlertModel


def _not_finished_before(moment: datetime) -> ColumnElement[bool]:
    """Alerte encore affichée après `moment` (ni terminée, ni arrivée à échéance)."""
    return and_(
        or_(AlertModel.ended_at.is_(None), AlertModel.ended_at > moment),
        or_(AlertModel.ends_at.is_(None), AlertModel.ends_at > moment),
    )


class SqlAlchemyAlertRepository(AlertRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, alert_id: str) -> Alert | None:
        model = self.db.get(AlertModel, alert_id)
        return _to_entity(model) if model else None

    def list_current(self, now: datetime) -> "list[Alert]":
        statement = (
            select(AlertModel)
            .where(AlertModel.starts_at <= now, _not_finished_before(now))
            .order_by(AlertModel.starts_at.desc())
        )
        return [_to_entity(model) for model in self.db.scalars(statement)]

    def list_since(self, since: datetime, now: datetime) -> "list[Alert]":
        statement = (
            select(AlertModel)
            .where(AlertModel.starts_at <= now, _not_finished_before(since))
            .order_by(AlertModel.starts_at.desc())
        )
        return [_to_entity(model) for model in self.db.scalars(statement)]

    def list_all(self, limit: int = 200) -> "list[Alert]":
        statement = select(AlertModel).order_by(AlertModel.starts_at.desc()).limit(limit)
        return [_to_entity(model) for model in self.db.scalars(statement)]

    def add(self, alert: Alert) -> Alert:
        model = _to_model(alert)
        self.db.add(model)
        self.db.commit()
        return _to_entity(model)

    def update(self, alert: Alert) -> Alert:
        model = self.db.merge(_to_model(alert))
        self.db.commit()
        return _to_entity(model)

    def delete(self, alert_id: str) -> None:
        model = self.db.get(AlertModel, alert_id)
        if model is not None:
            self.db.delete(model)
            self.db.commit()


def _to_entity(model: AlertModel) -> Alert:
    return Alert(
        id=model.id,
        title=model.title,
        message=model.message,
        instructions=model.instructions or "",
        level=AlertLevel(model.level),
        audience=AlertAudience(model.audience),
        zone=model.zone,
        issuer=model.issuer,
        author_id=model.author_id,
        author_name=model.author_name,
        starts_at=as_utc(model.starts_at),
        ends_at=as_utc(model.ends_at) if model.ends_at else None,
        ended_at=as_utc(model.ended_at) if model.ended_at else None,
        created_at=as_utc(model.created_at),
        updated_at=as_utc(model.updated_at),
    )


def _to_model(alert: Alert) -> AlertModel:
    return AlertModel(
        id=alert.id,
        title=alert.title,
        message=alert.message,
        instructions=alert.instructions,
        level=alert.level.value,
        audience=alert.audience.value,
        zone=alert.zone,
        issuer=alert.issuer,
        author_id=alert.author_id,
        author_name=alert.author_name,
        starts_at=alert.starts_at,
        ends_at=alert.ends_at,
        ended_at=alert.ended_at,
        created_at=alert.created_at,
        updated_at=alert.updated_at,
    )
