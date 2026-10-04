"""Exceptions métier de la participation (suffixe → code HTTP, voir shared/errors)."""

from src.domain.errors import DomainError


class ProjectNotFoundError(DomainError):
    def __init__(self, project_id: str) -> None:
        super().__init__(f"Project '{project_id}' not found")


class InvalidProjectScheduleError(DomainError):  # → 400
    def __init__(self, message: str = "The planned end must not precede the planned start") -> None:
        super().__init__(message)


class ConsultationNotFoundError(DomainError):
    def __init__(self, consultation_id: str) -> None:
        super().__init__(f"Consultation '{consultation_id}' not found")


class InvalidConsultationError(DomainError):  # → 400
    pass


class ConsultationLockedConflictError(DomainError):  # → 409
    def __init__(self) -> None:
        super().__init__("Question type and options cannot change once inhabitants have answered")


class ConsultationNotOpenError(DomainError):  # → 400
    def __init__(self, title: str) -> None:
        super().__init__(f"Consultation '{title}' is not open")


class ConsultationNotClosedError(DomainError):  # → 400
    def __init__(self, title: str) -> None:
        super().__init__(f"Consultation '{title}' is not closed yet")


class DecisionAlreadyPublishedError(DomainError):  # → 400
    def __init__(self, title: str) -> None:
        super().__init__(f"The decision on '{title}' has already been published")


class IdeaNotFoundError(DomainError):
    def __init__(self, idea_id: str) -> None:
        super().__init__(f"Idea '{idea_id}' not found")


class IdeaTransitionError(DomainError):  # → 400
    def __init__(self, current: str, target: str) -> None:
        super().__init__(f"An idea cannot go from '{current}' to '{target}'")


class MotivatedResponseRequiredError(DomainError):  # → 400
    def __init__(self) -> None:
        super().__init__("This decision needs a written, motivated answer")


class IdeaNotSupportableError(DomainError):  # → 400
    def __init__(self) -> None:
        super().__init__("Only published ideas of other inhabitants can be supported")


class ServiceNotFoundError(DomainError):
    def __init__(self, service_id: str) -> None:
        super().__init__(f"Municipal service '{service_id}' not found")


class ReviewNotFoundError(DomainError):
    def __init__(self, review_id: str) -> None:
        super().__init__(f"Review '{review_id}' not found")


class ReviewAlreadyAnsweredError(DomainError):  # → 400
    def __init__(self, reference: str) -> None:
        super().__init__(f"Review '{reference}' has already been answered")
