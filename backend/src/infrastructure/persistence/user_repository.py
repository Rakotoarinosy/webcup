"""Implémentation SQLAlchemy de UserRepository. Le mapping Model ↔ Entity reste privé à ce fichier."""

import builtins
from datetime import UTC, datetime

from sqlalchemy import delete, func, or_, select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from src.domain.user.entities import Role, User
from src.domain.user.exceptions import ForbiddenError, UserConflictError, UserNotFoundError
from src.domain.user.repository import UserRepository
from src.infrastructure.persistence.models import (
    CitizenRequestEventModel,
    CitizenRequestModel,
    NotificationReadModel,
    RefreshTokenModel,
    TerraRequestReadModel,
    UserModel,
    UserPreferenceModel,
    VerificationCodeModel,
)


def _aware(value: datetime | None) -> datetime | None:
    # SQLite ne conserve pas le fuseau : on garantit un datetime UTC « aware » partout.
    return value.replace(tzinfo=value.tzinfo or UTC) if value else None


class SqlAlchemyUserRepository(UserRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, user_id: str) -> User | None:
        model = self.db.get(UserModel, user_id)

        return self._to_entity(model) if model else None

    def get_by_email(self, email: str) -> User | None:
        model = self.db.scalar(select(UserModel).where(UserModel.email == email))

        return self._to_entity(model) if model else None

    def get_by_google_id(self, google_id: str) -> User | None:
        model = self.db.scalar(select(UserModel).where(UserModel.google_id == google_id))
        return self._to_entity(model) if model else None

    def count_active_by_role(self, role: Role) -> int:
        stmt = (
            select(func.count())
            .select_from(UserModel)
            .where(UserModel.role == role.value, UserModel.is_active.is_(True))
        )

        return self.db.scalar(stmt) or 0

    def add(self, user: User) -> User:
        model = self._to_model(user)
        self.db.add(model)
        self._commit()

        return self._to_entity(model)

    def update(self, user: User) -> User:
        model = self.db.merge(self._to_model(user))
        self._commit()

        return self._to_entity(model)

    def delete(self, user_id: str) -> None:
        # Nettoyage explicite : SQLite n'applique pas ON DELETE CASCADE par défaut.
        for table in (RefreshTokenModel, VerificationCodeModel):
            self.db.execute(delete(table).where(table.user_id == user_id))
        model = self.db.get(UserModel, user_id)
        if model:
            self.db.delete(model)
        self.db.commit()

    def delete_personal_account(self, user_id: str, archive: User) -> None:
        try:
            # Serialize account deletion against changes to this identity on PostgreSQL.
            model = self.db.scalar(
                select(UserModel).where(UserModel.id == user_id).with_for_update()
            )
            if model is None:
                raise UserNotFoundError(user_id)
            if model.role != Role.CITIZEN.value or not model.is_active:
                raise ForbiddenError("Only citizens can delete their own account")
            has_records = self.db.scalar(
                select(CitizenRequestModel.id)
                .where(CitizenRequestModel.citizen_id == user_id)
                .limit(1)
            )
            if has_records:
                self.db.add(self._to_model(archive))
                self.db.flush()
                self.db.execute(
                    update(CitizenRequestModel)
                    .where(CitizenRequestModel.citizen_id == user_id)
                    .values(citizen_id=archive.id)
                )
            self.db.execute(
                update(CitizenRequestEventModel)
                .where(CitizenRequestEventModel.actor_id == user_id)
                .values(actor_id=None, actor_name=archive.name)
            )
            for session_table in (
                RefreshTokenModel,
                VerificationCodeModel,
                NotificationReadModel,
                TerraRequestReadModel,
                UserPreferenceModel,
                VerificationCodeModel,
            ):
                self.db.execute(delete(session_table).where(session_table.user_id == user_id))
            self.db.delete(model)
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise

    def list(self) -> list[User]:
        models = self.db.scalars(select(UserModel).order_by(UserModel.created_at))

        return [self._to_entity(model) for model in models]

    def list_citizens(self, search: str | None = None) -> builtins.list[User]:
        stmt = select(UserModel).where(UserModel.role == Role.CITIZEN.value)
        if search:
            pattern = f"%{search}%"
            stmt = stmt.where(or_(UserModel.name.ilike(pattern), UserModel.email.ilike(pattern)))
        models = self.db.scalars(stmt.order_by(UserModel.created_at))
        return [self._to_entity(model) for model in models]

    # ─── Interne ────────────────────────────────────────────────────

    def _commit(self) -> None:
        try:
            self.db.commit()
        except IntegrityError as exc:
            self.db.rollback()
            raise UserConflictError() from exc

    def _to_entity(self, model: UserModel) -> User:
        return User(
            id=model.id,
            email=model.email,
            name=model.name,
            created_at=_aware(model.created_at),  # type: ignore[arg-type]
            password_hash=model.password_hash,
            role=Role(model.role),
            is_active=model.is_active,
            failed_login_attempts=model.failed_login_attempts,
            locked_until=_aware(model.locked_until),
            email_verified=model.email_verified,
            google_id=model.google_id,
            avatar_url=model.avatar_url,
        )

    def _to_model(self, user: User) -> UserModel:
        return UserModel(
            id=user.id,
            email=user.email,
            name=user.name,
            password_hash=user.password_hash,
            role=user.role.value,
            is_active=user.is_active,
            failed_login_attempts=user.failed_login_attempts,
            locked_until=user.locked_until,
            created_at=user.created_at,
            email_verified=user.email_verified,
            google_id=user.google_id,
            avatar_url=user.avatar_url,
        )
