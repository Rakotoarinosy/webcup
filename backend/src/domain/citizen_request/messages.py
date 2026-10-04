"""Fil de messages d'une demande (F84) : réponses de la mairie, notes internes, réponses du citoyen.

| Qui                                   | Lire                     | Écrire                         |
|---------------------------------------|--------------------------|--------------------------------|
| Citoyen auteur                        | réponses publiques       | réponse publique (demande ouverte) |
| Agent attribué, manager de l'institut, admin | tout, notes comprises | réponse publique ou note interne |
| Autres                                | rien                     | rien                           |
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum

from src.domain.citizen_request.access import Actor, can_change_status, can_view
from src.domain.citizen_request.entities import CitizenRequest, ConversationState
from src.domain.citizen_request.exceptions import RequestClosedError
from src.domain.user.entities import Role
from src.domain.user.exceptions import ForbiddenError

MESSAGE_MAX_LENGTH = 4000


class MessageVisibility(StrEnum):
    PUBLIC = "public"  # réponse visible du citoyen
    INTERNAL = "internal"  # note interne, réservée aux agents et gestionnaires


@dataclass(frozen=True)
class RequestMessage:
    id: str
    request_id: str
    visibility: MessageVisibility
    body: str
    created_at: datetime
    # Instantanés : le fil reste lisible si le compte est renommé ou supprimé.
    author_id: str | None
    author_name: str
    author_role: Role

    @property
    def from_staff(self) -> bool:
        return self.author_role is not Role.CITIZEN


def is_staff_for(actor: Actor, request: CitizenRequest) -> bool:
    """Agent attribué, manager de l'institut ou admin : ceux qui répondent au nom de la mairie."""
    return actor.role is not Role.CITIZEN and can_change_status(actor, request)


def can_read_internal(actor: Actor, request: CitizenRequest) -> bool:
    return is_staff_for(actor, request)


def ensure_can_read_messages(actor: Actor, request: CitizenRequest) -> None:
    if not can_view(actor, request):
        raise ForbiddenError()


def ensure_can_post_message(
    actor: Actor, request: CitizenRequest, visibility: MessageVisibility
) -> None:
    if is_staff_for(actor, request):
        return
    if actor.role is Role.CITIZEN and request.citizen_id == actor.user_id:
        if visibility is MessageVisibility.INTERNAL:
            raise ForbiddenError("Citizens cannot write internal notes")
        if not request.is_open:
            raise RequestClosedError(request.id)
        return
    raise ForbiddenError()


def next_conversation_state(
    current: ConversationState, *, from_staff: bool, visibility: MessageVisibility
) -> ConversationState:
    """Une note interne ne change rien ; sinon, le dernier qui a écrit attend l'autre."""
    if visibility is MessageVisibility.INTERNAL:
        return current
    return ConversationState.ANSWERED if from_staff else ConversationState.AWAITING_STAFF


class RequestMessageRepository(ABC):
    @abstractmethod
    def add(self, message: RequestMessage) -> RequestMessage: ...

    @abstractmethod
    def list_for_request(self, request_id: str, *, include_internal: bool) -> list[RequestMessage]:
        """Du plus ancien au plus récent."""
