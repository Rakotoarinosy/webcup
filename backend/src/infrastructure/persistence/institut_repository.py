"""Implémentation SQLAlchemy de InstitutRepository. Le mapping Model ↔ Entity reste privé à ce fichier."""

from datetime import UTC

from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session

from src.domain.citizen_request import RequestCategory
from src.domain.institut import (
    Institut,
    InstitutDashboard,
    InstitutRepository,
    InstitutService,
    RequestMetrics,
)
from src.infrastructure.persistence.models import (
    AgentModel,
    CitizenRequestModel,
    InstitutModel,
    MunicipalServiceAgentModel,
    MunicipalServiceModel,
    UserModel,
)


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

    def get_dashboard(self, institut_id: str) -> InstitutDashboard | None:
        institut = self.get_by_id(institut_id)
        if institut is None:
            return None
        manager_name = self.db.scalar(select(UserModel.name).where(UserModel.id == institut.manager_id)) if institut.manager_id else None
        agent_count = self.db.scalar(
            select(func.count()).select_from(AgentModel).where(
                AgentModel.institut_id == institut_id, AgentModel.is_active.is_(True)
            )
        ) or 0
        rows = self.db.scalars(
            select(MunicipalServiceModel)
            .where(MunicipalServiceModel.institut_id == institut_id)
            .order_by(MunicipalServiceModel.display_order, MunicipalServiceModel.name)
        ).all()
        return InstitutDashboard(
            institut=institut,
            manager_name=manager_name,
            associated_agents=agent_count,
            metrics=self._metrics(institut_id),
            services=tuple(self._service(row) for row in rows),
        )

    def get_service(self, institut_id: str, service_id: str) -> InstitutService | None:
        row = self.db.scalar(
            select(MunicipalServiceModel).where(
                MunicipalServiceModel.id == service_id,
                MunicipalServiceModel.institut_id == institut_id,
            )
        )
        return self._service(row) if row else None

    def add_service(self, service: InstitutService, agent_ids: frozenset[str]) -> InstitutService:
        row = MunicipalServiceModel(
            id=service.id,
            institut_id=service.institut_id,
            name=service.name,
            category=service.category,
            description=service.description,
            contact_details=service.contact_details,
            opening_hours=service.opening_hours,
            icon=service.icon,
            display_order=0,
            is_featured=False,
            usage_count=0,
            is_active=True,
            responsible_agent_id=service.responsible_agent_id,
            request_category=service.request_category.value if service.request_category else None,
        )
        self.db.add(row)
        self.db.flush()
        self.db.add_all([MunicipalServiceAgentModel(service_id=row.id, agent_id=agent_id) for agent_id in agent_ids])
        self.db.commit()
        return self.get_service(service.institut_id, service.id) or service

    def set_service_responsible(self, institut_id: str, service_id: str, agent_id: str | None) -> InstitutService | None:
        row = self.db.scalar(select(MunicipalServiceModel).where(MunicipalServiceModel.id == service_id, MunicipalServiceModel.institut_id == institut_id))
        if row is None:
            return None
        row.responsible_agent_id = agent_id
        if agent_id and self.db.get(MunicipalServiceAgentModel, (row.id, agent_id)) is None:
            self.db.add(MunicipalServiceAgentModel(service_id=row.id, agent_id=agent_id))
        self.db.commit()
        return self._service(row)

    def set_service_agents(self, institut_id: str, service_id: str, agent_ids: frozenset[str]) -> InstitutService | None:
        row = self.db.scalar(select(MunicipalServiceModel).where(MunicipalServiceModel.id == service_id, MunicipalServiceModel.institut_id == institut_id))
        if row is None:
            return None
        self.db.execute(delete(MunicipalServiceAgentModel).where(MunicipalServiceAgentModel.service_id == service_id))
        self.db.add_all([MunicipalServiceAgentModel(service_id=service_id, agent_id=agent_id) for agent_id in agent_ids])
        if row.responsible_agent_id and row.responsible_agent_id not in agent_ids:
            row.responsible_agent_id = None
        self.db.commit()
        return self._service(row)

    def _metrics(self, institut_id: str, category: RequestCategory | None = None) -> RequestMetrics:
        filters = [CitizenRequestModel.institut_id == institut_id]
        if category is not None:
            filters.append(CitizenRequestModel.category == category.value)
        received = self.db.scalar(select(func.count()).select_from(CitizenRequestModel).where(*filters)) or 0
        in_progress = self.db.scalar(select(func.count()).select_from(CitizenRequestModel).where(*filters, CitizenRequestModel.status.in_(("Nouveau", "En cours", "En attente")))) or 0
        resolved = self.db.scalar(select(func.count()).select_from(CitizenRequestModel).where(*filters, CitizenRequestModel.status == "Résolu")) or 0
        return RequestMetrics(received=received, in_progress=in_progress, resolved=resolved)

    def _service(self, row: MunicipalServiceModel) -> InstitutService:
        category = RequestCategory(row.request_category) if row.request_category else None
        responsible_name = self.db.scalar(
            select(UserModel.name).join(AgentModel, AgentModel.user_id == UserModel.id).where(AgentModel.id == row.responsible_agent_id)
        ) if row.responsible_agent_id else None
        agent_count = self.db.scalar(select(func.count()).select_from(MunicipalServiceAgentModel).where(MunicipalServiceAgentModel.service_id == row.id)) or 0
        return InstitutService(
            id=row.id, institut_id=row.institut_id, name=row.name, category=row.category,
            description=row.description, contact_details=row.contact_details, opening_hours=row.opening_hours,
            icon=row.icon, request_category=category, responsible_agent_id=row.responsible_agent_id,
            responsible_agent_name=responsible_name, associated_agents=agent_count,
            metrics=self._metrics(row.institut_id, category) if category else RequestMetrics(),
        )


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
