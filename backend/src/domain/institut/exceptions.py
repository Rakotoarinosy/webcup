"""Exceptions métier du domaine institut.

Convention (voir shared/errors/handlers.py) : le suffixe du nom fixe le code HTTP.
  *NotFoundError      → 404
  *AlreadyExistsError → 409
  *ConflictError      → 409
  autre DomainError   → 400
"""

from collections.abc import Iterable

from src.domain.errors import DomainError


class InstitutNotFoundError(DomainError):
    def __init__(self, institut_id: str) -> None:
        super().__init__(f"Institut '{institut_id}' not found")


class InstitutAlreadyExistsError(DomainError):
    def __init__(self, name: str) -> None:
        super().__init__(f"An institut named '{name}' already exists")


class CategoryConflictError(DomainError):
    def __init__(self, categories: Iterable[str]) -> None:
        listed = ", ".join(sorted(categories))
        super().__init__(f"Categories already handled by another active institut: {listed}")


class ManagerConflictError(DomainError):
    def __init__(self, manager_id: str) -> None:
        super().__init__(f"User '{manager_id}' already manages another institut")


class InvalidManagerError(DomainError):  # → 400
    def __init__(self, user_id: str) -> None:
        super().__init__(f"User '{user_id}' must be an active manager to lead an institut")


class InstitutInactiveError(DomainError):  # → 400
    def __init__(self, institut_id: str) -> None:
        super().__init__(f"Institut '{institut_id}' is deactivated")
