"""Endpoints HTTP des instituts. Création et paramétrage : admin ; lecture : admin ou son manager."""

from fastapi import APIRouter, Depends
from fastapi import status as http_status
from sqlalchemy.orm import Session

from src.domain.citizen_request import Actor
from src.domain.institut import Institut, InstitutRepository
from src.domain.user import UserRepository
from src.features.audit.recording import AuditTrail
from src.features.audit.router import get_audit_trail
from src.features.institut.schemas import (
    CitizenInstitutDashboardOut,
    CreateInstitutIn,
    CreateInstitutServiceIn,
    InstitutDashboardOut,
    InstitutOut,
    InstitutServiceOut,
    SetManagerIn,
    SetServiceAgentsIn,
    SetServiceResponsibleIn,
    UpdateInstitutIn,
)
from src.features.institut.use_cases import (
    create_institut,
    create_institut_service,
    get_citizen_institut_dashboard,
    get_institut,
    get_institut_dashboard,
    get_institut_service,
    list_instituts,
    set_institut_service_agents,
    set_institut_service_responsible,
    set_manager,
    update_institut,
)
from src.infrastructure.persistence.agent_repository import SqlAlchemyAgentRepository
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.institut_repository import SqlAlchemyInstitutRepository
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository
from src.infrastructure.security.deps import get_current_actor

router = APIRouter(prefix="/instituts", tags=["instituts"])


def get_institut_repo(db: Session = Depends(get_db)) -> InstitutRepository:
    return SqlAlchemyInstitutRepository(db)


def get_users_repo(db: Session = Depends(get_db)) -> UserRepository:
    return SqlAlchemyUserRepository(db)


def get_agents_repo(db: Session = Depends(get_db)):
    return SqlAlchemyAgentRepository(db)


@router.post("", response_model=InstitutOut, status_code=http_status.HTTP_201_CREATED)
def create_institut_endpoint(
    payload: CreateInstitutIn,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
    users: UserRepository = Depends(get_users_repo),
    audit: AuditTrail = Depends(get_audit_trail),
) -> InstitutOut:
    return _out(create_institut(payload, actor, repo, users, audit=audit))


@router.get("", response_model=list[InstitutOut])
def list_instituts_endpoint(
    active_only: bool = False,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
) -> list[InstitutOut]:
    return [_out(i) for i in list_instituts(actor, repo, active_only=active_only)]


@router.get("/{institut_id}", response_model=InstitutOut)
def get_institut_endpoint(
    institut_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
) -> InstitutOut:
    return _out(get_institut(institut_id, actor, repo))


@router.get("/{institut_id}/dashboard", response_model=InstitutDashboardOut)
def get_institut_dashboard_endpoint(
    institut_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
) -> InstitutDashboardOut:
    return _dashboard_out(get_institut_dashboard(institut_id, actor, repo))


@router.get("/{institut_id}/citizen-dashboard", response_model=CitizenInstitutDashboardOut)
def get_citizen_institut_dashboard_endpoint(
    institut_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
) -> CitizenInstitutDashboardOut:
    dashboard = get_citizen_institut_dashboard(institut_id, actor, repo)
    return CitizenInstitutDashboardOut(
        institut=_out(dashboard.institut),
        metrics=_metrics_out(dashboard.metrics),
        services=[
            {
                "id": service.id, "institut_id": service.institut_id, "name": service.name,
                "category": service.category, "description": service.description,
                "contact_details": service.contact_details, "opening_hours": service.opening_hours,
                "icon": service.icon, "request_category": service.request_category,
                "metrics": _metrics_out(service.metrics),
            }
            for service in dashboard.services
        ],
    )


@router.get("/{institut_id}/services/{service_id}", response_model=InstitutServiceOut)
def get_institut_service_endpoint(
    institut_id: str,
    service_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
) -> InstitutServiceOut:
    return _service_out(get_institut_service(institut_id, service_id, actor, repo))


@router.post("/{institut_id}/services", response_model=InstitutServiceOut, status_code=http_status.HTTP_201_CREATED)
def create_institut_service_endpoint(
    institut_id: str,
    payload: CreateInstitutServiceIn,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
    agents=Depends(get_agents_repo),
) -> InstitutServiceOut:
    return _service_out(create_institut_service(institut_id, payload, actor, repo, agents))


@router.put("/{institut_id}/services/{service_id}/responsible", response_model=InstitutServiceOut)
def set_institut_service_responsible_endpoint(
    institut_id: str,
    service_id: str,
    payload: SetServiceResponsibleIn,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
    agents=Depends(get_agents_repo),
) -> InstitutServiceOut:
    return _service_out(set_institut_service_responsible(institut_id, service_id, payload, actor, repo, agents))


@router.put("/{institut_id}/services/{service_id}/agents", response_model=InstitutServiceOut)
def set_institut_service_agents_endpoint(
    institut_id: str,
    service_id: str,
    payload: SetServiceAgentsIn,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
    agents=Depends(get_agents_repo),
) -> InstitutServiceOut:
    return _service_out(set_institut_service_agents(institut_id, service_id, payload, actor, repo, agents))


@router.patch("/{institut_id}", response_model=InstitutOut)
def update_institut_endpoint(
    institut_id: str,
    payload: UpdateInstitutIn,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
    audit: AuditTrail = Depends(get_audit_trail),
) -> InstitutOut:
    return _out(update_institut(institut_id, payload, actor, repo, audit))


@router.put("/{institut_id}/manager", response_model=InstitutOut)
def set_manager_endpoint(
    institut_id: str,
    payload: SetManagerIn,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
    users: UserRepository = Depends(get_users_repo),
    audit: AuditTrail = Depends(get_audit_trail),
) -> InstitutOut:
    return _out(set_manager(institut_id, payload, actor, repo, users, audit))


def _out(institut: Institut) -> InstitutOut:
    # frozenset → liste triée : réponse stable d'un appel à l'autre.
    return InstitutOut(
        id=institut.id,
        name=institut.name,
        description=institut.description,
        categories=sorted(institut.categories),
        manager_id=institut.manager_id,
        is_active=institut.is_active,
        created_at=institut.created_at,
    )


def _metrics_out(metrics):
    return {"received": metrics.received, "in_progress": metrics.in_progress, "resolved": metrics.resolved}


def _service_out(service) -> InstitutServiceOut:
    return InstitutServiceOut(
        id=service.id, institut_id=service.institut_id, name=service.name, category=service.category,
        description=service.description, contact_details=service.contact_details, opening_hours=service.opening_hours,
        icon=service.icon, request_category=service.request_category, responsible_agent_id=service.responsible_agent_id,
        responsible_agent_name=service.responsible_agent_name, associated_agents=service.associated_agents,
        metrics=_metrics_out(service.metrics),
    )


def _dashboard_out(dashboard) -> InstitutDashboardOut:
    return InstitutDashboardOut(
        institut=_out(dashboard.institut), manager_name=dashboard.manager_name,
        associated_agents=dashboard.associated_agents, metrics=_metrics_out(dashboard.metrics),
        services=[_service_out(service) for service in dashboard.services],
    )
