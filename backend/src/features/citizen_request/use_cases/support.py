"""Soutien d'une demande par d'autres habitants (F52).

Un habitant consulte les demandes ouvertes de la ville (vue publique anonymisée), en soutient une
(une seule fois, jamais la sienne) et peut retirer son soutien. Chaque soutien est journalisé, fait
monter la priorité de la demande et inscrit l'habitant aux notifications de son évolution.
"""

from datetime import UTC, datetime

from src.domain.citizen_request import (
    Actor,
    AlreadySupportedConflictError,
    CitizenRequest,
    CitizenRequestEventRepository,
    CitizenRequestNotFoundError,
    CitizenRequestRepository,
    PublicRequestSort,
    RequestCategory,
    RequestEventType,
    SupportNotFoundError,
)
from src.domain.citizen_request.support import (
    PublicRequest,
    RequestSupport,
    SupportRepository,
    ensure_can_support,
    is_public,
    to_public,
)
from src.domain.user import User
from src.features.citizen_request.use_cases.prioritization import rescore
from src.features.citizen_request.use_cases.read import load_request
from src.features.citizen_request.use_cases.recording import record_event


def list_public_requests(
    actor: Actor,
    repo: CitizenRequestRepository,
    supports: SupportRepository,
    *,
    page: int,
    page_size: int,
    search: str | None = None,
    category: RequestCategory | None = None,
    sort: PublicRequestSort = PublicRequestSort.RECENT,
) -> tuple[list[PublicRequest], int]:
    items, total = repo.list_public(
        page=page, page_size=page_size, search=search, category=category, sort=sort
    )
    mine = supports.supported_by(actor.user_id, [item.id for item in items])
    return [
        to_public(item, actor.user_id, supported_by_me=item.id in mine) for item in items
    ], total


def get_public_request(
    request_id: str, actor: Actor, repo: CitizenRequestRepository, supports: SupportRepository
) -> PublicRequest:
    """Vue publique : demande ouverte, ou demande que l'habitant soutient (pour en suivre l'issue)."""
    request = load_request(request_id, repo)
    support = supports.get(request_id, actor.user_id)
    if not is_public(request) and support is None and request.citizen_id != actor.user_id:
        raise CitizenRequestNotFoundError(request_id)
    return to_public(
        request,
        actor.user_id,
        supported_by_me=support is not None,
        supported_at=support.created_at if support else None,
    )


def support_request(
    request_id: str,
    user: User,
    actor: Actor,
    repo: CitizenRequestRepository,
    supports: SupportRepository,
    events: CitizenRequestEventRepository,
    now: datetime | None = None,
) -> PublicRequest:
    now = now or datetime.now(UTC)
    request = load_request(request_id, repo)
    ensure_can_support(actor, request)
    if supports.get(request_id, actor.user_id) is not None:
        raise AlreadySupportedConflictError(request_id)

    supports.add(RequestSupport(request_id=request_id, citizen_id=actor.user_id, created_at=now))
    updated = refresh_support_count(request, supports, events, now, repo)
    record_event(
        events,
        request_id,
        RequestEventType.SUPPORTED,
        user,
        now,
        {"support_count": updated.support_count},
    )
    return to_public(updated, actor.user_id, supported_by_me=True, supported_at=now)


def unsupport_request(
    request_id: str,
    user: User,
    actor: Actor,
    repo: CitizenRequestRepository,
    supports: SupportRepository,
    events: CitizenRequestEventRepository,
    now: datetime | None = None,
) -> PublicRequest:
    now = now or datetime.now(UTC)
    request = load_request(request_id, repo)
    if not supports.remove(request_id, actor.user_id):
        raise SupportNotFoundError(request_id)

    updated = refresh_support_count(request, supports, events, now, repo)
    record_event(
        events,
        request_id,
        RequestEventType.UNSUPPORTED,
        user,
        now,
        {"support_count": updated.support_count},
    )
    return to_public(updated, actor.user_id, supported_by_me=False)


def list_supported_requests(
    actor: Actor, repo: CitizenRequestRepository, supports: SupportRepository
) -> list[PublicRequest]:
    """« Demandes que je soutiens » : toutes, closes comprises, avec leur statut à jour."""
    mine = supports.list_for_citizen(actor.user_id)
    by_id = {request.id: request for request in repo.get_many([s.request_id for s in mine])}
    return [
        to_public(
            by_id[support.request_id],
            actor.user_id,
            supported_by_me=True,
            supported_at=support.created_at,
        )
        for support in mine
        if support.request_id in by_id
    ]


def refresh_support_count(
    request: CitizenRequest,
    supports: SupportRepository,
    events: CitizenRequestEventRepository,
    now: datetime,
    repo: CitizenRequestRepository,
) -> CitizenRequest:
    """Compteur relu en base, puis score : la priorité suit le nombre de soutiens."""
    request.support_count = supports.count_for(request.id)
    previous_priority = request.priority
    if request.is_open:
        rescore(request, now)
    updated = repo.update(request)
    if updated.priority is not previous_priority:
        record_event(
            events,
            request.id,
            RequestEventType.PRIORITY_CHANGED,
            None,
            now,
            {
                "from": previous_priority.value,
                "to": updated.priority.value,
                "score": updated.priority_score,
                "auto": True,
                "reason": "supports",
            },
        )
    return updated
