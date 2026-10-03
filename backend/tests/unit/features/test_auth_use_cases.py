from unittest.mock import Mock

import pytest

from src.domain.user import Role, UserAlreadyExistsError
from src.features.auth.schemas import RegisterIn
from src.features.auth.use_cases import register
from tests.fakes import FakeUserRepository


def test_register_creates_active_citizen_and_hashes_password() -> None:
    repo = FakeUserRepository()
    hasher = Mock()
    hasher.hash.return_value = "hashed-password"
    dto = RegisterIn(email="Ada@EXAMPLE.com", name="Ada", password="Motdepasse123")
    user = register(dto, repo, hasher)
    assert user.role is Role.CITIZEN and user.is_active
    assert user.agent_id is None and user.email == "ada@example.com"
    assert user.password_hash == "hashed-password"
    hasher.hash.assert_called_once_with(dto.password)
    with pytest.raises(UserAlreadyExistsError):
        register(dto, repo, hasher)
    assert len(repo.list()) == 1


@pytest.mark.parametrize("role", list(Role))
@pytest.mark.parametrize("active", [True, False])
def test_role_policy_requires_active_account(role: Role, active: bool) -> None:
    from datetime import UTC, datetime

    from src.domain.user import User

    user = User(
        id="u",
        email="u@test.mg",
        name="User",
        created_at=datetime.now(UTC),
        password_hash="hash",
        role=role,
        is_active=active,
    )
    assert user.has_role(Role.MANAGER) == (active and role in {Role.MANAGER, Role.ADMIN})
    assert user.has_role(Role.ADMIN) == (active and role is Role.ADMIN)
