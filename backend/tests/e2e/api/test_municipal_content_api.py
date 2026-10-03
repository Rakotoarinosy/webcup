"""Scénarios publics de consultation et de contact municipal."""

from datetime import UTC, datetime

import pytest
from httpx import AsyncClient
from sqlalchemy.orm import Session

from src.infrastructure.persistence.models import MunicipalPublicationModel, MunicipalServiceModel

pytestmark = pytest.mark.anyio


async def test_lists_public_services_and_publications(
    client: AsyncClient, db_session: Session
) -> None:
    db_session.add(
        MunicipalServiceModel(
            id="service-1",
            name="État civil",
            category="Administration",
            description="Documents",
            contact_details="Mairie",
            opening_hours="8h-16h",
            icon="pi-id-card",
            display_order=1,
            is_active=True,
        )
    )
    db_session.add(
        MunicipalPublicationModel(
            id="publication-1",
            title="Information",
            summary="Résumé",
            content="Contenu complet",
            category="Information pratique",
            published_at=datetime.now(UTC),
            is_published=True,
        )
    )
    db_session.commit()

    services = await client.get("/api/v1/municipal/services")
    publications = await client.get("/api/v1/municipal/publications")

    assert services.status_code == 200
    assert services.json()[0]["name"] == "État civil"
    assert services.json()[0]["category"] == "Administration"
    assert services.json()[0]["is_featured"] is False
    assert services.json()[0]["usage_count"] == 0
    assert publications.status_code == 200
    assert publications.json()[0]["title"] == "Information"


async def test_featured_services_are_public_and_ordered(
    client: AsyncClient, db_session: Session
) -> None:
    db_session.add_all(
        [
            MunicipalServiceModel(
                id="featured-low",
                name="A service",
                category="Administration",
                description="Description",
                contact_details="Mairie",
                opening_hours="8h-16h",
                icon="pi-building",
                display_order=1,
                is_featured=True,
                usage_count=4,
                is_active=True,
            ),
            MunicipalServiceModel(
                id="featured-high",
                name="Z service",
                category="Administration",
                description="Description",
                contact_details="Mairie",
                opening_hours="8h-16h",
                icon="pi-building",
                display_order=1,
                is_featured=True,
                usage_count=12,
                is_active=True,
            ),
            MunicipalServiceModel(
                id="featured-later",
                name="Later service",
                category="Administration",
                description="Description",
                contact_details="Mairie",
                opening_hours="8h-16h",
                icon="pi-building",
                display_order=2,
                is_featured=True,
                usage_count=99,
                is_active=True,
            ),
            MunicipalServiceModel(
                id="popular-not-featured",
                name="Popular service",
                category="Administration",
                description="Description",
                contact_details="Mairie",
                opening_hours="8h-16h",
                icon="pi-building",
                display_order=0,
                is_featured=False,
                usage_count=1000,
                is_active=True,
            ),
            MunicipalServiceModel(
                id="inactive-featured",
                name="Inactive service",
                category="Administration",
                description="Description",
                contact_details="Mairie",
                opening_hours="8h-16h",
                icon="pi-building",
                display_order=0,
                is_featured=True,
                usage_count=999,
                is_active=False,
            ),
        ]
    )
    db_session.commit()

    response = await client.get("/api/v1/municipal/services/featured")

    assert response.status_code == 200
    assert [service["id"] for service in response.json()] == [
        "featured-high",
        "featured-low",
        "featured-later",
    ]
    assert response.json()[0]["is_featured"] is True
    assert response.json()[0]["usage_count"] == 12

    active_services = await client.get("/api/v1/municipal/services")
    assert [service["id"] for service in active_services.json()] == [
        "popular-not-featured",
        "featured-low",
        "featured-high",
        "featured-later",
    ]


async def test_popular_services_are_ranked_by_usage_with_ties_and_bounded_limit(
    client: AsyncClient, db_session: Session
) -> None:
    db_session.add_all(
        [
            MunicipalServiceModel(
                id=service_id,
                name=name,
                category="Administration",
                description="Description",
                contact_details="Mairie",
                opening_hours="8h-16h",
                icon="pi-building",
                display_order=0,
                is_featured=False,
                usage_count=usage_count,
                is_active=active,
            )
            for service_id, name, usage_count, active in [
                ("popular-z", "Zeta", 20, True),
                ("popular-b", "Beta", 20, True),
                ("popular-a", "Alpha", 20, True),
                ("popular-alpha-z", "Alpha duplicate", 20, True),
                ("popular-alpha-a", "Alpha duplicate", 20, True),
                ("popular-next", "Après", 10, True),
                ("popular-unused", "Inutilisé", 0, True),
                ("popular-inactive", "Inactif", 100, False),
            ]
        ]
    )
    db_session.commit()

    response = await client.get("/api/v1/municipal/services/popular?limit=4")

    assert response.status_code == 200
    assert [service["id"] for service in response.json()] == [
        "popular-a",
        "popular-alpha-a",
        "popular-alpha-z",
        "popular-b",
    ]


