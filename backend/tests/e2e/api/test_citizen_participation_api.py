"""F52 soutien, F75 doublons, F84 fil de messages : parcours complets par l'API."""

import pytest

from tests.e2e.api.conftest import API, Platform

pytestmark = pytest.mark.anyio

REQUESTS = f"{API}/requests"


async def notifications(platform: Platform, key: str) -> list[dict]:
    response = await platform.client.get(f"{API}/notifications", headers=platform.as_(key))
    assert response.status_code == 200, response.text
    return response.json()["items"]


# ─── F52 : soutenir une demande ───────────────────────────────────


async def test_public_view_is_anonymous_and_minimal(platform: Platform) -> None:
    await platform.submit(
        "c1",
        title="Lampadaire éteint, joignez-moi au 034 11 222 33",
        description="Je suis Rina, porte bleue",
        location="12 rue des Lilas",
        category="Éclairage public",
    )
    response = await platform.client.get(f"{REQUESTS}/public", headers=platform.as_("c2"))
    assert response.status_code == 200, response.text
    [item] = response.json()["items"]
    assert set(item) == {
        "id", "title", "category", "status", "location", "created_at",
        "support_count", "supported_by_me", "is_mine", "supported_at",
    }  # fmt: skip
    assert "034" not in item["title"] and item["location"] == "rue des Lilas"
    assert item["is_mine"] is False

    # La recherche ne sonde pas la description privée.
    hidden = await platform.client.get(
        f"{REQUESTS}/public", params={"search": "Rina"}, headers=platform.as_("c2")
    )
    assert hidden.json()["total"] == 0


async def test_citizen_supports_once_not_their_own_and_can_withdraw(platform: Platform) -> None:
    request = (await platform.submit("c1", urgency=1)).json()
    url = f"{REQUESTS}/{request['id']}/support"

    assert (await platform.client.post(url, headers=platform.as_("c1"))).status_code == 400
    assert (await platform.client.post(url, headers=platform.as_("ua1"))).status_code == 403

    supported = await platform.client.post(url, headers=platform.as_("c2"))
    assert supported.status_code == 201, supported.text
    assert supported.json()["supported_by_me"] is True
    assert supported.json()["support_count"] == 1
    assert (await platform.client.post(url, headers=platform.as_("c2"))).status_code == 409

    # Trace pour l'habitant : liste « Demandes que je soutiens ».
    mine = await platform.client.get(f"{REQUESTS}/supported", headers=platform.as_("c2"))
    assert [item["id"] for item in mine.json()] == [request["id"]]
    assert mine.json()[0]["supported_at"] is not None

    # Agents et manager voient le nombre de soutiens ; le score a monté.
    detail = (
        await platform.client.get(f"{REQUESTS}/{request['id']}", headers=platform.as_("m1"))
    ).json()
    assert detail["support_count"] == 1
    assert detail["priority_score"] > request["priority_score"]

    # L'auteur voit l'événement « supported » sans l'identité du soutien.
    events = (
        await platform.client.get(f"{REQUESTS}/{request['id']}/events", headers=platform.as_("c1"))
    ).json()
    support_event = next(e for e in events if e["type"] == "supported")
    assert support_event["actor_name"] is None and support_event["actor_id"] is None

    withdrawn = await platform.client.delete(url, headers=platform.as_("c2"))
    assert withdrawn.status_code == 200 and withdrawn.json()["support_count"] == 0
    assert (await platform.client.delete(url, headers=platform.as_("c2"))).status_code == 404


async def test_supporters_are_notified_when_the_request_changes(platform: Platform) -> None:
    request_id = (await platform.submit("c1")).json()["id"]
    await platform.client.post(f"{REQUESTS}/{request_id}/support", headers=platform.as_("c2"))
    await platform.client.post(
        f"{REQUESTS}/{request_id}/assign",
        headers=platform.as_("m1"),
        json={"agent_id": platform.agents["a1"]},
    )

    items = await notifications(platform, "c2")
    assert [n["kind"] for n in items] == ["supported_update"]
    assert items[0]["request_id"] == request_id
    public = await platform.client.get(
        f"{REQUESTS}/public/{request_id}", headers=platform.as_("c2")
    )
    assert public.json()["status"] == "En cours"


# ─── F75 : demandes similaires et doublons ────────────────────────


async def test_similar_requests_are_suggested_before_submission(platform: Platform) -> None:
    existing = (await platform.submit("c1", title="Nid de poule énorme", location="Rue A")).json()
    draft = {"title": "Gros nid de poule", "category": "Voirie", "location": "Rue A"}

    response = await platform.client.post(
        f"{REQUESTS}/similar-check", headers=platform.as_("c2"), json=draft
    )
    assert response.status_code == 200, response.text
    [match] = response.json()
    assert match["id"] == existing["id"] and match["score"] > 0
    assert "description" not in match

    other_category = {**draft, "category": "Eau"}
    response = await platform.client.post(
        f"{REQUESTS}/similar-check", headers=platform.as_("c2"), json=other_category
    )
    assert response.json() == []


