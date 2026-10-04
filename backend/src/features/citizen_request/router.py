"""Endpoints HTTP des demandes citoyennes et du dashboard.

Aucun contrôle de rôle ici : chaque use case reçoit l'Actor et applique domain/citizen_request/access.py.
Le router se contente d'authentifier (get_current_actor) et de câbler les implémentations.
"""

from datetime import datetime
from functools import lru_cache

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from src.domain.agent import Agent, AgentRepository
from src.domain.citizen_request import (
    ActivityQuery,
    Actor,
    AnalysisUnavailableError,
    CitizenRequest,
    CitizenRequestAnalytics,
    CitizenRequestEvent,
    CitizenRequestEventRepository,
    CitizenRequestRepository,
    DashboardStats,
    MapPoint,
    RequestActivityLog,
    RequestAnalysis,
    RequestAnalyzer,
    RequestCategory,
    RequestEventType,
    RequestPriority,
    RequestSortBy,
    RequestStatus,
    SortOrder,
)
from src.domain.citizen_request.priority import PriorityRepository
from src.domain.institut import InstitutRepository
from src.domain.user import Role, User, UserRepository
from src.features.citizen_request.schemas import (
    AssignRequestIn,
    ChangeStatusIn,
    CitizenRequestOut,
    CitizenRequestPageOut,
    DashboardStatsOut,
    EditRequestIn,
    MapPointOut,
    PriorityInputsIn,
    PriorityItemOut,
    PriorityQueueOut,
    PublicDashboardOut,
    RecommendedAgentOut,
    RequestActivityOut,
    RequestActivityPageOut,
    RequestAnalysisOut,
    RequestEventOut,
    SubmitRequestIn,
)
from src.features.citizen_request.use_cases import (
    analyze_request,
    assign_request,
    change_status,
    delete_request,
    edit_request,
    get_dashboard,
    get_public_dashboard,
    get_request,
    list_activity,
    list_map_points,
    list_request_events,
    list_requests,
    priority_queue,
    submit_request,
    update_priority_inputs,
)
from src.features.citizen_request.use_cases.insights import DEFAULT_DAYS
from src.infrastructure.config import get_settings
from src.infrastructure.config.settings import Settings
from src.infrastructure.external.groq_analyzer import GroqRequestAnalyzer
from src.infrastructure.persistence.agent_repository import SqlAlchemyAgentRepository
from src.infrastructure.persistence.citizen_request_analytics import (
    SqlAlchemyCitizenRequestAnalytics,
)
from src.infrastructure.persistence.citizen_request_event_repository import (
    SqlAlchemyCitizenRequestEventRepository,
)
from src.infrastructure.persistence.citizen_request_priority import SqlAlchemyPriorityRepository
from src.infrastructure.persistence.citizen_request_repository import (
    SqlAlchemyCitizenRequestRepository,
)
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.institut_repository import SqlAlchemyInstitutRepository
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository
from src.infrastructure.security.deps import get_current_actor, get_current_user, require_roles
from src.shared.timezone import resolve_timezone

request_router = APIRouter(prefix="/requests", tags=["citizen requests"])
dashboard_router = APIRouter(prefix="/dashboard", tags=["dashboard"])


# ─── Câblage ────────────────────────────────────────────────────────


def get_request_repo(db: Session = Depends(get_db)) -> CitizenRequestRepository:
    return SqlAlchemyCitizenRequestRepository(db)


def get_event_repo(db: Session = Depends(get_db)) -> CitizenRequestEventRepository:
    return SqlAlchemyCitizenRequestEventRepository(db)


def get_activity_log(db: Session = Depends(get_db)) -> RequestActivityLog:
    return SqlAlchemyCitizenRequestEventRepository(db)


def get_users_repo(db: Session = Depends(get_db)) -> UserRepository:
    return SqlAlchemyUserRepository(db)


def get_agents_repo(db: Session = Depends(get_db)) -> AgentRepository:
    return SqlAlchemyAgentRepository(db)


def get_instituts_repo(db: Session = Depends(get_db)) -> InstitutRepository:
    return SqlAlchemyInstitutRepository(db)


def get_analytics(db: Session = Depends(get_db)) -> CitizenRequestAnalytics:
    return SqlAlchemyCitizenRequestAnalytics(db)


def get_priority_repo(db: Session = Depends(get_db)) -> PriorityRepository:
    return SqlAlchemyPriorityRepository(db)


