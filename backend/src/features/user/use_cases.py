"""User lifecycle and citizen-account use cases."""

import uuid
from dataclasses import replace
from datetime import UTC, datetime

from src.domain.agent import AgentQuery, AgentRepository, AgentStatus
from src.domain.institut import InstitutRepository
from src.domain.user import (
    LastAdminError,
    PasswordHasher,
    RefreshTokenRepository,
    Role,
    User,
    UserAlreadyExistsError,
    UserNotFoundError,
    UserRepository,
)
from src.features.auth.schemas import UpdateProfileIn
from src.features.user.schemas import CreateUserIn, UpdateCitizenAccountIn, UpdateUserIn


def create_user(dto: CreateUserIn, repo: UserRepository, hasher: PasswordHasher) -> User:
    if repo.get_by_email(dto.email):
        raise UserAlreadyExistsError(dto.email)

    user = User(
        id=str(uuid.uuid4()),
        email=dto.email,
        name=dto.name,
        created_at=datetime.now(UTC),
        password_hash=hasher.hash(dto.password),
        role=dto.role,
    )

    return repo.add(user)


def get_user(user_id: str, repo: UserRepository) -> User:
    user = repo.get_by_id(user_id)
    if user is None:
        raise UserNotFoundError(user_id)

    return user


def list_users(repo: UserRepository) -> list[User]:
    return repo.list()


def list_accounts(
    repo: UserRepository, role: Role | None = None, search: str | None = None
) -> list[User]:
    """Tous les comptes, filtrables par rôle et par nom / email. Réservé à l'admin."""
    needle = search.strip().casefold() if search else ""
    return [
        user
        for user in repo.list()
        if (role is None or user.role is role)
        and (not needle or needle in user.name.casefold() or needle in user.email.casefold())
    ]


def update_account(
    user_id: str,
    dto: UpdateUserIn,
    repo: UserRepository,
    refresh_repo: RefreshTokenRepository,
    hasher: PasswordHasher,
    agents: AgentRepository,
    instituts: InstitutRepository,
) -> User:
    """Modification d'un compte par l'admin, en gardant rôles et rattachements cohérents :
    un compte qui cesse d'être manager (rôle changé ou compte désactivé) libère son institut,
    un compte qui cesse d'être agent voit son profil désactivé (il ne peut plus recevoir de demande).
    """
    before = get_user(user_id, repo)
    updated = update_user(user_id, dto, repo, refresh_repo, hasher)

    def lost(role: Role) -> bool:
        was = before.role is role and before.is_active
        return was and not (updated.role is role and updated.is_active)

    if lost(Role.MANAGER):
        institut = instituts.get_by_manager(updated.id)
        if institut is not None:
            instituts.update(replace(institut, manager_id=None))
    if lost(Role.AGENT):
        for agent in agents.search(AgentQuery(user_id=updated.id, is_active=True)):
            agents.update(replace(agent, is_active=False, status=AgentStatus.OFFLINE))

    return updated


def list_citizen_accounts(repo: UserRepository, search: str | None = None) -> list[User]:
    return repo.list_citizens(search)


def get_citizen_account(user_id: str, repo: UserRepository) -> User:
    user = get_user(user_id, repo)
    if user.role is not Role.CITIZEN:
        raise UserNotFoundError(user_id)
    return user


def update_citizen_account(
    user_id: str,
    dto: UpdateCitizenAccountIn,
    repo: UserRepository,
    refresh_repo: RefreshTokenRepository,
) -> User:
    user = get_citizen_account(user_id, repo)
    changes = {
        field: value
        for field, value in dto.model_dump(exclude_unset=True).items()
        if value is not None
    }
    if not changes:
        return user

    new_email = changes.get("email")
    if new_email and new_email != user.email and repo.get_by_email(new_email):
        raise UserAlreadyExistsError(new_email)

    updated = repo.update(replace(user, **changes))
    if {"email", "is_active"} & changes.keys():
        refresh_repo.revoke_all_for_user(user.id, datetime.now(UTC))
    return updated


def update_user(
    user_id: str,
    dto: UpdateUserIn,
    repo: UserRepository,
    refresh_repo: RefreshTokenRepository,
    hasher: PasswordHasher,
) -> User:
    user = get_user(user_id, repo)
    changes = dto.model_dump(exclude_unset=True)

    # null signifie « ne pas toucher ».
    for field in ("email", "name", "role", "is_active", "password"):
        if changes.get(field) is None:
            changes.pop(field, None)

    new_email = changes.get("email")
    if new_email and new_email != user.email and repo.get_by_email(new_email):
        raise UserAlreadyExistsError(new_email)

    new_role = changes.get("role", user.role)
    new_active = changes.get("is_active", user.is_active)
    _ensure_admin_remains(user, new_role, new_active, repo)

    password = changes.pop("password", None)
    if password:
        changes["password_hash"] = hasher.hash(password)

    # Toute modification sensible force une reconnexion sur tous les appareils.
    sensitive = {"role", "is_active", "password_hash", "email"} & changes.keys()
    updated = repo.update(replace(user, **changes))
    if sensitive:
        refresh_repo.revoke_all_for_user(user.id, datetime.now(UTC))

    return updated


def delete_user(user_id: str, repo: UserRepository) -> None:
    user = get_user(user_id, repo)
    _ensure_admin_remains(user, new_role=Role.CITIZEN, new_active=False, repo=repo)
    repo.delete(user_id)


def _ensure_admin_remains(
    user: User, new_role: Role, new_active: bool, repo: UserRepository
) -> None:
    """Empêche de supprimer, rétrograder ou désactiver le dernier admin actif."""
    loses_admin = (
        user.role is Role.ADMIN
        and user.is_active
        and (new_role is not Role.ADMIN or not new_active)
    )
    if loses_admin and repo.count_active_by_role(Role.ADMIN) <= 1:
        raise LastAdminError()


def update_own_profile(user: User, dto: UpdateProfileIn, repo: UserRepository) -> User:
    """The authenticated identity is the only target; role and agent link stay server-owned."""
    other = repo.get_by_email(dto.email)
    if other is not None and other.id != user.id:
        raise UserAlreadyExistsError(dto.email)
    return repo.update(replace(user, name=dto.name, email=dto.email))


def delete_own_account(user: User, repo: UserRepository) -> None:
    user.require_personal_account_deletion()
    repo.delete_personal_account(user.id, user.archived_identity(str(uuid.uuid4())))
