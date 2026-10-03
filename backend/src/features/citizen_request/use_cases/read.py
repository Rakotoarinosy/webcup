"""Lecture des demandes : détail, liste paginée et timeline, toujours filtrées par les droits de l'Actor."""

from src.domain.agent import AgentRepository
from src.domain.citizen_request import (
    Actor,
    CitizenRequest,
    CitizenRequestEvent,
    CitizenRequestEventRepository,
    CitizenRequestNotFoundError,
    CitizenRequestRepository,
    RequestCategory,
    RequestEventType,
    RequestPriority,
    RequestSortBy,
    RequestStatus,
    SortOrder,
    ensure_can_view,
    scope_for,
)


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
) -> tuple[list[CitizenRequest], int]:
    """Le périmètre vient du rôle, jamais des paramètres du client."""
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

    # Le nom de l'agent est résolu à la lecture (un seul appel par agent distinct).
    names: dict[str, str | None] = {}
    for event in items:
        agent_id = event.payload.get("agent_id")
        if event.type is RequestEventType.ASSIGNED and agent_id:
            if agent_id not in names:
                agent = agents.get_by_id(agent_id)
                names[agent_id] = agent.name if agent else None
            event.payload = {**event.payload, "agent_name": names[agent_id]}

    return items
