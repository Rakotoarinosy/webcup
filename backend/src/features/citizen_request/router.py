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
    PublicRequestSort,
    RequestActivityLog,
    RequestAnalysis,
    RequestAnalyzer,
    RequestCategory,
    RequestEventType,
    RequestMessage,
    RequestMessageRepository,
    RequestPriority,
    RequestSortBy,
    RequestStatus,
    SortOrder,
)
from src.domain.citizen_request.priority import PriorityRepository
from src.domain.citizen_request.support import PublicRequest, SupportRepository
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
    MarkDuplicateIn,
    MessageIn,
    MessageOut,
    PriorityInputsIn,
    PriorityItemOut,
    PriorityQueueOut,
    PublicDashboardOut,
    PublicRequestOut,
    PublicRequestPageOut,
    RecommendedAgentOut,
    RequestActivityOut,
    RequestActivityPageOut,
    RequestAnalysisOut,
    RequestEventOut,
    RequestGroupOut,
    SimilarDraftIn,
    SimilarPublicOut,
    SimilarRequestOut,
    SubmitRequestIn,
)
from src.features.citizen_request.use_cases import (
    analyze_request,
    assign_request,
    change_status,
    check_similar_draft,
    delete_request,
    edit_request,
    get_dashboard,
    get_public_dashboard,
    get_public_request,
    get_request,
    ids_with_similar,
    list_activity,
    list_map_points,
    list_messages,
    list_public_requests,
    list_request_events,
    list_requests,
    list_supported_requests,
    mark_duplicate,
    post_message,
    priority_queue,
    request_group,
    similar_counts_for,
    submit_request,
    support_request,
    unsupport_request,
    update_priority_inputs,
)
from src.features.citizen_request.use_cases.insights import DEFAULT_DAYS
from src.infrastructure.config import get_settings
from src.infrastructure.config.settings import Settings
from src.infrastructure.external.gemini_analyzer import GeminiRequestAnalyzer
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
from src.infrastructure.persistence.citizen_request_support_repository import (
    SqlAlchemyRequestMessageRepository,
    SqlAlchemySupportRepository,
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


def get_support_repo(db: Session = Depends(get_db)) -> SupportRepository:
    return SqlAlchemySupportRepository(db)


def get_message_repo(db: Session = Depends(get_db)) -> RequestMessageRepository:
    return SqlAlchemyRequestMessageRepository(db)


@lru_cache
def _gemini_analyzer(api_key: str, model: str) -> RequestAnalyzer:
    return GeminiRequestAnalyzer(api_key, model)


def get_request_analyzer() -> RequestAnalyzer:
    settings = get_settings()
    if not settings.gemini_api_key:
        raise AnalysisUnavailableError("AI analysis is not configured (GEMINI_API_KEY is missing)")

    return _gemini_analyzer(settings.gemini_api_key, settings.gemini_model)


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
    has_similar: bool = Query(
        default=False, description="Seulement les demandes ayant des doublons potentiels"
    ),
    awaiting_reply: bool = Query(
        default=False, description="Seulement les demandes où le citoyen attend une réponse"
    ),
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
        only_ids=ids_with_similar(actor, repo) if has_similar else None,
        awaiting_reply=awaiting_reply,
    )
    counts = similar_counts_for(actor, repo, items)

    return CitizenRequestPageOut(
        items=[_request_out(item, counts.get(item.id, 0)) for item in items],
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


# ─── Demandes publiques, soutiens et doublons (F52, F75) ─────────────


@request_router.get("/public", response_model=PublicRequestPageOut)
def list_public_requests_endpoint(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    search: str | None = Query(default=None, min_length=1, max_length=200),
    category: RequestCategory | None = None,
    sort: PublicRequestSort = PublicRequestSort.RECENT,
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    supports: SupportRepository = Depends(get_support_repo),
) -> PublicRequestPageOut:
    """Demandes ouvertes de la ville, en vue publique anonymisée (ni auteur, ni description)."""
    items, total = list_public_requests(
        actor,
        repo,
        supports,
        page=page,
        page_size=page_size,
        search=search,
        category=category,
        sort=sort,
    )
    return PublicRequestPageOut(
        items=[PublicRequestOut.model_validate(item) for item in items],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=(total + page_size - 1) // page_size,
    )


@request_router.get("/public/{request_id}", response_model=PublicRequestOut)
def get_public_request_endpoint(
    request_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    supports: SupportRepository = Depends(get_support_repo),
) -> PublicRequest:
    return get_public_request(request_id, actor, repo, supports)


@request_router.get("/supported", response_model=list[PublicRequestOut])
def list_supported_requests_endpoint(
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    supports: SupportRepository = Depends(get_support_repo),
) -> list[PublicRequest]:
    """« Demandes que je soutiens », closes comprises, avec leur statut à jour."""
    return list_supported_requests(actor, repo, supports)


@request_router.post("/similar-check", response_model=list[SimilarPublicOut])
def check_similar_draft_endpoint(
    payload: SimilarDraftIn,
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    supports: SupportRepository = Depends(get_support_repo),
) -> list[SimilarPublicOut]:
    """Avant l'envoi : demandes ouvertes qui ressemblent au brouillon (à soutenir plutôt)."""
    return [
        SimilarPublicOut(
            **PublicRequestOut.model_validate(item.request).model_dump(),
            score=item.match.score,
            same_place=item.match.same_place,
        )
        for item in check_similar_draft(payload, actor, repo, supports)
    ]


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


@request_router.post(
    "/{request_id}/support", response_model=PublicRequestOut, status_code=status.HTTP_201_CREATED
)
def support_request_endpoint(
    request_id: str,
    user: User = Depends(get_current_user),
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    supports: SupportRepository = Depends(get_support_repo),
    events: CitizenRequestEventRepository = Depends(get_event_repo),
) -> PublicRequest:
    return support_request(request_id, user, actor, repo, supports, events)


@request_router.delete("/{request_id}/support", response_model=PublicRequestOut)
def unsupport_request_endpoint(
    request_id: str,
    user: User = Depends(get_current_user),
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    supports: SupportRepository = Depends(get_support_repo),
    events: CitizenRequestEventRepository = Depends(get_event_repo),
) -> PublicRequest:
    return unsupport_request(request_id, user, actor, repo, supports, events)


@request_router.get("/{request_id}/similar", response_model=RequestGroupOut)
def request_group_endpoint(
    request_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
) -> RequestGroupOut:
    """Vue groupée : principale (si doublon), doublons rattachés, demandes similaires."""
    group = request_group(request_id, actor, repo)
    return RequestGroupOut(
        principal=_request_out(group.principal) if group.principal else None,
        duplicates=[_request_out(item) for item in group.duplicates],
        similar=[
            SimilarRequestOut(
                request=_request_out(item.request),
                score=item.match.score,
                shared_keywords=list(item.match.shared_keywords),
                distance_km=item.match.distance_km,
                same_place=item.match.same_place,
            )
            for item in group.similar
        ],
    )


@request_router.post("/{request_id}/duplicate", response_model=CitizenRequestOut)
def mark_duplicate_endpoint(
    request_id: str,
    payload: MarkDuplicateIn,
    user: User = Depends(get_current_user),
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    supports: SupportRepository = Depends(get_support_repo),
    events: CitizenRequestEventRepository = Depends(get_event_repo),
) -> CitizenRequest:
    return mark_duplicate(request_id, payload.duplicate_of_id, user, actor, repo, supports, events)


# ─── Fil de messages (F84) ──────────────────────────────────────────


@request_router.get("/{request_id}/messages", response_model=list[MessageOut])
def list_messages_endpoint(
    request_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    messages: RequestMessageRepository = Depends(get_message_repo),
) -> list[RequestMessage]:
    return list_messages(request_id, actor, repo, messages)


@request_router.post(
    "/{request_id}/messages", response_model=MessageOut, status_code=status.HTTP_201_CREATED
)
def post_message_endpoint(
    request_id: str,
    payload: MessageIn,
    user: User = Depends(get_current_user),
    actor: Actor = Depends(get_current_actor),
    repo: CitizenRequestRepository = Depends(get_request_repo),
    messages: RequestMessageRepository = Depends(get_message_repo),
    events: CitizenRequestEventRepository = Depends(get_event_repo),
) -> RequestMessage:
    return post_message(request_id, payload, user, actor, repo, messages, events)


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


def _request_out(request: CitizenRequest, similar_count: int = 0) -> CitizenRequestOut:
    return CitizenRequestOut.model_validate(request).model_copy(
        update={"similar_count": similar_count}
    )
