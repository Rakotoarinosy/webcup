"""Accueil et langues : langue préférée (D14), contenus traduits (F27),
premiers pas (D12, F35) et « Par où commencer ? » (F72)."""

from datetime import UTC, datetime

import pytest
from sqlalchemy.orm import Session

from src.infrastructure.persistence.models import MunicipalPublicationModel, MunicipalServiceModel
from tests.e2e.api.conftest import API, Platform

pytestmark = pytest.mark.anyio


def add_demo_content(db: Session) -> None:
    db.add_all(
        [
            MunicipalServiceModel(
                id="svc-civil",
                name="État civil",
                category="Administration",
                description="Actes et documents",
                contact_details="Hôtel de ville",
                opening_hours="Lun-Ven, 8h-16h",
                icon="pi-id-card",
                display_order=1,
                is_active=True,
                is_featured=True,
            ),
            MunicipalServiceModel(
                id="svc-water",
                name="Eau et assainissement",
                category="Eau et assainissement",
                description="Réseau d'eau",
                contact_details="Service eau",
                opening_hours="Lun-Ven, 8h-16h",
                icon="pi-sun",
                display_order=2,
                is_active=True,
                address="Rue de l'eau",
                latitude=-18.9,
                longitude=47.5,
            ),
            MunicipalPublicationModel(
                id="pub-1",
                title="Bienvenue",
                summary="Résumé",
                content="Contenu",
                category="Information pratique",
                published_at=datetime(2026, 1, 1, tzinfo=UTC),
                is_published=True,
            ),
        ]
    )
    db.commit()


# ─── D14 : langue préférée ───


async def test_language_preference_is_saved_without_touching_display(
    platform: Platform,
) -> None:
    headers = platform.as_("c1")
    initial = await platform.client.get(f"{API}/preferences/me", headers=headers)
    assert initial.json()["language"] is None  # jamais choisie

    await platform.client.put(
        f"{API}/preferences/me", headers=headers, json={"theme": "dark", "font_size": "large"}
    )
    patched = await platform.client.patch(
        f"{API}/preferences/me", headers=headers, json={"language": "mg"}
    )
    assert patched.status_code == 200, patched.text
    assert patched.json() == {
        "theme": "dark",
        "font_size": "large",
        "font_family": "system",
        "language": "mg",
    }

    # Le configurateur (PUT sans langue) ne réinitialise pas la langue.
    replaced = await platform.client.put(
        f"{API}/preferences/me", headers=headers, json={"theme": "light"}
    )
    assert replaced.json()["language"] == "mg"

    invalid = await platform.client.patch(
        f"{API}/preferences/me", headers=headers, json={"language": "de"}
    )
    assert invalid.status_code == 422
    empty = await platform.client.patch(f"{API}/preferences/me", headers=headers, json={})
    assert empty.status_code == 422


# ─── F27 : contenus multilingues ───


async def test_services_are_served_in_the_requested_language_with_french_fallback(
    platform: Platform, db_session: Session
) -> None:
    add_demo_content(db_session)
    saved = await platform.client.put(
        f"{API}/municipal/services/svc-civil/translations/en",
        headers=platform.as_("admin"),
        json={"name": "Civil registry", "description": "Certificates", "opening_hours": " "},
    )
    assert saved.status_code == 200, saved.text
    assert saved.json()["fields"] == {"name": "Civil registry", "description": "Certificates"}

    english = (await platform.client.get(f"{API}/municipal/services?lang=en")).json()
    civil = next(s for s in english if s["id"] == "svc-civil")
    water = next(s for s in english if s["id"] == "svc-water")
    assert civil["name"] == "Civil registry"
    assert civil["opening_hours"] == "Lun-Ven, 8h-16h"  # champ non traduit → français
    assert civil["language"] == "en" and civil["translation_available"] is True
    assert water["name"] == "Eau et assainissement"
    assert water["language"] == "fr" and water["translation_available"] is False

    # Accept-Language est utilisé quand `lang` est absent.
    featured = await platform.client.get(
        f"{API}/municipal/services/featured", headers={"Accept-Language": "en-GB,en;q=0.9"}
    )
    assert featured.json()[0]["name"] == "Civil registry"

    french = (await platform.client.get(f"{API}/municipal/services?lang=fr")).json()
    assert next(s for s in french if s["id"] == "svc-civil")["name"] == "État civil"


async def test_publication_translations_and_management_rights(
    platform: Platform, db_session: Session
) -> None:
    add_demo_content(db_session)
    url = f"{API}/municipal/publications/pub-1/translations/mg"

    citizen = await platform.client.put(url, headers=platform.as_("c1"), json={"title": "Tongasoa"})
    assert citizen.status_code == 403
    french = await platform.client.put(
        f"{API}/municipal/publications/pub-1/translations/fr",
        headers=platform.as_("ua1"),
        json={"title": "Bienvenue !"},
    )
    assert french.status_code == 400
    assert french.json()["error"] == "ReferenceLanguageTranslationError"
    empty = await platform.client.put(url, headers=platform.as_("ua1"), json={"title": ""})
    assert empty.status_code == 400
    missing = await platform.client.put(
        f"{API}/municipal/publications/nope/translations/mg",
        headers=platform.as_("ua1"),
        json={"title": "x"},
    )
    assert missing.status_code == 404

    saved = await platform.client.put(url, headers=platform.as_("ua1"), json={"title": "Tongasoa"})
    assert saved.status_code == 200, saved.text

    detail = await platform.client.get(
        f"{API}/municipal/publications/pub-1", headers={"Accept-Language": "mg"}
    )
    assert detail.json()["title"] == "Tongasoa"
    assert detail.json()["summary"] == "Résumé"
    listed = await platform.client.get(f"{API}/municipal/publications?lang=mg")
    assert listed.json()[0]["title"] == "Tongasoa"

    translations = await platform.client.get(
        f"{API}/municipal/publications/pub-1/translations", headers=platform.as_("ua1")
    )
    assert [t["language"] for t in translations.json()] == ["mg"]

    deleted = await platform.client.delete(url, headers=platform.as_("ua1"))
    assert deleted.status_code == 204
    again = await platform.client.delete(url, headers=platform.as_("ua1"))
    assert again.status_code == 404
    fallback = await platform.client.get(f"{API}/municipal/publications/pub-1?lang=mg")
    assert fallback.json()["title"] == "Bienvenue"
    assert fallback.json()["translation_available"] is False


