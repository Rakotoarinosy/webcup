from abc import ABC, abstractmethod

from src.domain.municipal_content.entities import (
    ContactMessage,
    MunicipalPublication,
    MunicipalService,
)


class MunicipalContentRepository(ABC):
    @abstractmethod
    def list_services(self) -> list[MunicipalService]: ...

    @abstractmethod
    def get_service(self, service_id: str) -> MunicipalService | None: ...

    @abstractmethod
    def list_publications(self, category: str | None, limit: int) -> list[MunicipalPublication]: ...

    @abstractmethod
    def get_publication(self, publication_id: str) -> MunicipalPublication | None: ...

    @abstractmethod
    def add_contact_message(self, message: ContactMessage) -> ContactMessage: ...
