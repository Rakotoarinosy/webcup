"""Use cases cibles des demandes : soumission, droits, cycle de vie, attribution, priorité."""

from dataclasses import dataclass
from datetime import UTC, datetime, timedelta

import pytest

from src.domain.agent import Agent
from src.domain.citizen_request import (
    AgentOutsideInstitutError,
    CitizenRequestNotFoundError,
    CitizenRequiredError,
    InvalidStatusTransitionError,
    NotACitizenError,
    RequestCategory,
    RequestClosedError,
    RequestPriority,
    RequestStatus,
)
from src.domain.institut import Institut
from src.domain.user import ForbiddenError, Role, User
from src.features.citizen_request.schemas import (
    AssignRequestIn,
    EditRequestIn,
    PriorityInputsIn,
    SubmitRequestIn,
)
from src.features.citizen_request.use_cases import (
    assign_request,
    change_status,
    delete_request,
    edit_request,
    get_request,
    list_request_events,
    list_requests,
    resolve_actor,
    submit_request,
    update_priority_inputs,
)
from tests.fakes import FakeUserRepository
from tests.fakes_agent import FakeAgentRepository
from tests.fakes_requests import (
    FakeCitizenRequestRepository,
    FakeEventRepository,
    FakeInstitutRepository,
)

NOW = datetime(2026, 10, 3, 12, 0, tzinfo=UTC)


@dataclass
class World:
    users: FakeUserRepository
    agents: FakeAgentRepository
    instituts: FakeInstitutRepository
    requests: FakeCitizenRequestRepository
    events: FakeEventRepository

    def user(self, user_id: str) -> User:
        return self.users.users[user_id]

    def actor(self, user_id: str):
        return resolve_actor(self.user(user_id), self.agents, self.instituts)

    def submit(self, user_id: str = "c1", **overrides):
        data = {
            "title": "Nid de poule",
            "description": "Trou profond",
            "category": RequestCategory.ROADS,
            "location": "Rue A",
            **overrides,
        }
        return submit_request(
            SubmitRequestIn(**data),
            self.user(user_id),
            self.actor(user_id),
            self.requests,
            self.users,
            self.instituts,
            self.events,
            now=NOW,
        )

    def assign(self, request_id: str, agent_id: str = "a1", by: str = "m1"):
        return assign_request(
            request_id,
            AssignRequestIn(agent_id=agent_id),
            self.user(by),
            self.actor(by),
            self.requests,
            self.agents,
            self.events,
            now=NOW,
        )

    def move(self, request_id: str, target: RequestStatus, by: str):
        return change_status(
            request_id, target, self.user(by), self.actor(by), self.requests, self.events, now=NOW
        )


@pytest.fixture
def world() -> World:
    users = FakeUserRepository()
    for user_id, role in [
        ("c1", Role.CITIZEN),
        ("c2", Role.CITIZEN),
        ("ua1", Role.AGENT),
        ("ua2", Role.AGENT),
        ("m1", Role.MANAGER),
        ("m2", Role.MANAGER),
        ("m3", Role.MANAGER),  # sans institut
        ("admin", Role.ADMIN),
    ]:
        users.add(
            User(
                id=user_id,
                email=f"{user_id}@mairie.mg",
                name=f"Nom {user_id}",
                created_at=NOW,
                password_hash="x",
                role=role,
            )
        )

    instituts = FakeInstitutRepository()
    instituts.add(
        Institut(
            id="voirie",
            name="Voirie",
            categories=frozenset({RequestCategory.ROADS, RequestCategory.PUBLIC_LIGHTING}),
            created_at=NOW,
            manager_id="m1",
        )
    )
    instituts.add(
        Institut(
            id="eau",
            name="Eau",
            categories=frozenset({RequestCategory.WATER}),
            created_at=NOW,
            manager_id="m2",
        )
    )

    agents = FakeAgentRepository()
    for agent_id, user_id, institut_id in [("a1", "ua1", "voirie"), ("a2", "ua2", "eau")]:
        agents.add(
            Agent(
                id=agent_id,
                user_id=user_id,
                institut_id=institut_id,
                created_at=NOW,
                name=f"Nom {user_id}",
            )
        )

    return World(users, agents, instituts, FakeCitizenRequestRepository(), FakeEventRepository())


