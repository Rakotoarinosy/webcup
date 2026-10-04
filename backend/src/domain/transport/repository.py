from abc import ABC, abstractmethod

from src.domain.transport.entities import TransportLine


class TransportRepository(ABC):
    @abstractmethod
    def list_lines(self) -> list[TransportLine]:
        """Toutes les lignes avec leurs arrêts dans l'ordre du parcours."""

    @abstractmethod
    def get_line(self, line_id: str) -> TransportLine | None: ...

    @abstractmethod
    def save_status(self, line: TransportLine) -> TransportLine | None:
        """Enregistre l'état de la ligne (statut, message, date de mise à jour)."""
