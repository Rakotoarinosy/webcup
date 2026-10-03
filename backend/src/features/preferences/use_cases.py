from src.domain.preferences import (
    FontFamily,
    FontSize,
    PreferencesRepository,
    Theme,
    UserPreferences,
)


def get_preferences(user_id: str, repo: PreferencesRepository) -> UserPreferences:
    return repo.get_for_user(user_id) or UserPreferences(user_id=user_id)


def save_preferences(
    user_id: str,
    theme: Theme,
    font_size: FontSize,
    font_family: FontFamily,
    repo: PreferencesRepository,
) -> UserPreferences:
    return repo.save(
        UserPreferences(
            user_id=user_id,
            theme=theme,
            font_size=font_size,
            font_family=font_family,
        )
    )