# ─── soumission ───


def test_citizen_submission_is_routed_scored_and_logged(world):
    request = world.submit(urgency=5, affected_citizens=50)

    assert request.citizen_id == "c1"
    assert request.status is RequestStatus.NEW
    assert request.institut_id == "voirie"
    assert request.assigned_agent_id is None
    assert request.priority_score > 0
    assert request.priority is RequestPriority.HIGH
    assert world.events.types() == ["created"]


def test_citizen_cannot_submit_for_someone_else(world):
    request = world.submit(citizen_id="c2")
    assert request.citizen_id == "c1"  # citizen_id ignoré pour un citoyen


def test_category_without_institut_goes_to_administration(world):
    assert world.submit(category=RequestCategory.WASTE).institut_id is None


def test_manager_submits_for_a_citizen(world):
    assert world.submit("m1", citizen_id="c2").citizen_id == "c2"
    with pytest.raises(CitizenRequiredError):
        world.submit("m1")
    with pytest.raises(NotACitizenError):
        world.submit("m1", citizen_id="ua1")


def test_agent_cannot_submit(world):
    with pytest.raises(ForbiddenError):
        world.submit("ua1", citizen_id="c1")


# ─── lecture et périmètres ───


def test_each_role_sees_only_its_scope(world):
    roads = world.submit()
    water = world.submit("c2", category=RequestCategory.WATER)
    world.assign(roads.id)

    def visible(user_id):
        items, _ = list_requests(world.actor(user_id), world.requests, page=1, page_size=50)
        return {r.id for r in items}

    assert visible("c1") == {roads.id}
    assert visible("c2") == {water.id}
    assert visible("ua1") == {roads.id}
    assert visible("ua2") == set()
    assert visible("m1") == {roads.id}
    assert visible("m2") == {water.id}
    assert visible("m3") == set()  # manager sans institut : rien, pas tout
    assert visible("admin") == {roads.id, water.id}


def test_get_request_enforces_view_rights(world):
    request = world.submit()
    assert get_request(request.id, world.actor("m1"), world.requests) is request
    for outsider in ("c2", "ua1", "m2"):
        with pytest.raises(ForbiddenError):
            get_request(request.id, world.actor(outsider), world.requests)
    with pytest.raises(CitizenRequestNotFoundError):
        get_request("missing", world.actor("admin"), world.requests)


def test_timeline_resolves_agent_name(world):
    request = world.submit()
    world.assign(request.id)

    events = list_request_events(
        request.id, world.actor("c1"), world.requests, world.events, world.agents
    )

    assert [e.type.value for e in events] == ["created", "assigned"]
    assert events[1].payload["agent_name"] == "Nom ua1"


# ─── attribution et cycle de vie ───


def test_assignment_moves_request_in_progress(world):
    request = world.assign(world.submit().id)

    assert request.assigned_agent_id == "a1"
    assert request.status is RequestStatus.IN_PROGRESS
    assert world.events.items[-1].payload["from"] == RequestStatus.NEW.value


def test_assignment_rules(world):
    request = world.submit()
    with pytest.raises(AgentOutsideInstitutError):
        world.assign(request.id, agent_id="a2")
    with pytest.raises(ForbiddenError):
        world.assign(request.id, by="m2")  # manager d'un autre institut
    with pytest.raises(ForbiddenError):
        world.assign(request.id, by="ua1")  # un agent ne s'attribue pas de demande
    world.agents.items["a1"].is_active = False
    with pytest.raises(Exception, match="deactivated"):
        world.assign(request.id)


def test_admin_assignment_adopts_agent_institut(world):
    request = world.submit(category=RequestCategory.WASTE)
    assigned = world.assign(request.id, agent_id="a2", by="admin")
    assert assigned.institut_id == "eau"


