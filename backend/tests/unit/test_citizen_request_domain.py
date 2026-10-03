from datetime import UTC, datetime, timedelta

import pytest

from src.domain.citizen_request import (
    CitizenRequest,
    InvalidStatusTransitionError,
    RequestCategory,
    RequestClosedError,
    RequestPriority,
    RequestStatus,
)
from src.domain.citizen_request.priority import compute_score, is_late, late_since, priority_for

NOW = datetime.now(UTC)


def make_request(status: RequestStatus = RequestStatus.NEW) -> CitizenRequest:
    return CitizenRequest(
        id="r1",
        title="Lampadaire cassé",
        description="Rue sombre",
        category=RequestCategory.PUBLIC_LIGHTING,
        priority=RequestPriority.NORMAL,
        status=status,
        citizen_id="c1",
        created_at=NOW,
        location="Rue A",
        updated_at=NOW,
    )


# ─── cycle de vie ───


def test_full_lifecycle_sets_resolved_at_once():
    request = make_request()
    request.change_status(RequestStatus.IN_PROGRESS, NOW)
    request.change_status(RequestStatus.PENDING, NOW)
    request.change_status(RequestStatus.IN_PROGRESS, NOW)
    later = NOW + timedelta(hours=1)
    request.change_status(RequestStatus.RESOLVED, later)

    assert request.status is RequestStatus.RESOLVED
    assert request.resolved_at == later
    assert request.updated_at == later
    assert not request.is_open


@pytest.mark.parametrize(
    ("current", "target"),
    [
        (RequestStatus.NEW, RequestStatus.RESOLVED),  # pas de résolution sans prise en charge
        (RequestStatus.NEW, RequestStatus.PENDING),
        (RequestStatus.RESOLVED, RequestStatus.NEW),  # état final
        (RequestStatus.REJECTED, RequestStatus.IN_PROGRESS),  # état final
        (RequestStatus.IN_PROGRESS, RequestStatus.IN_PROGRESS),
    ],
)
def test_forbidden_transitions(current, target):
    request = make_request(current)
    with pytest.raises(InvalidStatusTransitionError):
        request.change_status(target, NOW)
    assert request.status is current


def test_assign_open_request():
    request = make_request()
    request.assign_to("a1", NOW)
    assert request.assigned_agent_id == "a1"
    request.assign_to(None, NOW)
    assert request.assigned_agent_id is None


@pytest.mark.parametrize("status", [RequestStatus.RESOLVED, RequestStatus.REJECTED])
def test_closed_request_cannot_be_reassigned(status):
    request = make_request(status)
    with pytest.raises(RequestClosedError):
        request.assign_to("a1", NOW)


# ─── priorisation (reprise de l'ancien domaine Demande) ───


def test_score_levels():
    hot = compute_score(
        urgency=5, affected_citizens=50, created_at=NOW, category=RequestCategory.SAFETY, now=NOW
    )
    assert priority_for(hot.total) is RequestPriority.URGENT, hot
    default = compute_score(
        urgency=3, affected_citizens=1, created_at=NOW, category=RequestCategory.ROADS, now=NOW
    )
    assert priority_for(default.total) is RequestPriority.NORMAL, default
    low = compute_score(
        urgency=1,
        affected_citizens=1,
        created_at=NOW,
        category=RequestCategory.GREEN_SPACES,
        now=NOW,
    )
    assert priority_for(low.total) is RequestPriority.LOW


def test_every_category_has_a_criticality():
    for category in RequestCategory:
        compute_score(urgency=3, affected_citizens=1, created_at=NOW, category=category, now=NOW)


def test_score_age_and_bounds():
    old = compute_score(
        urgency=99,
        affected_citizens=0,
        created_at=NOW - timedelta(days=40),
        category=RequestCategory.OTHER,
        now=NOW,
    )
    assert old.urgency == 30 and old.age == 20 and old.affected == 0
    assert 0 <= old.total <= 100
    naive = compute_score(
        urgency=3,
        affected_citizens=1,
        created_at=(NOW - timedelta(days=1)).replace(tzinfo=None),
        category=RequestCategory.OTHER,
        now=NOW,
    )
    assert naive.age == 2


def test_late_rules():
    old = NOW - timedelta(days=4)
    assert is_late(RequestStatus.NEW, created_at=old, scheduled_at=None, updated_at=old, now=NOW)
    assert not is_late(
        RequestStatus.NEW, created_at=NOW, scheduled_at=None, updated_at=NOW, now=NOW
    )
    assert (
        late_since(RequestStatus.IN_PROGRESS, created_at=NOW, scheduled_at=None, updated_at=NOW)
        is None
    )
    week = NOW - timedelta(days=8)
    assert is_late(
        RequestStatus.PENDING, created_at=week, scheduled_at=None, updated_at=week, now=NOW
    )
    for closed in (RequestStatus.RESOLVED, RequestStatus.REJECTED):
        assert not is_late(closed, created_at=old, scheduled_at=None, updated_at=old, now=NOW)
