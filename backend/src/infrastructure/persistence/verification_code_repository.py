"""SQL persistence for email challenges, with atomic attempt counting and consumption."""

from datetime import UTC, datetime

from sqlalchemy import delete, select, update
from sqlalchemy.orm import Session

from src.domain.user.entities import VerificationCode
from src.domain.user.repository import VerificationCodeRepository
from src.infrastructure.persistence.models import VerificationCodeModel


class SqlAlchemyVerificationCodeRepository(VerificationCodeRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def replace_for_user(self, code: VerificationCode) -> VerificationCode:
        try:
            self.db.execute(
                delete(VerificationCodeModel).where(VerificationCodeModel.user_id == code.user_id)
            )
            self.db.add(VerificationCodeModel(**vars(code)))
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise
        return code

    def get_by_id(self, code_id: str) -> VerificationCode | None:
        return self._entity(self.db.get(VerificationCodeModel, code_id))

    def get_for_user(self, user_id: str) -> VerificationCode | None:
        return self._entity(
            self.db.scalar(
                select(VerificationCodeModel).where(VerificationCodeModel.user_id == user_id)
            )
        )

    def consume_attempt(self, code_id: str, max_attempts: int) -> bool:
        result = self.db.execute(
            update(VerificationCodeModel)
            .where(
                VerificationCodeModel.id == code_id,
                VerificationCodeModel.attempts < max_attempts,
                VerificationCodeModel.expires_at > datetime.now(UTC),
            )
            .values(attempts=VerificationCodeModel.attempts + 1)
            .returning(VerificationCodeModel.id)
        )
        consumed = result.scalar_one_or_none() is not None
        self.db.commit()
        return consumed

    def consume_verified(self, code_id: str, code_hash: str, now: datetime) -> bool:
        result = self.db.execute(
            delete(VerificationCodeModel)
            .where(
                VerificationCodeModel.id == code_id,
                VerificationCodeModel.code_hash == code_hash,
                VerificationCodeModel.expires_at > now,
            )
            .returning(VerificationCodeModel.id)
        )
        consumed = result.scalar_one_or_none() is not None
        self.db.commit()
        return consumed

    def delete_for_user(self, user_id: str) -> None:
        self.db.execute(
            delete(VerificationCodeModel).where(VerificationCodeModel.user_id == user_id)
        )
        self.db.commit()

    def delete_created_before(self, cutoff: datetime) -> None:
        self.db.execute(
            delete(VerificationCodeModel).where(VerificationCodeModel.created_at < cutoff)
        )
        self.db.commit()

    @staticmethod
    def _entity(model: VerificationCodeModel | None) -> VerificationCode | None:
        if model is None:
            return None
        return VerificationCode(
            id=model.id,
            user_id=model.user_id,
            code_hash=model.code_hash,
            attempts=model.attempts,
            expires_at=model.expires_at.replace(tzinfo=model.expires_at.tzinfo or UTC),
            created_at=model.created_at.replace(tzinfo=model.created_at.tzinfo or UTC),
        )
