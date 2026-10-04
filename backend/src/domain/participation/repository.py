"""Interfaces des repositories de la participation."""

from abc import ABC, abstractmethod

from src.domain.participation.entities import (
    CityProject,
    Consultation,
    ConsultationResponse,
    Idea,
    IdeaStatus,
    IdeaVisibility,
    ProjectStatus,
    ProjectUpdate,
    ServiceRating,
    ServiceReview,
)


class ProjectRepository(ABC):
    @abstractmethod
    def get(self, project_id: str) -> CityProject | None:
        """Avec ses actualités, de la plus récente à la plus ancienne."""

    @abstractmethod
    def list(
        self,
        status: ProjectStatus | None = None,
        district: str | None = None,
        published_only: bool = True,
    ) -> "list[CityProject]":
        """Les plus récemment mis à jour d'abord ; actualités non chargées."""

    @abstractmethod
    def add(self, project: CityProject) -> CityProject: ...

    @abstractmethod
    def update(self, project: CityProject) -> CityProject: ...

    @abstractmethod
    def add_update(self, update: ProjectUpdate) -> ProjectUpdate: ...


class ConsultationRepository(ABC):
    @abstractmethod
    def get(self, consultation_id: str) -> Consultation | None: ...

    @abstractmethod
    def list(
        self, project_id: str | None = None, published_only: bool = True
    ) -> "list[Consultation]":
        """Les dernières à clôturer d'abord."""

    @abstractmethod
    def add(self, consultation: Consultation) -> Consultation: ...

    @abstractmethod
    def update(self, consultation: Consultation) -> Consultation: ...

    @abstractmethod
    def get_response(self, consultation_id: str, user_id: str) -> ConsultationResponse | None: ...

    @abstractmethod
    def save_response(self, response: ConsultationResponse) -> ConsultationResponse:
        """Crée ou remplace la réponse de l'habitant."""

    @abstractmethod
    def list_responses(self, consultation_id: str) -> "list[ConsultationResponse]": ...

    @abstractmethod
    def count_responses(self, consultation_id: str) -> int: ...

    @abstractmethod
    def list_responses_for_user(self, user_id: str) -> "list[ConsultationResponse]": ...


class IdeaRepository(ABC):
    @abstractmethod
    def get(self, idea_id: str) -> Idea | None: ...

    @abstractmethod
    def list(
        self,
        status: IdeaStatus | None = None,
        visibility: IdeaVisibility | None = None,
    ) -> "list[Idea]":
        """Du plus récent au plus ancien."""

    @abstractmethod
    def list_for_user(self, user_id: str) -> "list[Idea]": ...

    @abstractmethod
    def add(self, idea: Idea) -> Idea: ...

    @abstractmethod
    def update(self, idea: Idea) -> Idea: ...

    @abstractmethod
    def toggle_support(self, idea_id: str, user_id: str) -> tuple[bool, int]:
        """Ajoute ou retire le soutien de l'habitant ; renvoie (soutenue, nombre de soutiens)."""

    @abstractmethod
    def supported_by(self, user_id: str) -> "list[str]":
        """Identifiants des idées que l'habitant soutient."""


class ServiceReviewRepository(ABC):
    @abstractmethod
    def get(self, review_id: str) -> ServiceReview | None: ...

    @abstractmethod
    def get_for(self, service_id: str, user_id: str) -> ServiceReview | None: ...

    @abstractmethod
    def list(
        self, service_id: str | None = None, include_hidden: bool = False
    ) -> "list[ServiceReview]":
        """Du plus récent au plus ancien."""

    @abstractmethod
    def list_for_user(self, user_id: str) -> "list[ServiceReview]": ...

    @abstractmethod
    def add(self, review: ServiceReview) -> ServiceReview: ...

    @abstractmethod
    def update(self, review: ServiceReview) -> ServiceReview: ...

    @abstractmethod
    def ratings(self) -> "list[ServiceRating]":
        """Note moyenne de chaque service ayant au moins un avis visible."""
