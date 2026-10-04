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
    GlossaryTerm,
    PlainExplanation,
)
from src.domain.virtual_assistant.repository import (
    AssistantConversationRepository,
    AssistantResponder,
    AssistantServiceCatalog,
    TextSimplifier,
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
    "GlossaryTerm",
    "PlainExplanation",
    "TextSimplifier",
]
