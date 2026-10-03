"""Exceptions métier du domaine des demandes citoyennes.

Convention (voir shared/errors/handlers.py) : le suffixe du nom fixe le code HTTP.
  *NotFoundError    → 404
  *ConflictError    → 409
  autre DomainError → 400
"""

from src.domain.errors import DomainError


class CitizenRequestNotFoundError(DomainError):
    def __init__(self, request_id: str) -> None:
        super().__init__(f"Citizen request '{request_id}' not found")


class InvalidStatusTransitionError(DomainError):
    def __init__(self, current: str, target: str) -> None:
        super().__init__(f"Cannot move a citizen request from '{current}' to '{target}'")


class RequestClosedError(DomainError):
    """Une demande résolue ou rejetée ne peut plus être modifiée ni réattribuée."""

    def __init__(self, request_id: str) -> None:
        super().__init__(f"Citizen request '{request_id}' is closed and can no longer be changed")


class AgentOutsideInstitutError(DomainError):  # → 400
    def __init__(self, agent_id: str, institut_id: str) -> None:
        super().__init__(f"Agent '{agent_id}' does not belong to institut '{institut_id}'")


class CitizenRequiredError(DomainError):  # → 400
    def __init__(self) -> None:
        super().__init__("citizen_id is required when submitting a request on behalf of a citizen")


class NotACitizenError(DomainError):  # → 400
    def __init__(self, user_id: str) -> None:
        super().__init__(f"User '{user_id}' is not an active citizen")


class AnalysisUnavailableError(DomainError):  # → 503
    def __init__(self, reason: str = "AI analysis is temporarily unavailable") -> None:
        super().__init__(reason)
