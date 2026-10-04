"""Priorisation : critères saisis (urgence, citoyens concernés) et file priorisée."""

from datetime import UTC, datetime

from src.domain.citizen_request import (
    Actor,
    CitizenRequest,
    CitizenRequestEventRepository,
    CitizenRequestRepository,
    RequestClosedError,
    RequestEventType,
    RequestStatus,
    ensure_can_edit,
    scope_for,
)
from src.domain.citizen_request.priority import (
    PriorityItem,
    PriorityRepository,
    compute_score,
    priority_for,
)
from src.domain.user import User
from src.features.citizen_request.schemas import PriorityInputsIn
from src.features.citizen_request.use_cases.read import load_request
from src.features.citizen_request.use_cases.recording import record_event


def update_priority_inputs(
    request_id: str,
    dto: PriorityInputsIn,
    user: User,
    actor: Actor,
    repo: CitizenRequestRepository,
    events: CitizenRequestEventRepository,
    now: datetime | None = None,
) -> CitizenRequest:
    """L'auteur (demande nouvelle) ou le gestionnaire ajuste les critères ; score et priorité suivent."""
    now = now or datetime.now(UTC)
    request = load_request(request_id, repo)
    ensure_can_edit(actor, request)
    if not request.is_open:
        raise RequestClosedError(request_id)

    if dto.urgency is not None:
        request.urgency = dto.urgency
    if dto.affected_citizens is not None:
        request.affected_citizens = dto.affected_citizens

    previous_priority = request.priority
    rescore(request, now)
    request.updated_at = now
    updated = repo.update(request)

    if updated.priority is not previous_priority:
        record_event(
            events,
            request_id,
            RequestEventType.PRIORITY_CHANGED,
            user,
            now,
            {"from": previous_priority.value, "to": updated.priority.value, "manual": False},
        )

    return updated


def rescore(request: CitizenRequest, now: datetime) -> None:
    """Recalcule score et niveau : urgence, citoyens concernés (+ soutiens), ancienneté, criticité."""
    score = compute_score(
        urgency=request.urgency,
        affected_citizens=request.affected_citizens,
        created_at=request.created_at,
        category=request.category,
        now=now,
        supporters=request.support_count,
    )
    request.priority_score = score.total
    request.priority = priority_for(score.total)


def priority_queue(
    actor: Actor,
    priorities: PriorityRepository,
    *,
    status: RequestStatus | None,
    include_closed: bool,
    page: int,
    page_size: int,
) -> tuple[list[PriorityItem], int]:
    return priorities.ranked(
        scope=scope_for(actor),
        status=status,
        include_closed=include_closed,
        page=page,
        page_size=page_size,
    )
