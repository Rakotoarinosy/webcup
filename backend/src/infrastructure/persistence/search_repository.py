"""Recherche globale (T+10h) : demandes, citoyens, agents, interventions.

Une « intervention » est une demande attribuée à un agent avec une date planifiée.
La recherche est insensible à la casse et tolère l'absence d'accents (« eclairage » trouve
« Éclairage ») ; les jokers LIKE saisis par l'utilisateur sont échappés.
"""

import unicodedata

from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from src.domain.citizen_request import RequestScope, id_prefix_from_reference, request_reference
from src.domain.search import SearchHit, SearchKind, SearchScope
from src.domain.user import Role
from src.infrastructure.persistence.citizen_request_repository import scope_conditions
from src.infrastructure.persistence.models import (
    AgentModel,
    CitizenRequestModel,
    InstitutModel,
    UserModel,
)

_ESCAPE = "\\"
_MIN_REF_LENGTH = 4


def _fold(text: str) -> str:
    decomposed = unicodedata.normalize("NFKD", text)

    return decomposed.encode("ascii", "ignore").decode().lower()


def _escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")


def _patterns(query: str) -> list[str]:
    base = query.strip()
    folded = _fold(base)
    # SQLite ne compare sans casse que l'ASCII (« é » ≠ « É ») : on ajoute les variantes courantes.
    # Sur PostgreSQL, ILIKE gère déjà tout cela.
    variants = {
        base,
        base.lower(),
        base.capitalize(),
        base.title(),
        folded,
        folded.replace(" ", "_"),  # « eclairage public » → slug de catégorie
    }

    return [f"%{_escape(variant)}%" for variant in variants if variant]


def _matches(columns: list, patterns: list[str]):
    return or_(
        *(column.ilike(pattern, escape=_ESCAPE) for column in columns for pattern in patterns)
    )


def _ref(row: CitizenRequestModel) -> str:
    return request_reference(row.id, row.created_at)


class SqlAlchemySearchRepository:
    def __init__(self, db: Session) -> None:
        self._db = db

    def search(self, query: str, scope: SearchScope, *, limit_per_kind: int) -> list[SearchHit]:
        patterns = _patterns(query)
        if not patterns or scope.is_empty:
            return []

        hits = self._demandes(query, patterns, scope, limit_per_kind)
        if scope.directory:
            hits += self._citizens(patterns, limit_per_kind)
            hits += self._agents(patterns, limit_per_kind)
        hits += self._interventions(patterns, scope, limit_per_kind)

        return hits

    def _demandes(
        self, query: str, patterns: list[str], scope: SearchScope, limit: int
    ) -> list[SearchHit]:
        model = CitizenRequestModel
        condition = _matches(
            [model.title, model.description, model.location, model.category], patterns
        )
        # « TN-2026-AB12CD34 » (référence complète) ou « #ab12cd34 » (début d'identifiant)
        ref = id_prefix_from_reference(query) or query.strip().lstrip("#")
        if len(ref) >= _MIN_REF_LENGTH:  # « #ab12cd34 » : recherche par début d'identifiant
            condition = or_(condition, model.id.ilike(f"{_escape(ref)}%", escape=_ESCAPE))

        stmt = self._scope_requests(select(model).where(condition), scope)
        rows = self._db.scalars(stmt.order_by(model.created_at.desc()).limit(limit)).all()

        return [
            SearchHit(
                kind=SearchKind.DEMANDE,
                id=row.id,
                title=f"{_ref(row)} {row.title}",
                subtitle=f"{row.category} · {row.status}",
                demande_id=row.id,
                agent_id=row.assigned_agent_id,
            )
            for row in rows
        ]

    def _citizens(self, patterns: list[str], limit: int) -> list[SearchHit]:
        stmt = (
            select(UserModel)
            .where(
                UserModel.role == Role.CITIZEN.value,
                _matches([UserModel.name, UserModel.email, UserModel.phone], patterns),
            )
            .order_by(UserModel.name)
            .limit(limit)
        )

        return [
            SearchHit(
                kind=SearchKind.CITOYEN,
                id=row.id,
                title=row.name,
                subtitle=row.email or row.phone or "",
            )
            for row in self._db.scalars(stmt).all()
        ]

    def _agents(self, patterns: list[str], limit: int) -> list[SearchHit]:
        stmt = (
            select(AgentModel, UserModel.name, InstitutModel.name)
            .join(UserModel, UserModel.id == AgentModel.user_id)
            .join(InstitutModel, InstitutModel.id == AgentModel.institut_id)
            .where(_matches([UserModel.name, UserModel.email, InstitutModel.name], patterns))
            .order_by(UserModel.name)
            .limit(limit)
        )

        return [
            SearchHit(
                kind=SearchKind.AGENT,
                id=agent.id,
                title=name,
                subtitle=f"{institut_name} · {agent.status}",
                agent_id=agent.id,
            )
            for agent, name, institut_name in self._db.execute(stmt).all()
        ]

    def _interventions(
        self, patterns: list[str], scope: SearchScope, limit: int
    ) -> list[SearchHit]:
        model = CitizenRequestModel
        stmt = (
            select(model, UserModel.name)
            .join(AgentModel, AgentModel.id == model.assigned_agent_id)
            .join(UserModel, UserModel.id == AgentModel.user_id)
            .where(
                model.scheduled_at.is_not(None),
                _matches([model.title, model.description, UserModel.name], patterns),
            )
        )
        stmt = self._scope_requests(stmt, scope).order_by(model.scheduled_at.desc()).limit(limit)

        return [
            SearchHit(
                kind=SearchKind.INTERVENTION,
                id=row.id,
                title=f"Intervention {_ref(row)} — {row.title}",
                subtitle=f"{agent_name} · {row.scheduled_at:%d/%m/%Y %H:%M}",
                demande_id=row.id,
                agent_id=row.assigned_agent_id,
            )
            for row, agent_name in self._db.execute(stmt).all()
        ]

    @staticmethod
    def _scope_requests(stmt, scope: SearchScope):
        request_scope = RequestScope(
            citizen_id=scope.citizen_id,
            agent_id=scope.agent_id,
            institut_id=scope.institut_id,
            is_empty=scope.is_empty,
        )
        return stmt.where(*scope_conditions(request_scope))
