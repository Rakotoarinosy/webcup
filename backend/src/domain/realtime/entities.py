"""Evénements ne contenant aucune donnée métier ou personnelle."""

from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True, slots=True)
class RealtimeEvent:
    """Indique que les clients doivent recharger les données autorisées par leur rôle."""

    type: str
    occurred_at: datetime
