from abc import ABC, abstractmethod

from src.domain.preferences.entities import UserPreferences


class PreferencesRepository(ABC):
    @abstractmethod
    def get_for_user(self, user_id: str) -> UserPreferences | None: ...

    @abstractmethod
    def save(self, preferences: UserPreferences) -> UserPreferences: ...
