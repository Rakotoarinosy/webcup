from abc import ABC, abstractmethod
from datetime import datetime

from src.domain.municipal_content.entities import (
    ContactMessage,
    MunicipalPublication,
    MunicipalPublicationComment,
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
    def update_service_location(
        self,
        service_id: str,
        *,
        address: str | None,
        latitude: float | None,
        longitude: float | None,
    ) -> MunicipalService | None: ...

    @abstractmethod
    def save_service_status(self, service: MunicipalService) -> MunicipalService | None:
        """Enregistre l'état du service (statut, explication, retour prévu, alternative)."""

    @abstractmethod
    def list_publications(self, category: str | None, limit: int) -> list[MunicipalPublication]: ...

    @abstractmethod
    def get_publication(self, publication_id: str) -> MunicipalPublication | None: ...

    @abstractmethod
    def list_publications_for_management(self) -> list[MunicipalPublication]: ...

    @abstractmethod
    def get_publication_for_management(
        self, publication_id: str
    ) -> MunicipalPublication | None: ...

    @abstractmethod
    def add_publication(self, publication: MunicipalPublication) -> MunicipalPublication: ...

    @abstractmethod
    def update_publication(
        self,
        publication_id: str,
        *,
        title: str | None = None,
        summary: str | None = None,
        content: str | None = None,
        category: str | None = None,
        published_at: datetime | None = None,
        is_published: bool | None = None,
        image_url: str | None = None,
    ) -> MunicipalPublication | None: ...

    @abstractmethod
    def increment_publication_views(self, publication_id: str) -> MunicipalPublication | None: ...

    @abstractmethod
    def increment_publication_likes(self, publication_id: str) -> MunicipalPublication | None: ...

    @abstractmethod
    def toggle_publication_like(
        self, publication_id: str, user_id: str
    ) -> tuple[MunicipalPublication, bool] | None: ...

    @abstractmethod
    def list_publication_comments(
        self, publication_id: str
    ) -> list[MunicipalPublicationComment]: ...

    @abstractmethod
    def add_publication_comment(
        self, comment: MunicipalPublicationComment
    ) -> MunicipalPublicationComment | None: ...

    @abstractmethod
    def delete_publication(self, publication_id: str) -> bool: ...

    @abstractmethod
    def add_contact_message(self, message: ContactMessage) -> ContactMessage: ...
