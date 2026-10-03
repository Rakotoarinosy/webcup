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
        200 if role is Role.ADMIN else 403
    )
    assert (await client.get("/api/v1/agents", headers=headers)).status_code == (
        200 if role in {Role.ADMIN, Role.MANAGER} else 403
    )
    repo.update(replace(user, role=role, is_active=False))
    assert (await client.get(f"{AUTH}/me", headers=headers)).status_code == 401
    assert (await client.post(f"{AUTH}/refresh")).status_code == 401


async def test_citizen_scope_and_sensitive_actions(client: httpx.AsyncClient) -> None:
    first, payload = await signup(client)
    headers = await signin(client, payload)
    second, second_payload = await signup(client, "other@test.mg")
    other_headers = await signin(client, second_payload)
    response = await client.post(
        "/api/v1/demandes",
        headers=headers,
        json={
            "title": "Broken light",
            "description": "Street light is broken",
            "category": "eclairage_public",
            "citizen_id": second["id"],
            "priority": "critique",
            "address": "Main street",
        },
    )
    assert response.status_code == 201
    demande = response.json()
    assert demande["citizen_id"] == first["id"] and demande["priority"] == "moyenne"
    url = f"/api/v1/demandes/{demande['id']}"
    assert (await client.get(url, headers=other_headers)).status_code == 403
    assert (await client.get(url + "/events", headers=other_headers)).status_code == 403
    assert (
        await client.get(
            "/api/v1/demandes", headers=other_headers, params={"citizen_id": first["id"]}
        )
    ).json()["total"] == 0
    assert (await client.patch(url, headers=headers, json={"priority": "haute"})).status_code == 403
    for action in ("accept", "reject", "resolve"):
        assert (await client.post(url + "/" + action, headers=headers)).status_code == 403
    assert (
        await client.patch(url, headers=headers, json={"title": "Updated light"})
    ).status_code == 200
    assert (await client.delete(url, headers=other_headers)).status_code == 403
    assert (await client.delete(url, headers=headers)).status_code == 204


@pytest.mark.parametrize("path", ["/auth/me", "/users", "/agents", "/demandes"])
async def test_anonymous_access_is_rejected(client: httpx.AsyncClient, path: str) -> None:
    assert (await client.get("/api/v1" + path)).status_code == 401


async def test_agent_can_only_resolve_assigned_demande(admin_client: httpx.AsyncClient) -> None:
    admin_headers = dict(admin_client.headers)
    first = (
        await admin_client.post(
            "/api/v1/agents",
            json={"name": "First", "email": "first@test.mg", "department": "Voirie"},
        )
    ).json()
    second = (
        await admin_client.post(
            "/api/v1/agents",
            json={"name": "Second", "email": "second@test.mg", "department": "Voirie"},
        )
    ).json()
    citizen, _ = await signup(admin_client)
    accounts = []
    for index, agent in enumerate((first, second)):
        payload = {
            "name": "Agent",
            "email": f"agent{index}@test.mg",
            "password": PASSWORD,
            "role": "agent",
            "agent_id": agent["id"],
        }
        assert (
            await admin_client.post("/api/v1/users", headers=admin_headers, json=payload)
        ).status_code == 201
        accounts.append(await signin(admin_client, payload))
    demande = (
        await admin_client.post(
            "/api/v1/demandes",
            headers=admin_headers,
            json={
                "title": "Road repair",
                "description": "Pothole",
                "category": "voirie",
                "citizen_id": citizen["id"],
                "address": "Main street",
            },
        )
    ).json()
    url = f"/api/v1/demandes/{demande['id']}"
    assert (
        await admin_client.post(
            url + "/assign",
            headers=admin_headers,
            json={"agent_id": first["id"], "scheduled_at": "2026-10-05T09:00:00"},
        )
    ).status_code == 200
    assert (await admin_client.get(url, headers=accounts[1])).status_code == 403
    assert (await admin_client.post(url + "/resolve", headers=accounts[1])).status_code == 403
    assert (await admin_client.post(url + "/accept", headers=accounts[0])).status_code == 403
    assert (await admin_client.post(url + "/resolve", headers=accounts[0])).json()[
        "status"
    ] == "resolu"


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


async def test_last_admin_cannot_be_disabled(admin_client: httpx.AsyncClient) -> None:
    profile = (await admin_client.get(f"{AUTH}/me")).json()
    response = await admin_client.patch(f"/api/v1/users/{profile['id']}", json={"is_active": False})
    assert response.status_code == 400
    assert response.json()["error"] == "LastAdminError"
