"""Entités métier du domaine agent. Python pur : aucune dépendance à un framework."""

from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum


class AgentStatus(StrEnum):
    AVAILABLE = "available"
    IN_INTERVENTION = "in_intervention"
    UNAVAILABLE = "unavailable"
    OFFLINE = "offline"


@dataclass
class Agent:
    """Profil agent d'un User de rôle AGENT, rattaché à exactement un Institut.

    L'identité (nom, email, compte actif) vit sur User. `is_active` est l'activation du profil
    dans l'institut : un manager peut retirer un agent de la répartition sans toucher au compte.
    """

    id: str
    user_id: str
    institut_id: str
    created_at: datetime
    status: AgentStatus = AgentStatus.AVAILABLE
    is_active: bool = True
    # Lus à la lecture (jointure User / Institut et comptage des demandes), jamais stockés ici.
    name: str = ""
    email: str = ""
    institut_name: str = ""
    interventions: int = 0
