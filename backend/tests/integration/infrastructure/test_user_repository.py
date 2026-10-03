from datetime import UTC, datetime
from unittest.mock import patch

import pytest
from sqlalchemy.orm import Session

from src.domain.user import User
from src.infrastructure.persistence.models import CitizenRequestModel, UserModel
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository


def make_user(user_id: str = "u1", email: str = "ada@example.com") -> User:
    return User(
        id=user_id,
        email=email,
        name="Ada",
        created_at=datetime.now(UTC),
        password_hash="hashed:Motdepasse123",
    )


def test_add_then_get_by_id_and_email(db_session: Session) -> None:
    repo = SqlAlchemyUserRepository(db_session)
    user = repo.add(make_user())

    assert repo.get_by_id(user.id) == user
    assert repo.get_by_email("ada@example.com") == user
    assert repo.get_by_id("missing") is None


def test_created_at_is_timezone_aware(db_session: Session) -> None:
    repo = SqlAlchemyUserRepository(db_session)
    repo.add(make_user())
    db_session.expire_all()  # force la relecture depuis SQLite, qui perd le fuseau

    user = repo.get_by_id("u1")

    assert user is not None
    assert user.created_at.tzinfo is not None


def test_list_update_delete(db_session: Session) -> None:
    repo = SqlAlchemyUserRepository(db_session)
    repo.add(make_user("u1", "a@example.com"))
    repo.add(make_user("u2", "b@example.com"))

    assert [u.id for u in repo.list()] == ["u1", "u2"]

    user = repo.get_by_id("u1")
    assert user is not None
    user.name = "Ada Lovelace"
    repo.update(user)
    assert repo.get_by_id("u1") == user

    repo.delete("u1")
    assert repo.get_by_id("u1") is None
    repo.delete("u1")  # supprimer un absent ne lève pas d'erreur


def test_personal_account_deletion_rolls_back_every_change_on_failure(db_session: Session) -> None:
    repo = SqlAlchemyUserRepository(db_session)
    user = repo.add(make_user())
    db_session.add(
        CitizenRequestModel(
            id="request",
            title="Dossier",
            description="Dossier à conserver",
            category="Voirie",
            priority="Moyenne",
            status="Nouveau",
            citizen_id=user.id,
            location="Rue centrale",
        )
    )
    db_session.commit()
    with (
        patch.object(db_session, "commit", side_effect=RuntimeError("Database unavailable")),
        pytest.raises(RuntimeError),
    ):
        repo.delete_personal_account(user.id, user.archived_identity("archive"))
    assert repo.get_by_id(user.id) == user
    assert db_session.get(UserModel, "archive") is None
    record = db_session.get(CitizenRequestModel, "request")
    assert record is not None and record.citizen_id == user.id
