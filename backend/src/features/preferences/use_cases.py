from dataclasses import replace

from src.domain.i18n import Language
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
    language: Language | None = None,
) -> UserPreferences:
    """Remplace l'affichage ; la langue n'est modifiée que si elle est fournie."""
    current = get_preferences(user_id, repo)
    return repo.save(
        UserPreferences(
            user_id=user_id,
            theme=theme,
            font_size=font_size,
            font_family=font_family,
            language=language or current.language,
        )
    )


def update_preferences(
    user_id: str,
    repo: PreferencesRepository,
    *,
    theme: Theme | None = None,
    font_size: FontSize | None = None,
    font_family: FontFamily | None = None,
    language: Language | None = None,
) -> UserPreferences:
    current = get_preferences(user_id, repo)
    return repo.save(
        replace(
            current,
            theme=theme or current.theme,
            font_size=font_size or current.font_size,
            font_family=font_family or current.font_family,
            language=language or current.language,
        )
    )
