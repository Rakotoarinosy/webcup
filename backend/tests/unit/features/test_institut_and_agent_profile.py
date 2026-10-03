from datetime import UTC, datetime

import pytest

from src.domain.agent import AgentAlreadyExistsError, AgentQuery, InvalidAgentAccountError
from src.domain.citizen_request import Actor, RequestCategory
from src.domain.institut import (
    CategoryConflictError,
    InstitutAlreadyExistsError,
    InstitutInactiveError,
    InvalidManagerError,
    ManagerConflictError,
)
from src.domain.user import ForbiddenError, Role, User
from src.features.agent.schemas import CreateAgentProfileIn
from src.features.agent.use_cases import (
    create_agent_profile,
    list_agents_in_scope,
    move_agent,
    set_agent_active,
)
from src.features.institut.schemas import CreateInstitutIn, SetManagerIn, UpdateInstitutIn
from src.features.institut.use_cases import (
    create_institut,
    get_institut,
    list_instituts,
    set_manager,
    update_institut,
)
from tests.fakes import FakeUserRepository
from tests.fakes_agent import FakeAgentRepository
from tests.fakes_requests import FakeInstitutRepository

NOW = datetime(2026, 10, 3, tzinfo=UTC)
ADMIN = Actor(user_id="admin", role=Role.ADMIN)


@pytest.fixture
def users() -> FakeUserRepository:
    repo = FakeUserRepository()
    for user_id, role, active in [
        ("m1", Role.MANAGER, True),
        ("m2", Role.MANAGER, True),
        ("off", Role.MANAGER, False),
        ("ua1", Role.AGENT, True),
        ("ua2", Role.AGENT, True),
        ("c1", Role.CITIZEN, True),
    ]:
        repo.add(
            User(
                id=user_id,
                email=f"{user_id}@mairie.mg",
                name=f"Nom {user_id}",
                created_at=NOW,
                password_hash="x",
                role=role,
                is_active=active,
            )
        )
    return repo


@pytest.fixture
def instituts() -> FakeInstitutRepository:
    return FakeInstitutRepository()


def _create(instituts, users, name="Voirie", categories=(RequestCategory.ROADS,), **extra):
    return create_institut(
        CreateInstitutIn(name=name, categories=set(categories), **extra),
        ADMIN,
        instituts,
        users,
        now=NOW,
    )


# ─── instituts ───


def test_admin_creates_institut_with_manager(instituts, users):
    institut = _create(instituts, users, manager_id="m1")
    assert institut.manager_id == "m1"
    assert institut.handles(RequestCategory.ROADS)


def test_only_admin_creates_instituts(instituts, users):
    with pytest.raises(ForbiddenError):
        create_institut(
            CreateInstitutIn(name="X", categories={RequestCategory.WATER}),
            Actor(user_id="m1", role=Role.MANAGER),
            instituts,
            users,
        )


def test_institut_invariants(instituts, users):
    _create(instituts, users, manager_id="m1")
    with pytest.raises(InstitutAlreadyExistsError):
        _create(instituts, users, name=" voirie ", categories=(RequestCategory.WATER,))
    with pytest.raises(CategoryConflictError):
        _create(instituts, users, name="Routes", categories=(RequestCategory.ROADS,))
    with pytest.raises(ManagerConflictError):
        _create(instituts, users, name="Eau", categories=(RequestCategory.WATER,), manager_id="m1")
    for invalid in ("off", "ua1", "missing"):
        with pytest.raises(InvalidManagerError):
            _create(
                instituts,
                users,
                name="Eau",
                categories=(RequestCategory.WATER,),
                manager_id=invalid,
            )


def test_reactivation_checks_category_overlap(instituts, users):
    old = _create(instituts, users)
    update_institut(old.id, UpdateInstitutIn(is_active=False), ADMIN, instituts)
    _create(instituts, users, name="Nouvelle voirie")  # catégorie libérée

    with pytest.raises(CategoryConflictError):
        update_institut(old.id, UpdateInstitutIn(is_active=True), ADMIN, instituts)


def test_manager_reads_only_own_institut(instituts, users):
    voirie = _create(instituts, users, manager_id="m1")
    eau = _create(instituts, users, name="Eau", categories=(RequestCategory.WATER,))
    set_manager(eau.id, SetManagerIn(manager_id="m2"), ADMIN, instituts, users)

    m1 = Actor(user_id="m1", role=Role.MANAGER, institut_id=voirie.id)
    assert get_institut(voirie.id, m1, instituts) is voirie
    with pytest.raises(ForbiddenError):
        get_institut(eau.id, m1, instituts)
    assert list_instituts(m1, instituts, active_only=False) == [voirie]
    assert len(list_instituts(ADMIN, instituts, active_only=False)) == 2
    assert (
        list_instituts(Actor(user_id="c1", role=Role.CITIZEN), instituts, active_only=False) == []
    )


# ─── profils agents ───


def test_manager_creates_agent_in_own_institut(instituts, users):
    voirie = _create(instituts, users, manager_id="m1")
    eau = _create(instituts, users, name="Eau", categories=(RequestCategory.WATER,))
    agents = FakeAgentRepository()
    m1 = Actor(user_id="m1", role=Role.MANAGER, institut_id=voirie.id)

    # institut_id envoyé ignoré : le manager crée toujours dans son institut.
    agent = create_agent_profile(
        CreateAgentProfileIn(user_id="ua1", institut_id=eau.id), m1, agents, users, instituts
    )

    assert agent.user_id == "ua1"
    assert agent.institut_id == voirie.id
    assert agent.name == "Nom ua1"  # lu depuis User, jamais stocké sur le profil
    with pytest.raises(AgentAlreadyExistsError):
        create_agent_profile(CreateAgentProfileIn(user_id="ua1"), m1, agents, users, instituts)
    with pytest.raises(InvalidAgentAccountError):
        create_agent_profile(CreateAgentProfileIn(user_id="c1"), m1, agents, users, instituts)


def test_agent_scope_and_activation(instituts, users):
    voirie = _create(instituts, users, manager_id="m1")
    eau = _create(instituts, users, name="Eau", categories=(RequestCategory.WATER,))
    agents = FakeAgentRepository()
    a1 = create_agent_profile(
        CreateAgentProfileIn(user_id="ua1", institut_id=voirie.id), ADMIN, agents, users, instituts
    )
    a2 = create_agent_profile(
        CreateAgentProfileIn(user_id="ua2", institut_id=eau.id), ADMIN, agents, users, instituts
    )
    m1 = Actor(user_id="m1", role=Role.MANAGER, institut_id=voirie.id)

    assert list_agents_in_scope(m1, AgentQuery(), agents) == [a1]
    assert len(list_agents_in_scope(ADMIN, AgentQuery(), agents)) == 2
    with pytest.raises(ForbiddenError):
        list_agents_in_scope(Actor(user_id="ua1", role=Role.AGENT), AgentQuery(), agents)

    assert set_agent_active(a1.id, False, m1, agents).is_active is False
    with pytest.raises(ForbiddenError):
        set_agent_active(a2.id, False, m1, agents)

    with pytest.raises(ForbiddenError):
        move_agent(a1.id, eau.id, m1, agents, instituts)
    assert move_agent(a1.id, eau.id, ADMIN, agents, instituts).institut_id == eau.id

    update_institut(voirie.id, UpdateInstitutIn(is_active=False), ADMIN, instituts)
    with pytest.raises(InstitutInactiveError):
        move_agent(a1.id, voirie.id, ADMIN, agents, instituts)
