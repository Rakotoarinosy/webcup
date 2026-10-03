"""Lecture SQLAlchemy des seules données appartenant au compte exporteur."""

from datetime import UTC, datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from src.domain.citizen_request import RequestCategory, RequestPriority, RequestStatus
from src.domain.preferences import FontFamily, FontSize, Theme
from src.domain.user import Role
from src.domain.user_export import ExportedRequest, PersonalData, UserExportRepository
from src.infrastructure.persistence.models import (
    CitizenRequestModel,
    UserModel,
    UserPreferenceModel,
)


def _aware(value: datetime) -> datetime:
    return value.replace(tzinfo=value.tzinfo or UTC)


class SqlAlchemyUserExportRepository(UserExportRepository):
    def __init__(self, db: Session) -> None:
        self._db = db

    def get_personal_data(self, user_id: str) -> PersonalData:
        user = self._db.get(UserModel, user_id)
        # L'appelant a déjà été résolu par la dépendance d'authentification.
        assert user is not None
        preferences = self._db.get(UserPreferenceModel, user_id)
        rows = self._db.scalars(
            select(CitizenRequestModel)
            .where(CitizenRequestModel.citizen_id == user_id)
            .order_by(CitizenRequestModel.created_at.desc())
        )
        return PersonalData(
            name=user.name,
            email=user.email,
            role=Role(user.role),
            created_at=_aware(user.created_at),
            theme=Theme(preferences.theme) if preferences else Theme.SYSTEM,
            font_size=FontSize(preferences.font_size) if preferences else FontSize.MEDIUM,
            font_family=(FontFamily(preferences.font_family) if preferences else FontFamily.SYSTEM),
            requests=tuple(
                ExportedRequest(
                    title=row.title,
                    description=row.description,
                    category=RequestCategory(row.category),
                    status=RequestStatus(row.status),
                    priority=RequestPriority(row.priority),
                    location=row.location,
                    created_at=_aware(row.created_at),
                    updated_at=_aware(row.updated_at),
                )
                for row in rows
            ),
        )
