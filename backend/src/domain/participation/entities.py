"""Participation des habitants : projets de la ville, consultations, boîte à idées, avis sur les services.

Chaque contribution d'un habitant reçoit une référence lisible et une date, et garde la trace
de ce que la mairie en a fait (étapes datées, réponse écrite, décision publiée), pour que
l'habitant sache que sa contribution a bien été prise en compte.
"""

from dataclasses import dataclass, field
from datetime import date, datetime
from enum import StrEnum

from src.domain.participation.exceptions import (
    ConsultationNotClosedError,
    ConsultationNotOpenError,
    DecisionAlreadyPublishedError,
    IdeaTransitionError,
    InvalidConsultationError,
    InvalidProjectScheduleError,
    MotivatedResponseRequiredError,
    ReviewAlreadyAnsweredError,
)

# ─── projets de la ville (F67) ──────────────────────────────────────


class ProjectStatus(StrEnum):
    PLANNED = "À l'étude"
    IN_PROGRESS = "En cours"
    COMPLETED = "Terminé"
    SUSPENDED = "Suspendu"


@dataclass
class ProjectUpdate:
    """Étape datée ou actualité d'un projet, visible par tous."""

    id: str
    project_id: str
    title: str
    content: str
    published_at: datetime
    author_name: str


@dataclass
class CityProject:
    id: str
    title: str
    summary: str
    description: str
    district: str  # quartier ou secteur de la ville
    created_at: datetime
    updated_at: datetime
    status: ProjectStatus = ProjectStatus.PLANNED
    progress: int = 0  # avancement en pourcentage
    location: str | None = None
    budget: str | None = None  # texte libre avec l'unité : « 450 000 crédits »
    planned_start: date | None = None
    planned_end: date | None = None
    is_published: bool = True
    updates: list[ProjectUpdate] = field(default_factory=list)

    def check_schedule(self) -> None:
        if self.planned_start and self.planned_end and self.planned_end < self.planned_start:
            raise InvalidProjectScheduleError()
        if not 0 <= self.progress <= 100:
            raise InvalidProjectScheduleError("Progress must be between 0 and 100")
        if self.status is ProjectStatus.COMPLETED:
            self.progress = 100


# ─── consultations (F65, F66) ───────────────────────────────────────


class ConsultationKind(StrEnum):
    VOTE = "Vote à choix"
    OPINION = "Avis libre"


class ConsultationPhase(StrEnum):
    UPCOMING = "À venir"
    OPEN = "Ouverte"
    CLOSED = "Clôturée"
    DECIDED = "Décision publiée"


DEFAULT_RULES = (
    "Une seule réponse par habitant connecté, modifiable jusqu'à la clôture. "
    "Les résultats sont publiés après la clôture, de façon anonyme et globale, "
    "avec la suite que la mairie leur donne."
)

MAX_OPTIONS = 10


@dataclass
class Consultation:
    id: str
    title: str
    question: str
    kind: ConsultationKind
    opens_at: datetime
    closes_at: datetime
    created_at: datetime
    updated_at: datetime
    description: str = ""
    rules: str = DEFAULT_RULES
    options: list[str] = field(default_factory=list)
    project_id: str | None = None
    is_published: bool = True
    decision: str | None = None
    decided_at: datetime | None = None
    decided_by: str | None = None

    def check(self) -> None:
        if self.closes_at <= self.opens_at:
            raise InvalidConsultationError("The consultation must close after it opens")
        if self.kind is ConsultationKind.VOTE:
            labels = [option.casefold() for option in self.options]
            if not 2 <= len(self.options) <= MAX_OPTIONS or len(set(labels)) != len(labels):
                raise InvalidConsultationError(
                    f"A vote needs between 2 and {MAX_OPTIONS} distinct options"
                )
        elif self.options:
            raise InvalidConsultationError("A free opinion consultation has no options")

    def phase(self, now: datetime) -> ConsultationPhase:
        if self.decision:
            return ConsultationPhase.DECIDED
        if now < self.opens_at:
            return ConsultationPhase.UPCOMING
        if now < self.closes_at:
            return ConsultationPhase.OPEN
        return ConsultationPhase.CLOSED

    def ensure_open(self, now: datetime) -> None:
        if not self.is_published or self.phase(now) is not ConsultationPhase.OPEN:
            raise ConsultationNotOpenError(self.title)

    def close(self, now: datetime) -> None:
        """Clôture anticipée : les résultats deviennent publics."""
        self.ensure_open(now)
        self.closes_at = now
        self.updated_at = now

    def decide(self, decision: str, decided_by: str, now: datetime) -> None:
        """La suite donnée est publiée une fois, après la clôture, et reste telle quelle."""
        phase = self.phase(now)
        if phase is ConsultationPhase.DECIDED:
            raise DecisionAlreadyPublishedError(self.title)
        if phase is not ConsultationPhase.CLOSED:
            raise ConsultationNotClosedError(self.title)
        self.decision = decision
        self.decided_by = decided_by
        self.decided_at = now
        self.updated_at = now

    def validate_answer(self, choice: str | None, comment: str | None) -> None:
        if self.kind is ConsultationKind.VOTE:
            if choice not in self.options:
                raise InvalidConsultationError("Choose one of the proposed options")
        elif choice is not None or not comment:
            raise InvalidConsultationError("A free opinion needs a written answer")


