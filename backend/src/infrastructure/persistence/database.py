"""Connexion à la base : engine, fabrique de sessions, Base déclarative et dépendance `get_db`."""

from collections.abc import Iterator

from sqlalchemy import Engine, create_engine, event
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from src.infrastructure.config import get_settings


class Base(DeclarativeBase):
    """Base commune à tous les modèles SQLAlchemy (voir models.py)."""


def create_db_engine(database_url: str) -> Engine:
    if database_url.startswith("sqlite"):
        # SQLite interdit par défaut l'usage d'une connexion depuis un autre thread (FastAPI en utilise).
        engine = create_engine(
            database_url, connect_args={"check_same_thread": False}, pool_pre_ping=True
        )
    else:
        # Pool borné et délais courts : sous forte charge, mieux vaut un 503 rapide qu'une
        # requête bloquée (voir http_guards / handlers de surcharge). pool_recycle : les
        # bases serverless (Neon) ferment les connexions inactives.
        settings = get_settings()
        connect_args: dict[str, object] = {"connect_timeout": 10}
        if settings.db_statement_timeout_ms > 0:
            connect_args["options"] = f"-c statement_timeout={settings.db_statement_timeout_ms}"
        engine = create_engine(
            database_url,
            connect_args=connect_args,
            pool_pre_ping=True,
            pool_size=settings.db_pool_size,
            max_overflow=settings.db_max_overflow,
            pool_timeout=settings.db_pool_timeout_seconds,
            pool_recycle=settings.db_pool_recycle_seconds,
        )

    if database_url.startswith("sqlite"):
        # SQLite n'applique pas les clés étrangères (ni ON DELETE) sans ce PRAGMA, contrairement à PostgreSQL.
        @event.listens_for(engine, "connect")
        def _enable_foreign_keys(dbapi_connection, _record) -> None:  # type: ignore[no-untyped-def]
            cursor = dbapi_connection.cursor()
            cursor.execute("PRAGMA foreign_keys=ON")
            cursor.close()

    return engine


engine = create_db_engine(get_settings().database_url)

SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


def get_db() -> Iterator[Session]:
    """Dépendance FastAPI : une session par requête, toujours fermée à la fin."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
