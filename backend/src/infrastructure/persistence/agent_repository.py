"""Implémentation SQLAlchemy de AgentRepository. Le mapping Model ↔ Entity reste privé à ce fichier.

Nom et email viennent du compte (users), le nom de l'institut de instituts : jointures à la lecture.
"""

from datetime import UTC

from sqlalchemy import Select, func, or_, select
from sqlalchemy.orm import Session

from src.domain.agent import Agent, AgentQuery, AgentRepository, AgentStatus
from src.infrastructure.persistence.models import (
    AgentModel,
    CitizenRequestModel,
    InstitutModel,
    UserModel,
)


class SqlAlchemyAgentRepository(AgentRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, agent_id: str) -> Agent | None:
        agents = self._fetch(_base().where(AgentModel.id == agent_id))

        return agents[0] if agents else None

    def search(self, query: AgentQuery) -> list[Agent]:
        statement = _base().order_by(UserModel.name, AgentModel.id)

        if query.search:
            pattern = f"%{_escape_like(query.search.strip())}%"
            statement = statement.where(
                or_(
                    UserModel.name.ilike(pattern, escape="\\"),
                    UserModel.email.ilike(pattern, escape="\\"),
                )
            )
        if query.status:
            statement = statement.where(AgentModel.status == query.status.value)
        if query.is_active is not None:
            statement = statement.where(AgentModel.is_active == query.is_active)
        if query.institut_id is not None:
            statement = statement.where(AgentModel.institut_id == query.institut_id)
        if query.user_id is not None:
            statement = statement.where(AgentModel.user_id == query.user_id)

        return self._fetch(statement)

    def add(self, agent: Agent) -> Agent:
        self.db.add(_to_model(agent))
        self.db.commit()

        return self.get_by_id(agent.id) or agent

    def update(self, agent: Agent) -> Agent:
        self.db.merge(_to_model(agent))
        self.db.commit()

        return self.get_by_id(agent.id) or agent

    # ─── Lecture ────────────────────────────────────────────────────

    def _fetch(self, statement: Select) -> list[Agent]:
        rows = self.db.execute(statement).all()
        counts = self._count_interventions([row.AgentModel.id for row in rows])

        return [
            _to_entity(row.AgentModel, row.name, row.email, row.institut_name, counts)
            for row in rows
        ]

    def _count_interventions(self, agent_ids: list[str]) -> dict[str, int]:
        if not agent_ids:
            return {}
        rows = self.db.execute(
            select(CitizenRequestModel.assigned_agent_id, func.count())
            .where(CitizenRequestModel.assigned_agent_id.in_(agent_ids))
            .group_by(CitizenRequestModel.assigned_agent_id)
        )

        return {agent_id: count for agent_id, count in rows}


def _base() -> Select:
    return (
        select(
            AgentModel,
            UserModel.name.label("name"),
            UserModel.email.label("email"),
            InstitutModel.name.label("institut_name"),
        )
        .join(UserModel, UserModel.id == AgentModel.user_id)
        .join(InstitutModel, InstitutModel.id == AgentModel.institut_id)
    )


def _to_entity(
    model: AgentModel, name: str, email: str, institut_name: str, counts: dict[str, int]
) -> Agent:
    return Agent(
        id=model.id,
        user_id=model.user_id,
        institut_id=model.institut_id,
        # SQLite ne conserve pas le fuseau : on garantit un datetime UTC « aware » partout.
        created_at=model.created_at.replace(tzinfo=model.created_at.tzinfo or UTC),
        status=AgentStatus(model.status),
        is_active=model.is_active,
        name=name,
        email=email,
        institut_name=institut_name,
        interventions=counts.get(model.id, 0),
    )


def _to_model(agent: Agent) -> AgentModel:
    return AgentModel(
        id=agent.id,
        user_id=agent.user_id,
        institut_id=agent.institut_id,
        status=agent.status.value,
        is_active=agent.is_active,
        created_at=agent.created_at,
    )


def _escape_like(text: str) -> str:
    return text.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")
