"""Fixtures partagées : une base SQLite en mémoire, neuve pour chaque test."""

from collections.abc import AsyncIterator, Iterator

import httpx
import pytest
from sqlalchemy import Engine, create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from src.infrastructure.persistence import models  # noqa: F401  (enregistre les tables)
from src.infrastructure.security.http_guards import GuardConfig
from src.infrastructure.persistence.database import Base, get_db
from src.infrastructure.security.email_verification import get_email_verifier
from src.main import app


@pytest.fixture
def engine() -> Iterator[Engine]:
    # StaticPool : toutes les sessions partagent la même connexion, donc la même base en mémoire.
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    Base.metadata.create_all(engine)
    yield engine
    engine.dispose()


@pytest.fixture
def db_session(engine: Engine) -> Iterator[Session]:
    session = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)()
    yield session
    session.close()


@pytest.fixture(autouse=True)
def relaxed_guards() -> Iterator[GuardConfig]:
    """Les tests enchaînent connexions et envois identiques depuis une même « IP » : limites
    de débit, anti-robots, anti-doublon et cache public sont coupés par défaut. Les tests de
    tests/integration/test_http_guards.py les réactivent explicitement (fixture `guards`).
    """
    original = app.state.guard_config
    relaxed = GuardConfig(
        rate_limit_enabled=False,
        form_guard_enforced=False,
        duplicate_window_seconds=0,
        public_cache_seconds=0,
        max_concurrent_requests=0,
        signer=original.signer,
        decode_user=original.decode_user,
    )
    app.state.guard_config = relaxed
    yield relaxed
    app.state.guard_config = original


@pytest.fixture
def anyio_backend() -> str:
    return "asyncio"


@pytest.fixture
async def client(engine: Engine) -> AsyncIterator[httpx.AsyncClient]:
    """Client HTTP branché sur l'app FastAPI, avec get_db redirigé vers la base de test."""
    testing_session = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)

    def override_get_db() -> Iterator[Session]:
        db = testing_session()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    # Sans vérificateur, inscription et connexion ouvrent directement la session : les tests
    # qui ne portent pas sur la double authentification n'ont pas à saisir de code par email.
    # La fixture `verification` (test_email_verification_api) rebranche le vrai vérificateur.
    app.dependency_overrides[get_email_verifier] = lambda: None
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as http_client:
        yield http_client
    app.dependency_overrides.clear()


@pytest.fixture
async def admin_client(client: httpx.AsyncClient, db_session: Session) -> httpx.AsyncClient:
    from dataclasses import replace

    from src.domain.user import Role
    from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository

    payload = {"email": "admin@test.mg", "name": "Admin", "password": "Motdepasse123"}
    profile = (await client.post("/api/v1/auth/register", json=payload)).json()
    repo = SqlAlchemyUserRepository(db_session)
    user = repo.get_by_id(profile["id"])
    assert user is not None
    repo.update(replace(user, role=Role.ADMIN))
    session = (await client.post("/api/v1/auth/login", json=payload)).json()
    client.headers["Authorization"] = f"Bearer {session['access_token']}"
    return client
