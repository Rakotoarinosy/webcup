"""Accueil des nouveaux arrivants (D12, F35) : checklist « Premiers pas » et bulles d'aide."""

from dataclasses import dataclass, field, replace
from datetime import datetime
from enum import StrEnum


class OnboardingStep(StrEnum):
    """Étapes de la checklist, dans l'ordre d'affichage."""

    PROFILE = "profile"
    LANGUAGE = "language"
    FIND_SERVICE = "find_service"
    FIRST_REQUEST = "first_request"


class OnboardingHint(StrEnum):
    """Bulles d'aide contextuelles : chacune n'est montrée qu'une fois."""

    MY_REQUESTS = "my_requests"
    NEW_REQUEST = "new_request"
    MUNICIPAL_SERVICES = "municipal_services"
    ORIENTATION = "orientation"


@dataclass(frozen=True)
class OnboardingProgress:
    user_id: str
    completed_steps: frozenset[OnboardingStep] = field(default_factory=frozenset)
    seen_hints: frozenset[OnboardingHint] = field(default_factory=frozenset)
    dismissed: bool = False
    updated_at: datetime | None = None

    def complete(self, step: OnboardingStep, now: datetime) -> "OnboardingProgress":
        return replace(self, completed_steps=self.completed_steps | {step}, updated_at=now)

    def see(self, hint: OnboardingHint, now: datetime) -> "OnboardingProgress":
        return replace(self, seen_hints=self.seen_hints | {hint}, updated_at=now)

    def with_dismissed(self, dismissed: bool, now: datetime) -> "OnboardingProgress":
        return replace(self, dismissed=dismissed, updated_at=now)


@dataclass(frozen=True)
class OnboardingFacts:
    """Ce que la plateforme sait déjà : une étape faite ailleurs est cochée d'office."""

    language_chosen: bool = False
    has_request: bool = False


@dataclass(frozen=True)
class OnboardingView:
    steps: tuple[tuple[OnboardingStep, bool], ...]
    seen_hints: frozenset[OnboardingHint]
    dismissed: bool

    @property
    def completed_count(self) -> int:
        return sum(1 for _, done in self.steps if done)

    @property
    def is_complete(self) -> bool:
        return self.completed_count == len(self.steps)


def build_view(progress: OnboardingProgress, facts: OnboardingFacts) -> OnboardingView:
    done = set(progress.completed_steps)
    if facts.language_chosen:
        done.add(OnboardingStep.LANGUAGE)
    if facts.has_request:
        done.add(OnboardingStep.FIRST_REQUEST)
    return OnboardingView(
        steps=tuple((step, step in done) for step in OnboardingStep),
        seen_hints=progress.seen_hints,
        dismissed=progress.dismissed,
    )
