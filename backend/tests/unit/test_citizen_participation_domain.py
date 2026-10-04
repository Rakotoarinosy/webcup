"""Domaine pur des lots F52 (soutien), F75 (similarité) et F84 (messages)."""

from datetime import UTC, datetime, timedelta

import pytest

from src.domain.citizen_request import (
    CitizenRequest,
    ConversationState,
    InvalidDuplicateError,
    MessageVisibility,
    RequestCategory,
    RequestClosedError,
    RequestPriority,
    RequestStatus,
)
from src.domain.citizen_request.messages import next_conversation_state
from src.domain.citizen_request.priority import compute_score
from src.domain.citizen_request.similarity import (
    DraftRequest,
    compare,
    find_similar,
    haversine_km,
    keywords,
    similar_counts,
)
from src.domain.citizen_request.support import approximate_location, redact_personal_data, to_public

NOW = datetime(2026, 10, 4, 12, 0, tzinfo=UTC)


def make(request_id: str, title: str, **overrides) -> CitizenRequest:
    data = {
        "id": request_id,
        "title": title,
        "description": "",
        "category": RequestCategory.PUBLIC_LIGHTING,
        "priority": RequestPriority.NORMAL,
        "status": RequestStatus.NEW,
        "citizen_id": "c1",
        "created_at": NOW,
        "updated_at": NOW,
        "location": "Rue Andrianampoinimerina",
        **overrides,
    }
    return CitizenRequest(**data)


# ─── F75 : similarité ──────────────────────────────────────────────


def test_keywords_ignore_case_accents_stopwords_and_plurals() -> None:
    assert keywords("Les LAMPADAIRES éteints de la Rue") == {"lampadaire", "eteint", "rue"}
    assert keywords("rue des Lilas", location=True) == {"lila"}


def test_haversine_distance() -> None:
    assert haversine_km(0, 0, 0, 0) == 0
    # Un degré de latitude ≈ 111,2 km.
    assert haversine_km(-18.0, 47.0, -19.0, 47.0) == pytest.approx(111.2, abs=0.2)


def test_same_problem_is_detected_with_shared_keywords() -> None:
    a = make("a", "Lampadaire éteint", description="Le lampadaire reste éteint la nuit")
    b = make("b", "lampadaires eteints depuis lundi")
    match = compare(a, b)
    assert match is not None
    assert match.shared_keywords == ("eteint", "lampadaire")
    assert match.same_place  # même voie


def test_different_category_window_or_place_are_not_similar() -> None:
    a = make("a", "Lampadaire éteint")
    assert compare(a, make("b", "Lampadaire éteint", category=RequestCategory.ROADS)) is None
    assert compare(a, make("c", "Lampadaire éteint", created_at=NOW - timedelta(days=45))) is None
    far = make("d", "Lampadaire éteint", latitude=-18.9, longitude=47.5)
    assert compare(make("e", "Lampadaire éteint", latitude=-18.0, longitude=47.5), far) is None
    near = make("f", "Lampadaire cassé", latitude=-18.9001, longitude=47.5001, location="Ailleurs")
    match = compare(make("g", "Lampadaire tombé", latitude=-18.9, longitude=47.5), near)
    assert match is not None and match.same_place and match.distance_km is not None


def test_one_keyword_alone_is_not_enough_without_same_place() -> None:
    a = make("a", "Lampadaire éteint", location="Analakely")
    b = make("b", "Lampadaire penché", location="Ambohijatovo")
    assert compare(a, b) is None


def test_find_similar_ranks_and_excludes_itself() -> None:
    a = make("a", "Lampadaire éteint devant école")
    others = [a, make("b", "Lampadaire éteint"), make("c", "Lampadaire éteint devant école")]
    assert [m.request_id for m in find_similar(a, others)] == ["c", "b"]
    assert similar_counts(others) == {"a": 2, "b": 2, "c": 2}


def test_draft_can_be_compared() -> None:
    draft = DraftRequest(
        title="Lampadaire éteint",
        description="",
        category=RequestCategory.PUBLIC_LIGHTING,
        location="Rue Andrianampoinimerina",
        created_at=NOW,
    )
    assert [m.request_id for m in find_similar(draft, [make("a", "Lampadaire éteint")])] == ["a"]


# ─── F52 : vue publique et priorité ───────────────────────────────


def test_public_view_hides_identity_description_and_contacts() -> None:
    request = make(
        "a",
        "Fuite, appelez-moi au 034 12 345 67 ou rina@mail.mg",
        description="Je suis Rina, j'habite au 3e étage",
        location="12 bis rue des Lilas, Analakely",
        support_count=4,
    )
    public = to_public(request, "c2")
    assert "034" not in public.title and "rina@mail.mg" not in public.title
    assert public.location == "rue des Lilas, Analakely"
    assert public.support_count == 4 and not public.is_mine
    assert not hasattr(public, "description") and not hasattr(public, "citizen_id")
    assert to_public(request, "c1").is_mine


def test_location_helpers() -> None:
    assert approximate_location("Lot II M 45 Ambohijatovo") == "Ambohijatovo"
    assert approximate_location("") == "Lieu non précisé"
    assert redact_personal_data("tel +261 34 00 000 00") == "tel [masqué]"


def test_supports_raise_the_priority_score() -> None:
    base = dict(urgency=3, affected_citizens=1, created_at=NOW, category=RequestCategory.ROADS)
    assert compute_score(**base, supporters=20).total > compute_score(**base).total


# ─── F75 : doublon ────────────────────────────────────────────────


def test_mark_duplicate_closes_and_links() -> None:
    principal, duplicate = make("p", "x"), make("d", "x")
    duplicate.mark_duplicate_of(principal, NOW)
    assert duplicate.duplicate_of_id == "p" and duplicate.status is RequestStatus.REJECTED
    with pytest.raises(RequestClosedError):
        duplicate.mark_duplicate_of(principal, NOW)
    with pytest.raises(InvalidDuplicateError):
        principal.mark_duplicate_of(principal, NOW)
    with pytest.raises(InvalidDuplicateError):
        make("z", "x").mark_duplicate_of(duplicate, NOW)


# ─── F84 : état du fil ────────────────────────────────────────────


def test_conversation_state_follows_the_last_public_message() -> None:
    state = next_conversation_state(
        ConversationState.NONE, from_staff=False, visibility=MessageVisibility.PUBLIC
    )
    assert state is ConversationState.AWAITING_STAFF
    assert (
        next_conversation_state(state, from_staff=True, visibility=MessageVisibility.INTERNAL)
        is ConversationState.AWAITING_STAFF
    )
    assert (
        next_conversation_state(state, from_staff=True, visibility=MessageVisibility.PUBLIC)
        is ConversationState.ANSWERED
    )
