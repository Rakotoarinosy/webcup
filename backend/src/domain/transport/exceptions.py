"""Exceptions métier des transports municipaux (suffixe → code HTTP, voir shared/errors)."""

from src.domain.errors import DomainError


class TransportLineNotFoundError(DomainError):
    def __init__(self, line_id: str) -> None:
        super().__init__(f"Transport line '{line_id}' not found")


class LineStatusMessageRequiredError(DomainError):  # → 400
    def __init__(self) -> None:
        super().__init__("Expliquez la perturbation ou l'interruption aux voyageurs")
