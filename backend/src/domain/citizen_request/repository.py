"""Interface de persistance du domaine des demandes citoyennes."""

from abc import ABC, abstractmethod
from datetime import datetime

from src.domain.citizen_request.analytics import RequestScope
from src.domain.citizen_request.entities import (
    CitizenRequest,
    ConversationState,
    PublicRequestSort,
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
        only_ids: frozenset[str] | None = None,
        conversation_state: ConversationState | None = None,
    ) -> tuple[list[CitizenRequest], int]:
        """`scope` (voir access.scope_for) restreint toujours le résultat ; vide si `scope.is_empty`.

        `only_ids` limite aux demandes listées (ex. : celles qui ont des doublons potentiels)."""

    @abstractmethod
    def list_candidates(
        self,
        *,
        scope: RequestScope,
        since: datetime,
        category: RequestCategory | None = None,
        limit: int = 1000,
    ) -> list[CitizenRequest]:
        """Demandes ouvertes, non regroupées, déposées depuis `since` : base des rapprochements."""

    @abstractmethod
    def get_many(self, request_ids: list[str]) -> list[CitizenRequest]: ...

    @abstractmethod
    def list_public(
        self,
        *,
        page: int,
        page_size: int,
        search: str | None,
        category: RequestCategory | None,
        sort: PublicRequestSort,
    ) -> tuple[list[CitizenRequest], int]:
        """Demandes ouvertes et non regroupées de toute la ville (F52).

        La recherche ne porte que sur le titre et le lieu, jamais sur la description privée."""

    @abstractmethod
    def list_duplicates_of(self, request_id: str) -> list[CitizenRequest]:
        """Doublons rattachés à une demande principale."""

    @abstractmethod
    def list_by_agent(self, agent_id: str) -> list[CitizenRequest]:
        """Interventions d'un agent : ses demandes attribuées, les plus récentes d'abord."""

    @abstractmethod
    def add(self, request: CitizenRequest) -> CitizenRequest: ...

    @abstractmethod
    def update(self, request: CitizenRequest) -> CitizenRequest: ...

    @abstractmethod
    def delete(self, request_id: str) -> None: ...
