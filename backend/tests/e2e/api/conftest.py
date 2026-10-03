"""Plateforme de test montée par l'API elle-même : instituts, managers, agents, citoyens.

voirie (Voirie, Éclairage public) — manager m1 — agent a1 (compte ua1)
eau    (Eau)                       — manager m2 — agent a2 (compte ua2)
m3 : manager sans institut ; c1, c2 : citoyens ; « Déchets » n'est couverte par aucun institut.
"""

from dataclasses import dataclass, field

import httpx
import pytest

API = "/api/v1"
PASSWORD = "Motdepasse123"


@dataclass
class Platform:
    client: httpx.AsyncClient
    admin: dict[str, str]
    users: dict[str, str] = field(default_factory=dict)  # clé → id du compte
    headers: dict[str, dict[str, str]] = field(default_factory=dict)  # clé → en-têtes
    instituts: dict[str, str] = field(default_factory=dict)  # clé → id
    agents: dict[str, str] = field(default_factory=dict)  # clé → id du profil

    def as_(self, key: str) -> dict[str, str]:
        return self.admin if key == "admin" else self.headers[key]

    async def submit(self, key: str = "c1", **overrides) -> httpx.Response:
        payload = {
            "title": "Nid de poule",
            "description": "Trou profond dans la chaussée",
            "category": "Voirie",
            "location": "Rue A",
            **overrides,
        }
        return await self.client.post(f"{API}/requests", headers=self.as_(key), json=payload)


async def login(client: httpx.AsyncClient, email: str) -> dict[str, str]:
    response = await client.post(f"{API}/auth/login", json={"email": email, "password": PASSWORD})
    assert response.status_code == 200, response.text
    return {"Authorization": f"Bearer {response.json()['access_token']}"}


@pytest.fixture
async def platform(admin_client: httpx.AsyncClient) -> Platform:
    admin = {"Authorization": admin_client.headers["Authorization"]}
    world = Platform(client=admin_client, admin=admin)

    for key, role in [
        ("c1", "citizen"),
        ("c2", "citizen"),
        ("m1", "manager"),
        ("m2", "manager"),
        ("m3", "manager"),
        ("ua1", "agent"),
        ("ua2", "agent"),
    ]:
        email = f"{key}@test.mg"
        response = await admin_client.post(
            f"{API}/users",
            headers=admin,
            json={"email": email, "name": f"Nom {key}", "password": PASSWORD, "role": role},
        )
        assert response.status_code == 201, response.text
        world.users[key] = response.json()["id"]

    for key, name, categories, manager in [
        ("voirie", "Voirie", ["Voirie", "Éclairage public"], "m1"),
        ("eau", "Eau", ["Eau"], "m2"),
    ]:
        response = await admin_client.post(
            f"{API}/instituts",
            headers=admin,
            json={"name": name, "categories": categories, "manager_id": world.users[manager]},
        )
        assert response.status_code == 201, response.text
        world.instituts[key] = response.json()["id"]

    for key, user, institut in [("a1", "ua1", "voirie"), ("a2", "ua2", "eau")]:
        response = await admin_client.post(
            f"{API}/agents",
            headers=admin,
            json={"user_id": world.users[user], "institut_id": world.instituts[institut]},
        )
        assert response.status_code == 201, response.text
        world.agents[key] = response.json()["id"]

    # Connexion après le rattachement : le profil renvoyé au login contient agent_id / institut_id.
    for key in world.users:
        world.headers[key] = await login(admin_client, f"{key}@test.mg")

    return world
