from datetime import UTC, datetime

import pytest

from src.domain.agent import Agent, AgentInactiveError
from src.domain.citizen_request import (
    Actor,
    AgentOutsideInstitutError,
    CitizenRequest,
    RequestCategory,
    RequestPriority,
    RequestScope,
    RequestStatus,
    can_change_status,
    can_create_for,
    can_manage,
    can_view,
    ensure_agent_assignable,
    scope_for,
)
from src.domain.institut import Institut, overlapping_categories
from src.domain.user import Role

NOW = datetime.now(UTC)

CITIZEN = Actor(user_id="c1", role=Role.CITIZEN)
OTHER_CITIZEN = Actor(user_id="c2", role=Role.CITIZEN)
AGENT = Actor(user_id="u-a1", role=Role.AGENT, agent_id="a1", institut_id="voirie")
OTHER_AGENT = Actor(user_id="u-a2", role=Role.AGENT, agent_id="a2", institut_id="voirie")
MANAGER = Actor(user_id="m1", role=Role.MANAGER, institut_id="voirie")
OTHER_MANAGER = Actor(user_id="m2", role=Role.MANAGER, institut_id="eau")
ADMIN = Actor(user_id="admin", role=Role.ADMIN)


def make_request() -> CitizenRequest:
    return CitizenRequest(
        id="r1",
        title="Nid de poule",
        description="Trou dans la chaussée",
        category=RequestCategory.ROADS,
        priority=RequestPriority.NORMAL,
        status=RequestStatus.IN_PROGRESS,
        citizen_id="c1",
        created_at=NOW,
        location="Rue A",
        updated_at=NOW,
        assigned_agent_id="a1",
        institut_id="voirie",
    )


def make_agent(**changes) -> Agent:
    values = dict(
        id="a1",
        created_at=NOW,
        user_id="u-a1",
        institut_id="voirie",
    )
    return Agent(**{**values, **changes})


# ─── matrice des permissions ───


@pytest.mark.parametrize(
    ("actor", "view", "manage", "status"),
    [
        (CITIZEN, True, False, False),
        (OTHER_CITIZEN, False, False, False),
        (AGENT, True, False, True),
        (OTHER_AGENT, False, False, False),
        (MANAGER, True, True, True),
        (OTHER_MANAGER, False, False, False),
        (ADMIN, True, True, True),
    ],
)
def test_permission_matrix(actor, view, manage, status):
    request = make_request()
    assert can_view(actor, request) is view
    assert can_manage(actor, request) is manage
    assert can_change_status(actor, request) is status


def test_unattached_manager_and_agent_see_nothing():
    request = make_request()
    lost_manager = Actor(user_id="m3", role=Role.MANAGER)
    lost_agent = Actor(user_id="u-a3", role=Role.AGENT)
    assert not can_view(lost_manager, request)
    assert not can_view(lost_agent, request)
    assert scope_for(lost_manager).is_empty
    assert scope_for(lost_agent).is_empty


def test_request_without_institut_is_admin_only():
    request = make_request()
    request.institut_id = None
    assert not can_manage(MANAGER, request)
    assert can_manage(ADMIN, request)


def test_scopes():
    assert scope_for(ADMIN) == RequestScope()
    assert scope_for(MANAGER) == RequestScope(institut_id="voirie")
    assert scope_for(AGENT) == RequestScope(agent_id="a1")
    assert scope_for(CITIZEN) == RequestScope(citizen_id="c1")


def test_create_for():
    assert can_create_for(CITIZEN, "c1")
    assert not can_create_for(CITIZEN, "c2")
    assert not can_create_for(AGENT, "c1")
    assert can_create_for(MANAGER, "c1")
    assert can_create_for(ADMIN, "c1")


# ─── attribution ───


def test_agent_of_same_institut_is_assignable():
    ensure_agent_assignable(make_request(), make_agent())


def test_agent_of_other_institut_is_refused():
    with pytest.raises(AgentOutsideInstitutError):
        ensure_agent_assignable(make_request(), make_agent(institut_id="eau"))


def test_inactive_agent_is_refused():
    with pytest.raises(AgentInactiveError):
        ensure_agent_assignable(make_request(), make_agent(is_active=False))


# ─── instituts ───


def make_institut(id_: str, *categories: RequestCategory, active: bool = True) -> Institut:
    return Institut(
        id=id_, name=id_, categories=frozenset(categories), created_at=NOW, is_active=active
    )


def test_institut_handles_only_its_categories_when_active():
    institut = make_institut("voirie", RequestCategory.ROADS)
    assert institut.handles(RequestCategory.ROADS)
    assert not institut.handles(RequestCategory.WATER)
    institut.is_active = False
    assert not institut.handles(RequestCategory.ROADS)


def test_category_overlap_with_active_instituts_only():
    roads = make_institut("voirie", RequestCategory.ROADS, RequestCategory.PUBLIC_LIGHTING)
    old = make_institut("ancien", RequestCategory.WATER, active=False)
    candidate = make_institut("nouveau", RequestCategory.WATER, RequestCategory.PUBLIC_LIGHTING)

    assert overlapping_categories(candidate, [roads, old]) == {RequestCategory.PUBLIC_LIGHTING}
    assert overlapping_categories(roads, [roads]) == frozenset()  # pas de conflit avec soi-même
