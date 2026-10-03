from dataclasses import replace

import httpx
import pytest
from sqlalchemy import Engine, select, text
from sqlalchemy.orm import Session

from src.domain.user import Role
from src.infrastructure.persistence.models import (
    CitizenRequestEventModel,
    CitizenRequestModel,
    NotificationReadModel,
    RefreshTokenModel,
    TerraRequestReadModel,
    UserModel,
)
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository
from tests.integration.test_auth_api import AUTH, PASSWORD, signin, signup

pytestmark = pytest.mark.anyio


@pytest.mark.parametrize("role", list(Role))
async def test_update_own_profile_refreshes_session_without_changing_role(
    client: httpx.AsyncClient, db_session: Session, role: Role
) -> None:
    profile, payload = await signup(client)
    repo = SqlAlchemyUserRepository(db_session)
    user = repo.get_by_id(profile["id"])
    assert user is not None
    repo.update(replace(user, role=role))
    headers = await signin(client, payload)
    old_refresh = client.cookies.get("refresh_token")
    response = await client.patch(
        f"{AUTH}/me",
        headers=headers,
        json={"name": "  Ada Lovelace  ", "email": "Ada@Example.com", "current_password": PASSWORD},
    )
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["user"]["name"] == "Ada Lovelace"
    assert body["user"]["email"] == "ada@example.com"
    assert body["user"]["role"] == role.value
    assert body["user"]["id"] == profile["id"]
    assert "password_hash" not in body["user"]
    assert response.headers["cache-control"] == "no-store"
    assert "httponly" in response.headers["set-cookie"].lower()
    assert client.cookies.get("refresh_token") != old_refresh
    assert (
        await client.get(f"{AUTH}/me", headers={"Authorization": f"Bearer {body['access_token']}"})
    ).json() == body["user"]
    assert (await client.post(f"{AUTH}/refresh")).status_code == 200
    assert (
        await client.post(f"{AUTH}/refresh", headers={"Cookie": f"refresh_token={old_refresh}"})
    ).status_code == 401
    assert (await client.post(f"{AUTH}/login", json=payload)).status_code == 401
    assert (
        await client.post(f"{AUTH}/login", json={**payload, "email": "ada@example.com"})
    ).status_code == 200


@pytest.mark.parametrize("extra", ["role", "is_active", "agent_id", "id", "citizen_id"])
async def test_profile_rejects_privilege_or_identity_injection(
    client: httpx.AsyncClient, extra: str
) -> None:
    profile, payload = await signup(client)
    headers = await signin(client, payload)
    response = await client.patch(
        f"{AUTH}/me",
        headers=headers,
        json={
            "name": "New name",
            "email": payload["email"],
            "current_password": PASSWORD,
            extra: "admin",
        },
    )
    assert response.status_code == 422
    assert (await client.get(f"{AUTH}/me", headers=headers)).json() == profile


async def test_update_rejects_wrong_password_duplicate_email_and_invalid_name(
    client: httpx.AsyncClient,
) -> None:
    profile, payload = await signup(client)
    headers = await signin(client, payload)
    await signup(client, "other@test.mg")
    data = {"name": "New name", "email": "other@test.mg", "current_password": "wrong"}
    assert (await client.patch(f"{AUTH}/me", headers=headers, json=data)).status_code == 400
    assert (
        await client.patch(
            f"{AUTH}/me", headers=headers, json={**data, "current_password": PASSWORD}
        )
    ).status_code == 409
    assert (
        await client.patch(
            f"{AUTH}/me",
            headers=headers,
            json={**data, "name": "   ", "current_password": PASSWORD},
        )
    ).status_code == 422
    assert (await client.get(f"{AUTH}/me", headers=headers)).json() == profile


async def test_profile_actions_require_authentication(client: httpx.AsyncClient) -> None:
    assert (
        await client.patch(
            f"{AUTH}/me", json={"name": "New", "email": "new@test.mg", "current_password": PASSWORD}
        )
    ).status_code == 401

    assert (
        await client.request("DELETE", f"{AUTH}/me", json={"current_password": PASSWORD})
    ).status_code == 401


async def test_profile_is_never_cached(client: httpx.AsyncClient) -> None:
    _, payload = await signup(client)
    headers = await signin(client, payload)
    response = await client.get(f"{AUTH}/me", headers=headers)
    assert response.headers["cache-control"] == "no-store"


@pytest.mark.parametrize("role", [Role.AGENT, Role.MANAGER, Role.ADMIN])
async def test_staff_cannot_delete_their_account(
    client: httpx.AsyncClient, db_session: Session, role: Role
) -> None:
    profile, payload = await signup(client)
    repo = SqlAlchemyUserRepository(db_session)
    user = repo.get_by_id(profile["id"])
    assert user is not None
    repo.update(replace(user, role=role))
    headers = await signin(client, payload)
    response = await client.request(
        "DELETE", f"{AUTH}/me", headers=headers, json={"current_password": PASSWORD}
    )
    assert response.status_code == 403
    assert (await client.get(f"{AUTH}/me", headers=headers)).status_code == 200


async def test_deletion_requires_password_and_rejects_another_user_id(
    client: httpx.AsyncClient,
) -> None:
    _, payload = await signup(client)
    headers = await signin(client, payload)
    second, _ = await signup(client, "second@test.mg")
    assert (
        await client.request(
            "DELETE", f"{AUTH}/me", headers=headers, json={"current_password": "wrong"}
        )
    ).status_code == 400
    assert (
        await client.request(
            "DELETE",
            f"{AUTH}/me",
            headers=headers,
            json={"current_password": PASSWORD, "id": second["id"]},
        )
    ).status_code == 422
    assert (await client.get(f"{AUTH}/me", headers=headers)).status_code == 200