@lru_cache
def _groq_analyzer(api_key: str, model: str) -> RequestAnalyzer:
    return GroqRequestAnalyzer(api_key, model)


def get_request_analyzer() -> RequestAnalyzer:
    settings = get_settings()
    api_key = settings.resolved_groq_api_key
    if not api_key:
        raise AnalysisUnavailableError("AI analysis is not configured (GROQ_API_KEY is missing)")

    return _groq_analyzer(api_key, settings.groq_model)


# ─── Création / lecture ─────────────────────────────────────────────


@request_router.post("", response_model=CitizenRequestOut, status_code=status.HTTP_201_CREATED)
def submit_request_endpoint(
    payload: SubmitRequestIn,
    user: User = Depends(get_current_user),
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    users: UserRepository = Depends(get_users_repo),
    instituts: InstitutRepository = Depends(get_instituts_repo),
    events: CitizenRequestEventRepository = Depends(get_event_repo),
) -> CitizenRequest:
    return submit_request(payload, user, actor, repo, users, instituts, events)


@request_router.get("", response_model=CitizenRequestPageOut)
def list_requests_endpoint(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    search: str | None = Query(default=None, min_length=1, max_length=200),
    category: RequestCategory | None = None,
    priority: RequestPriority | None = None,
    request_status: RequestStatus | None = Query(default=None, alias="status"),
    sort_by: RequestSortBy = RequestSortBy.CREATED_AT,
    sort_order: SortOrder = SortOrder.DESC,
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
) -> CitizenRequestPageOut:
    items, total = list_requests(
        actor,
        repo,
        page=page,
        page_size=page_size,
        search=search,
        category=category,
        priority=priority,
        status=request_status,
        sort_by=sort_by,
        sort_order=sort_order,
    )

    return CitizenRequestPageOut(
        items=[CitizenRequestOut.model_validate(item) for item in items],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=(total + page_size - 1) // page_size,
    )


@request_router.get("/queue", response_model=PriorityQueueOut)
def priority_queue_endpoint(
    request_status: RequestStatus | None = Query(default=None, alias="status"),
    include_closed: bool = False,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    actor: Actor = Depends(get_current_actor),
    priorities: PriorityRepository = Depends(get_priority_repo),
) -> PriorityQueueOut:
    items, total = priority_queue(
        actor,
        priorities,
        status=request_status,
        include_closed=include_closed,
        page=page,
        page_size=page_size,
    )

    return PriorityQueueOut(
        items=[PriorityItemOut.model_validate(item) for item in items],
        total=total,
        page=page,
        page_size=page_size,
    )


@request_router.post(
    "/queue/refresh",
    dependencies=[Depends(require_roles(Role.ADMIN))],
)
def refresh_priorities_endpoint(
    priorities: PriorityRepository = Depends(get_priority_repo),
) -> dict[str, int]:
    """Recalcule le score de toutes les demandes ouvertes (l'ancienneté fait monter la priorité)."""
    return {"level_changes": priorities.refresh_scores()}


@request_router.get("/activity", response_model=RequestActivityPageOut)
def list_activity_endpoint(
    type: list[RequestEventType] = Query(default=[]),
    since: datetime | None = None,
    until: datetime | None = None,
    search: str | None = Query(default=None, max_length=100),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    actor: Actor = Depends(get_current_actor),
    events: RequestActivityLog = Depends(get_activity_log),
    agents: AgentRepository = Depends(get_agents_repo),
) -> RequestActivityPageOut:
    query = ActivityQuery(
        types=frozenset(type),
        since=since,
        until=until,
        search=search,
        page=page,
        page_size=page_size,
    )
    items, total = list_activity(actor, events, agents, query)
    return RequestActivityPageOut(
        items=[
            RequestActivityOut(
                event=RequestEventOut.model_validate(item.event),
                request_title=item.request_title,
                request_status=item.request_status,
            )
            for item in items
        ],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=(total + page_size - 1) // page_size,
    )


@request_router.get("/map", response_model=list[MapPointOut])
def map_points_endpoint(
    request_status: RequestStatus | None = Query(default=None, alias="status"),
    category: RequestCategory | None = None,
    active_only: bool = True,
    limit: int = Query(default=500, ge=1, le=2000),
    actor: Actor = Depends(get_current_actor),
    analytics: CitizenRequestAnalytics = Depends(get_analytics),
) -> list[MapPoint]:
    return list_map_points(
        actor,
        analytics,
        status=request_status,
        category=category,
        active_only=active_only,
        limit=limit,
    )


