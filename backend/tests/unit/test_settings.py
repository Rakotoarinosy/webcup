import pytest
from sqlalchemy.engine import make_url

from src.infrastructure.config.settings import Settings


@pytest.mark.parametrize(
    "scheme", ["postgres://", "postgresql://", "postgresql+psycopg2://", "postgresql+psycopg://"]
)
def test_postgres_uses_installed_driver_and_preserves_credentials(scheme: str) -> None:
    suffix = "user:p%40ss@localhost:5432/app?sslmode=require"
    settings = Settings(_env_file=None, database_url=scheme + suffix)
    assert settings.database_url == "postgresql+psycopg://" + suffix
    assert make_url(settings.database_url).password == "p@ss"


@pytest.mark.parametrize(
    "url", ["sqlite://", "sqlite:///./app.db", "postgresql+asyncpg://user@localhost/db"]
)
def test_other_database_urls_are_preserved(url: str) -> None:
    assert Settings(_env_file=None, database_url=url).database_url == url


def test_environment_overrides_dotenv_without_changing_process_environment(
    tmp_path, monkeypatch
) -> None:
    dotenv = tmp_path / ".env"
    dotenv.write_text(
        "DATABASE_URL=postgres://dotenv@localhost/db\nSECRET_KEY=local-secret\nIGNORED_KEY=value\n",
        encoding="utf-8",
    )
    monkeypatch.setenv("DATABASE_URL", "sqlite://")
    monkeypatch.delenv("SECRET_KEY", raising=False)
    settings = Settings(_env_file=dotenv)
    assert settings.database_url == "sqlite://"
    assert settings.secret_key == "local-secret"
    import os

    assert "SECRET_KEY" not in os.environ
