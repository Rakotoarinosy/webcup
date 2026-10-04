from datetime import UTC, datetime

from sqlalchemy.orm import Session

from src.domain.onboarding import (
    OnboardingHint,
    OnboardingProgress,
    OnboardingRepository,
    OnboardingStep,
)
from src.infrastructure.persistence.models import OnboardingProgressModel


class SqlAlchemyOnboardingRepository(OnboardingRepository):
    def __init__(self, db: Session) -> None:
        self._db = db

    def get(self, user_id: str) -> OnboardingProgress | None:
        row = self._db.get(OnboardingProgressModel, user_id)
        return self._entity(row) if row else None

    def save(self, progress: OnboardingProgress) -> OnboardingProgress:
        row = self._db.get(OnboardingProgressModel, progress.user_id)
        if row is None:
            row = OnboardingProgressModel(user_id=progress.user_id)
            self._db.add(row)
        # Ordre stable : le JSON stocké reste lisible et comparable.
        row.completed_steps = [
            step.value for step in OnboardingStep if step in progress.completed_steps
        ]
        row.seen_hints = [hint.value for hint in OnboardingHint if hint in progress.seen_hints]
        row.dismissed = progress.dismissed
        row.updated_at = progress.updated_at or datetime.now(UTC)
        self._db.commit()
        return self._entity(row)

    @staticmethod
    def _entity(row: OnboardingProgressModel) -> OnboardingProgress:
        steps = {value for value in row.completed_steps or [] if value in OnboardingStep}
        hints = {value for value in row.seen_hints or [] if value in OnboardingHint}
        return OnboardingProgress(
            user_id=row.user_id,
            completed_steps=frozenset(OnboardingStep(value) for value in steps),
            seen_hints=frozenset(OnboardingHint(value) for value in hints),
            dismissed=row.dismissed,
            updated_at=row.updated_at,
        )
