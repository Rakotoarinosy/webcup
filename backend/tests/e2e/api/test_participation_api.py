"""Participation des habitants : projets (F67), consultations (F65, F66), idées (F68), avis (F76).

Chaque contribution reçoit une référence et une date, et se retrouve dans « Ma participation »
avec la suite que la mairie lui donne.
"""

from datetime import UTC, datetime, timedelta

import pytest
from sqlalchemy.orm import Session

from src.infrastructure.persistence.models import MunicipalServiceModel
from tests.e2e.api.conftest import API, Platform

pytestmark = pytest.mark.anyio

P = f"{API}/participation"
PROJECT = {
    "title": "Jardin partagé",
    "summary": "Un jardin cultivé par les habitants du quartier.",
    "description": "Parcelles, compost collectif et point d'eau sur la friche.",
    "district": "Quartier Nord",
    "budget": "120 000 crédits",
    "planned_start": "2027-01-15",
    "planned_end": "2027-06-30",
}


def _window(hours_before: int = 1, days_after: int = 7) -> dict[str, str]:
    now = datetime.now(UTC)
    return {
        "opens_at": (now - timedelta(hours=hours_before)).isoformat(),
        "closes_at": (now + timedelta(days=days_after)).isoformat(),
    }


async def _anonymous(platform: Platform):  # type: ignore[no-untyped-def]
    """Retire l'en-tête par défaut du client admin le temps d'une requête publique."""
    return platform.client.headers.pop("Authorization")


# ─── F67 : projets ──────────────────────────────────────────────────


async def test_city_projects_are_public_with_dated_steps(platform: Platform) -> None:
    client = platform.client
    created = await client.post(f"{P}/projects", headers=platform.as_("m1"), json=PROJECT)
    assert created.status_code == 201, created.text
    project = created.json()
    assert project["status"] == "À l'étude" and project["progress"] == 0

    draft = await client.post(
        f"{P}/projects",
        headers=platform.admin,
        json={**PROJECT, "title": "Brouillon", "is_published": False},
    )
    assert draft.status_code == 201

    moved = await client.patch(
        f"{P}/projects/{project['id']}",
        headers=platform.admin,
        json={"status": "En cours", "progress": 30},
    )
    assert moved.status_code == 200, moved.text
    # Le changement d'état devient une étape datée sur la page du projet.
    assert moved.json()["updates"][0]["title"] == "Nouvel état : En cours"

    news = await client.post(
        f"{P}/projects/{project['id']}/updates",
        headers=platform.as_("m1"),
        json={"title": "Clôture posée", "content": "La clôture du jardin est installée."},
    )
    assert news.status_code == 200
    assert news.json()["updates"][0]["title"] == "Clôture posée"

    token = await _anonymous(platform)
    try:
        listed = (await client.get(f"{P}/projects")).json()
        assert [item["title"] for item in listed] == ["Jardin partagé"]
        assert (await client.get(f"{P}/projects", params={"status": "Terminé"})).json() == []
        by_district = await client.get(f"{P}/projects", params={"district": "Quartier Nord"})
        assert len(by_district.json()) == 1
        detail = await client.get(f"{P}/projects/{project['id']}")
        assert detail.status_code == 200 and len(detail.json()["updates"]) == 2
        hidden = await client.get(f"{P}/projects/{draft.json()['id']}")
        assert hidden.status_code == 404
    finally:
        client.headers["Authorization"] = token

    done = await client.patch(
        f"{P}/projects/{project['id']}", headers=platform.admin, json={"status": "Terminé"}
    )
    assert done.json()["progress"] == 100

    journal = (await client.get(f"{API}/audit", headers=platform.admin)).json()
    actions = {entry["action"] for entry in journal["items"]}
    assert {"project_created", "project_updated", "project_news_published"} <= actions


async def test_project_management_is_reserved_to_the_city(platform: Platform) -> None:
    client = platform.client
    for key in ("c1", "ua1"):
        response = await client.post(f"{P}/projects", headers=platform.as_(key), json=PROJECT)
        assert response.status_code == 403
        assert (
            await client.get(f"{P}/projects/manage", headers=platform.as_(key))
        ).status_code == 403
    bad = await client.post(
        f"{P}/projects",
        headers=platform.admin,
        json={**PROJECT, "planned_start": "2027-06-30", "planned_end": "2027-01-01"},
    )
    assert bad.status_code == 400


# ─── F65 / F66 : consultations ──────────────────────────────────────


