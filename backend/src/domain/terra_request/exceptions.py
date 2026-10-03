"""Exceptions métier du domaine terra_request (le suffixe fixe le code HTTP)."""

from src.domain.errors import DomainError


class TerraRequestNotFoundError(DomainError):  # → 404
    def __init__(self, request_code: str) -> None:
        super().__init__(f"Terra Nova request '{request_code}' not found")


class TerraFeedUnavailableError(DomainError):  # → 503
    """L'API Terra Nova est injoignable, refuse la clé ou répond mal."""