@request_router.get("/{request_id}", response_model=CitizenRequestOut)
def get_request_endpoint(
    request_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
) -> CitizenRequest:
    return get_request(request_id, actor, repo)


@request_router.get("/{request_id}/events", response_model=list[RequestEventOut])
def list_request_events_endpoint(
    request_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    events: CitizenRequestEventRepository = Depends(get_event_repo),
    agents: AgentRepository = Depends(get_agents_repo),
) -> list[CitizenRequestEvent]:
    return list_request_events(request_id, actor, repo, events, agents)


# ─── Modification / suppression ─────────────────────────────────────


@request_router.patch("/{request_id}", response_model=CitizenRequestOut)
def edit_request_endpoint(
    request_id: str,
    payload: EditRequestIn,
    user: User = Depends(get_current_user),
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    instituts: InstitutRepository = Depends(get_instituts_repo),
    events: CitizenRequestEventRepository = Depends(get_event_repo),
) -> CitizenRequest:
    return edit_request(request_id, payload, user, actor, repo, instituts, events)


@request_router.delete("/{request_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_request_endpoint(
    request_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
) -> None:
    delete_request(request_id, actor, repo)


@request_router.patch("/{request_id}/priority-inputs", response_model=CitizenRequestOut)
def update_priority_inputs_endpoint(
    request_id: str,
    payload: PriorityInputsIn,
    user: User = Depends(get_current_user),
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    events: CitizenRequestEventRepository = Depends(get_event_repo),
) -> CitizenRequest:
    return update_priority_inputs(request_id, payload, user, actor, repo, events)


# ─── Cycle de vie ───────────────────────────────────────────────────


@request_router.post("/{request_id}/status", response_model=CitizenRequestOut)
def change_status_endpoint(
    request_id: str,
    payload: ChangeStatusIn,
    user: User = Depends(get_current_user),
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    events: CitizenRequestEventRepository = Depends(get_event_repo),
) -> CitizenRequest:
    return change_status(request_id, payload.status, user, actor, repo, events)


@request_router.post("/{request_id}/assign", response_model=CitizenRequestOut)
def assign_request_endpoint(
    request_id: str,
    payload: AssignRequestIn,
    user: User = Depends(get_current_user),
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    agents: AgentRepository = Depends(get_agents_repo),
    events: CitizenRequestEventRepository = Depends(get_event_repo),
) -> CitizenRequest:
    return assign_request(request_id, payload, user, actor, repo, agents, events)


@request_router.post("/{request_id}/analyze", response_model=RequestAnalysisOut)
def analyze_request_endpoint(
    request_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    agents: AgentRepository = Depends(get_agents_repo),
    analyzer: RequestAnalyzer = Depends(get_request_analyzer),
) -> RequestAnalysisOut:
    analysis, agent = analyze_request(request_id, actor, repo, agents, analyzer)

    return _analysis_out(analysis, agent)


# ─── Dashboard ──────────────────────────────────────────────────────


@dashboard_router.get("/public", response_model=PublicDashboardOut)
def public_dashboard_endpoint(
    analytics: CitizenRequestAnalytics = Depends(get_analytics),
    settings: Settings = Depends(get_settings),
) -> DashboardStats:
    return get_public_dashboard(analytics, resolve_timezone(settings.app_timezone))


@dashboard_router.get("", response_model=DashboardStatsOut)
def dashboard_endpoint(
    days: int = Query(default=DEFAULT_DAYS, ge=1, le=31),
    actor: Actor = Depends(get_current_actor),
    analytics: CitizenRequestAnalytics = Depends(get_analytics),
    settings: Settings = Depends(get_settings),
) -> DashboardStats:
    return get_dashboard(actor, analytics, resolve_timezone(settings.app_timezone), days)


def _analysis_out(analysis: RequestAnalysis, agent: Agent | None) -> RequestAnalysisOut:
    return RequestAnalysisOut(
        category=analysis.category,
        priority=analysis.priority,
        summary=analysis.summary,
        reason=analysis.reason,
        recommended_agent=RecommendedAgentOut.model_validate(agent) if agent else None,
    )
