"""Schémas Pydantic des signalements sur les données personnelles."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from src.domain.data_concern import ConcernStatus, ConcernTopic


class SubmitConcernIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    topic: ConcernTopic
    message: str = Field(min_length=10, max_length=5_000)


class AnswerConcernIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    response: str = Field(min_length=10, max_length=5_000)


class DataConcernOut(BaseModel):
    """Vue de l'habitant : sa contribution et la trace de son traitement."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    reference: str
    topic: ConcernTopic
    message: str
    status: ConcernStatus
    created_at: datetime
    updated_at: datetime
    reviewed_at: datetime | None
    response: str | None
    answered_at: datetime | None
    answered_by: str | None


class DataConcernAdminOut(DataConcernOut):
    """Vue de l'administration : on sait à qui répondre."""

    user_id: str
    user_name: str
    user_email: str
