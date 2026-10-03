"""Exceptions métier des signalements sur les données (suffixe → code HTTP, voir shared/errors)."""

from src.domain.errors import DomainError


class ConcernNotFoundError(DomainError):
    def __init__(self, concern_id: str) -> None:
        super().__init__(f"Data concern '{concern_id}' not found")


class ConcernAlreadyAnsweredError(DomainError):  # → 400
    def __init__(self, reference: str) -> None:
        super().__init__(f"Data concern '{reference}' has already been answered")
