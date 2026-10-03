from dataclasses import replace
from typing import Any

import httpx
import pytest
from sqlalchemy.orm import Session

from src.domain.user import Role
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository

pytestmark = pytest.mark.anyio
AUTH = "/api/v1/auth"
PASSWORD = "Motdepasse123"


async def signup(
    client: httpx.AsyncClient, email: str = "citizen@test.mg"
) -> tuple[dict[str, Any], dict[str, str]]:
    payload = {"name": "Citizen", "email": email, "password": PASSWORD, "role": "admin"}
    response = await client.post(f"{AUTH}/register", json=payload)
    assert response.status_code == 201
    assert response.json()["role"] == "citizen"
    assert "password_hash" not in response.json()
    return response.json(), payload


async def signin(client: httpx.AsyncClient, payload: dict[str, str]) -> dict[str, str]:
    response = await client.post(f"{AUTH}/login", json=payload)
    assert response.status_code == 200
    cookie = response.headers["set-cookie"].lower()
    assert "httponly" in cookie and "path=/api/v1/auth" in cookie
    assert response.headers["cache-control"] == "no-store"
    body = response.json()
    assert body["token_type"] == "bearer" and body["expires_in"] > 0
    return {"Authorization": f"Bearer {body['access_token']}"}


async def test_registration_login_me_and_refresh(
    client: httpx.AsyncClient, db_session: Session
) -> None:
    profile, payload = await signup(client)
    user = SqlAlchemyUserRepository(db_session).get_by_id(profile["id"])
    assert user is not None
    assert user.password_hash.startswith("$argon2")
    headers = await signin(client, payload)
    assert (await client.get(f"{AUTH}/me", headers=headers)).json() == profile
    assert (await client.post(f"{AUTH}/register", json=payload)).status_code == 409
    assert (
        await client.post(f"{AUTH}/login", json={**payload, "password": "wrong"})
    ).status_code == 401
    raw = client.cookies.get("refresh_token")
    assert (await client.post(f"{AUTH}/refresh")).status_code == 200
    assert client.cookies.get("refresh_token") != raw
    assert (await client.post(f"{AUTH}/logout")).status_code == 204
    assert (await client.post(f"{AUTH}/refresh")).status_code == 401


@pytest.mark.parametrize("role", list(Role))
async def test_roles_are_reloaded_on_each_request(
    client: httpx.AsyncClient, db_session: Session, role: Role
) -> None:
    profile, payload = await signup(client)
    headers = await signin(client, payload)
    repo = SqlAlchemyUserRepository(db_session)
    user = repo.get_by_id(profile["id"])
    assert user is not None
    repo.update(replace(user, role=role))
    assert (await client.get(f"{AUTH}/me", headers=headers)).json()["role"] == role.value
    assert (await client.get("/api/v1/users", headers=headers)).status_code == (
        200 if role in {Role.ADMIN, Role.MANAGER, Role.AGENT} else 403
    )
    # Un manager sans institut obtient une liste vide ; agent et citoyen sont refusés.
    assert (await client.get("/api/v1/agents", headers=headers)).status_code == (
        200 if role in {Role.ADMIN, Role.MANAGER} else 403
    )
    repo.update(replace(user, role=role, is_active=False))
    assert (await client.get(f"{AUTH}/me", headers=headers)).status_code == 401
    assert (await client.post(f"{AUTH}/refresh")).status_code == 401


@pytest.mark.parametrize("path", ["/auth/me", "/users", "/agents", "/requests", "/dashboard"])
async def test_anonymous_access_is_rejected(client: httpx.AsyncClient, path: str) -> None:
    assert (await client.get("/api/v1" + path)).status_code == 401


async def test_refresh_replay_revokes_the_session(client: httpx.AsyncClient) -> None:
    _, payload = await signup(client)
    await signin(client, payload)
    old = client.cookies.get("refresh_token")
    assert (await client.post(f"{AUTH}/refresh")).status_code == 200
    current = client.cookies.get("refresh_token")
    assert (
        await client.post(f"{AUTH}/refresh", headers={"Cookie": f"refresh_token={old}"})
    ).status_code == 401
    assert (
        await client.post(f"{AUTH}/refresh", headers={"Cookie": f"refresh_token={current}"})
    ).status_code == 401


async def test_admin_account_is_outside_citizen_management_scope(
    admin_client: httpx.AsyncClient,
) -> None:
    profile = (await admin_client.get(f"{AUTH}/me")).json()
    response = await admin_client.patch(f"/api/v1/users/{profile['id']}", json={"is_active": False})
    assert response.status_code == 404
    assert (await admin_client.get(f"{AUTH}/me")).status_code == 200
