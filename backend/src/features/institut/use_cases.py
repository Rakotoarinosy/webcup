"""Use cases du domaine institut. Création et paramétrage : admin ; lecture : admin ou son manager."""

import uuid
from dataclasses import replace
from datetime import UTC, datetime

from src.domain.audit import AuditAction, AuditTarget
from src.domain.citizen_request import Actor, ensure_can_manage_institut
from src.domain.institut import (
    CategoryConflictError,
    Institut,
    InstitutAlreadyExistsError,
    InstitutNotFoundError,
    InstitutRepository,
    InvalidManagerError,
    ManagerConflictError,
    overlapping_categories,
)
from src.domain.user import ForbiddenError, Role, UserRepository
from src.features.audit.recording import AuditTrail, field_changes, record
from src.features.institut.schemas import CreateInstitutIn, SetManagerIn, UpdateInstitutIn


def create_institut(
    dto: CreateInstitutIn,
    actor: Actor,
    repo: InstitutRepository,
    users: UserRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Institut:
    _ensure_admin(actor)
    _ensure_name_free(dto.name, None, repo)

    institut = Institut(
        id=str(uuid.uuid4()),
        name=dto.name.strip(),
        description=dto.description,
        categories=frozenset(dto.categories),
        created_at=now or datetime.now(UTC),
    )
    _ensure_categories_free(institut, repo)
    if dto.manager_id is not None:
        _ensure_manager_available(dto.manager_id, institut.id, users, repo)
        institut.manager_id = dto.manager_id

    created = repo.add(institut)
    record(
        audit,
        AuditAction.INSTITUT_CREATED,
        AuditTarget.INSTITUT,
        created.id,
        created.name,
        institut_id=created.id,
        details={"categories": sorted(created.categories), "manager_id": created.manager_id},
    )
    return created


def update_institut(
    institut_id: str,
    dto: UpdateInstitutIn,
    actor: Actor,
    repo: InstitutRepository,
    audit: AuditTrail | None = None,
) -> Institut:
    _ensure_admin(actor)
    institut = _load(institut_id, repo)
    changes = dto.model_dump(exclude_unset=True, exclude_none=True)

    if "name" in changes:
        changes["name"] = changes["name"].strip()
        _ensure_name_free(changes["name"], institut.id, repo)
    if "categories" in changes:
        changes["categories"] = frozenset(changes["categories"])

    updated = replace(institut, **changes)
    # Réactivation ou nouvelles catégories : une catégorie reste couverte par un seul institut actif.
    _ensure_categories_free(updated, repo)

    saved = repo.update(updated)
    diff = field_changes(institut, saved, ("name", "description", "categories", "is_active"))
    if diff:
        record(
            audit,
            AuditAction.INSTITUT_UPDATED,
            AuditTarget.INSTITUT,
            saved.id,
            saved.name,
            institut_id=saved.id,
            details=diff,
        )
    return saved


def set_manager(
    institut_id: str,
    dto: SetManagerIn,
    actor: Actor,
    repo: InstitutRepository,
    users: UserRepository,
    audit: AuditTrail | None = None,
) -> Institut:
    _ensure_admin(actor)
    institut = _load(institut_id, repo)
    if dto.manager_id is not None:
        _ensure_manager_available(dto.manager_id, institut.id, users, repo)

    saved = repo.update(replace(institut, manager_id=dto.manager_id))
    if institut.manager_id != saved.manager_id:
        names = {
            key: (user.name if (user := users.get_by_id(user_id)) else None)
            for key, user_id in (("from", institut.manager_id), ("to", saved.manager_id))
            if user_id
        }
        record(
            audit,
            AuditAction.INSTITUT_MANAGER_CHANGED,
            AuditTarget.INSTITUT,
            saved.id,
            saved.name,
            institut_id=saved.id,
            details={"manager": {"from": names.get("from"), "to": names.get("to")}},
        )
    return saved


def get_institut(institut_id: str, actor: Actor, repo: InstitutRepository) -> Institut:
    ensure_can_manage_institut(actor, institut_id)

    return _load(institut_id, repo)


def list_instituts(actor: Actor, repo: InstitutRepository, *, active_only: bool) -> list[Institut]:
    """L'admin voit tous les instituts, un manager le sien, les autres rôles aucun."""
    if actor.role is Role.ADMIN:
        return repo.list(active_only=active_only)
    if actor.role is Role.MANAGER and actor.institut_id is not None:
        return [_load(actor.institut_id, repo)]

    return []


def _load(institut_id: str, repo: InstitutRepository) -> Institut:
    institut = repo.get_by_id(institut_id)
    if institut is None:
        raise InstitutNotFoundError(institut_id)

    return institut


def _ensure_admin(actor: Actor) -> None:
    if actor.role is not Role.ADMIN:
        raise ForbiddenError()


def _ensure_name_free(name: str, own_id: str | None, repo: InstitutRepository) -> None:
    existing = repo.get_by_name(name.strip())
    if existing is not None and existing.id != own_id:
        raise InstitutAlreadyExistsError(name)


def _ensure_categories_free(institut: Institut, repo: InstitutRepository) -> None:
    overlap = overlapping_categories(institut, repo.list(active_only=True))
    if overlap:
        raise CategoryConflictError(category.value for category in overlap)


def _ensure_manager_available(
    user_id: str, institut_id: str, users: UserRepository, repo: InstitutRepository
) -> None:
    user = users.get_by_id(user_id)
    if user is None or user.role is not Role.MANAGER or not user.is_active:
        raise InvalidManagerError(user_id)
    current = repo.get_by_manager(user_id)
    if current is not None and current.id != institut_id:
        raise ManagerConflictError(user_id)
