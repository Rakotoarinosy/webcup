"""Profils agents rattachés à un User et à un Institut, gérés par l'admin ou le manager de l'institut."""

import uuid
from dataclasses import replace
from datetime import UTC, datetime

from src.domain.agent import (
    Agent,
    AgentAlreadyExistsError,
    AgentQuery,
    AgentRepository,
    AgentStatus,
    InvalidAgentAccountError,
)
from src.domain.audit import AuditAction, AuditTarget
from src.domain.citizen_request import (
    Actor,
    CitizenRequest,
    CitizenRequestRepository,
    ensure_can_manage_institut,
)
from src.domain.institut import (
    Institut,
    InstitutInactiveError,
    InstitutNotFoundError,
    InstitutRepository,
)
from src.domain.user import ForbiddenError, Role, UserRepository
from src.features.agent.schemas import CreateAgentProfileIn
from src.features.agent.use_cases.read import get_agent
from src.features.audit.recording import AuditTrail, record


def create_agent_profile(
    dto: CreateAgentProfileIn,
    actor: Actor,
    repo: AgentRepository,
    users: UserRepository,
    instituts: InstitutRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Agent:
    institut_id = actor.institut_id if actor.role is Role.MANAGER else dto.institut_id
    ensure_can_manage_institut(actor, institut_id)
    institut = _active_institut(institut_id, instituts)

    user = users.get_by_id(dto.user_id)
    if user is None or user.role is not Role.AGENT or not user.is_active:
        raise InvalidAgentAccountError(dto.user_id)
    if repo.search(AgentQuery(user_id=user.id)):
        raise AgentAlreadyExistsError(user.email or user.phone or user.id)

    agent = repo.add(
        Agent(
            id=str(uuid.uuid4()),
            user_id=user.id,
            institut_id=institut.id,
            status=dto.status,
            created_at=now or datetime.now(UTC),
            name=user.name,
            email=user.email,
            institut_name=institut.name,
        )
    )
    record(
        audit,
        AuditAction.AGENT_CREATED,
        AuditTarget.AGENT,
        agent.id,
        user.name,
        institut_id=institut.id,
        details={"institut": institut.name},
    )
    return agent


def list_agents_in_scope(actor: Actor, query: AgentQuery, repo: AgentRepository) -> list[Agent]:
    """L'admin filtre librement ; un manager ne voit que les agents de son institut."""
    if actor.role is Role.ADMIN:
        return repo.search(query)
    if actor.role is Role.MANAGER:
        # Manager sans institut : non rattaché, il ne voit personne (pas une erreur).
        if actor.institut_id is None:
            return []
        return repo.search(replace(query, institut_id=actor.institut_id))

    raise ForbiddenError()


def set_agent_active(
    agent_id: str,
    active: bool,
    actor: Actor,
    repo: AgentRepository,
    audit: AuditTrail | None = None,
) -> Agent:
    """On ne supprime jamais un agent : ses interventions restent dans l'historique."""
    agent = get_agent(agent_id, repo)
    ensure_can_manage_institut(actor, agent.institut_id)

    status = AgentStatus.AVAILABLE if active else AgentStatus.OFFLINE
    saved = repo.update(replace(agent, is_active=active, status=status))
    if agent.is_active != active:
        action = AuditAction.AGENT_ACTIVATED if active else AuditAction.AGENT_DEACTIVATED
        record(
            audit, action, AuditTarget.AGENT, saved.id, saved.name, institut_id=saved.institut_id
        )
    return saved


def move_agent(
    agent_id: str,
    institut_id: str,
    actor: Actor,
    repo: AgentRepository,
    instituts: InstitutRepository,
    audit: AuditTrail | None = None,
) -> Agent:
    """Changement d'institut : décision d'administration (deux instituts sont concernés)."""
    if actor.role is not Role.ADMIN:
        raise ForbiddenError()
    agent = get_agent(agent_id, repo)
    institut = _active_institut(institut_id, instituts)

    saved = repo.update(replace(agent, institut_id=institut.id, institut_name=institut.name))
    if agent.institut_id != saved.institut_id:
        details = {"institut": {"from": agent.institut_name, "to": saved.institut_name}}
        # Visible par les managers des deux instituts : une entrée pour chacun.
        for side in (agent.institut_id, saved.institut_id):
            record(
                audit,
                AuditAction.AGENT_MOVED,
                AuditTarget.AGENT,
                saved.id,
                saved.name,
                institut_id=side,
                details=details,
            )
    return saved


def _active_institut(institut_id: str | None, instituts: InstitutRepository) -> Institut:
    if institut_id is None:
        raise ForbiddenError()
    institut = instituts.get_by_id(institut_id)
    if institut is None:
        raise InstitutNotFoundError(institut_id)
    if not institut.is_active:
        raise InstitutInactiveError(institut_id)

    return institut


def get_agent_for(agent_id: str, actor: Actor, repo: AgentRepository) -> Agent:
    """Fiche visible par l'agent lui-même, le manager de son institut et l'admin."""
    agent = get_agent(agent_id, repo)
    if actor.agent_id != agent.id:
        ensure_can_manage_institut(actor, agent.institut_id)

    return agent


def list_interventions_for(
    agent_id: str, actor: Actor, agents: AgentRepository, requests: CitizenRequestRepository
) -> list[CitizenRequest]:
    get_agent_for(agent_id, actor, agents)

    return requests.list_by_agent(agent_id)


def set_agent_status(
    agent_id: str,
    status: AgentStatus,
    actor: Actor,
    repo: AgentRepository,
    audit: AuditTrail | None = None,
) -> Agent:
    """Disponibilité : l'agent la déclare lui-même, son manager peut la corriger."""
    agent = get_agent_for(agent_id, actor, repo)

    saved = repo.update(replace(agent, status=status))
    if agent.status is not status:
        record(
            audit,
            AuditAction.AGENT_STATUS_CHANGED,
            AuditTarget.AGENT,
            saved.id,
            saved.name,
            institut_id=saved.institut_id,
            details={"status": {"from": agent.status.value, "to": status.value}},
        )
    return saved
