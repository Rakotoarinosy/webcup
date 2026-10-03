"""Scénarios publics de consultation et de contact municipal."""

from datetime import UTC, datetime, timedelta

import pytest
from httpx import AsyncClient
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from src.infrastructure.persistence.models import (
    ContactMessageModel,
    MunicipalPublicationModel,
    MunicipalServiceModel,
)

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
    stored = db_session.scalar(
        select(ContactMessageModel).where(
            ContactMessageModel.receipt_number == body["receipt_number"]
        )
    )
    assert stored is not None
    assert stored.sender_email == "ada@example.com"
    assert stored.subject == "Question voirie"
    assert stored.service_id is None
    assert datetime.fromisoformat(body["created_at"]).tzinfo is not None


async def test_unknown_publication_is_not_exposed(client: AsyncClient) -> None:
    response = await client.get("/api/v1/municipal/publications/missing")

    assert response.status_code == 404


async def test_future_and_unpublished_publications_are_hidden(
    client: AsyncClient, db_session: Session
) -> None:
    now = datetime.now(UTC)
    db_session.add_all(
        [
            MunicipalPublicationModel(
                id=identifier,
                title=identifier,
                summary="Summary",
                content="Content",
                category="Information",
                published_at=published_at,
                is_published=published,
            )
            for identifier, published_at, published in [
                ("published-old", now - timedelta(days=2), True),
                ("published-new", now - timedelta(days=1), True),
                ("future", now + timedelta(days=1), True),
                ("draft", now - timedelta(days=1), False),
            ]
        ]
    )
    db_session.commit()

    listed = await client.get("/api/v1/municipal/publications")
    assert listed.status_code == 200
    assert [item["id"] for item in listed.json()] == ["published-new", "published-old"]
    for identifier in ["future", "draft"]:
        assert (await client.get(f"/api/v1/municipal/publications/{identifier}")).status_code == 404
    assert (await client.get("/api/v1/municipal/publications/published-new")).status_code == 200


@pytest.mark.parametrize(
    "field,value",
    [
        ("sender_name", "  "),
        ("subject", "   "),
        ("message", "          "),
        ("sender_email", "not-an-email"),
    ],
)
async def test_invalid_contact_is_not_saved(
    client: AsyncClient, db_session: Session, field: str, value: str
) -> None:
    payload = {
        "sender_name": "Ada Lovelace",
        "sender_email": "ada@example.com",
        "subject": "Question mairie",
        "message": "Une question pour la mairie.",
    }
    payload[field] = value
    response = await client.post("/api/v1/municipal/contact", json=payload)
    assert response.status_code == 422
    assert db_session.scalar(select(func.count()).select_from(ContactMessageModel)) == 0


async def test_contact_rejects_unknown_or_inactive_service_without_losing_message(
    client: AsyncClient, db_session: Session
) -> None:
    db_session.add(
        MunicipalServiceModel(
            id="inactive",
            name="Old service",
            description="Description",
            contact_details="Mairie",
            opening_hours="8h-16h",
            icon="pi-building",
            display_order=1,
            is_active=False,
        )
    )
    db_session.commit()
    payload = {
        "sender_name": "  Ada Lovelace  ",
        "sender_email": "ada@example.com",
        "subject": "  Question mairie  ",
        "message": "  Une question pour la mairie.  ",
    }
    for identifier in ["missing", "inactive"]:
        response = await client.post(
            "/api/v1/municipal/contact", json={**payload, "service_id": identifier}
        )
        assert response.status_code == 404
    assert db_session.scalar(select(func.count()).select_from(ContactMessageModel)) == 0
    sent = await client.post("/api/v1/municipal/contact", json=payload)
    assert sent.status_code == 201
    stored = db_session.scalar(select(ContactMessageModel))
    assert stored is not None
    assert stored.sender_name == "Ada Lovelace"
    assert stored.subject == "Question mairie"
    assert stored.message == "Une question pour la mairie."


async def test_contact_preserves_selected_service_and_receipt_matches_persistence(
    client: AsyncClient, db_session: Session
) -> None:
    db_session.add(
        MunicipalServiceModel(
            id="roads",
            name="Voirie",
            description="Description",
            contact_details="Mairie",
            opening_hours="8h-16h",
            icon="pi-building",
            display_order=1,
            is_active=True,
        )
    )
    db_session.commit()
    sent = await client.post(
        "/api/v1/municipal/contact",
        json={
            "service_id": "roads",
            "sender_name": "Ada Lovelace",
            "sender_email": "ada@example.com",
            "subject": "Question voirie",
            "message": "Une question pour la mairie.",
        },
    )
    assert sent.status_code == 201
    stored = db_session.scalar(
        select(ContactMessageModel).where(
            ContactMessageModel.receipt_number == sent.json()["receipt_number"]
        )
    )
    assert stored is not None
    assert stored.service_id == "roads"
