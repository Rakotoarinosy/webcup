"""Objets métier indépendants de FastAPI, Gemini et des schémas réseau."""

from dataclasses import dataclass
from enum import StrEnum

from src.domain.municipal_content.entities import MunicipalService


class AssistantResponsePreference(StrEnum):
    AUTO = "auto"
    CONCISE = "concise"
    STEPS = "steps"
    CHECKLIST = "checklist"


class AssistantReplyFormat(StrEnum):
    CONCISE = "concise"
    STEPS = "steps"
    CHECKLIST = "checklist"


class AssistantTurnRole(StrEnum):
    USER = "user"
    ASSISTANT = "assistant"


@dataclass(frozen=True, slots=True)
class AssistantTurn:
    role: AssistantTurnRole
    content: str


@dataclass(frozen=True, slots=True)
class AssistantQuery:
    message: str
    history: tuple[AssistantTurn, ...] = ()
    response_preference: AssistantResponsePreference = AssistantResponsePreference.AUTO
    available_services: tuple[MunicipalService, ...] = ()


@dataclass(frozen=True, slots=True)
class AssistantServiceRecommendation:
    id: str
    name: str
    category: str
    description: str
    contact_details: str
    opening_hours: str
    address: str | None = None


@dataclass(frozen=True, slots=True)
class AssistantReply:
    format: AssistantReplyFormat
    title: str
    message: str
    steps: tuple[str, ...] = ()
    notes: tuple[str, ...] = ()
    follow_up: str = ""
    service_ids: tuple[str, ...] = ()
    recommended_services: tuple[AssistantServiceRecommendation, ...] = ()


@dataclass(frozen=True, slots=True)
class GlossaryTerm:
    """Mot administratif du passage, expliqué avec des mots de tous les jours."""

    term: str
    definition: str


@dataclass(frozen=True, slots=True)
class PlainExplanation:
    """Explication simple d'un passage : elle complète le texte officiel sans le remplacer."""

    summary: str
    key_points: tuple[str, ...] = ()
    terms: tuple[GlossaryTerm, ...] = ()