async def test_translation_changes_are_audited(platform: Platform, db_session: Session) -> None:
    add_demo_content(db_session)
    await platform.client.put(
        f"{API}/municipal/services/svc-water/translations/mg",
        headers=platform.as_("m1"),
        json={"name": "Rano"},
    )
    await platform.client.delete(
        f"{API}/municipal/services/svc-water/translations/mg", headers=platform.as_("m1")
    )
    agent = await platform.client.put(
        f"{API}/municipal/services/svc-water/translations/en",
        headers=platform.as_("ua1"),
        json={"name": "Water"},
    )
    assert agent.status_code == 403

    journal = await platform.client.get(
        f"{API}/audit",
        headers=platform.as_("admin"),
        params={"action": ["content_translation_saved", "content_translation_deleted"]},
    )
    assert journal.status_code == 200, journal.text
    entries = journal.json()["items"]
    assert {e["action"] for e in entries} == {
        "content_translation_saved",
        "content_translation_deleted",
    }
    assert all(e["target_type"] == "municipal_service" for e in entries)
    assert all(e["target_label"] == "Eau et assainissement" for e in entries)


# ─── D12, F35 : premiers pas ───


async def test_onboarding_checklist_progress_is_remembered(platform: Platform) -> None:
    headers = platform.as_("c1")
    first = await platform.client.get(f"{API}/onboarding/me", headers=headers)
    assert first.status_code == 200, first.text
    assert first.json()["completed_count"] == 0
    assert [s["step"] for s in first.json()["steps"]] == [
        "profile",
        "language",
        "find_service",
        "first_request",
    ]

    await platform.client.post(f"{API}/onboarding/me/steps/profile", headers=headers)
    await platform.client.patch(f"{API}/preferences/me", headers=headers, json={"language": "en"})
    await platform.submit("c1")
    progress = await platform.client.post(
        f"{API}/onboarding/me/steps/find_service", headers=headers
    )

    body = progress.json()
    assert body["is_complete"] is True and body["completed_count"] == 4

    other = await platform.client.get(f"{API}/onboarding/me", headers=platform.as_("c2"))
    assert other.json()["completed_count"] == 0  # progression propre à chaque utilisateur

    unknown = await platform.client.post(f"{API}/onboarding/me/steps/nope", headers=headers)
    assert unknown.status_code == 422


async def test_onboarding_hints_and_dismissal(platform: Platform) -> None:
    headers = platform.as_("c2")
    seen = await platform.client.post(f"{API}/onboarding/me/hints/my_requests", headers=headers)
    assert seen.json()["seen_hints"] == ["my_requests"]
    await platform.client.post(f"{API}/onboarding/me/hints/my_requests", headers=headers)

    hidden = await platform.client.patch(
        f"{API}/onboarding/me", headers=headers, json={"dismissed": True}
    )
    assert hidden.json()["dismissed"] is True

    again = await platform.client.get(f"{API}/onboarding/me", headers=headers)
    assert again.json()["seen_hints"] == ["my_requests"]
    assert again.json()["dismissed"] is True

    anonymous = await platform.client.get(
        f"{API}/onboarding/me", headers={"Authorization": "Bearer invalid"}
    )
    assert anonymous.status_code == 401


# ─── F72 : par où commencer ? ───


async def test_orientation_is_public_and_localized(platform: Platform, db_session: Session) -> None:
    add_demo_content(db_session)
    await platform.client.put(
        f"{API}/municipal/services/svc-water/translations/en",
        headers=platform.as_("admin"),
        json={"name": "Water and sanitation"},
    )

    response = await platform.client.get(
        f"{API}/orientation",
        params={
            "situation": "neighbourhood_issue",
            "needs": ["water"],
            "channel": "in_person",
            "lang": "en",
        },
        headers={"Authorization": ""},
    )

    assert response.status_code == 200, response.text
    body = response.json()
    assert body["needs"] == ["water"]
    assert [s["service"]["name"] for s in body["services"]] == ["Water and sanitation"]
    actions = [(a["action"], a["category"], a["service_id"]) for a in body["actions"]]
    assert ("report_issue", "Eau", None) in actions
    assert ("visit_service", None, "svc-water") in actions
    assert ("ask_agent", None, None) in actions


async def test_orientation_for_a_new_resident_uses_default_needs(
    platform: Platform, db_session: Session
) -> None:
    add_demo_content(db_session)
    response = await platform.client.get(f"{API}/orientation", params={"situation": "new_resident"})
    body = response.json()
    assert body["needs"] == ["papers", "health", "news"]
    assert [s["service"]["id"] for s in body["services"]] == ["svc-civil"]
    assert body["actions"][0]["action"] == "set_up_account"

    invalid = await platform.client.get(f"{API}/orientation", params={"situation": "lost"})
    assert invalid.status_code == 422
