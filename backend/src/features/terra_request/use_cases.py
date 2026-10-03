"""Use cases du suivi des demandes Terra Nova.

Synchronisation : l'API est interrogée à intervalle fixe (boucle de fond, voir bootstrap.py) et,
en complément, à la lecture si la dernière tentative est trop ancienne (cas Passenger, où un
processus peut être endormi). Le compte à rebours de la prochaine vague ne pilote jamais la synchro.
"""

import threading
from dataclasses import replace
from datetime import datetime, timedelta

from src.domain.terra_request import (
    PipelineStatus,
    SyncReport,
    TerraFeed,
    TerraFeedUnavailableError,
    TerraNotification,
    TerraRequest,
    TerraRequestNotFoundError,
    TerraRequestRepository,
    TerraSession,
)
from src.features.terra_request.schemas import UpdateTerraStatusIn

# Un seul appel à l'API à la fois par processus (boucle de fond + lectures concurrentes).
_sync_lock = threading.Lock()

_WAVE_KEY = "wave:{wave}"


def sync_terra_requests(feed: TerraFeed, repo: TerraRequestRepository, now: datetime) -> SyncReport:
    """Interroge l'API, ajoute les nouvelles demandes (par request_code) et met à jour les autres."""
    session = repo.get_session()
    session.last_sync_attempt_at = now
    try:
        snapshot = feed.fetch()
    except TerraFeedUnavailableError as error:
        session.last_sync_error = error.message
        repo.save_session(session)
        raise

    known = {request.request_code: request for request in repo.list_all()}
    added: list[TerraRequest] = []
    updated: list[TerraRequest] = []
    for incoming in snapshot.requests:
        existing = known.get(incoming.request_code)
        if existing is None:
            incoming.first_seen_at = now
            incoming.updated_at = now
            known[incoming.request_code] = incoming
            added.append(incoming)
        elif not existing.same_content(incoming):
            existing.refresh_from(incoming, now)
            updated.append(existing)

    session.apply_snapshot(snapshot.session, now)
    session.last_sync_success_at = now
    session.last_sync_error = None
    repo.save_sync(added, updated, session)

    return SyncReport(
        new_codes=[request.request_code for request in added],
        updated_codes=[request.request_code for request in updated],
    )


def refresh_terra_if_stale(
    feed: TerraFeed, repo: TerraRequestRepository, now: datetime, max_age: timedelta
) -> None:
    """Synchronise si la dernière tentative date de plus de `max_age`. N'échoue jamais."""
    if not _sync_lock.acquire(blocking=False):
        return  # une synchro est déjà en cours dans ce processus
    try:
        if repo.get_session().is_stale(now, max_age):
            sync_terra_requests(feed, repo, now)
    except TerraFeedUnavailableError:
        pass  # l'erreur est enregistrée dans la session et affichée par le front
    finally:
        _sync_lock.release()


def trigger_terra_sync(feed: TerraFeed, repo: TerraRequestRepository, now: datetime) -> SyncReport:
    """Synchronisation manuelle : attend une éventuelle synchro en cours puis relance."""
    with _sync_lock:
        return sync_terra_requests(feed, repo, now)


def get_terra_session(
    feed: TerraFeed, repo: TerraRequestRepository, now: datetime, max_age: timedelta
) -> TerraSession:
    refresh_terra_if_stale(feed, repo, now, max_age)
    return repo.get_session()


def list_terra_requests(repo: TerraRequestRepository) -> list[TerraRequest]:
    return sorted(repo.list_all(), key=lambda r: (-r.xp_total, r.sort_order, r.request_code))


def get_terra_request(request_code: str, repo: TerraRequestRepository) -> TerraRequest:
    request = repo.get_by_code(request_code)
    if request is None:
        raise TerraRequestNotFoundError(request_code)
    return request


def update_terra_request_status(
    request_code: str, dto: UpdateTerraStatusIn, repo: TerraRequestRepository, now: datetime
) -> TerraRequest:
    get_terra_request(request_code, repo)
    repo.set_status(request_code, dto.status, now)
    return get_terra_request(request_code, repo)


def get_terra_pipeline(
    repo: TerraRequestRepository,
) -> list[tuple[PipelineStatus, list[TerraRequest]]]:
    requests = list_terra_requests(repo)
    return [(status, [r for r in requests if r.status is status]) for status in PipelineStatus]


# ─── Notifications (dérivées des demandes, état « lu » stocké par utilisateur) ───


def _notifications(requests: list[TerraRequest]) -> list[TerraNotification]:
    items: list[TerraNotification] = []
    first_seen_by_wave: dict[int, datetime] = {}
    count_by_wave: dict[int, int] = {}

    for request in requests:
        if request.first_seen_at is None:
            continue
        origin = "Demande initiale" if request.is_initial else f"Vague {request.wave}"
        items.append(
            TerraNotification(
                key=request.request_code,
                kind="new_request",
                title=f"Nouvelle demande {request.request_code}",
                message=(
                    f"{origin} · {request.difficulty or 'Difficulté inconnue'} · "
                    f"+{request.xp_total} XP — {request.requester_name}"
                ),
                request_code=request.request_code,
                created_at=request.first_seen_at,
            )
        )
        if request.wave > 0:
            seen = first_seen_by_wave.get(request.wave)
            if seen is None or request.first_seen_at < seen:
                first_seen_by_wave[request.wave] = request.first_seen_at
            count_by_wave[request.wave] = count_by_wave.get(request.wave, 0) + 1

    for wave, created_at in first_seen_by_wave.items():
        items.append(
            TerraNotification(
                key=_WAVE_KEY.format(wave=wave),
                kind="new_wave",
                title=f"Vague {wave} diffusée",
                message=f"{count_by_wave[wave]} demande(s) dans cette vague.",
                request_code=None,
                created_at=created_at,
            )
        )

    items.sort(key=lambda item: (item.created_at, item.kind == "new_wave"), reverse=True)
    return items


def list_terra_notifications(
    user_id: str, repo: TerraRequestRepository, *, unread_only: bool = False
) -> tuple[list[TerraNotification], int]:
    read = repo.read_keys(user_id)
    items = [replace(item, is_read=item.key in read) for item in _notifications(repo.list_all())]
    unread_count = sum(1 for item in items if not item.is_read)
    if unread_only:
        items = [item for item in items if not item.is_read]
    return items, unread_count


def mark_terra_notification_read(
    user_id: str, key: str, repo: TerraRequestRepository, now: datetime
) -> None:
    repo.mark_read(user_id, [key], now)


def mark_all_terra_notifications_read(
    user_id: str, repo: TerraRequestRepository, now: datetime
) -> int:
    items, _ = list_terra_notifications(user_id, repo, unread_only=True)
    repo.mark_read(user_id, [item.key for item in items], now)
    return len(items)
