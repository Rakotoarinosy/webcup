from dataclasses import replace

import httpx
import pytest
from sqlalchemy.orm import Session

from src.domain.user import Role
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository

pytestmark = pytest.mark.anyio

USERS = "/api/v1/users"
PASSWORD = "Motdepasse123"


async def _register(
    client: httpx.AsyncClient,
    db_session: Session,
    email: str,
    name: str,
    role: Role = Role.CITIZEN,
) -> dict:
    response = await client.post(
        "/api/v1/auth/register", json={"email": email, "name": name, "password": PASSWORD}
    )
    assert response.status_code == 201
    profile = response.json()
    if role is not Role.CITIZEN:
        repo = SqlAlchemyUserRepository(db_session)
        user = repo.get_by_id(profile["id"])
        assert user is not None
        repo.update(replace(user, role=role))
    return profile


async def _login(client: httpx.AsyncClient, email: str) -> None:
    response = await client.post("/api/v1/auth/login", json={"email": email, "password": PASSWORD})
    assert response.status_code == 200
    client.headers["Authorization"] = f"Bearer {response.json()['access_token']}"


async def test_user_crud_flow(admin_client: httpx.AsyncClient) -> None:
    response = await admin_client.post(
        USERS, json={"email": "ada@example.com", "name": "Ada", "password": PASSWORD}
    )
    assert response.status_code == 201
    user = response.json()
    assert user["email"] == "ada@example.com"
    assert set(user) == {"id", "email", "phone", "name", "created_at", "role", "is_active"}

    response = await admin_client.get(f"{USERS}/{user['id']}")
    assert response.status_code == 200
    assert response.json() == user

    response = await admin_client.get(USERS)
    assert user in response.json()

    response = await admin_client.patch(f"{USERS}/{user['id']}", json={"name": "Ada Lovelace"})
    assert response.status_code == 200
    assert response.json() == {**user, "name": "Ada Lovelace"}

    for forbidden in ({"role": "manager"}, {"password": "NouveauMotdepasse123"}):
        response = await admin_client.patch(f"{USERS}/{user['id']}", json=forbidden)
        assert response.status_code == 422

    response = await admin_client.delete(f"{USERS}/{user['id']}")
    assert response.status_code == 405
    response = await admin_client.get(f"{USERS}/{user['id']}")
    assert response.status_code == 200


@pytest.mark.parametrize("role", [Role.AGENT, Role.MANAGER, Role.ADMIN])
async def test_operator_can_search_view_edit_and_activate_citizen_accounts(
    client: httpx.AsyncClient, db_session: Session, role: Role
) -> None:
    operator = await _register(client, db_session, f"{role.value}@example.com", "Operator", role)
    citizen = await _register(client, db_session, "rina@example.com", "Rina Rakoto")
    await _register(client, db_session, "unrelated@example.com", "Different Citizen")
    non_citizen = await _register(
        client, db_session, "another-agent@example.com", "Agent", Role.AGENT
    )
    await _login(client, f"{role.value}@example.com")

    response = await client.get(USERS, params={"search": "rina"})
    assert response.status_code == 200
    assert [account["id"] for account in response.json()] == [citizen["id"]]

    response = await client.get(f"{USERS}/{citizen['id']}")
    assert response.status_code == 200
    assert response.json()["role"] == "citizen"

    for forbidden in ({"role": "manager"}, {"password": "NouveauMotdepasse123"}):
        response = await client.patch(f"{USERS}/{citizen['id']}", json=forbidden)
        assert response.status_code == 422
    assert (await client.delete(f"{USERS}/{citizen['id']}")).status_code == 405

    response = await client.patch(
        f"{USERS}/{citizen['id']}",
        json={"name": "Rina Updated", "email": "rina.updated@example.com"},
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Rina Updated"

    response = await client.patch(f"{USERS}/{citizen['id']}", json={"is_active": False})
    assert response.status_code == 200
    assert response.json()["is_active"] is False
    assert response.json()["role"] == "citizen"
    response = await client.patch(f"{USERS}/{citizen['id']}", json={"is_active": True})
    assert response.status_code == 200
    assert response.json()["is_active"] is True

    assert (await client.get(f"{USERS}/{non_citizen['id']}")).status_code == 404
    assert (
        await client.patch(f"{USERS}/{non_citizen['id']}", json={"name": "Nope"})
    ).status_code == 404
    assert (await client.get(f"{USERS}/{operator['id']}")).status_code == 404


async def test_citizen_cannot_access_account_management(
    client: httpx.AsyncClient, db_session: Session
) -> None:
    citizen = await _register(client, db_session, "citizen@example.com", "Citizen")
    await _login(client, "citizen@example.com")

    assert (await client.get(USERS)).status_code == 403
    assert (await client.get(f"{USERS}/{citizen['id']}")).status_code == 403
    assert (
        await client.patch(f"{USERS}/{citizen['id']}", json={"name": "Changed"})
    ).status_code == 403


async def test_unknown_user_returns_404(admin_client: httpx.AsyncClient) -> None:
    response = await admin_client.get(f"{USERS}/missing")
    assert response.status_code == 404
    assert response.json()["error"] == "UserNotFoundError"


async def test_invalid_email_returns_422(admin_client: httpx.AsyncClient) -> None:
    response = await admin_client.post(
        USERS, json={"email": "not-an-email", "name": "Ada", "password": PASSWORD}
    )
    assert response.status_code == 422
