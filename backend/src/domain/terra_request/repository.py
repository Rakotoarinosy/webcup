"""Interfaces du domaine terra_request : persistance locale et flux de l'API Terra Nova."""

from abc import ABC, abstractmethod
from datetime import datetime

from src.domain.terra_request.entities import (
    FeedSnapshot,
    PipelineStatus,
    TerraRequest,
    TerraSession,
)


class TerraFeed(ABC):
    @abstractmethod
    def fetch(self) -> FeedSnapshot:
        """Lève TerraFeedUnavailableError si l'API ne répond pas correctement."""


class TerraRequestRepository(ABC):
    @abstractmethod
    def list_all(self) -> list[TerraRequest]: ...

    @abstractmethod
    def get_by_code(self, request_code: str) -> TerraRequest | None: ...

    @abstractmethod
    def save_sync(
        self, added: list[TerraRequest], updated: list[TerraRequest], session: TerraSession
    ) -> None:
        """Enregistre en une transaction les demandes nouvelles/modifiées et la session."""

    @abstractmethod
    def set_status(self, request_code: str, status: PipelineStatus, now: datetime) -> None: ...

    @abstractmethod
    def get_session(self) -> TerraSession: ...

    @abstractmethod
    def save_session(self, session: TerraSession) -> None: ...

    @abstractmethod
    def read_keys(self, user_id: str) -> set[str]: ...

    @abstractmethod
    def mark_read(self, user_id: str, keys: list[str], now: datetime) -> None: ...