async def test_staff_sees_similar_counts_filters_and_merges_duplicates(platform: Platform) -> None:
    principal = (await platform.submit("c1", title="Nid de poule énorme")).json()["id"]
    duplicate = (await platform.submit("c2", title="Énorme nid de poule")).json()["id"]
    alone = (
        await platform.submit("c2", title="Trottoir cassé", description="Bordure", location="Rue B")
    ).json()["id"]

    listing = (await platform.client.get(REQUESTS, headers=platform.as_("m1"))).json()["items"]
    counts = {item["id"]: item["similar_count"] for item in listing}
    assert counts == {principal: 1, duplicate: 1, alone: 0}

    filtered = await platform.client.get(
        REQUESTS, params={"has_similar": True}, headers=platform.as_("m1")
    )
    assert {item["id"] for item in filtered.json()["items"]} == {principal, duplicate}

    group = (
        await platform.client.get(f"{REQUESTS}/{principal}/similar", headers=platform.as_("m1"))
    ).json()
    assert [s["request"]["id"] for s in group["similar"]] == [duplicate]
    assert (
        await platform.client.get(f"{REQUESTS}/{principal}/similar", headers=platform.as_("c1"))
    ).status_code == 403

    # Un agent non gestionnaire ne fusionne pas.
    forbidden = await platform.client.post(
        f"{REQUESTS}/{duplicate}/duplicate",
        headers=platform.as_("m2"),
        json={"duplicate_of_id": principal},
    )
    assert forbidden.status_code == 403

    merged = await platform.client.post(
        f"{REQUESTS}/{duplicate}/duplicate",
        headers=platform.as_("m1"),
        json={"duplicate_of_id": principal},
    )
    assert merged.status_code == 200, merged.text
    assert merged.json()["duplicate_of_id"] == principal and merged.json()["status"] == "Rejeté"

    group = (
        await platform.client.get(f"{REQUESTS}/{principal}/similar", headers=platform.as_("m1"))
    ).json()
    assert [d["id"] for d in group["duplicates"]] == [duplicate] and group["similar"] == []
    # L'auteur du doublon devient soutien de la principale et en est informé.
    assert group["duplicates"][0]["citizen_id"] == platform.users["c2"]
    principal_now = (
        await platform.client.get(f"{REQUESTS}/{principal}", headers=platform.as_("m1"))
    ).json()
    assert principal_now["support_count"] == 1
    kinds = {n["kind"] for n in await notifications(platform, "c2")}
    assert "marked_duplicate" in kinds
    supported = (
        await platform.client.get(f"{REQUESTS}/supported", headers=platform.as_("c2"))
    ).json()
    assert [s["id"] for s in supported] == [principal]

    again = await platform.client.post(
        f"{REQUESTS}/{alone}/duplicate",
        headers=platform.as_("m1"),
        json={"duplicate_of_id": duplicate},
    )
    assert again.status_code == 400  # la principale est elle-même un doublon


# ─── F84 : fil de messages ────────────────────────────────────────


async def test_message_thread_between_agent_and_citizen(platform: Platform) -> None:
    request_id = (await platform.submit("c1")).json()["id"]
    url = f"{REQUESTS}/{request_id}/messages"

    # Agent non attribué : interdit.
    assert (
        await platform.client.post(url, headers=platform.as_("ua1"), json={"body": "x"})
    ).status_code == 403
    await platform.client.post(
        f"{REQUESTS}/{request_id}/assign",
        headers=platform.as_("m1"),
        json={"agent_id": platform.agents["a1"]},
    )

    question = await platform.client.post(
        url, headers=platform.as_("c1"), json={"body": "Des nouvelles ?"}
    )
    assert question.status_code == 201, question.text
    assert question.json()["from_staff"] is False
    awaiting = await platform.client.get(
        REQUESTS, params={"awaiting_reply": True}, headers=platform.as_("ua1")
    )
    assert [item["id"] for item in awaiting.json()["items"]] == [request_id]
    assert {n["kind"] for n in await notifications(platform, "ua1")} >= {"message_posted"}

    note = await platform.client.post(
        url, headers=platform.as_("ua1"), json={"body": "Pièce commandée", "visibility": "internal"}
    )
    assert note.status_code == 201
    reply = await platform.client.post(
        url, headers=platform.as_("ua1"), json={"body": "Intervention jeudi."}
    )
    assert reply.status_code == 201 and reply.json()["author_name"] == "Nom ua1"

    staff_view = (await platform.client.get(url, headers=platform.as_("m1"))).json()
    assert [m["visibility"] for m in staff_view] == ["public", "internal", "public"]
    citizen_view = (await platform.client.get(url, headers=platform.as_("c1"))).json()
    assert [m["body"] for m in citizen_view] == ["Des nouvelles ?", "Intervention jeudi."]
    assert (await platform.client.get(url, headers=platform.as_("c2"))).status_code == 403

    detail = (
        await platform.client.get(f"{REQUESTS}/{request_id}", headers=platform.as_("c1"))
    ).json()
    assert detail["conversation_state"] == "answered"
    events = (
        await platform.client.get(f"{REQUESTS}/{request_id}/events", headers=platform.as_("c1"))
    ).json()
    assert "internal_note_added" not in {e["type"] for e in events}
    assert [n["kind"] for n in await notifications(platform, "c1")].count("message_posted") == 1

    # Le citoyen n'écrit pas de note interne ; un message vide est refusé.
    internal = await platform.client.post(
        url, headers=platform.as_("c1"), json={"body": "x", "visibility": "internal"}
    )
    assert internal.status_code == 403
    blank = await platform.client.post(url, headers=platform.as_("c1"), json={"body": "   "})
    assert blank.status_code == 422
