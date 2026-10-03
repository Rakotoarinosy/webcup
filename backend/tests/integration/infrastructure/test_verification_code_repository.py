from datetime import UTC, datetime, timedelta

from sqlalchemy.orm import Session

from src.domain.user.entities import VerificationCode
from src.infrastructure.persistence.models import UserModel
from src.infrastructure.persistence.verification_code_repository import (
    SqlAlchemyVerificationCodeRepository,
)


def test_consumption_is_atomic_and_replacement_invalidates_old_code(db_session: Session) -> None:
    db_session.add(UserModel(id="citizen", email="c@test.mg", name="Citizen", password_hash="hash"))
    db_session.commit()
    repo = SqlAlchemyVerificationCodeRepository(db_session)
    now = datetime.now(UTC)
    code = VerificationCode("challenge-1", "citizen", "hash", now + timedelta(minutes=10), now)
    repo.replace_for_user(code)
    assert repo.consume_attempt(code.id, 1)
    assert not repo.consume_attempt(code.id, 1)
    assert repo.consume_verified(code.id, code.code_hash, now)
    assert not repo.consume_verified(code.id, code.code_hash, now)
    repo.replace_for_user(code)
    replacement = VerificationCode(
        "challenge-2", "citizen", "new-hash", now + timedelta(minutes=10), now
    )
    repo.replace_for_user(replacement)
    assert repo.get_by_id(code.id) is None
    assert repo.get_for_user("citizen") == replacement
