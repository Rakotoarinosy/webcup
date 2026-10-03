"""Signalement d'un habitant sur l'usage de ses données personnelles.

Chaque signalement reçoit une référence lisible et garde la trace de son traitement
(reçu → en cours d'examen → répondu) pour que l'habitant sache qu'il a été pris en compte.
"""

from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum

from src.domain.data_concern.exceptions import ConcernAlreadyAnsweredError


class ConcernTopic(StrEnum):
    COLLECTION = "Collecte"
    USAGE = "Utilisation"
    SHARING = "Partage"
    RETENTION = "Conservation"
    RIGHTS = "Accès, rectification ou suppression"
    OTHER = "Autre"


class ConcernStatus(StrEnum):
    RECEIVED = "Reçu"
    IN_REVIEW = "En cours d'examen"
    ANSWERED = "Répondu"


@dataclass
class DataConcern:
    id: str
    reference: str  # communiquée à l'habitant, ex. DC-20261003-1A2B3C4D
    user_id: str
    topic: ConcernTopic
    message: str
    created_at: datetime
    updated_at: datetime
    status: ConcernStatus = ConcernStatus.RECEIVED
    response: str | None = None
    answered_at: datetime | None = None
    answered_by: str | None = None  # nom affiché à l'habitant, pas d'identifiant interne
    reviewed_at: datetime | None = None

    def start_review(self, now: datetime) -> None:
        if self.status is ConcernStatus.ANSWERED:
            raise ConcernAlreadyAnsweredError(self.reference)
        if self.status is ConcernStatus.RECEIVED:
            self.status = ConcernStatus.IN_REVIEW
            self.reviewed_at = now
            self.updated_at = now

    def answer(self, response: str, answered_by: str, now: datetime) -> None:
        """La réponse est définitive : elle reste consultable telle quelle par l'habitant."""
        if self.status is ConcernStatus.ANSWERED:
            raise ConcernAlreadyAnsweredError(self.reference)
        self.reviewed_at = self.reviewed_at or now
        self.status = ConcernStatus.ANSWERED
        self.response = response
        self.answered_by = answered_by
        self.answered_at = now
        self.updated_at = now