async def test_sensitive_actions_lock_after_repeated_wrong_passwords(
    client: httpx.AsyncClient,
) -> None:
    _, payload = await signup(client)
    headers = await signin(client, payload)
    for _ in range(5):
        assert (
            await client.request(
                "DELETE", f"{AUTH}/me", headers=headers, json={"current_password": "wrong"}
            )
        ).status_code == 400
    assert (
        await client.request(
            "DELETE", f"{AUTH}/me", headers=headers, json={"current_password": PASSWORD}
        )
    ).status_code == 429
    assert (await client.get(f"{AUTH}/me", headers=headers)).status_code == 200


async def test_deletion_preserves_records_erases_identity_and_denies_all_old_sessions(
    client: httpx.AsyncClient, db_session: Session, engine: Engine
) -> None:
    with engine.connect() as connection:
        connection.execute(text("PRAGMA foreign_keys=ON"))
    profile, payload = await signup(client)
    headers = await signin(client, payload)
    first_refresh = client.cookies.get("refresh_token")
    await signin(client, payload)  # a second device/session
    second_refresh = client.cookies.get("refresh_token")
    other, other_payload = await signup(client, "other@test.mg")
    other_headers = await signin(client, other_payload)
    other_refresh = client.cookies.get("refresh_token")
    record = await client.post(
        "/api/v1/requests",
        headers=headers,
        json={
            "title": "Dossier municipal",
            "description": "Un dossier à conserver",
            "category": "Voirie",
            "location": "Rue centrale",
        },
    )
    assert record.status_code == 201, record.text
    other_record = await client.post(
        "/api/v1/requests",
        headers=other_headers,
        json={
            "title": "Autre dossier",
            "description": "Dossier d'un autre habitant",
            "category": "Voirie",
            "location": "Autre rue",
        },
    )
    db_session.add_all(
        [
            NotificationReadModel(user_id=profile["id"], key="read"),
            TerraRequestReadModel(user_id=profile["id"], key="wave:1"),
        ]
    )
    db_session.commit()
    response = await client.request(
        "DELETE", f"{AUTH}/me", headers=headers, json={"current_password": PASSWORD}
    )
    assert response.status_code == 204, response.text
    assert "max-age=0" in response.headers["set-cookie"].lower()
    assert (await client.get(f"{AUTH}/me", headers=headers)).status_code == 401
    assert (await client.post(f"{AUTH}/login", json=payload)).status_code == 401
    for token in [first_refresh, second_refresh]:
        assert (
            await client.post(f"{AUTH}/refresh", headers={"Cookie": f"refresh_token={token}"})
        ).status_code == 401
    assert (
        await client.post(f"{AUTH}/refresh", headers={"Cookie": f"refresh_token={other_refresh}"})
    ).status_code == 200
    db_session.expire_all()
    assert db_session.get(UserModel, profile["id"]) is None
    kept = db_session.get(CitizenRequestModel, record.json()["id"])
    assert kept is not None and kept.citizen_id != profile["id"]
    archived = db_session.get(UserModel, kept.citizen_id)
    assert archived is not None and not archived.is_active
    assert archived.name == "Compte supprimé" and archived.email != payload["email"]
    assert archived.password_hash == ""
    for model in [RefreshTokenModel, NotificationReadModel, TerraRequestReadModel]:
        assert db_session.scalar(select(model).where(model.user_id == profile["id"])) is None
    events = list(
        db_session.scalars(
            select(CitizenRequestEventModel).where(
                CitizenRequestEventModel.request_id == record.json()["id"]
            )
        )
    )
    assert events  # l'événement « créée » a été journalisé par le citoyen
    for event in events:
        assert event.actor_id is None and event.actor_name == "Compte supprimé"
    unchanged = db_session.get(CitizenRequestModel, other_record.json()["id"])
    assert unchanged is not None and unchanged.citizen_id == other["id"]
    assert (await client.get("/api/v1/requests?mine=true", headers=other_headers)).json()[
        "total"
    ] == 1


async def test_reusing_email_cannot_recover_deleted_accounts_records(
    client: httpx.AsyncClient,
) -> None:
    first, payload = await signup(client)
    headers = await signin(client, payload)
    created = await client.post(
        "/api/v1/requests",
        headers=headers,
        json={
            "title": "Ancien dossier",
            "description": "Dossier conservé",
            "category": "Voirie",
            "location": "Rue centrale",
        },
    )
    assert created.status_code == 201
    assert (
        await client.request(
            "DELETE", f"{AUTH}/me", headers=headers, json={"current_password": PASSWORD}
        )
    ).status_code == 204
    replacement, _ = await signup(client)
    assert replacement["id"] != first["id"]
    new_headers = await signin(client, payload)
    assert (await client.get("/api/v1/requests?mine=true", headers=new_headers)).json()[
        "total"
    ] == 0
    assert (
        await client.get(f"/api/v1/requests/{created.json()['id']}", headers=new_headers)
    ).status_code == 403


async def test_delete_unused_account_does_not_create_an_archive(
    client: httpx.AsyncClient, db_session: Session
) -> None:
    _, payload = await signup(client)
    headers = await signin(client, payload)
    assert (
        await client.request(
            "DELETE", f"{AUTH}/me", headers=headers, json={"current_password": PASSWORD}
        )
    ).status_code == 204
    assert list(db_session.scalars(select(UserModel))) == []
