"""Recherche globale, dans le périmètre de l'Actor."""

from src.domain.citizen_request import Actor, scope_for
from src.domain.search import SearchHit, SearchRepository, SearchScope
from src.domain.user import Role


def search_scope(actor: Actor) -> SearchScope:
    """Mêmes demandes que les listes ; l'annuaire (citoyens, agents) est réservé à l'encadrement."""
    scope = scope_for(actor)
    return SearchScope(
        citizen_id=scope.citizen_id,
        agent_id=scope.agent_id,
        institut_id=scope.institut_id,
        is_empty=scope.is_empty,
        directory=actor.role in (Role.MANAGER, Role.ADMIN) and not scope.is_empty,
    )


def global_search(
    query: str, actor: Actor, repo: SearchRepository, *, limit_per_kind: int
) -> list[SearchHit]:
    return repo.search(query, search_scope(actor), limit_per_kind=limit_per_kind)
