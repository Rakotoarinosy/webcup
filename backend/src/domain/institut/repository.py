"""Interface du repository institut : le domaine décrit ce dont il a besoin, l'infrastructure l'implémente."""

from abc import ABC, abstractmethod

from src.domain.citizen_request.entities import RequestCategory
from src.domain.institut.entities import (
    CitizenInstitutDashboard,
    Institut,
    InstitutDashboard,
    InstitutService,
)


class InstitutRepository(ABC):
    @abstractmethod
    def get_by_id(self, institut_id: str) -> Institut | None: ...

    @abstractmethod
    def get_by_name(self, name: str) -> Institut | None: ...

    @abstractmethod
    def get_by_manager(self, manager_id: str) -> Institut | None: ...

    @abstractmethod
    def find_for_category(self, category: RequestCategory) -> Institut | None:
        """Institut actif qui reçoit cette catégorie (None : demande laissée à l'administration)."""

    # L'annotation est évaluée avant que cette méthode ne masque le builtin `list`.
    @abstractmethod
    def list(self, *, active_only: bool = False) -> "list[Institut]": ...

    @abstractmethod
    def add(self, institut: Institut) -> Institut: ...

    @abstractmethod
    def update(self, institut: Institut) -> Institut: ...

    @abstractmethod
    def get_dashboard(self, institut_id: str) -> InstitutDashboard | None: ...

    @abstractmethod
    def get_citizen_dashboard(
        self, institut_id: str, citizen_id: str
    ) -> CitizenInstitutDashboard | None: ...

    @abstractmethod
    def get_service(self, institut_id: str, service_id: str) -> InstitutService | None: ...

    @abstractmethod
    def add_service(self, service: InstitutService, agent_ids: frozenset[str]) -> InstitutService: ...

    @abstractmethod
    def set_service_responsible(
        self, institut_id: str, service_id: str, agent_id: str | None
    ) -> InstitutService | None: ...

    @abstractmethod
    def set_service_agents(
        self, institut_id: str, service_id: str, agent_ids: frozenset[str]
    ) -> InstitutService | None: ...
