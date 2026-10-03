"""Tâches de démarrage : premier administrateur, synchronisation de l'API Terra Nova.

Premier administrateur : créé au démarrage si aucun admin actif n'existe.

Renseigner BOOTSTRAP_ADMIN_EMAIL et BOOTSTRAP_ADMIN_PASSWORD dans .env, démarrer une fois,
puis RETIRER le mot de passe du .env.
"""

import logging
import threading
from datetime import UTC, datetime, timedelta

from src.domain.user import Role
from src.features.terra_request.use_cases import refresh_terra_if_stale
from src.features.user.schemas import CreateUserIn
from src.features.user.use_cases import create_user
from src.infrastructure.config import get_settings
from src.infrastructure.external.terra_nova_feed import HttpTerraFeed
from src.infrastructure.persistence.database import SessionLocal
from src.infrastructure.persistence.terra_request_repository import (
    SqlAlchemyTerraRequestRepository,
)
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository
from src.infrastructure.security.password import Argon2PasswordHasher

logger = logging.getLogger(__name__)


def ensure_bootstrap_admin() -> None:
    settings = get_settings()
    if not (settings.bootstrap_admin_email and settings.bootstrap_admin_password):
        return

    try:
        with SessionLocal() as db:
            repo = SqlAlchemyUserRepository(db)
            if repo.count_active_by_role(Role.ADMIN) > 0:
                return

            dto = CreateUserIn(
                email=settings.bootstrap_admin_email,
                name=settings.bootstrap_admin_name,
                password=settings.bootstrap_admin_password,
                role=Role.ADMIN,
            )
            create_user(dto, repo, Argon2PasswordHasher())
            logger.info("bootstrap admin created", extra={"email": dto.email})
    except Exception:
        # Ne bloque pas le démarrage (ex. migrations pas encore appliquées, mot de passe trop faible).
        logger.exception("bootstrap admin failed")


def run_terra_sync_loop(stop: threading.Event) -> None:
    """Interroge l'API Terra Nova à intervalle fixe, jusqu'à l'arrêt de l'application.

    La première synchronisation a lieu immédiatement. L'intervalle ne dépend jamais du compte à
    rebours de la prochaine vague. Les lectures de /terra-requests/session complètent cette boucle
    (synchro si les données ont vieilli), ce qui couvre les déploiements sans tâche de fond.
    """
    settings = get_settings()
    interval = settings.terra_nova_sync_seconds
    feed = HttpTerraFeed.from_settings(settings)
    logger.info("terra nova sync loop started", extra={"interval_seconds": interval})

    while not stop.is_set():
        try:
            with SessionLocal() as db:
                # Marge d'une seconde : le tick suivant n'est jamais jugé « trop récent ».
                refresh_terra_if_stale(
                    feed,
                    SqlAlchemyTerraRequestRepository(db),
                    datetime.now(UTC),
                    timedelta(seconds=max(1, interval - 1)),
                )
        except Exception:
            # Ne tue jamais la boucle (ex. migrations pas encore appliquées).
            logger.exception("terra nova sync failed")
        stop.wait(interval)


def start_terra_sync() -> threading.Event | None:
    """Démarre la boucle dans un thread démon. Retourne l'évènement d'arrêt (None si désactivée)."""
    if not get_settings().terra_nova_background_sync:
        return None
    stop = threading.Event()
    threading.Thread(
        target=run_terra_sync_loop, args=(stop,), name="terra-nova-sync", daemon=True
    ).start()
    return stop
