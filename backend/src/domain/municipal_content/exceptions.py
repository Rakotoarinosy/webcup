from src.domain.errors import DomainError


class MunicipalServiceNotFoundError(DomainError):
    def __init__(self, service_id: str) -> None:
        super().__init__(f"Municipal service '{service_id}' not found")


class MunicipalPublicationNotFoundError(DomainError):
    def __init__(self, publication_id: str) -> None:
        super().__init__(f"Municipal publication '{publication_id}' not found")


class ServiceInterruptedConflictError(DomainError):  # → 409
    """Démarche refusée : le service est en maintenance ou hors service."""

    def __init__(self, name: str) -> None:
        super().__init__(
            f"Le service « {name} » est actuellement interrompu : "
            "consultez son état et l'alternative proposée."
        )


class ServiceStatusMessageRequiredError(DomainError):  # → 400
    def __init__(self) -> None:
        super().__init__(
            "Expliquez aux habitants pourquoi le service n'est pas pleinement disponible"
        )


class InvalidAlternativeServiceError(DomainError):  # → 400
    def __init__(self) -> None:
        super().__init__("Le service de remplacement doit être un autre service disponible")


class InvalidExpectedReturnError(DomainError):  # → 400
    def __init__(self) -> None:
        super().__init__("La date de retour prévue doit être dans le futur")
