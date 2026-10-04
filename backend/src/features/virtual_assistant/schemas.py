"""Schémas HTTP du chatbot, séparés du modèle métier."""

from typing import Literal

from pydantic import BaseModel, Field

from src.domain.virtual_assistant import (
    AssistantReply,
    AssistantReplyFormat,
    AssistantResponsePreference,
    AssistantServiceRecommendation,
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

    @classmethod
    def from_domain(cls, reply: AssistantReply) -> "AssistantReplyOut":
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
        )


class ChatOut(BaseModel):
    response: AssistantReplyOut
