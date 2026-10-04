"""Demandes similaires et doublons (F75).

- Avant l'envoi, l'habitant voit les demandes ouvertes proches de la sienne et peut les soutenir.
- Les agents et gestionnaires voient, sur la liste et le détail, combien de demandes ressemblent à
  chacune ; ils peuvent filtrer celles qui ont des doublons potentiels et en marquer une comme
  doublon d'une autre (regroupement logique, journalisé et notifié à l'auteur).
"""

from dataclasses import dataclass
from datetime import UTC, datetime, timedelta

from src.domain.citizen_request import (
    Actor,
    CitizenRequest,
    CitizenRequestEventRepository,
    CitizenRequestRepository,
    RequestEventType,
    RequestScope,
    ensure_can_manage,
    ensure_can_view,
    scope_for,
)
from src.domain.citizen_request.similarity import (
    SIMILARITY_WINDOW,
    DraftRequest,
    SimilarityMatch,
    find_similar,
    similar_counts,
)
from src.domain.citizen_request.support import (
    PublicRequest,
    RequestSupport,
    SupportRepository,
    redact_personal_data,
    to_public,
)
from src.domain.user import ForbiddenError, Role, User
from src.features.citizen_request.schemas import SimilarDraftIn
from src.features.citizen_request.use_cases.read import load_request
from src.features.citizen_request.use_cases.recording import record_event
from src.features.citizen_request.use_cases.support import refresh_support_count

DRAFT_SUGGESTIONS = 5
CANDIDATES_LIMIT = 1000
# Recherche des doublons potentiels : demandes ouvertes déposées dans l'année.
POTENTIAL_DUPLICATES_HORIZON = timedelta(days=365)


@dataclass(frozen=True)
class SimilarPublic:
    request: PublicRequest
    match: SimilarityMatch


@dataclass(frozen=True)
class SimilarRequest:
    request: CitizenRequest
    match: SimilarityMatch


@dataclass(frozen=True)
class RequestGroup:
    principal: CitizenRequest | None
    duplicates: list[CitizenRequest]
    similar: list[SimilarRequest]


def check_similar_draft(
    dto: SimilarDraftIn,
    actor: Actor,
    repo: CitizenRequestRepository,
    supports: SupportRepository,
    now: datetime | None = None,
) -> list[SimilarPublic]:
    """Demandes ouvertes de toute la ville qui ressemblent au brouillon.

    Les descriptions des autres habitants ne servent pas au rapprochement : seuls leur titre et
    leur lieu sont comparés, pour qu'un brouillon ne permette pas de sonder un texte privé."""
    now = now or datetime.now(UTC)
    draft = DraftRequest(
        title=dto.title,
        description=dto.description,
        category=dto.category,
        location=dto.location,
        created_at=now,
        latitude=dto.latitude,
        longitude=dto.longitude,
    )
    candidates = repo.list_candidates(
        scope=RequestScope(),
        since=now - SIMILARITY_WINDOW,
        category=dto.category,
        limit=CANDIDATES_LIMIT,
    )
    by_id = {candidate.id: candidate for candidate in candidates}
    public_view = [
        DraftRequest(
            id=c.id,
            title=c.title,
            description="",
            category=c.category,
            location=c.location,
            created_at=c.created_at,
            latitude=c.latitude,
            longitude=c.longitude,
        )
        for c in candidates
    ]
    matches = find_similar(draft, public_view, limit=DRAFT_SUGGESTIONS)
    mine = supports.supported_by(actor.user_id, [m.request_id for m in matches])
    return [
        SimilarPublic(
            request=to_public(
                by_id[m.request_id], actor.user_id, supported_by_me=m.request_id in mine
            ),
            match=m,
        )
        for m in matches
    ]


