"""Accusé de réception d'une demande (D16, F83) : la preuve que la ville l'a bien reçue."""

from dataclasses import dataclass
from datetime import datetime

from src.domain.citizen_request.entities import RequestCategory, RequestStatus

# Destinataire d'une demande qu'aucun institut ne couvre : l'administration la répartit.
DEFAULT_SERVICE = "Administration de la ville de Terra Nova"


@dataclass(frozen=True)
class RequestReceipt:
    reference: str
    request_id: str
    title: str
    description: str
    category: RequestCategory
    location: str
    status: RequestStatus
    received_at: datetime  # date et heure d'enregistrement par la plateforme
    service: str  # service destinataire
    citizen_name: str
    issued_at: datetime  # date d'édition de l'accusé
