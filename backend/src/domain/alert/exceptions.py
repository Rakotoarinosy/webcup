"""Exceptions métier des alertes (suffixe → code HTTP, voir shared/errors)."""

from src.domain.errors import DomainError


class AlertNotFoundError(DomainError):
    def __init__(self, alert_id: str) -> None:
        super().__init__(f"Alert '{alert_id}' not found")


class AlertAlreadyEndedError(DomainError):  # → 400
    def __init__(self, alert_id: str) -> None:
        super().__init__(f"Alert '{alert_id}' has already ended")


class InvalidAlertPeriodError(DomainError):  # → 400
    def __init__(self) -> None:
        super().__init__("The end of display must be after its start")


class AlertZoneRequiredError(DomainError):  # → 400
    def __init__(self) -> None:
        super().__init__("A zone is required when the alert targets a neighbourhood")


class RecommendationUnavailableError(DomainError):  # → 503
    def __init__(self, reason: str = "AI recommendations are temporarily unavailable") -> None:
        super().__init__(reason)
