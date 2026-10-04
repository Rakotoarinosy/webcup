"""Modèle métier et ports de l'assistante virtuelle."""

from src.domain.virtual_assistant.entities import (
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
    AssistantResponder,
    AssistantServiceCatalog,
    TextSimplifier,
)

__all__ = [
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
