"""Interface du journal d'audit : ajout et consultation, aucune modification."""

from abc import ABC, abstractmethod

from src.domain.audit.entities import AuditEntry, AuditQuery


class AuditLog(ABC):
    @abstractmethod
    def record(self, entry: AuditEntry) -> AuditEntry: ...

    @abstractmethod
    def search(self, query: AuditQuery) -> tuple[list[AuditEntry], int]:
        """Entrées les plus récentes d'abord, et nombre total correspondant au filtre."""
