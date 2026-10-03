"""Modification du contenu d'une demande et suppression.

Statut et agent ne passent jamais par ici : voir workflow.py.
"""

from dataclasses import replace
from datetime import UTC, datetime

from src.domain.citizen_request import (
    Actor,
    CitizenRequest,
    CitizenRequestEventRepository,
    CitizenRequestRepository,
    RequestClosedError,
    RequestEventType,
    can_manage,
    ensure_can_edit,
)
from src.domain.institut import InstitutRepository
from src.domain.user import ForbiddenError, User
from src.features.citizen_request.schemas import EditRequestIn
from src.features.citizen_request.use_cases.read import load_request
from src.features.citizen_request.use_cases.recording import record_event

MANAGER_ONLY_FIELDS = frozenset({"category", "priority"})


def edit_request(
    request_id: str,
    dto: EditRequestIn,
    user: User,
    actor: Actor,
    repo: CitizenRequestRepository,
    instituts: InstitutRepository,
    events: CitizenRequestEventRepository,
    now: datetime | None = None,
) -> CitizenRequest:
    now = now or datetime.now(UTC)
    request = load_request(request_id, repo)
    ensure_can_edit(actor, request)
    if not request.is_open:
        raise RequestClosedError(request_id)

    requested = dto.model_dump(exclude_unset=True, exclude_none=True)
    if MANAGER_ONLY_FIELDS & requested.keys() and not can_manage(actor, request):
        raise ForbiddenError("Only the institut manager can change category or priority")

    # Seuls les champs réellement modifiés comptent : pas d'événement ni de updated_at pour rien.
    changes = {key: value for key, value in requested.items() if getattr(request, key) != value}
    if not changes:
        return request

    previous = replace(request)
    for key, value in changes.items():
        setattr(request, key, value)
    if "category" in changes:
        _reroute(request, instituts)
    request.updated_at = now
    updated = repo.update(request)

    if "priority" in changes:
        record_event(
            events,
            request_id,
            RequestEventType.PRIORITY_CHANGED,
            user,
            now,
            {"from": previous.priority.value, "to": updated.priority.value, "manual": True},
        )
    fields = sorted(key for key in changes if key != "priority")
    if updated.institut_id != previous.institut_id:
        fields.append("institut_id")
    if fields:
        record_event(
            events,
            request_id,
            RequestEventType.UPDATED,
            user,
            now,
            {
                "fields": fields,
                "previous_institut_id": previous.institut_id,
                "unassigned_agent_id": (
                    previous.assigned_agent_id if updated.assigned_agent_id is None else None
                ),
            },
        )

    return updated


def delete_request(request_id: str, actor: Actor, repo: CitizenRequestRepository) -> None:
    request = load_request(request_id, repo)
    ensure_can_edit(actor, request)
    repo.delete(request_id)


def _reroute(request: CitizenRequest, instituts: InstitutRepository) -> None:
    """Nouvelle catégorie : nouvel institut. L'agent d'un autre institut est retiré."""
    institut = instituts.find_for_category(request.category)
    new_institut_id = institut.id if institut else None
    if new_institut_id != request.institut_id:
        request.institut_id = new_institut_id
        request.assigned_agent_id = None
