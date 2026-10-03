"""Endpoints HTTP des profils agents.

Les droits sont appliqués par les use cases (admin, manager de l'institut, ou l'agent lui-même).
"""

from fastapi import APIRouter, Depends, Query
from fastapi import status as http_status
from sqlalchemy.orm import Session

from src.domain.agent import Agent, AgentNotFoundError, AgentQuery, AgentRepository, AgentStatus
from src.domain.citizen_request import Actor, CitizenRequest, CitizenRequestRepository
from src.domain.institut import InstitutRepository
from src.domain.user import UserRepository
from src.features.agent.schemas import AgentOut, AgentStatusIn, CreateAgentProfileIn, MoveAgentIn
from src.features.agent.use_cases import (
    create_agent_profile,
    get_agent_for,
    list_agents_in_scope,
    list_interventions_for,
    move_agent,
    set_agent_active,
    set_agent_status,
)
from src.features.audit.recording import AuditTrail
from src.features.audit.router import get_audit_trail
from src.features.citizen_request.schemas import CitizenRequestOut
from src.infrastructure.persistence.agent_repository import SqlAlchemyAgentRepository
from src.infrastructure.persistence.citizen_request_repository import (
    SqlAlchemyCitizenRequestRepository,
)
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.institut_repository import SqlAlchemyInstitutRepository
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository
from src.infrastructure.security.deps import get_current_actor

router = APIRouter(prefix="/agents", tags=["agents"])


def get_agent_repo(db: Session = Depends(get_db)) -> AgentRepository:
    return SqlAlchemyAgentRepository(db)


def get_request_repo(db: Session = Depends(get_db)) -> CitizenRequestRepository:
    return SqlAlchemyCitizenRequestRepository(db)


def get_users_repo(db: Session = Depends(get_db)) -> UserRepository:
    return SqlAlchemyUserRepository(db)


def get_instituts_repo(db: Session = Depends(get_db)) -> InstitutRepository:
    return SqlAlchemyInstitutRepository(db)


@router.post("", response_model=AgentOut, status_code=http_status.HTTP_201_CREATED)
def create_agent_endpoint(
    payload: CreateAgentProfileIn,
    actor: Actor = Depends(get_current_actor),
    repo: AgentRepository = Depends(get_agent_repo),
    users: UserRepository = Depends(get_users_repo),
    instituts: InstitutRepository = Depends(get_instituts_repo),
    audit: AuditTrail = Depends(get_audit_trail),
) -> Agent:
    return create_agent_profile(payload, actor, repo, users, instituts, audit=audit)


@router.get("", response_model=list[AgentOut])
def list_agents_endpoint(
    search: str | None = Query(default=None, max_length=100),
    institut_id: str | None = None,
    status: AgentStatus | None = None,
    is_active: bool | None = None,
    actor: Actor = Depends(get_current_actor),
    repo: AgentRepository = Depends(get_agent_repo),
) -> list[Agent]:
    query = AgentQuery(search=search, institut_id=institut_id, status=status, is_active=is_active)

    return list_agents_in_scope(actor, query, repo)


@router.get("/me", response_model=AgentOut)
def my_agent_profile_endpoint(
    actor: Actor = Depends(get_current_actor),
    repo: AgentRepository = Depends(get_agent_repo),
) -> Agent:
    if actor.agent_id is None:
        raise AgentNotFoundError("me")

    return get_agent_for(actor.agent_id, actor, repo)


@router.get("/{agent_id}", response_model=AgentOut)
def get_agent_endpoint(
    agent_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: AgentRepository = Depends(get_agent_repo),
) -> Agent:
    return get_agent_for(agent_id, actor, repo)


@router.get("/{agent_id}/interventions", response_model=list[CitizenRequestOut])
def list_agent_interventions_endpoint(
    agent_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: AgentRepository = Depends(get_agent_repo),
    requests: CitizenRequestRepository = Depends(get_request_repo),
) -> list[CitizenRequest]:
    return list_interventions_for(agent_id, actor, repo, requests)


@router.patch("/{agent_id}/status", response_model=AgentOut)
def set_agent_status_endpoint(
    agent_id: str,
    payload: AgentStatusIn,
    actor: Actor = Depends(get_current_actor),
    repo: AgentRepository = Depends(get_agent_repo),
    audit: AuditTrail = Depends(get_audit_trail),
) -> Agent:
    return set_agent_status(agent_id, payload.status, actor, repo, audit)


@router.post("/{agent_id}/deactivate", response_model=AgentOut)
def deactivate_agent_endpoint(
    agent_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: AgentRepository = Depends(get_agent_repo),
    audit: AuditTrail = Depends(get_audit_trail),
) -> Agent:
    return set_agent_active(agent_id, False, actor, repo, audit)


@router.post("/{agent_id}/activate", response_model=AgentOut)
def activate_agent_endpoint(
    agent_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: AgentRepository = Depends(get_agent_repo),
    audit: AuditTrail = Depends(get_audit_trail),
) -> Agent:
    return set_agent_active(agent_id, True, actor, repo, audit)


@router.post("/{agent_id}/move", response_model=AgentOut)
def move_agent_endpoint(
    agent_id: str,
    payload: MoveAgentIn,
    actor: Actor = Depends(get_current_actor),
    repo: AgentRepository = Depends(get_agent_repo),
    instituts: InstitutRepository = Depends(get_instituts_repo),
    audit: AuditTrail = Depends(get_audit_trail),
) -> Agent:
    return move_agent(agent_id, payload.institut_id, actor, repo, instituts, audit)
