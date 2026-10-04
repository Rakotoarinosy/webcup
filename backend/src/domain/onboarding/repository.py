from abc import ABC, abstractmethod

from src.domain.onboarding.entities import OnboardingProgress


class OnboardingRepository(ABC):
    @abstractmethod
    def get(self, user_id: str) -> OnboardingProgress | None: ...

    @abstractmethod
    def save(self, progress: OnboardingProgress) -> OnboardingProgress: ...
