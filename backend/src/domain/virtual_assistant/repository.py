"""Port du service de génération de réponses de l'assistante."""

from typing import Protocol

from src.domain.municipal_content.entities import MunicipalService
from src.domain.virtual_assistant.entities import (
    AssistantQuery,
    AssistantReply,
    PlainExplanation,
)


class AssistantServiceCatalog(Protocol):
    def list_services(self) -> list[MunicipalService]: ...


class AssistantResponder(Protocol):
    def respond(self, query: AssistantQuery) -> AssistantReply: ...


class TextSimplifier(Protocol):
    def simplify(self, passage: str) -> PlainExplanation: ...