async def test_vote_is_unique_editable_and_published_with_decision(platform: Platform) -> None:
    client = platform.client
    project = (await client.post(f"{P}/projects", headers=platform.admin, json=PROJECT)).json()
    created = await client.post(
        f"{P}/consultations",
        headers=platform.as_("m1"),
        json={
            "title": "Priorité du jardin partagé",
            "question": "Quel aménagement en premier ?",
            "kind": "Vote à choix",
            "options": ["Parcelles", "Aire de jeux", "Verger"],
            "project_id": project["id"],
            **_window(),
        },
    )
    assert created.status_code == 201, created.text
    consultation = created.json()
    assert consultation["phase"] == "Ouverte"
    assert consultation["project_title"] == "Jardin partagé"
    assert "Une seule réponse" in consultation["rules"]
    url = f"{P}/consultations/{consultation['id']}"

    first = await client.put(
        f"{url}/response", headers=platform.as_("c1"), json={"choice": "Verger"}
    )
    assert first.status_code == 200, first.text
    receipt = first.json()
    assert receipt["reference"].startswith("CP-") and receipt["created_at"]
    changed = await client.put(
        f"{url}/response", headers=platform.as_("c1"), json={"choice": "Parcelles"}
    )
    # Une seule réponse : la modification garde la même référence.
    assert changed.json()["reference"] == receipt["reference"]
    assert changed.json()["choice"] == "Parcelles"
    await client.put(f"{url}/response", headers=platform.as_("c2"), json={"choice": "Parcelles"})

    invalid = await client.put(
        f"{url}/response", headers=platform.as_("c2"), json={"choice": "Piscine"}
    )
    assert invalid.status_code == 400
    staff_vote = await client.put(
        f"{url}/response", headers=platform.as_("m1"), json={"choice": "Verger"}
    )
    assert staff_vote.status_code == 403

    # Pendant l'ouverture, les résultats ne sont pas publics.
    token = await _anonymous(platform)
    try:
        assert (await client.get(url)).json()["results"] is None
    finally:
        client.headers["Authorization"] = token
    locked = await client.patch(url, headers=platform.admin, json={"options": ["A", "B"]})
    assert locked.status_code == 409

    early = await client.post(
        f"{url}/decision", headers=platform.admin, json={"decision": "Trop tôt pour décider."}
    )
    assert early.status_code == 400
    closed = await client.post(f"{url}/close", headers=platform.admin)
    assert closed.status_code == 200 and closed.json()["phase"] == "Clôturée"
    late = await client.put(
        f"{url}/response", headers=platform.as_("c1"), json={"choice": "Verger"}
    )
    assert late.status_code == 400

    decision = "Les parcelles seront aménagées en premier, dès janvier."
    decided = await client.post(
        f"{url}/decision", headers=platform.as_("m1"), json={"decision": decision}
    )
    assert decided.status_code == 200, decided.text

    token = await _anonymous(platform)
    try:
        public = (await client.get(url)).json()
    finally:
        client.headers["Authorization"] = token
    assert public["phase"] == "Décision publiée"
    assert public["decision"] == decision
    assert public["results"]["total"] == 2
    assert {o["option"]: o["count"] for o in public["results"]["options"]} == {
        "Parcelles": 2,
        "Aire de jeux": 0,
        "Verger": 0,
    }

    mine = (await client.get(f"{P}/mine", headers=platform.as_("c1"))).json()
    [answer] = mine["consultation_responses"]
    assert answer["reference"] == receipt["reference"]
    assert answer["phase"] == "Décision publiée" and answer["decision"] == decision

    journal = (await client.get(f"{API}/audit", headers=platform.admin)).json()
    actions = {entry["action"] for entry in journal["items"]}
    assert {"consultation_created", "consultation_closed", "consultation_decided"} <= actions


