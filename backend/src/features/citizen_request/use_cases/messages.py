"""Fil de messages d'une demande (F84) : réponses de la mairie, notes internes, réponses du citoyen.

Chaque message est journalisé (événement), ce qui alimente la timeline et les notifications :
le citoyen est prévenu d'une réponse publique, l'agent et le gestionnaire d'une réponse du citoyen.
"""

import uuid
from datetime import UTC, datetime

from src.domain.citizen_request import (
    Actor,
    CitizenRequestEventRepository,
    CitizenRequestRepository,
    MessageVisibility,
    RequestEventType,
    RequestMessage,
    RequestMessageRepository,
)
from src.domain.citizen_request.messages import (
    can_read_internal,
    ensure_can_post_message,
    ensure_can_read_messages,
    next_conversation_state,
)
from src.domain.user import User
from src.features.citizen_request.schemas import MessageIn
from src.features.citizen_request.use_cases.read import load_request
from src.features.citizen_request.use_cases.recording import record_event


def list_messages(
    request_id: str,
    actor: Actor,
    repo: CitizenRequestRepository,
    messages: RequestMessageRepository,
) -> list[RequestMessage]:
    """Le citoyen ne reçoit jamais les notes internes."""
    request = load_request(request_id, repo)
    ensure_can_read_messages(actor, request)
    return messages.list_for_request(request_id, include_internal=can_read_internal(actor, request))


def post_message(
    request_id: str,
    dto: MessageIn,
    user: User,
    actor: Actor,
    repo: CitizenRequestRepository,
    messages: RequestMessageRepository,
    events: CitizenRequestEventRepository,
    now: datetime | None = None,
) -> RequestMessage:
    now = now or datetime.now(UTC)
    request = load_request(request_id, repo)
    ensure_can_post_message(actor, request, dto.visibility)

    message = messages.add(
        RequestMessage(
            id=str(uuid.uuid4()),
            request_id=request_id,
            visibility=dto.visibility,
            body=dto.body,
            created_at=now,
            author_id=user.id,
            author_name=user.name,
            author_role=user.role,
        )
    )

    if dto.visibility is MessageVisibility.PUBLIC:
        request.conversation_state = next_conversation_state(
            request.conversation_state, from_staff=message.from_staff, visibility=dto.visibility
        )
        request.last_message_at = now
        repo.update(request)
        record_event(
            events,
            request_id,
            RequestEventType.MESSAGE_POSTED,
            user,
            now,
            {"message_id": message.id, "from_staff": message.from_staff},
        )
    else:
        record_event(
            events,
            request_id,
            RequestEventType.INTERNAL_NOTE_ADDED,
            user,
            now,
            {"message_id": message.id},
        )

    return message
