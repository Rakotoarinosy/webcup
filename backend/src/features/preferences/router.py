from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.domain.preferences import PreferencesRepository, UserPreferences
from src.domain.user import User
from src.features.preferences.schemas import PreferencesIn, PreferencesOut, PreferencesPatch
from src.features.preferences.use_cases import get_preferences, update_preferences
from src.features.preferences.use_cases import save_preferences as save_user_preferences
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.preferences_repository import SqlAlchemyPreferencesRepository
from src.infrastructure.security.deps import get_current_user

router = APIRouter(prefix="/preferences", tags=["preferences"])


def get_preferences_repo(db: Session = Depends(get_db)) -> PreferencesRepository:
    return SqlAlchemyPreferencesRepository(db)


def _out(value: UserPreferences) -> PreferencesOut:
    return PreferencesOut(
        theme=value.theme,
        font_size=value.font_size,
        font_family=value.font_family,
        language=value.language,
    )


@router.get("/me", response_model=PreferencesOut)
def get_preferences_endpoint(
    user: User = Depends(get_current_user),
    repo: PreferencesRepository = Depends(get_preferences_repo),
) -> PreferencesOut:
    return _out(get_preferences(user.id, repo))


@router.put("/me", response_model=PreferencesOut)
def save_preferences(
    payload: PreferencesIn,
    user: User = Depends(get_current_user),
    repo: PreferencesRepository = Depends(get_preferences_repo),
) -> PreferencesOut:
    value = save_user_preferences(
        user.id, payload.theme, payload.font_size, payload.font_family, repo, payload.language
    )
    return _out(value)


@router.patch("/me", response_model=PreferencesOut)
def patch_preferences(
    payload: PreferencesPatch,
    user: User = Depends(get_current_user),
    repo: PreferencesRepository = Depends(get_preferences_repo),
) -> PreferencesOut:
    value = update_preferences(
        user.id,
        repo,
        theme=payload.theme,
        font_size=payload.font_size,
        font_family=payload.font_family,
        language=payload.language,
    )
    return _out(value)
