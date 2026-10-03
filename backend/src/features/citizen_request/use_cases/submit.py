"""Soumission d'une demande : routage vers l'institut de la catégorie, priorité calculée."""

import uuid
from datetime import UTC, datetime

from src.domain.citizen_request import (
    Actor,
    CitizenRequest,
    CitizenRequestEventRepository,
    CitizenRequestRepository,
    CitizenRequiredError,
    NotACitizenError,
    RequestEventType,
    RequestStatus,
    can_create_for,
)
from src.domain.citizen_request.priority import compute_score, priority_for
from src.domain.institut import InstitutRepository
from src.domain.user import ForbiddenError, Role, User, UserRepository
from src.features.citizen_request.schemas import SubmitRequestIn
from src.features.citizen_request.use_cases.recording import record_event


def submit_request(
    dto: SubmitRequestIn,
    user: User,
    actor: Actor,
    repo: CitizenRequestRepository,
    users: UserRepository,
    instituts: InstitutRepository,
    events: CitizenRequestEventRepository,
    now: datetime | None = None,
) -> CitizenRequest:
    now = now or datetime.now(UTC)
    citizen_id = _citizen_for(dto, actor)
    if not can_create_for(actor, citizen_id):
        raise ForbiddenError()
    if citizen_id != actor.user_id:
        _ensure_active_citizen(citizen_id, users)

    institut = instituts.find_for_category(dto.category)
    score = compute_score(
        urgency=dto.urgency,
        affected_citizens=dto.affected_citizens,
        created_at=now,
        category=dto.category,
        now=now,
    )
    request = repo.add(
        CitizenRequest(
            id=str(uuid.uuid4()),
            title=dto.title,
            description=dto.description,
            category=dto.category,
            priority=priority_for(score.total),
            status=RequestStatus.NEW,
            citizen_id=citizen_id,
            created_at=now,
            updated_at=now,
            location=dto.location,
            latitude=dto.latitude,
            longitude=dto.longitude,
            urgency=dto.urgency,
            affected_citizens=dto.affected_citizens,
            priority_score=score.total,
            institut_id=institut.id if institut else None,
        )
    )
    record_event(
        events,
        request.id,
        RequestEventType.CREATED,
        user,
        now,
        {
            "title": request.title,
            "category": request.category.value,
            "priority": request.priority.value,
            "institut_id": request.institut_id,
        },
    )

    return request


def _citizen_for(dto: SubmitRequestIn, actor: Actor) -> str:
    # Un citoyen soumet toujours pour lui-même, quel que soit le citizen_id envoyé.
    if actor.role is Role.CITIZEN:
        return actor.user_id
    if dto.citizen_id is None:
        raise CitizenRequiredError()

    return dto.citizen_id


def _ensure_active_citizen(user_id: str, users: UserRepository) -> None:
    citizen = users.get_by_id(user_id)
    if citizen is None or citizen.role is not Role.CITIZEN or not citizen.is_active:
        raise NotACitizenError(user_id)
