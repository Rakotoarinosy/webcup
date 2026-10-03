from dataclasses import replace
from datetime import UTC, datetime
from unittest.mock import Mock

import pytest

from src.domain.user import AuthPolicy, ForbiddenError, IncorrectPasswordError, Role, User
from src.features.auth.use_cases import delete_account
from src.features.user.use_cases import delete_own_account
from tests.fakes import FakePasswordHasher, FakeUserRepository


def citizen() -> User:
    return User(
        id="me",
        name="Rina",
        email="rina@test.mg",
        created_at=datetime.now(UTC),
        password_hash="hashed:Motdepasse123",
    )


def test_archive_has_no_credentials_or_personal_identity() -> None:
    user = replace(citizen(), failed_login_attempts=3, locked_until=datetime.now(UTC))
    archive = user.archived_identity("archive")
    assert archive.id != user.id and archive.email != user.email
    assert archive.name == "Compte supprimé"
    assert archive.password_hash == "" and not archive.is_active
    assert archive.failed_login_attempts == 0 and archive.locked_until is None
    assert user.email == "rina@test.mg"


@pytest.mark.parametrize("role", [Role.AGENT, Role.MANAGER, Role.ADMIN])
def test_domain_policy_excludes_staff_even_administrators(role: Role) -> None:
    repo = Mock()
    with pytest.raises(ForbiddenError):
        delete_own_account(replace(citizen(), role=role), repo)
    repo.delete_personal_account.assert_not_called()


def test_password_is_verified_before_repository_deletion() -> None:
    repo = FakeUserRepository()
    user = repo.add(citizen())
    with pytest.raises(IncorrectPasswordError):
        delete_account(user, "wrong", repo, FakePasswordHasher(), AuthPolicy())
    assert repo.get_by_id(user.id) is not None
    delete_account(user, "Motdepasse123", repo, FakePasswordHasher(), AuthPolicy())
    assert repo.get_by_id(user.id) is None
