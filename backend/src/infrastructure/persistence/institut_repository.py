"""Implémentation SQLAlchemy de InstitutRepository. Le mapping Model ↔ Entity reste privé à ce fichier."""

from datetime import UTC

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from src.domain.citizen_request import RequestCategory
from src.domain.institut import Institut, InstitutRepository
from src.infrastructure.persistence.models import InstitutModel


class SqlAlchemyInstitutRepository(InstitutRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, institut_id: str) -> Institut | None:
        model = self.db.get(InstitutModel, institut_id)

        return _to_entity(model) if model else None

    def get_by_name(self, name: str) -> Institut | None:
        model = self.db.scalar(
            select(InstitutModel).where(func.lower(InstitutModel.name) == name.strip().lower())
        )

        return _to_entity(model) if model else None

    def get_by_manager(self, manager_id: str) -> Institut | None:
        model = self.db.scalar(select(InstitutModel).where(InstitutModel.manager_id == manager_id))

        return _to_entity(model) if model else None

    def find_for_category(self, category: RequestCategory) -> Institut | None:
        # Peu d'instituts : filtrer en Python évite une requête JSON propre à chaque SGBD.
        return next((i for i in self.list(active_only=True) if i.handles(category)), None)

    def list(self, *, active_only: bool = False) -> "list[Institut]":
        statement = select(InstitutModel).order_by(InstitutModel.name)
        if active_only:
            statement = statement.where(InstitutModel.is_active.is_(True))

        return [_to_entity(model) for model in self.db.scalars(statement)]

    def add(self, institut: Institut) -> Institut:
        model = _to_model(institut)
        self.db.add(model)
        self.db.commit()

        return _to_entity(model)

    def update(self, institut: Institut) -> Institut:
        model = self.db.merge(_to_model(institut))
        self.db.commit()

        return _to_entity(model)


def _to_entity(model: InstitutModel) -> Institut:
    return Institut(
        id=model.id,
        name=model.name,
        description=model.description or "",
        categories=frozenset(RequestCategory(value) for value in model.categories or []),
        manager_id=model.manager_id,
        is_active=model.is_active,
        created_at=model.created_at.replace(tzinfo=model.created_at.tzinfo or UTC),
    )


def _to_model(institut: Institut) -> InstitutModel:
    return InstitutModel(
        id=institut.id,
        name=institut.name,
        description=institut.description,
        # Ordre stable : diff lisible en base et réponses API identiques d'un appel à l'autre.
        categories=sorted(category.value for category in institut.categories),
        manager_id=institut.manager_id,
        is_active=institut.is_active,
        created_at=institut.created_at,
    )