async def test_popular_services_default_limit_is_six_and_empty_when_unused(
    client: AsyncClient, db_session: Session
) -> None:
    db_session.add_all(
        MunicipalServiceModel(
            id=f"unused-{index}",
            name=f"Service {index}",
            category="Administration",
            description="Description",
            contact_details="Mairie",
            opening_hours="8h-16h",
            icon="pi-building",
            display_order=index,
            usage_count=0,
            is_active=True,
        )
        for index in range(8)
    )
    db_session.commit()

    empty_response = await client.get("/api/v1/municipal/services/popular")
    invalid_limit = await client.get("/api/v1/municipal/services/popular?limit=7")

    assert empty_response.status_code == 200
    assert empty_response.json() == []
    assert invalid_limit.status_code == 422

    for index in range(8):
        db_session.get(MunicipalServiceModel, f"unused-{index}").usage_count = 8 - index
    db_session.commit()
    limited_response = await client.get("/api/v1/municipal/services/popular")

    assert limited_response.status_code == 200
    assert len(limited_response.json()) == 6
    assert [service["usage_count"] for service in limited_response.json()] == [8, 7, 6, 5, 4, 3]


async def test_starting_service_increments_server_owned_usage_count(
    client: AsyncClient, db_session: Session
) -> None:
    service = MunicipalServiceModel(
        id="start-service",
        name="Service à démarrer",
        category="Démarches",
        description="Description",
        contact_details="Mairie",
        opening_hours="8h-16h",
        icon="pi-building",
        display_order=1,
        is_featured=True,
        usage_count=7,
        is_active=True,
    )
    db_session.add(service)
    db_session.commit()

    response = await client.post(
        "/api/v1/municipal/services/start-service/start",
        json={"usage_count": 999},
    )

    db_session.refresh(service)
    assert response.status_code == 200
    assert response.json()["usage_count"] == 8
    assert service.usage_count == 8
    popular = await client.get("/api/v1/municipal/services/popular")
    assert [item["id"] for item in popular.json()] == ["start-service"]


async def test_usage_count_cannot_be_changed_by_a_client(
    client: AsyncClient, db_session: Session
) -> None:
    service = MunicipalServiceModel(
        id="server-owned-count",
        name="Service",
        category="Démarches",
        description="Description",
        contact_details="Mairie",
        opening_hours="8h-16h",
        icon="pi-building",
        display_order=1,
        is_featured=True,
        usage_count=7,
        is_active=True,
    )
    db_session.add(service)
    db_session.commit()

    url = "/api/v1/municipal/services/server-owned-count/featured"
    unauthenticated = await client.patch(
        url,
        json={"is_featured": False, "usage_count": 999},
    )

    credentials = {
        "email": "catalog-citizen@test.mg",
        "name": "Citizen",
        "password": "Motdepasse123",
    }
    assert (await client.post("/api/v1/auth/register", json=credentials)).status_code == 201
    login = await client.post("/api/v1/auth/login", json=credentials)
    assert login.status_code == 200
    client.headers["Authorization"] = f"Bearer {login.json()['access_token']}"
    forbidden = await client.patch(
        url,
        json={"is_featured": False, "usage_count": 999},
    )

    db_session.refresh(service)
    assert unauthenticated.status_code == 401
    assert forbidden.status_code == 403
    assert service.usage_count == 7
    assert service.is_featured is True


async def test_admin_can_update_catalog_fields_but_not_usage_count(
    admin_client: AsyncClient, db_session: Session
) -> None:
    service = MunicipalServiceModel(
        id="catalog-admin-edit",
        name="Service",
        category="Démarches",
        description="Description",
        contact_details="Mairie",
        opening_hours="8h-16h",
        icon="pi-building",
        display_order=1,
        is_featured=False,
        usage_count=7,
        is_active=True,
    )
    db_session.add(service)
    db_session.commit()

    updated = await admin_client.patch(
        "/api/v1/municipal/services/catalog-admin-edit/featured",
        json={"is_featured": True, "display_order": 3},
    )

    assert updated.status_code == 200
    assert updated.json()["is_featured"] is True
    assert updated.json()["display_order"] == 3
    assert updated.json()["usage_count"] == 7

    rejected = await admin_client.patch(
        "/api/v1/municipal/services/catalog-admin-edit/featured",
        json={"usage_count": 99},
    )

    db_session.refresh(service)
    assert rejected.status_code == 422
    assert service.is_featured is True
    assert service.display_order == 3
    assert service.usage_count == 7


async def test_contact_returns_receipt_and_persists_message(
    client: AsyncClient, db_session: Session
) -> None:
    response = await client.post(
        "/api/v1/municipal/contact",
        json={
            "sender_name": "Ada Lovelace",
            "sender_email": "ada@example.com",
            "subject": "Question voirie",
            "message": "Je souhaite connaître la date des travaux de voirie.",
        },
    )

    assert response.status_code == 201
    body = response.json()
    assert body["receipt_number"].startswith("MC-")
    assert "bien été envoyé" in body["message"]


async def test_unknown_publication_is_not_exposed(client: AsyncClient) -> None:
    response = await client.get("/api/v1/municipal/publications/missing")

    assert response.status_code == 404