async def test_free_opinion_on_a_project_is_recorded_anonymously(platform: Platform) -> None:
    client = platform.client
    created = await client.post(
        f"{P}/consultations",
        headers=platform.admin,
        json={
            "title": "Votre avis sur l'éclairage",
            "question": "Que pensez-vous du nouvel éclairage ?",
            "kind": "Avis libre",
            **_window(),
        },
    )
    assert created.status_code == 201, created.text
    url = f"{P}/consultations/{created.json()['id']}"
    empty = await client.put(f"{url}/response", headers=platform.as_("c1"), json={"comment": "  "})
    assert empty.status_code == 400
    saved = await client.put(
        f"{url}/response",
        headers=platform.as_("c1"),
        json={"comment": "Bien plus agréable le soir."},
    )
    assert saved.status_code == 200 and saved.json()["reference"].startswith("CP-")
    again = (await client.get(f"{url}/response", headers=platform.as_("c1"))).json()
    assert again["comment"] == "Bien plus agréable le soir."
    assert (await client.get(f"{url}/response", headers=platform.as_("c2"))).json() is None

    contributions = await client.get(f"{url}/contributions", headers=platform.as_("m1"))
    assert contributions.json()[0] == {
        "choice": None,
        "comment": "Bien plus agréable le soir.",
        "submitted_at": contributions.json()[0]["submitted_at"],
    }
    assert (await client.get(f"{url}/contributions", headers=platform.as_("c1"))).status_code == 403

    upcoming = await client.post(
        f"{P}/consultations",
        headers=platform.admin,
        json={
            "title": "Bientôt ouverte",
            "question": "Une question à venir ?",
            "kind": "Avis libre",
            "opens_at": (datetime.now(UTC) + timedelta(days=1)).isoformat(),
            "closes_at": (datetime.now(UTC) + timedelta(days=5)).isoformat(),
        },
    )
    assert upcoming.json()["phase"] == "À venir"
    too_early = await client.put(
        f"{P}/consultations/{upcoming.json()['id']}/response",
        headers=platform.as_("c1"),
        json={"comment": "Je réponds trop tôt."},
    )
    assert too_early.status_code == 400

    bad_vote = await client.post(
        f"{P}/consultations",
        headers=platform.admin,
        json={
            "title": "Vote sans choix",
            "question": "Oui ?",
            "kind": "Vote à choix",
            "options": ["Oui"],
            **_window(),
        },
    )
    assert bad_vote.status_code == 400


# ─── F68 : boîte à idées ────────────────────────────────────────────

IDEA = {
    "title": "Des bancs au marché",
    "description": "Installer quelques bancs à l'ombre près du marché couvert.",
    "theme": "Cadre de vie",
    "district": "Centre-ville",
}


async def test_idea_is_traced_moderated_supported_and_answered(platform: Platform) -> None:
    client = platform.client
    created = await client.post(f"{P}/ideas", headers=platform.as_("c1"), json=IDEA)
    assert created.status_code == 201, created.text
    idea = created.json()
    assert idea["reference"].startswith("ID-")
    assert idea["status"] == "Reçue" and idea["visibility"] == "En attente de modération"
    assert [step["status"] for step in idea["history"]] == ["Reçue"]

    # Pas encore modérée : invisible et impossible à soutenir.
    assert (await client.get(f"{P}/ideas")).json() == []
    refused = await client.post(f"{P}/ideas/{idea['id']}/support", headers=platform.as_("c2"))
    assert refused.status_code == 400

    published = await client.post(
        f"{P}/ideas/{idea['id']}/moderation",
        headers=platform.as_("m2"),
        json={"visibility": "Publiée"},
    )
    assert published.status_code == 200 and published.json()["user_name"] == "Nom c1"

    own = await client.post(f"{P}/ideas/{idea['id']}/support", headers=platform.as_("c1"))
    assert own.status_code == 400
    support = await client.post(f"{P}/ideas/{idea['id']}/support", headers=platform.as_("c2"))
    assert support.json() == {"supported": True, "support_count": 1}
    public = (await client.get(f"{P}/ideas")).json()
    assert public[0]["support_count"] == 1 and "user_id" not in public[0]
    assert (await client.get(f"{P}/mine", headers=platform.as_("c2"))).json()[
        "supported_idea_ids"
    ] == [idea["id"]]
    undo = await client.post(f"{P}/ideas/{idea['id']}/support", headers=platform.as_("c2"))
    assert undo.json() == {"supported": False, "support_count": 0}

    unmotivated = await client.post(
        f"{P}/ideas/{idea['id']}/status", headers=platform.admin, json={"status": "Retenue"}
    )
    assert unmotivated.status_code == 400
    await client.post(
        f"{P}/ideas/{idea['id']}/status", headers=platform.admin, json={"status": "À l'étude"}
    )
    answer = "Retenue : quatre bancs seront posés au printemps."
    accepted = await client.post(
        f"{P}/ideas/{idea['id']}/status",
        headers=platform.admin,
        json={"status": "Retenue", "response": answer},
    )
    assert accepted.status_code == 200, accepted.text
    backwards = await client.post(
        f"{P}/ideas/{idea['id']}/status",
        headers=platform.admin,
        json={"status": "Reçue", "response": "Retour en arrière impossible."},
    )
    assert backwards.status_code == 400

    mine = (await client.get(f"{P}/mine", headers=platform.as_("c1"))).json()
    [traced] = mine["ideas"]
    assert [step["status"] for step in traced["history"]] == ["Reçue", "À l'étude", "Retenue"]
    assert all(step["at"] for step in traced["history"])
    assert traced["response"] == answer and traced["answered_by"] == "Admin"

    for key in ("c1", "ua1"):
        assert (await client.get(f"{P}/ideas/manage", headers=platform.as_(key))).status_code == 403
    journal = (await client.get(f"{API}/audit", headers=platform.admin)).json()
    actions = {entry["action"] for entry in journal["items"]}
    assert {"idea_moderated", "idea_status_changed"} <= actions


