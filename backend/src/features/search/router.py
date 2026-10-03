"""Recherche globale dans le header (T+10h).

  GET /search?q=éclairage&limit=5   → résultats mélangés, avec un champ « kind » pour les regrouper.

Périmètre selon le rôle (features/search/use_cases.py) : mêmes demandes que les listes ;
l'annuaire des citoyens et des agents est réservé à l'admin et aux managers.
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.domain.citizen_request import Actor
from src.domain.search import SearchRepository
from src.features.search.schemas import SearchHitOut, SearchOut
from src.features.search.use_cases import global_search
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.search_repository import SqlAlchemySearchRepository
from src.infrastructure.security.deps import get_current_actor

router = APIRouter(prefix="/search", tags=["search"])


def get_search_repo(db: Session = Depends(get_db)) -> SearchRepository:
    return SqlAlchemySearchRepository(db)


@router.get("", response_model=SearchOut)
def search_endpoint(
    q: str = Query(min_length=2, max_length=100),
    limit: int = Query(default=5, ge=1, le=20, description="Résultats maximum par catégorie"),
    actor: Actor = Depends(get_current_actor),
    repo: SearchRepository = Depends(get_search_repo),
) -> SearchOut:
    hits = global_search(q, actor, repo, limit_per_kind=limit)

    return SearchOut(
        query=q,
        total=len(hits),
        items=[SearchHitOut.model_validate(hit) for hit in hits],
    )
