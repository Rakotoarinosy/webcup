"""Interface de persistance du domaine des demandes citoyennes."""

from abc import ABC, abstractmethod

from src.domain.citizen_request.analytics import RequestScope
from src.domain.citizen_request.entities import (
    CitizenRequest,
    RequestCategory,
    RequestPriority,
    RequestSortBy,
    RequestStatus,
    SortOrder,
)


class CitizenRequestRepository(ABC):
    @abstractmethod
    def get_by_id(self, request_id: str) -> CitizenRequest | None: ...

    @abstractmethod
    def list_page(
        self,
        *,
        page: int,
        page_size: int,
        search: str | None,
        category: RequestCategory | None,
        priority: RequestPriority | None,
        status: RequestStatus | None,
        scope: RequestScope,
        sort_by: RequestSortBy,
        sort_order: SortOrder,
    ) -> tuple[list[CitizenRequest], int]:
        """`scope` (voir access.scope_for) restreint toujours le résultat ; vide si `scope.is_empty`."""

    @abstractmethod
    def list_by_agent(self, agent_id: str) -> list[CitizenRequest]:
        """Interventions d'un agent : ses demandes attribuées, les plus récentes d'abord."""

    @abstractmethod
    def add(self, request: CitizenRequest) -> CitizenRequest: ...

    @abstractmethod
    def update(self, request: CitizenRequest) -> CitizenRequest: ...

    @abstractmethod
    def delete(self, request_id: str) -> None: ...