def test_agent_resolves_own_request_once(world):
    request = world.assign(world.submit().id)

    resolved = world.move(request.id, RequestStatus.RESOLVED, by="ua1")

    assert resolved.status is RequestStatus.RESOLVED
    assert resolved.resolved_at == NOW
    with pytest.raises(InvalidStatusTransitionError):
        world.move(request.id, RequestStatus.IN_PROGRESS, by="m1")
    with pytest.raises(RequestClosedError):
        world.assign(request.id)


def test_only_manager_rejects(world):
    request = world.assign(world.submit().id)
    with pytest.raises(ForbiddenError):
        world.move(request.id, RequestStatus.REJECTED, by="ua1")
    assert world.move(request.id, RequestStatus.REJECTED, by="m1").status is RequestStatus.REJECTED
    assert world.events.types()[-1] == "rejected"


def test_cannot_resolve_without_taking_charge(world):
    request = world.submit()
    with pytest.raises(InvalidStatusTransitionError):
        world.move(request.id, RequestStatus.RESOLVED, by="m1")


# ─── modification ───


def _edit(world, request_id, by, **changes):
    return edit_request(
        request_id,
        EditRequestIn(**changes),
        world.user(by),
        world.actor(by),
        world.requests,
        world.instituts,
        world.events,
        now=NOW + timedelta(minutes=5),
    )


def test_author_edits_new_request_only(world):
    request = world.submit()
    assert _edit(world, request.id, "c1", title="Nouveau titre").title == "Nouveau titre"
    with pytest.raises(ForbiddenError):
        _edit(world, request.id, "c1", priority=RequestPriority.URGENT)
    with pytest.raises(ForbiddenError):
        _edit(world, request.id, "c2", title="Pirate")

    world.assign(request.id)
    with pytest.raises(ForbiddenError):
        _edit(world, request.id, "c1", title="Trop tard")


def test_unchanged_edit_writes_nothing(world):
    request = world.submit()
    _edit(world, request.id, "c1", title=request.title)
    assert world.events.types() == ["created"]


def test_category_change_reroutes_and_unassigns(world):
    request = world.assign(world.submit().id)

    updated = _edit(world, request.id, "m1", category=RequestCategory.WATER)

    assert updated.institut_id == "eau"
    assert updated.assigned_agent_id is None
    payload = world.events.items[-1].payload
    assert "institut_id" in payload["fields"]
    assert payload["unassigned_agent_id"] == "a1"


def test_delete_rights(world):
    request = world.submit()
    with pytest.raises(ForbiddenError):
        delete_request(request.id, world.actor("c2"), world.requests)
    delete_request(request.id, world.actor("c1"), world.requests)
    assert request.id not in world.requests.items


# ─── priorité ───


def test_priority_inputs_recompute_priority(world):
    request = world.submit(urgency=1, category=RequestCategory.PUBLIC_LIGHTING)
    assert request.priority is RequestPriority.LOW

    updated = update_priority_inputs(
        request.id,
        PriorityInputsIn(urgency=5, affected_citizens=100),
        world.user("c1"),
        world.actor("c1"),
        world.requests,
        world.events,
        now=NOW,
    )

    assert updated.priority is RequestPriority.URGENT
    assert world.events.items[-1].payload == {
        "from": RequestPriority.LOW.value,
        "to": RequestPriority.URGENT.value,
        "manual": False,
    }


# ─── résolution de l'Actor ───


def test_resolve_actor(world):
    assert world.actor("ua1").agent_id == "a1"
    assert world.actor("ua1").institut_id == "voirie"
    assert world.actor("m2").institut_id == "eau"
    assert world.actor("m3").institut_id is None

    world.agents.items["a1"].is_active = False
    assert world.actor("ua1").agent_id is None  # agent désactivé : plus aucun accès
    world.instituts.items["eau"].is_active = False
    assert world.actor("m2").institut_id is None
