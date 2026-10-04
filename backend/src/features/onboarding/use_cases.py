from datetime import UTC, datetime

from src.domain.onboarding import (
    OnboardingFacts,
    OnboardingHint,
    OnboardingProgress,
    OnboardingRepository,
    OnboardingStep,
    OnboardingView,
    build_view,
)


def _current(user_id: str, repo: OnboardingRepository) -> OnboardingProgress:
    return repo.get(user_id) or OnboardingProgress(user_id=user_id)


def get_onboarding(
    user_id: str, repo: OnboardingRepository, facts: OnboardingFacts
) -> OnboardingView:
    return build_view(_current(user_id, repo), facts)


def complete_step(
    user_id: str,
    step: OnboardingStep,
    repo: OnboardingRepository,
    facts: OnboardingFacts,
    now: datetime | None = None,
) -> OnboardingView:
    progress = repo.save(_current(user_id, repo).complete(step, now or datetime.now(UTC)))
    return build_view(progress, facts)


def mark_hint_seen(
    user_id: str,
    hint: OnboardingHint,
    repo: OnboardingRepository,
    facts: OnboardingFacts,
    now: datetime | None = None,
) -> OnboardingView:
    progress = repo.save(_current(user_id, repo).see(hint, now or datetime.now(UTC)))
    return build_view(progress, facts)


def set_dismissed(
    user_id: str,
    dismissed: bool,
    repo: OnboardingRepository,
    facts: OnboardingFacts,
    now: datetime | None = None,
) -> OnboardingView:
    progress = repo.save(
        _current(user_id, repo).with_dismissed(dismissed, now or datetime.now(UTC))
    )
    return build_view(progress, facts)
