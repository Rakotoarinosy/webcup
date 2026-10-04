"""Port du service de génération de réponses de l'assistante."""

from typing import Protocol

from src.domain.municipal_content.entities import MunicipalService
from src.domain.virtual_assistant.entities import (
    AssistantMessage,
    AssistantQuery,
    AssistantReply,
    PlainExplanation,
)


class AssistantServiceCatalog(Protocol):
    def list_services(self) -> list[MunicipalService]: ...


class AssistantResponder(Protocol):
    def respond(self, query: AssistantQuery) -> AssistantReply: ...


class AssistantConversationRepository(Protocol):
    def list_messages(self, user_id: str, limit: int = 100) -> list[AssistantMessage]: ...

    def add(self, message: AssistantMessage) -> AssistantMessage: ...

    def clear(self, user_id: str) -> None: ...


class TextSimplifier(Protocol):
    def simplify(self, passage: str) -> PlainExplanation: ...
