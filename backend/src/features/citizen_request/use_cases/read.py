"""Lecture des demandes : détail, liste paginée et timeline, toujours filtrées par les droits de l'Actor."""

from dataclasses import replace

from src.domain.agent import AgentRepository
from src.domain.citizen_request import (
    ANONYMOUS_FOR_CITIZENS,
    STAFF_ONLY_EVENTS,
    ActivityQuery,
    Actor,
    CitizenRequest,
    CitizenRequestEvent,
    CitizenRequestEventRepository,
    CitizenRequestNotFoundError,
    CitizenRequestRepository,
    ConversationState,
    RequestActivity,
    RequestActivityLog,
    RequestCategory,
    RequestEventType,
    RequestPriority,
    RequestSortBy,
    RequestStatus,
    SortOrder,
    ensure_can_view,
    scope_for,
)
from src.domain.user import Role


def load_request(request_id: str, repo: CitizenRequestRepository) -> CitizenRequest:
    """Chargement sans contrôle d'accès : réservé aux autres use cases, qui contrôlent ensuite."""
    request = repo.get_by_id(request_id)
    if request is None:
        raise CitizenRequestNotFoundError(request_id)

    return request


def get_request(request_id: str, actor: Actor, repo: CitizenRequestRepository) -> CitizenRequest:
    request = load_request(request_id, repo)
    ensure_can_view(actor, request)

    return request


def list_requests(
    actor: Actor,
    repo: CitizenRequestRepository,
    *,
    page: int,
    page_size: int,
    search: str | None = None,
    category: RequestCategory | None = None,
    priority: RequestPriority | None = None,
    status: RequestStatus | None = None,
    sort_by: RequestSortBy = RequestSortBy.CREATED_AT,
    sort_order: SortOrder = SortOrder.DESC,
    only_ids: frozenset[str] | None = None,
    awaiting_reply: bool = False,
) -> tuple[list[CitizenRequest], int]:
    """Le périmètre vient du rôle, jamais des paramètres du client.

    `awaiting_reply` : demandes dont le citoyen a écrit en dernier (réponse attendue de la mairie)."""
    return repo.list_page(
        page=page,
        page_size=page_size,
        search=search,
        category=category,
        priority=priority,
        status=status,
        scope=scope_for(actor),
        sort_by=sort_by,
        sort_order=sort_order,
        only_ids=only_ids,
        conversation_state=ConversationState.AWAITING_STAFF if awaiting_reply else None,
    )


def list_request_events(
    request_id: str,
    actor: Actor,
    repo: CitizenRequestRepository,
    events: CitizenRequestEventRepository,
    agents: AgentRepository,
) -> list[CitizenRequestEvent]:
    get_request(request_id, actor, repo)
    items = events.list_for_request(request_id)
    if actor.role is Role.CITIZEN:
        items = [_for_citizen(event) for event in items if event.type not in STAFF_ONLY_EVENTS]

    _with_agent_names(items, agents)
    return items


def _for_citizen(event: CitizenRequestEvent) -> CitizenRequestEvent:
    """Un soutien reste anonyme pour l'auteur de la demande."""
    if event.type in ANONYMOUS_FOR_CITIZENS:
        return replace(event, actor_id=None, actor_name=None)
    return event


def list_activity(
    actor: Actor, log: RequestActivityLog, agents: AgentRepository, query: ActivityQuery
) -> tuple[list[RequestActivity], int]:
    """Journal de toutes les demandes du périmètre : un agent y suit ses interventions,
    un manager son institut, l'admin toute la plateforme."""
    scope = scope_for(actor)
    if scope.is_empty:
        return [], 0
    if actor.role is Role.CITIZEN:
        query = replace(query, exclude_types=query.exclude_types | STAFF_ONLY_EVENTS)
    items, total = log.list_activity(scope, query)
    if actor.role is Role.CITIZEN:
        for item in items:
            item.event = _for_citizen(item.event)
    _with_agent_names([item.event for item in items], agents)
    return items, total


def _with_agent_names(items: list[CitizenRequestEvent], agents: AgentRepository) -> None:
    # Le nom de l'agent est résolu à la lecture (un seul appel par agent distinct).
    names: dict[str, str | None] = {}
    for event in items:
        agent_id = event.payload.get("agent_id")
        if event.type is RequestEventType.ASSIGNED and agent_id:
            if agent_id not in names:
                agent = agents.get_by_id(agent_id)
                names[agent_id] = agent.name if agent else None
            event.payload = {**event.payload, "agent_name": names[agent_id]}
