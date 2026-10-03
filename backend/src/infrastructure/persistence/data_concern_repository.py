"""Implémentation SQLAlchemy de DataConcernRepository. Le mapping Model ↔ Entity reste privé ici."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from src.domain.data_concern import ConcernStatus, ConcernTopic, DataConcern, DataConcernRepository
from src.infrastructure.persistence.citizen_request_repository import as_utc
from src.infrastructure.persistence.models import DataConcernModel


class SqlAlchemyDataConcernRepository(DataConcernRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, concern_id: str) -> DataConcern | None:
        model = self.db.get(DataConcernModel, concern_id)
        return _to_entity(model) if model else None

    def list_for_user(self, user_id: str) -> "list[DataConcern]":
        statement = (
            select(DataConcernModel)
            .where(DataConcernModel.user_id == user_id)
            .order_by(DataConcernModel.created_at.desc())
        )
        return [_to_entity(model) for model in self.db.scalars(statement)]

    def list(self, status: ConcernStatus | None = None) -> "list[DataConcern]":
        statement = select(DataConcernModel).order_by(DataConcernModel.created_at)
        if status is not None:
            statement = statement.where(DataConcernModel.status == status.value)
        return [_to_entity(model) for model in self.db.scalars(statement)]

    def add(self, concern: DataConcern) -> DataConcern:
        model = _to_model(concern)
        self.db.add(model)
        self.db.commit()
        return _to_entity(model)

    def update(self, concern: DataConcern) -> DataConcern:
        model = self.db.merge(_to_model(concern))
        self.db.commit()
        return _to_entity(model)


def _to_entity(model: DataConcernModel) -> DataConcern:
    return DataConcern(
        id=model.id,
        reference=model.reference,
        user_id=model.user_id,
        topic=ConcernTopic(model.topic),
        message=model.message,
        status=ConcernStatus(model.status),
        created_at=as_utc(model.created_at),
        updated_at=as_utc(model.updated_at),
        reviewed_at=as_utc(model.reviewed_at) if model.reviewed_at else None,
        response=model.response,
        answered_at=as_utc(model.answered_at) if model.answered_at else None,
        answered_by=model.answered_by,
    )


def _to_model(concern: DataConcern) -> DataConcernModel:
    return DataConcernModel(
        id=concern.id,
        reference=concern.reference,
        user_id=concern.user_id,
        topic=concern.topic.value,
        message=concern.message,
        status=concern.status.value,
        created_at=concern.created_at,
        updated_at=concern.updated_at,
        reviewed_at=concern.reviewed_at,
        response=concern.response,
        answered_at=concern.answered_at,
        answered_by=concern.answered_by,
    )
