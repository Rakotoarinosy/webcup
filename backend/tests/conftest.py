"""Fixtures partagées : une base SQLite en mémoire, neuve pour chaque test."""

from collections.abc import AsyncIterator, Iterator
from datetime import UTC, datetime

import httpx
import pytest
from sqlalchemy import Engine, create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from src.domain.user import Role, User
from src.infrastructure.persistence import models  # noqa: F401  (enregistre les tables)
from src.infrastructure.persistence.database import Base, get_db
from src.infrastructure.security.deps import get_current_user
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
    # Les tests e2e de gestion représentent le back-office : ils disposent d'un ADMIN
    # explicite, sans contourner les règles de rôle dans le code applicatif.
    app.dependency_overrides[get_current_user] = lambda: User(
        id="test-admin",
        email="admin@test.mg",
        name="Test Admin",
        created_at=datetime.now(UTC),
        password_hash="",
        role=Role.ADMIN,
    )
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as http_client:
        yield http_client
    app.dependency_overrides.clear()
