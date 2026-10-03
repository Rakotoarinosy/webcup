from src.domain.errors import DomainError


class MunicipalServiceNotFoundError(DomainError):
    def __init__(self, service_id: str) -> None:
        super().__init__(f"Municipal service '{service_id}' not found")


class MunicipalPublicationNotFoundError(DomainError):
    def __init__(self, publication_id: str) -> None:
        super().__init__(f"Municipal publication '{publication_id}' not found")
