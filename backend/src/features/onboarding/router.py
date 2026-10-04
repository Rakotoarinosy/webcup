"""Premiers pas du nouvel habitant (D12, F35) : progression mémorisée par utilisateur."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.domain.citizen_request import RequestScope, RequestSortBy, SortOrder
from src.domain.onboarding import (
    OnboardingFacts,
    OnboardingHint,
    OnboardingRepository,
    OnboardingStep,
    OnboardingView,
)
from src.domain.user import Role, User
from src.features.onboarding.schemas import OnboardingOut, OnboardingPatch, OnboardingStepOut
from src.features.onboarding.use_cases import (
    complete_step,
    get_onboarding,
    mark_hint_seen,
    set_dismissed,
)
from src.infrastructure.persistence.citizen_request_repository import (
    SqlAlchemyCitizenRequestRepository,
)
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.onboarding_repository import SqlAlchemyOnboardingRepository
from src.infrastructure.persistence.preferences_repository import SqlAlchemyPreferencesRepository
from src.infrastructure.security.deps import get_current_user

router = APIRouter(prefix="/onboarding", tags=["onboarding"])


def get_onboarding_repo(db: Session = Depends(get_db)) -> OnboardingRepository:
    return SqlAlchemyOnboardingRepository(db)


def get_onboarding_facts(
    user: User = Depends(get_current_user), db: Session = Depends(get_db)
) -> OnboardingFacts:
    """Étapes déjà accomplies ailleurs : langue enregistrée, première demande envoyée."""
    preferences = SqlAlchemyPreferencesRepository(db).get_for_user(user.id)
    has_request = False
    if user.role is Role.CITIZEN:
        _, total = SqlAlchemyCitizenRequestRepository(db).list_page(
            page=1,
            page_size=1,
            search=None,
            category=None,
            priority=None,
            status=None,
            scope=RequestScope(citizen_id=user.id),
            sort_by=RequestSortBy.CREATED_AT,
            sort_order=SortOrder.DESC,
        )
        has_request = total > 0
    return OnboardingFacts(
        language_chosen=preferences is not None and preferences.language is not None,
        has_request=has_request,
    )


def _out(view: OnboardingView) -> OnboardingOut:
    return OnboardingOut(
        steps=[OnboardingStepOut(step=step, done=done) for step, done in view.steps],
        seen_hints=[hint for hint in OnboardingHint if hint in view.seen_hints],
        dismissed=view.dismissed,
        completed_count=view.completed_count,
        total=len(view.steps),
        is_complete=view.is_complete,
    )


@router.get("/me", response_model=OnboardingOut)
def get_onboarding_endpoint(
    user: User = Depends(get_current_user),
    repo: OnboardingRepository = Depends(get_onboarding_repo),
    facts: OnboardingFacts = Depends(get_onboarding_facts),
) -> OnboardingOut:
    return _out(get_onboarding(user.id, repo, facts))


@router.post("/me/steps/{step}", response_model=OnboardingOut)
def complete_step_endpoint(
    step: OnboardingStep,
    user: User = Depends(get_current_user),
    repo: OnboardingRepository = Depends(get_onboarding_repo),
    facts: OnboardingFacts = Depends(get_onboarding_facts),
) -> OnboardingOut:
    return _out(complete_step(user.id, step, repo, facts))


@router.post("/me/hints/{hint}", response_model=OnboardingOut)
def mark_hint_seen_endpoint(
    hint: OnboardingHint,
    user: User = Depends(get_current_user),
    repo: OnboardingRepository = Depends(get_onboarding_repo),
    facts: OnboardingFacts = Depends(get_onboarding_facts),
) -> OnboardingOut:
    return _out(mark_hint_seen(user.id, hint, repo, facts))


@router.patch("/me", response_model=OnboardingOut)
def update_onboarding_endpoint(
    payload: OnboardingPatch,
    user: User = Depends(get_current_user),
    repo: OnboardingRepository = Depends(get_onboarding_repo),
    facts: OnboardingFacts = Depends(get_onboarding_facts),
) -> OnboardingOut:
    return _out(set_dismissed(user.id, payload.dismissed, repo, facts))
