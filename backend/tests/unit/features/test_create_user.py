import pytest

from src.domain.user import UserAlreadyExistsError
from src.features.user.schemas import CreateUserIn
from src.features.user.use_cases import create_user
from tests.fakes import FakePasswordHasher, FakeUserRepository


def test_create_user_returns_a_valid_user() -> None:
    repo = FakeUserRepository()

    user = create_user(
        CreateUserIn(email="ada@example.com", name="Ada", password="Motdepasse123"),
        repo,
        FakePasswordHasher(),
    )

    assert user.email == "ada@example.com"
    assert user.name == "Ada"
    assert user.id
    assert user.created_at.tzinfo is not None
    assert repo.get_by_id(user.id) == user


def test_create_user_raises_when_email_is_taken() -> None:
    repo = FakeUserRepository()
    create_user(
        CreateUserIn(email="ada@example.com", name="Ada", password="Motdepasse123"),
        repo,
        FakePasswordHasher(),
    )

    with pytest.raises(UserAlreadyExistsError):
        create_user(
            CreateUserIn(email="ada@example.com", name="Other", password="Motdepasse123"),
            repo,
            FakePasswordHasher(),
        )
