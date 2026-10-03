from sqlalchemy.orm import Session

from src.domain.preferences import PreferencesRepository, UserPreferences
from src.infrastructure.persistence.models import UserPreferenceModel


class SqlAlchemyPreferencesRepository(PreferencesRepository):
    def __init__(self, db: Session) -> None:
        self._db = db

    def get_for_user(self, user_id: str) -> UserPreferences | None:
        row = self._db.get(UserPreferenceModel, user_id)
        return self._entity(row) if row else None

    def save(self, preferences: UserPreferences) -> UserPreferences:
        row = self._db.get(UserPreferenceModel, preferences.user_id)
        if row is None:
            row = UserPreferenceModel(user_id=preferences.user_id)
            self._db.add(row)
        row.theme, row.font_size, row.font_family = (
            preferences.theme,
            preferences.font_size,
            preferences.font_family,
        )
        self._db.commit()
        return self._entity(row)

    @staticmethod
    def _entity(row: UserPreferenceModel) -> UserPreferences:
        return UserPreferences(row.user_id, row.theme, row.font_size, row.font_family)  # type: ignore[arg-type]
