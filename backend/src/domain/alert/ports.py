"""Ports des alertes : IA de recommandations et envoi par email. L'infrastructure les implémente."""

from abc import ABC, abstractmethod
from dataclasses import dataclass

from src.domain.alert.entities import Alert, AlertAudience, AlertLevel


@dataclass(frozen=True)
class RecommendationRequest:
    title: str
    message: str
    level: AlertLevel
    audience: AlertAudience
    zone: str | None = None


class AlertRecommender(ABC):
    @abstractmethod
    def recommend(self, request: RecommendationRequest) -> str:
        """Consignes adaptées aux personnes vulnérables, en texte simple (une par ligne).

        Lève RecommendationUnavailableError si le service d'IA ne répond pas ou répond mal.
        """


class AlertMailer(ABC):
    @abstractmethod
    def send_alert(self, to: str, name: str, alert: Alert) -> None:
        """Envoie l'alerte à un habitant. Peut lever n'importe quelle exception en cas d'échec."""
