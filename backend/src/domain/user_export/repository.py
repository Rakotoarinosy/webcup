"""Port de lecture des données exportables."""

from abc import ABC, abstractmethod

from src.domain.user_export.entities import PersonalData


class UserExportRepository(ABC):
    @abstractmethod
    def get_personal_data(self, user_id: str) -> PersonalData: ...
