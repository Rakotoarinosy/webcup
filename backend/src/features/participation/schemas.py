"""Schémas Pydantic de la participation des habitants."""

from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, model_validator

from src.domain.participation import (
    ConsultationKind,
    ConsultationPhase,
    IdeaStatus,
    IdeaTheme,
    IdeaVisibility,
    ProjectStatus,
)


class _Patch(BaseModel):
    """Modification partielle : au moins un champ, jamais de champ inconnu."""

    model_config = ConfigDict(extra="forbid")

    @model_validator(mode="after")
    def require_one_field(self) -> "_Patch":
        if not self.model_fields_set:
            raise ValueError("Indiquez au moins un champ à modifier")
        return self


# ─── projets ────────────────────────────────────────────────────────


class ProjectIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=3, max_length=200)
    summary: str = Field(min_length=10, max_length=500)
    description: str = Field(min_length=10, max_length=10_000)
    district: str = Field(min_length=2, max_length=120)
    location: str | None = Field(default=None, max_length=255)
    budget: str | None = Field(default=None, max_length=120)
    status: ProjectStatus = ProjectStatus.PLANNED
    progress: int = Field(default=0, ge=0, le=100)
    planned_start: date | None = None
    planned_end: date | None = None
    is_published: bool = True


class ProjectPatch(_Patch):
    title: str | None = Field(default=None, min_length=3, max_length=200)
    summary: str | None = Field(default=None, min_length=10, max_length=500)
    description: str | None = Field(default=None, min_length=10, max_length=10_000)
    district: str | None = Field(default=None, min_length=2, max_length=120)
    location: str | None = Field(default=None, max_length=255)
    budget: str | None = Field(default=None, max_length=120)
    status: ProjectStatus | None = None
    progress: int | None = Field(default=None, ge=0, le=100)
    planned_start: date | None = None
    planned_end: date | None = None
    is_published: bool | None = None


class ProjectNewsIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=3, max_length=200)
    content: str = Field(min_length=10, max_length=5_000)


class ProjectUpdateOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    content: str
    published_at: datetime
    author_name: str


class ProjectOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    summary: str
    description: str
    district: str
    location: str | None
    budget: str | None
    status: ProjectStatus
    progress: int
    planned_start: date | None
    planned_end: date | None
    is_published: bool
    created_at: datetime
    updated_at: datetime
    updates: list[ProjectUpdateOut]


# ─── consultations ──────────────────────────────────────────────────


class ConsultationIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=5, max_length=200)
    question: str = Field(min_length=5, max_length=500)
    description: str = Field(default="", max_length=5_000)
    kind: ConsultationKind
    options: list[str] = Field(default_factory=list, max_length=10)
    rules: str | None = Field(default=None, max_length=2_000)
    opens_at: datetime
    closes_at: datetime
    project_id: str | None = None
    is_published: bool = True


class ConsultationPatch(_Patch):
    title: str | None = Field(default=None, min_length=5, max_length=200)
    question: str | None = Field(default=None, min_length=5, max_length=500)
    description: str | None = Field(default=None, max_length=5_000)
    kind: ConsultationKind | None = None
    options: list[str] | None = Field(default=None, max_length=10)
    rules: str | None = Field(default=None, max_length=2_000)
    opens_at: datetime | None = None
    closes_at: datetime | None = None
    project_id: str | None = None
    is_published: bool | None = None


class DecisionIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    decision: str = Field(min_length=10, max_length=5_000)


class ConsultationAnswerIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    choice: str | None = Field(default=None, max_length=120)
    comment: str | None = Field(default=None, max_length=2_000)


class OptionResultOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    option: str
    count: int


class ResultsOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    total: int
    options: list[OptionResultOut]


class ConsultationOut(BaseModel):
    id: str
    title: str
    question: str
    description: str
    kind: ConsultationKind
    options: list[str]
    rules: str
    opens_at: datetime
    closes_at: datetime
    phase: ConsultationPhase
    is_published: bool
    project_id: str | None
    project_title: str | None
    # Publics seulement après la clôture ; toujours visibles par la mairie.
    results: ResultsOut | None
    decision: str | None
    decided_at: datetime | None
    decided_by: str | None


class ContributionOut(BaseModel):
    """Réponse anonymisée, pour l'analyse par la mairie."""

    choice: str | None
    comment: str | None
    submitted_at: datetime


class ConsultationResponseOut(BaseModel):
    """Confirmation remise à l'habitant : référence et date d'enregistrement."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    reference: str
    consultation_id: str
    choice: str | None
    comment: str | None
    created_at: datetime
    updated_at: datetime


# ─── idées ──────────────────────────────────────────────────────────


class IdeaIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=5, max_length=150)
    description: str = Field(min_length=20, max_length=5_000)
    theme: IdeaTheme
    district: str | None = Field(default=None, max_length=120)


class IdeaStatusIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    status: IdeaStatus
    response: str | None = Field(default=None, max_length=5_000)


class IdeaModerationIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    visibility: IdeaVisibility
    note: str | None = Field(default=None, max_length=500)


class IdeaStepOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    status: IdeaStatus
    at: datetime
    note: str | None
    by: str | None


class PublicIdeaOut(BaseModel):
    """Idée publiée : sans l'identité de son auteur."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    reference: str
    title: str
    description: str
    theme: IdeaTheme
    district: str | None
    status: IdeaStatus
    support_count: int
    response: str | None
    answered_by: str | None
    answered_at: datetime | None
    created_at: datetime


class IdeaOut(PublicIdeaOut):
    """Vue de l'auteur : la trace complète, modération comprise."""

    visibility: IdeaVisibility
    moderation_note: str | None
    updated_at: datetime
    history: list[IdeaStepOut]


class IdeaAdminOut(IdeaOut):
    user_id: str
    user_name: str


class SupportOut(BaseModel):
    supported: bool
    support_count: int


# ─── avis sur les services ──────────────────────────────────────────


class ReviewIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    rating: int = Field(ge=1, le=5)
    comment: str = Field(min_length=5, max_length=2_000)


class ReviewAnswerIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    response: str = Field(min_length=10, max_length=2_000)


class ReviewModerationIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    hidden: bool


class PublicReviewOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    rating: int
    comment: str
    created_at: datetime
    updated_at: datetime
    response: str | None
    answered_by: str | None
    answered_at: datetime | None


class ReviewOut(PublicReviewOut):
    reference: str
    service_id: str
    service_name: str
    is_hidden: bool


class ReviewAdminOut(ReviewOut):
    user_name: str


class ServiceRatingOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    service_id: str
    average: float
    count: int


class ServiceReviewsOut(BaseModel):
    service_id: str
    service_name: str
    average: float | None
    count: int
    reviews: list[PublicReviewOut]


# ─── ma participation ───────────────────────────────────────────────


class MyConsultationResponseOut(ConsultationResponseOut):
    consultation_title: str
    kind: ConsultationKind
    phase: ConsultationPhase
    closes_at: datetime
    decision: str | None
    decided_at: datetime | None


class MyParticipationOut(BaseModel):
    ideas: list[IdeaOut]
    consultation_responses: list[MyConsultationResponseOut]
    reviews: list[ReviewOut]
    supported_idea_ids: list[str]
