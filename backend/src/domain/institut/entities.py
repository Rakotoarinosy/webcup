"""Entité Institut : service qui reçoit et traite les demandes de certaines catégories.

Distinct de MunicipalService, qui reste le catalogue public affiché aux citoyens.
"""

from dataclasses import dataclass
from datetime import datetime

from src.domain.citizen_request.entities import RequestCategory


@dataclass
class Institut:
    id: str
    name: str
    # Catégories de demandes reçues. Une catégorie n'est couverte que par un seul institut actif.
    categories: frozenset[RequestCategory]
    created_at: datetime
    description: str = ""
    # Utilisateur MANAGER responsable ; un manager ne gère qu'un seul institut.
    manager_id: str | None = None
    is_active: bool = True

    def handles(self, category: RequestCategory) -> bool:
        return self.is_active and category in self.categories


def overlapping_categories(
    candidate: Institut, others: list[Institut]
) -> frozenset[RequestCategory]:
    """Catégories du candidat déjà couvertes par un autre institut actif (vide = pas de conflit)."""
    if not candidate.is_active:
        return frozenset()

    taken: set[RequestCategory] = set()
    for other in others:
        if other.id != candidate.id and other.is_active:
            taken |= other.categories

    return candidate.categories & taken
