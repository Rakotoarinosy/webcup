"""Interface du repository des alertes."""

from abc import ABC, abstractmethod
from datetime import datetime

from src.domain.alert.entities import Alert


class AlertRepository(ABC):
    @abstractmethod
    def get_by_id(self, alert_id: str) -> Alert | None: ...

    @abstractmethod
    def list_current(self, now: datetime) -> "list[Alert]":
        """Alertes affichées à l'instant `now`."""

    @abstractmethod
    def list_since(self, since: datetime, now: datetime) -> "list[Alert]":
        """Alertes déjà commencées et encore actives ou terminées après `since` (historique)."""

    @abstractmethod
    def list_all(self, limit: int = 200) -> "list[Alert]":
        """Toutes les alertes, programmées comprises, de la plus récente à la plus ancienne."""

    @abstractmethod
    def add(self, alert: Alert) -> Alert: ...

    @abstractmethod
    def update(self, alert: Alert) -> Alert: ...

    @abstractmethod
    def delete(self, alert_id: str) -> None: ...
