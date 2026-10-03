"""Endpoints HTTP des instituts. Création et paramétrage : admin ; lecture : admin ou son manager."""

from fastapi import APIRouter, Depends
from fastapi import status as http_status
from sqlalchemy.orm import Session

from src.domain.citizen_request import Actor
from src.domain.institut import Institut, InstitutRepository
from src.domain.user import UserRepository
from src.features.institut.schemas import (
    CreateInstitutIn,
    InstitutOut,
    SetManagerIn,
    UpdateInstitutIn,
)
from src.features.institut.use_cases import (
    create_institut,
    get_institut,
    list_instituts,
    set_manager,
    update_institut,
)
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.institut_repository import SqlAlchemyInstitutRepository
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository
from src.infrastructure.security.deps import get_current_actor

router = APIRouter(prefix="/instituts", tags=["instituts"])


def get_institut_repo(db: Session = Depends(get_db)) -> InstitutRepository:
    return SqlAlchemyInstitutRepository(db)


def get_users_repo(db: Session = Depends(get_db)) -> UserRepository:
    return SqlAlchemyUserRepository(db)


@router.post("", response_model=InstitutOut, status_code=http_status.HTTP_201_CREATED)
def create_institut_endpoint(
    payload: CreateInstitutIn,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
    users: UserRepository = Depends(get_users_repo),
) -> InstitutOut:
    return _out(create_institut(payload, actor, repo, users))


@router.get("", response_model=list[InstitutOut])
def list_instituts_endpoint(
    active_only: bool = False,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
) -> list[InstitutOut]:
    return [_out(i) for i in list_instituts(actor, repo, active_only=active_only)]


@router.get("/{institut_id}", response_model=InstitutOut)
def get_institut_endpoint(
    institut_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
) -> InstitutOut:
    return _out(get_institut(institut_id, actor, repo))


@router.patch("/{institut_id}", response_model=InstitutOut)
def update_institut_endpoint(
    institut_id: str,
    payload: UpdateInstitutIn,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
) -> InstitutOut:
    return _out(update_institut(institut_id, payload, actor, repo))


@router.put("/{institut_id}/manager", response_model=InstitutOut)
def set_manager_endpoint(
    institut_id: str,
    payload: SetManagerIn,
    actor: Actor = Depends(get_current_actor),
    repo: InstitutRepository = Depends(get_institut_repo),
    users: UserRepository = Depends(get_users_repo),
) -> InstitutOut:
    return _out(set_manager(institut_id, payload, actor, repo, users))


def _out(institut: Institut) -> InstitutOut:
    # frozenset → liste triée : réponse stable d'un appel à l'autre.
    return InstitutOut(
        id=institut.id,
        name=institut.name,
        description=institut.description,
        categories=sorted(institut.categories),
        manager_id=institut.manager_id,
        is_active=institut.is_active,
        created_at=institut.created_at,
    )
