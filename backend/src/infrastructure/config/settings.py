"""Configuration de l'application, chargée depuis les variables d'environnement et `.env`."""

from enum import StrEnum
from functools import lru_cache
from pathlib import Path
from typing import Annotated

from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict

# backend/.env, quel que soit le dossier de lancement (uvicorn, Passenger, pytest…).
ENV_FILE = Path(__file__).resolve().parents[3] / ".env"
DEFAULT_SECRET = "change-me-in-production"
DEFAULT_DATABASE_URL = "sqlite:///./app.db"


class Environment(StrEnum):
    DEVELOPMENT = "development"
    PRODUCTION = "production"
    TEST = "test"


class LogLevel(StrEnum):
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"


class CookieSameSite(StrEnum):
    LAX = "lax"
    STRICT = "strict"
    NONE = "none"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=ENV_FILE, env_file_encoding="utf-8", extra="ignore")

    environment: Environment = Environment.DEVELOPMENT
    database_url: str = DEFAULT_DATABASE_URL
    # NoDecode : la valeur est une liste séparée par des virgules, pas du JSON.
    cors_origins: Annotated[list[str], NoDecode] = ["http://localhost:4200"]
    log_level: LogLevel = LogLevel.INFO
    secret_key: str = DEFAULT_SECRET
    # Fuseau de la municipalité : définit ce qu'est « aujourd'hui » dans le dashboard.
    app_timezone: str = "Indian/Antananarivo"

    # ─── Auth ───
    access_token_ttl_minutes: int = 15
    refresh_token_ttl_days: int = 7
    max_failed_login_attempts: int = 5
    lockout_minutes: int = 15
    # Cookie du refresh token. "none" uniquement si front et API sont sur des sites différents.
    cookie_samesite: CookieSameSite = CookieSameSite.LAX

    # ─── Confirmation par email (code à 6 chiffres) ───
    email_verification_required: bool = True
    verification_code_ttl_minutes: int = 10
    verification_max_attempts: int = 5
    verification_resend_cooldown_seconds: int = 60

    # SMTP obligatoire : sans SMTP_HOST, l'envoi échoue (503).
    # Port 587 = STARTTLS ; port 465 = SMTP_USE_SSL=true.
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_username: str | None = None
    smtp_password: str | None = None
    smtp_from: str = "CivicFlow <no-reply@example.com>"
    smtp_use_ssl: bool = False
    smtp_timeout_seconds: float = 10.0

    # ─── SMS gateway httpSMS (code de confirmation par téléphone) ───
    # Sans clé API, l'envoi de SMS échoue (503) sauf en développement, où le code est écrit dans les logs.
    sms_gateway_url: str = "https://api.httpsms.com/v1/messages/send"
    sms_gateway_api_key: str | None = None  # httpsms.com/settings
    sms_gateway_from: str | None = None  # numéro de la SIM du téléphone, en E.164 (+261341254338)
    sms_gateway_timeout_seconds: float = 10.0

    # ─── Connexion Google ───
    # « Client ID » OAuth 2.0 (type Web) de Google Cloud Console. Sans lui, POST /auth/google répond 503.
    google_client_id: str | None = None

    # Premier administrateur, créé au démarrage s'il n'existe aucun admin actif.
    bootstrap_admin_email: str | None = None
    bootstrap_admin_password: str | None = None
    bootstrap_admin_name: str = "Administrateur"

    # ─── IA (analyse des demandes) ───
    # Sans clé, POST /requests/{id}/analyze répond 503 ; le reste de l'API fonctionne normalement.
    gemini_api_key: str | None = None
    gemini_model: str = "gemini-2.5-flash"

    # ─── API Terra Nova (demandes du concours) ───
    # Sans clé, la synchronisation échoue proprement (état « erreur » affiché dans le suivi).
    terra_nova_api_url: str = "https://24h.webcup.fr/wp-json/webcup/v1/requests"
    terra_nova_api_key: str | None = None
    # Intervalle fixe d'interrogation, indépendant du compte à rebours de la prochaine vague.
    terra_nova_sync_seconds: int = 30
    terra_nova_timeout_seconds: float = 15.0
    # Boucle de synchronisation en tâche de fond (désactivable, ex. plusieurs workers).
    terra_nova_background_sync: bool = True

    # ─── Sécurité HTTP et protection des formulaires ───
    # Adresse du frontend, utilisée dans les alertes de connexion (lien « Sécurité du compte »).
    # Vide : première origine de CORS_ORIGINS.
    frontend_url: str | None = None
    # Limitation de débit en mémoire (par processus) : login, inscription, codes, formulaires publics.
    rate_limit_enabled: bool = True
    # Plafond global de requêtes par minute et par client (IP ou compte connecté).
    rate_limit_global_per_minute: int = 600
    # Ne lire X-Forwarded-For que si un proxy de confiance le pose (sinon falsifiable).
    trust_forwarded_for: bool = False
    # Taille maximale d'un corps de requête (octets) ; 64 Ko pour /auth.
    max_request_body_bytes: int = 10 * 1024 * 1024
    # Anti-robots : jeton de formulaire signé exigé (inscription, contact) et délai minimal.
    form_guard_enforced: bool = True
    form_min_fill_seconds: float = 2.0
    form_token_max_age_seconds: int = 24 * 3600
    # Double soumission : un même contenu renvoyé par le même auteur dans ce délai est refusé (0 = off).
    duplicate_submission_window_seconds: int = 180
    # Réponses rejouées pour une même clé Idempotency-Key pendant ce délai.
    idempotency_ttl_seconds: int = 24 * 3600

    # ─── Sobriété et résistance à la charge ───
    # Cache mémoire des contenus publics (services, publications) ; 0 = désactivé.
    public_cache_seconds: int = 30
    # Requêtes traitées simultanément par processus avant de répondre 503 (0 = illimité).
    max_concurrent_requests: int = 64
    # Pool de connexions PostgreSQL (ignoré en SQLite).
    db_pool_size: int = 5
    db_max_overflow: int = 5
    db_pool_timeout_seconds: float = 10.0
    db_pool_recycle_seconds: int = 300
    # Délai maximal d'une requête SQL (ms, PostgreSQL). 0 = aucun : à laisser à 0 derrière un
    # pooler qui refuse les options de démarrage (ex. Neon « -pooler »).
    db_statement_timeout_ms: int = 0

    @field_validator("database_url", mode="before")
    @classmethod
    def use_installed_postgres_driver(cls, value: str) -> str:
        # Les URL standard des fournisseurs PostgreSQL utilisent psycopg 3.
        for prefix in ("postgresql://", "postgres://", "postgresql+psycopg2://"):
            if value.startswith(prefix):
                return "postgresql+psycopg://" + value[len(prefix) :]
        return value

    @field_validator("cors_origins", mode="before")
    @classmethod
    def split_cors_origins(cls, value: object) -> object:
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value

    @field_validator("log_level", mode="before")
    @classmethod
    def uppercase_log_level(cls, value: object) -> object:
        return value.upper() if isinstance(value, str) else value

    @model_validator(mode="after")
    def reject_weak_secret_in_production(self) -> "Settings":
        if self.environment is Environment.PRODUCTION and (
            self.secret_key == DEFAULT_SECRET or len(self.secret_key) < 32
        ):
            raise ValueError(
                "SECRET_KEY must be a random string of at least 32 characters in production"
            )
        if self.environment is Environment.PRODUCTION and "*" in self.cors_origins:
            raise ValueError("CORS_ORIGINS must not contain '*' (credentials are enabled)")
        return self

    @property
    def is_production(self) -> bool:
        return self.environment is Environment.PRODUCTION

    @property
    def public_frontend_url(self) -> str:
        url = self.frontend_url or (self.cors_origins[0] if self.cors_origins else "")
        return url.rstrip("/")

    @property
    def cookie_secure(self) -> bool:
        return self.is_production or self.cookie_samesite is CookieSameSite.NONE


@lru_cache
def get_settings() -> Settings:
    """Instance unique des settings (mise en cache après la première lecture)."""
    return Settings()
