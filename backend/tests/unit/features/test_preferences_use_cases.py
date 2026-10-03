from src.domain.preferences import PreferencesRepository, UserPreferences
from src.features.preferences.use_cases import get_preferences, save_preferences


class FakePreferencesRepository(PreferencesRepository):
    def __init__(self) -> None:
        self.values: dict[str, UserPreferences] = {}

    def get_for_user(self, user_id: str) -> UserPreferences | None:
        return self.values.get(user_id)

    def save(self, preferences: UserPreferences) -> UserPreferences:
        self.values[preferences.user_id] = preferences
        return preferences


def test_get_preferences_returns_defaults_for_a_new_user() -> None:
    preferences = get_preferences("citizen-1", FakePreferencesRepository())

    assert preferences == UserPreferences(user_id="citizen-1")


def test_save_preferences_replaces_the_existing_user_preferences() -> None:
    repo = FakePreferencesRepository()
    save_preferences("citizen-1", "dark", "large", "serif", repo)

    preferences = get_preferences("citizen-1", repo)

    assert preferences == UserPreferences(
        user_id="citizen-1", theme="dark", font_size="large", font_family="serif"
    )


def test_save_preferences_accepts_a_modern_font_family() -> None:
    repo = FakePreferencesRepository()

    preferences = save_preferences("citizen-1", "light", "medium", "manrope", repo)

    assert preferences.font_family == "manrope"