@dataclass
class ConsultationResponse:
    """Réponse d'un habitant : une seule par consultation, modifiable tant qu'elle est ouverte."""

    id: str
    reference: str  # ex. CP-20261004-1A2B3C4D
    consultation_id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    choice: str | None = None
    comment: str | None = None


@dataclass(frozen=True)
class OptionResult:
    option: str
    count: int


@dataclass(frozen=True)
class ConsultationResults:
    """Résultats agrégés et anonymes."""

    total: int
    options: list[OptionResult]


def tally(
    consultation: Consultation, responses: "list[ConsultationResponse]"
) -> ConsultationResults:
    counts = {option: 0 for option in consultation.options}
    for response in responses:
        if response.choice in counts:
            counts[response.choice] += 1
    return ConsultationResults(
        total=len(responses),
        options=[OptionResult(option, count) for option, count in counts.items()],
    )


# ─── boîte à idées (F68) ────────────────────────────────────────────


class IdeaTheme(StrEnum):
    ENVIRONMENT = "Environnement et nature"
    MOBILITY = "Déplacements"
    LIVING = "Cadre de vie"
    CULTURE = "Culture, sport et loisirs"
    SOLIDARITY = "Solidarité et vie sociale"
    SERVICES = "Services et numérique"
    OTHER = "Autre"


class IdeaStatus(StrEnum):
    RECEIVED = "Reçue"
    UNDER_STUDY = "À l'étude"
    ACCEPTED = "Retenue"
    REJECTED = "Non retenue"
    DONE = "Réalisée"


class IdeaVisibility(StrEnum):
    PENDING = "En attente de modération"
    PUBLIC = "Publiée"
    HIDDEN = "Non publiée"


IDEA_TRANSITIONS: dict[IdeaStatus, frozenset[IdeaStatus]] = {
    IdeaStatus.RECEIVED: frozenset(
        {IdeaStatus.UNDER_STUDY, IdeaStatus.ACCEPTED, IdeaStatus.REJECTED}
    ),
    IdeaStatus.UNDER_STUDY: frozenset({IdeaStatus.ACCEPTED, IdeaStatus.REJECTED}),
    IdeaStatus.ACCEPTED: frozenset({IdeaStatus.DONE}),
    IdeaStatus.REJECTED: frozenset(),
    IdeaStatus.DONE: frozenset(),
}

# Une décision sur l'idée est toujours motivée par écrit.
MOTIVATED_STATUSES = frozenset({IdeaStatus.ACCEPTED, IdeaStatus.REJECTED, IdeaStatus.DONE})


@dataclass(frozen=True)
class IdeaStep:
    status: IdeaStatus
    at: datetime
    note: str | None = None
    by: str | None = None  # nom affiché à l'habitant


@dataclass
class Idea:
    id: str
    reference: str  # ex. ID-20261004-1A2B3C4D
    user_id: str
    title: str
    description: str
    theme: IdeaTheme
    created_at: datetime
    updated_at: datetime
    district: str | None = None
    status: IdeaStatus = IdeaStatus.RECEIVED
    visibility: IdeaVisibility = IdeaVisibility.PENDING
    moderation_note: str | None = None
    support_count: int = 0
    response: str | None = None  # dernière réponse motivée de la mairie
    answered_by: str | None = None
    answered_at: datetime | None = None
    history: list[IdeaStep] = field(default_factory=list)

    def advance(self, status: IdeaStatus, note: str | None, by: str, now: datetime) -> None:
        if status not in IDEA_TRANSITIONS[self.status]:
            raise IdeaTransitionError(self.status.value, status.value)
        if status in MOTIVATED_STATUSES and not note:
            raise MotivatedResponseRequiredError()
        self.status = status
        self.history.append(IdeaStep(status=status, at=now, note=note, by=by))
        if note:
            self.response = note
            self.answered_by = by
            self.answered_at = now
        self.updated_at = now

    def moderate(self, visibility: IdeaVisibility, note: str | None, now: datetime) -> None:
        self.visibility = visibility
        self.moderation_note = note
        self.updated_at = now

    @property
    def can_be_supported(self) -> bool:
        return self.visibility is IdeaVisibility.PUBLIC and self.status is not IdeaStatus.REJECTED


# ─── avis sur les services municipaux (F76) ─────────────────────────


@dataclass
class ServiceReview:
    """Un avis par habitant et par service, modifiable ; la mairie peut y répondre."""

    id: str
    reference: str  # ex. AV-20261004-1A2B3C4D
    service_id: str
    user_id: str
    rating: int  # 1 à 5
    comment: str
    created_at: datetime
    updated_at: datetime
    response: str | None = None
    answered_by: str | None = None
    answered_at: datetime | None = None
    is_hidden: bool = False  # masqué par la modération : exclu de la page publique et de la note

    def revise(self, rating: int, comment: str, now: datetime) -> None:
        self.rating = rating
        self.comment = comment
        self.updated_at = now

    def answer(self, response: str, answered_by: str, now: datetime) -> None:
        if self.response is not None:
            raise ReviewAlreadyAnsweredError(self.reference)
        self.response = response
        self.answered_by = answered_by
        self.answered_at = now
        self.updated_at = now


@dataclass(frozen=True)
class ServiceRating:
    service_id: str
    average: float
    count: int