# ─── F76 : avis sur un service ──────────────────────────────────────


@pytest.fixture
def service(db_session: Session) -> str:
    db_session.add(
        MunicipalServiceModel(
            id="svc-etat-civil",
            name="État civil",
            category="Démarches",
            description="Actes et démarches familiales.",
            contact_details="Guichet 1",
            opening_hours="Lun-Ven",
            icon="pi-id-card",
            display_order=1,
            is_active=True,
        )
    )
    db_session.commit()
    return "svc-etat-civil"


async def test_service_review_is_unique_answered_and_moderated(
    platform: Platform, service: str
) -> None:
    client = platform.client
    url = f"{P}/services/{service}/review"
    first = await client.put(
        url, headers=platform.as_("c1"), json={"rating": 2, "comment": "Attente trop longue."}
    )
    assert first.status_code == 200, first.text
    review = first.json()
    assert review["reference"].startswith("AV-") and review["service_name"] == "État civil"
    edited = await client.put(
        url, headers=platform.as_("c1"), json={"rating": 4, "comment": "Mieux la seconde fois."}
    )
    assert edited.json()["reference"] == review["reference"] and edited.json()["rating"] == 4
    await client.put(
        url, headers=platform.as_("c2"), json={"rating": 5, "comment": "Accueil parfait."}
    )

    out_of_range = await client.put(
        url, headers=platform.as_("c2"), json={"rating": 6, "comment": "Trop bien !"}
    )
    assert out_of_range.status_code == 422
    missing = await client.put(
        f"{P}/services/inconnu/review",
        headers=platform.as_("c1"),
        json={"rating": 3, "comment": "Service ?"},
    )
    assert missing.status_code == 404

    ratings = (await client.get(f"{P}/services/ratings")).json()
    assert ratings == [{"service_id": service, "average": 4.5, "count": 2}]

    answer = "Merci, nous avons ouvert un second guichet."
    answered = await client.post(
        f"{P}/reviews/{review['id']}/answer", headers=platform.as_("m1"), json={"response": answer}
    )
    assert answered.status_code == 200 and answered.json()["user_name"] == "Nom c1"
    twice = await client.post(
        f"{P}/reviews/{review['id']}/answer", headers=platform.as_("m1"), json={"response": answer}
    )
    assert twice.status_code == 400

    other = (await client.get(f"{P}/reviews/manage", headers=platform.admin)).json()
    c2_review = next(item for item in other if item["user_name"] == "Nom c2")
    hidden = await client.post(
        f"{P}/reviews/{c2_review['id']}/moderation", headers=platform.admin, json={"hidden": True}
    )
    assert hidden.json()["is_hidden"] is True

    public = (await client.get(f"{P}/services/{service}/reviews")).json()
    assert public["count"] == 1 and public["average"] == 4.0
    assert public["reviews"][0]["response"] == answer
    assert "user_name" not in public["reviews"][0]

    mine = (await client.get(f"{P}/mine", headers=platform.as_("c1"))).json()
    assert mine["reviews"][0]["response"] == answer
    assert (await client.get(url, headers=platform.as_("c1"))).json()["reference"] == review[
        "reference"
    ]

    assert (await client.get(f"{P}/reviews/manage", headers=platform.as_("c1"))).status_code == 403
    journal = (await client.get(f"{API}/audit", headers=platform.admin)).json()
    actions = {entry["action"] for entry in journal["items"]}
    assert {"service_review_answered", "service_review_moderated"} <= actions


async def test_contributions_follow_the_account_deletion(platform: Platform, service: str) -> None:
    client = platform.client
    await client.post(f"{P}/ideas", headers=platform.as_("c1"), json=IDEA)
    await client.put(
        f"{P}/services/{service}/review",
        headers=platform.as_("c1"),
        json={"rating": 3, "comment": "Correct dans l'ensemble."},
    )
    deleted = await client.request(
        "DELETE",
        f"{API}/auth/me",
        headers=platform.as_("c1"),
        json={"current_password": "Motdepasse123"},
    )
    assert deleted.status_code in (200, 204), deleted.text
    ideas = (await client.get(f"{P}/ideas/manage", headers=platform.admin)).json()
    assert len(ideas) == 1  # l'idée reste au dossier de la mairie
    assert (await client.get(f"{P}/services/ratings")).json()[0]["count"] == 1
