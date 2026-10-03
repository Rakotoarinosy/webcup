"""Cycle de vie d'une demande : changement de statut et attribution à un agent.

Les transitions autorisées sont portées par CitizenRequest.change_status (domaine).
Chaque action écrit un événement dans le journal (timeline, notifications).
"""

from datetime import UTC, datetime

from src.domain.agent import AgentNotFoundError, AgentRepository
from src.domain.citizen_request import (
    Actor,
    CitizenRequest,
    CitizenRequestEventRepository,
    CitizenRequestRepository,
    RequestEventType,
    RequestStatus,
    ensure_agent_assignable,
    ensure_can_change_status,
    ensure_can_manage,
)
from src.domain.citizen_request.priority import as_utc
from src.domain.user import User
from src.features.citizen_request.schemas import AssignRequestIn
from src.features.citizen_request.use_cases.read import load_request
from src.features.citizen_request.use_cases.recording import record_event

_EVENT_BY_TARGET = {
    RequestStatus.RESOLVED: RequestEventType.RESOLVED,
    RequestStatus.REJECTED: RequestEventType.REJECTED,
}


def change_status(
    request_id: str,
    target: RequestStatus,
    user: User,
    actor: Actor,
    repo: CitizenRequestRepository,
    events: CitizenRequestEventRepository,
    now: datetime | None = None,
) -> CitizenRequest:
    """Rejeter est une décision de gestionnaire ; avancer le traitement est permis à l'agent attribué."""
    now = now or datetime.now(UTC)
    request = load_request(request_id, repo)
    if target is RequestStatus.REJECTED:
        ensure_can_manage(actor, request)
    else:
        ensure_can_change_status(actor, request)

    previous = request.status
    request.change_status(target, now)
    updated = repo.update(request)
    record_event(
        events,
        request_id,
        _EVENT_BY_TARGET.get(target, RequestEventType.STATUS_CHANGED),
        user,
        now,
        {"from": previous.value, "to": target.value},
    )

    return updated


def assign_request(
    request_id: str,
    dto: AssignRequestIn,
    user: User,
    actor: Actor,
    repo: CitizenRequestRepository,
    agents: AgentRepository,
    events: CitizenRequestEventRepository,
    now: datetime | None = None,
) -> CitizenRequest:
    """Attribue la demande ; une demande nouvelle ou en attente passe « En cours »."""
    now = now or datetime.now(UTC)
    request = load_request(request_id, repo)
    ensure_can_manage(actor, request)

    agent = agents.get_by_id(dto.agent_id)
    if agent is None:
        raise AgentNotFoundError(dto.agent_id)
    ensure_agent_assignable(request, agent)

    previous_agent_id = request.assigned_agent_id
    previous_status = request.status
    request.assign_to(agent.id, now)
    # Demande sans institut (traitée par l'admin) : elle rejoint l'institut de l'agent choisi.
    if request.institut_id is None:
        request.institut_id = agent.institut_id
    if dto.scheduled_at is not None:
        request.scheduled_at = as_utc(dto.scheduled_at)
    if request.status is not RequestStatus.IN_PROGRESS:
        request.change_status(RequestStatus.IN_PROGRESS, now)

    updated = repo.update(request)
    record_event(
        events,
        request_id,
        RequestEventType.ASSIGNED,
        user,
        now,
        {
            "agent_id": agent.id,
            "previous_agent_id": previous_agent_id,
            "scheduled_at": updated.scheduled_at.isoformat() if updated.scheduled_at else None,
            "from": previous_status.value,
            "to": updated.status.value,
        },
    )

    return updated
