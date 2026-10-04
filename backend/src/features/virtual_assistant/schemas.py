"""Schémas HTTP du chatbot, séparés du modèle métier."""

from typing import Literal

from pydantic import BaseModel, Field

from src.domain.virtual_assistant import (
    AssistantNavigation,
    AssistantReply,
    AssistantReplyFormat,
    AssistantResponsePreference,
    AssistantServiceRecommendation,
    PlainExplanation,
)


class ChatTurnIn(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=1200)


class ChatIn(BaseModel):
    message: str = Field(min_length=1, max_length=1200)
    history: list[ChatTurnIn] = Field(default_factory=list, max_length=8)
    response_preference: AssistantResponsePreference = AssistantResponsePreference.AUTO


class ServiceRecommendationOut(BaseModel):
    id: str
    name: str
    category: str
    description: str
    contact_details: str
    opening_hours: str
    address: str | None

    @classmethod
    def from_domain(cls, service: AssistantServiceRecommendation) -> "ServiceRecommendationOut":
        return cls(
            id=service.id,
            name=service.name,
            category=service.category,
            description=service.description,
            contact_details=service.contact_details,
            opening_hours=service.opening_hours,
            address=service.address,
        )


class AssistantReplyOut(BaseModel):
    format: AssistantReplyFormat
    title: str
    message: str
    steps: list[str]
    notes: list[str]
    follow_up: str
    recommended_services: list[ServiceRecommendationOut]
    navigation: "NavigationOut | None" = None

    @classmethod
    def from_domain(
        cls, reply: AssistantReply, navigation: AssistantNavigation | None = None
    ) -> "AssistantReplyOut":
        return cls(
            format=reply.format,
            title=reply.title,
            message=reply.message,
            steps=list(reply.steps),
            notes=list(reply.notes),
            follow_up=reply.follow_up,
            recommended_services=[
                ServiceRecommendationOut.from_domain(service)
                for service in reply.recommended_services
            ],
            navigation=NavigationOut(intent=reply.navigation_key)
            if navigation and reply.navigation_key
            else None,
        )


class NavigationOut(BaseModel):
    intent: str


class ChatOut(BaseModel):
    response: AssistantReplyOut


class SimplifyIn(BaseModel):
    text: str = Field(min_length=20, max_length=5000)


class GlossaryTermOut(BaseModel):
    term: str
    definition: str


class PlainExplanationOut(BaseModel):
    summary: str
    key_points: list[str]
    terms: list[GlossaryTermOut]

    @classmethod
    def from_domain(cls, explanation: PlainExplanation) -> "PlainExplanationOut":
        return cls(
            summary=explanation.summary,
            key_points=list(explanation.key_points),
            terms=[
                GlossaryTermOut(term=term.term, definition=term.definition)
                for term in explanation.terms
            ],
        )


class ConversationMessageOut(BaseModel):
    role: Literal["user", "assistant"]
    content: str | AssistantReplyOut


class SpeechIn(BaseModel):
    text: str = Field(min_length=1, max_length=4000)
