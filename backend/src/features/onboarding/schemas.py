from pydantic import BaseModel, ConfigDict

from src.domain.onboarding import OnboardingHint, OnboardingStep


class OnboardingStepOut(BaseModel):
    step: OnboardingStep
    done: bool


class OnboardingOut(BaseModel):
    steps: list[OnboardingStepOut]
    seen_hints: list[OnboardingHint]
    dismissed: bool
    completed_count: int
    total: int
    is_complete: bool


class OnboardingPatch(BaseModel):
    model_config = ConfigDict(extra="forbid")

    dismissed: bool