def similar_counts_for(
    actor: Actor,
    repo: CitizenRequestRepository,
    requests: list[CitizenRequest],
    now: datetime | None = None,
) -> dict[str, int]:
    """Nombre de demandes similaires de chaque demande de la page, dans le périmètre de l'agent ou
    du gestionnaire. Un citoyen ne voit que ses demandes : pas de rapprochement pour lui."""
    targets = [r for r in requests if r.is_open and not r.is_duplicate]
    if actor.role is Role.CITIZEN or not targets:
        return {}
    since = min(r.created_at for r in targets) - SIMILARITY_WINDOW
    candidates = repo.list_candidates(scope=scope_for(actor), since=since, limit=CANDIDATES_LIMIT)
    return {r.id: len(find_similar(r, candidates)) for r in targets}


def ids_with_similar(
    actor: Actor, repo: CitizenRequestRepository, now: datetime | None = None
) -> frozenset[str]:
    """Demandes du périmètre qui ont au moins un doublon potentiel (filtre de la liste)."""
    now = now or datetime.now(UTC)
    candidates = repo.list_candidates(
        scope=scope_for(actor), since=now - POTENTIAL_DUPLICATES_HORIZON, limit=CANDIDATES_LIMIT
    )
    return frozenset(request_id for request_id, n in similar_counts(candidates).items() if n)


def request_group(request_id: str, actor: Actor, repo: CitizenRequestRepository) -> RequestGroup:
    """Vue groupée : demande principale (si doublon), doublons rattachés et demandes similaires."""
    request = load_request(request_id, repo)
    ensure_can_view(actor, request)
    if actor.role is Role.CITIZEN:
        raise ForbiddenError("Similar requests are reserved to agents and managers")

    principal = repo.get_by_id(request.duplicate_of_id) if request.duplicate_of_id else None
    similar: list[SimilarRequest] = []
    if request.is_open and not request.is_duplicate:
        candidates = repo.list_candidates(
            scope=scope_for(actor),
            since=request.created_at - SIMILARITY_WINDOW,
            category=request.category,
            limit=CANDIDATES_LIMIT,
        )
        by_id = {candidate.id: candidate for candidate in candidates}
        similar = [
            SimilarRequest(request=by_id[m.request_id], match=m)
            for m in find_similar(request, candidates)
        ]
    return RequestGroup(
        principal=principal, duplicates=repo.list_duplicates_of(request_id), similar=similar
    )


def mark_duplicate(
    request_id: str,
    principal_id: str,
    user: User,
    actor: Actor,
    repo: CitizenRequestRepository,
    supports: SupportRepository,
    events: CitizenRequestEventRepository,
    now: datetime | None = None,
) -> CitizenRequest:
    """Rattache la demande à sa principale et la clôt. Son auteur et ses soutiens deviennent
    soutiens de la principale : ils en suivent l'issue et leur voix compte dans la priorité."""
    now = now or datetime.now(UTC)
    duplicate = load_request(request_id, repo)
    principal = load_request(principal_id, repo)
    ensure_can_manage(actor, duplicate)
    ensure_can_manage(actor, principal)

    previous_status = duplicate.status
    duplicate.mark_duplicate_of(principal, now)
    updated = repo.update(duplicate)

    transferred = 0
    for citizen_id in [duplicate.citizen_id, *supports.supporter_ids(duplicate.id)]:
        if citizen_id == principal.citizen_id or supports.get(principal.id, citizen_id):
            continue
        supports.add(RequestSupport(request_id=principal.id, citizen_id=citizen_id, created_at=now))
        transferred += 1
    if transferred:
        refresh_support_count(principal, supports, events, now, repo)

    record_event(
        events,
        duplicate.id,
        RequestEventType.MARKED_DUPLICATE,
        user,
        now,
        {
            "role": "duplicate",
            "duplicate_of_id": principal.id,
            "duplicate_of_title": redact_personal_data(principal.title),
            "from": previous_status.value,
            "to": updated.status.value,
        },
    )
    record_event(
        events,
        principal.id,
        RequestEventType.MARKED_DUPLICATE,
        user,
        now,
        {
            "role": "principal",
            "duplicate_id": duplicate.id,
            "duplicate_title": redact_personal_data(duplicate.title),
            "transferred_supports": transferred,
        },
    )
    return updated
