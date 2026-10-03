"""HTTP endpoints for controlled citizen account management."""

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from src.domain.agent import AgentRepository
from src.domain.institut import InstitutRepository
from src.domain.user import PasswordHasher, RefreshTokenRepository, Role, User, UserRepository
from src.features.user.schemas import CreateUserIn, UpdateCitizenAccountIn, UpdateUserIn, UserOut
from src.features.user.use_cases import (
    create_user,
    get_citizen_account,
    list_accounts,
    list_citizen_accounts,
    update_account,
    update_citizen_account,
)
from src.infrastructure.persistence.agent_repository import SqlAlchemyAgentRepository
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.institut_repository import SqlAlchemyInstitutRepository
from src.infrastructure.security.deps import (
    get_password_hasher,
    get_refresh_token_repo,
    get_user_repo,
    require_roles,
)

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


def get_agent_repo(db: Session = Depends(get_db)) -> AgentRepository:
    return SqlAlchemyAgentRepository(db)


def get_institut_repo(db: Session = Depends(get_db)) -> InstitutRepository:
    return SqlAlchemyInstitutRepository(db)


@router.post(
    "",
    response_model=UserOut,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles(Role.ADMIN))],
)
def create_user_endpoint(
    payload: CreateUserIn,
    repo: UserRepository = Depends(get_user_repo),
    hasher: PasswordHasher = Depends(get_password_hasher),
) -> User:
    return create_user(payload, repo, hasher)


@router.get(
    "",
    response_model=list[UserOut],
    dependencies=[Depends(require_roles(Role.AGENT, Role.MANAGER))],
)
def list_users_endpoint(
    search: str | None = Query(default=None, max_length=100),
    repo: UserRepository = Depends(get_user_repo),
) -> list[User]:
    normalized_search = search.strip() if search else None
    return list_citizen_accounts(repo, normalized_search or None)


@router.get(
    "/manage",
    response_model=list[UserOut],
    dependencies=[Depends(require_roles(Role.ADMIN))],
)
def list_accounts_endpoint(
    role: Role | None = None,
    search: str | None = Query(default=None, max_length=100),
    repo: UserRepository = Depends(get_user_repo),
) -> list[User]:
    """Tous les comptes (citoyens, agents, managers, admins), pour l'administration."""
    return list_accounts(repo, role, search)


@router.patch(
    "/manage/{user_id}",
    response_model=UserOut,
    dependencies=[Depends(require_roles(Role.ADMIN))],
)
def update_account_endpoint(
    user_id: str,
    payload: UpdateUserIn,
    repo: UserRepository = Depends(get_user_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
    hasher: PasswordHasher = Depends(get_password_hasher),
    agents: AgentRepository = Depends(get_agent_repo),
    instituts: InstitutRepository = Depends(get_institut_repo),
) -> User:
    return update_account(user_id, payload, repo, refresh_repo, hasher, agents, instituts)


@router.get(
    "/{user_id}",
    response_model=UserOut,
    dependencies=[Depends(require_roles(Role.AGENT, Role.MANAGER))],
)
def get_user_endpoint(user_id: str, repo: UserRepository = Depends(get_user_repo)) -> User:
    return get_citizen_account(user_id, repo)


@router.patch(
    "/{user_id}",
    response_model=UserOut,
    dependencies=[Depends(require_roles(Role.AGENT, Role.MANAGER))],
)
def update_user_endpoint(
    user_id: str,
    payload: UpdateCitizenAccountIn,
    repo: UserRepository = Depends(get_user_repo),
    refresh_repo: RefreshTokenRepository = Depends(get_refresh_token_repo),
) -> User:
    return update_citizen_account(user_id, payload, repo, refresh_repo)
