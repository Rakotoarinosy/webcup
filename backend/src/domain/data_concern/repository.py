"""Interface du repository des signalements sur les données."""

from abc import ABC, abstractmethod

from src.domain.data_concern.entities import ConcernStatus, DataConcern


class DataConcernRepository(ABC):
    @abstractmethod
    def get_by_id(self, concern_id: str) -> DataConcern | None: ...

    @abstractmethod
    def list_for_user(self, user_id: str) -> "list[DataConcern]":
        """Du plus récent au plus ancien."""

    @abstractmethod
    def list(self, status: ConcernStatus | None = None) -> "list[DataConcern]":
        """Du plus ancien au plus récent : les premiers reçus sont traités en premier."""

    @abstractmethod
    def add(self, concern: DataConcern) -> DataConcern: ...

    @abstractmethod
    def update(self, concern: DataConcern) -> DataConcern: ...
