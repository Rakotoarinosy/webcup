"""Modèle métier et ports de l'assistante virtuelle."""

from src.domain.virtual_assistant.entities import (
    AssistantMessage,
    AssistantNavigation,
    AssistantQuery,
    AssistantReply,
    AssistantReplyFormat,
    AssistantResponsePreference,
    AssistantServiceRecommendation,
    AssistantTurn,
    AssistantTurnRole,
)
from src.domain.virtual_assistant.repository import (
    AssistantConversationRepository,
    AssistantResponder,
    AssistantServiceCatalog,
)

__all__ = [
    "AssistantConversationRepository",
    "AssistantMessage",
    "AssistantNavigation",
    "AssistantQuery",
    "AssistantReply",
    "AssistantReplyFormat",
    "AssistantResponder",
    "AssistantResponsePreference",
    "AssistantServiceCatalog",
    "AssistantServiceRecommendation",
    "AssistantTurn",
    "AssistantTurnRole",
]
