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
    def list_featured_services(self) -> list[MunicipalService]: ...

    @abstractmethod
    def list_popular_services(self, limit: int) -> list[MunicipalService]: ...

    @abstractmethod
    def get_service(self, service_id: str) -> MunicipalService | None: ...

    @abstractmethod
    def increment_service_usage(self, service_id: str) -> MunicipalService | None: ...

    @abstractmethod
    def update_service_catalog(
        self,
        service_id: str,
        *,
        is_featured: bool | None = None,
        display_order: int | None = None,
    ) -> MunicipalService | None: ...

    @abstractmethod
    def list_publications(self, category: str | None, limit: int) -> list[MunicipalPublication]: ...

    @abstractmethod
    def get_publication(self, publication_id: str) -> MunicipalPublication | None: ...

    @abstractmethod
    def add_contact_message(self, message: ContactMessage) -> ContactMessage: ...
