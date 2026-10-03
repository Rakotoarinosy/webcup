import pytest
from pydantic import ValidationError

from src.features.auth.schemas import RegisterIn
from src.features.user.schemas import CreateUserIn, UpdateUserIn


@pytest.mark.parametrize("schema", [RegisterIn, CreateUserIn, UpdateUserIn])
@pytest.mark.parametrize("name", ["", "   ", "x" * 256, 123])
def test_invalid_names_are_rejected(schema, name) -> None:
    with pytest.raises(ValidationError):
        schema(name=name, email="person@test.mg", password="Motdepasse123")


@pytest.mark.parametrize("schema", [RegisterIn, CreateUserIn, UpdateUserIn])
def test_names_are_trimmed(schema) -> None:
    assert (
        schema(name="  Sophie Nguyen  ", email="person@test.mg", password="Motdepasse123").name
        == "Sophie Nguyen"
    )
