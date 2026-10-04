"""Soutien d'une demande par d'autres habitants (F52) et vue publique minimale d'une demande.

Ce qu'un habitant voit d'une demande qui n'est pas la sienne (`PublicRequest`) :
  - le titre, débarrassé des adresses e-mail et numéros de téléphone qu'il pourrait contenir ;
  - la catégorie, le statut, la date de dépôt et le nombre de soutiens ;
  - un lieu approximatif : le libellé sans numéro de rue ni coordonnées de contact.
Ce qui n'est JAMAIS exposé : l'identité de l'auteur ou des soutiens, la description (texte libre,
souvent personnel), les coordonnées GPS précises, l'agent, l'institut, les messages.

Seules les demandes ouvertes et non regroupées sont publiques ; un habitant garde toutefois la
trace des demandes qu'il soutient, même closes, pour en suivre l'issue.
"""

import re
from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime

from src.domain.citizen_request.access import Actor
from src.domain.citizen_request.entities import (
    CitizenRequest,
    RequestCategory,
    RequestStatus,
)
from src.domain.citizen_request.exceptions import (
    CannotSupportOwnRequestError,
    RequestNotPublicError,
)
from src.domain.user.entities import Role
from src.domain.user.exceptions import ForbiddenError

_EMAIL = re.compile(r"[\w.+-]+@[\w-]+(\.[\w-]+)+")
# Suite d'au moins 8 chiffres, éventuellement séparés (téléphone malgache ou international).
_PHONE = re.compile(r"\+?\d(?:[\s.-]?\d){7,}")
# Numéro de rue en tête de libellé : « 12 », « 12 bis », « n° 12 », « lot II M 45 ».
_STREET_NUMBER = re.compile(r"^\s*(?:n[°o]\s*)?\d+[a-z]?(?:\s*(?:bis|ter|quater))?\s*,?\s*", re.I)
_LOT = re.compile(r"\blot\s+[\w\s]*?\d+\w*\b", re.I)
PUBLIC_LOCATION_MAX = 80
REDACTED = "[masqué]"


def redact_personal_data(text: str) -> str:
    """Masque e-mails et numéros de téléphone d'un texte destiné au public."""
    return _PHONE.sub(REDACTED, _EMAIL.sub(REDACTED, text)).strip()


def approximate_location(location: str) -> str:
    """Lieu sans numéro de rue ni lot ni contact : assez pour reconnaître le problème, pas le foyer."""
    text = redact_personal_data(location)
    text = _LOT.sub("", _STREET_NUMBER.sub("", text))
    text = re.sub(r"\s{2,}", " ", text).strip(" ,;-")
    if len(text) > PUBLIC_LOCATION_MAX:
        text = text[: PUBLIC_LOCATION_MAX - 1].rstrip() + "…"
    return text or "Lieu non précisé"


def is_public(request: CitizenRequest) -> bool:
    return request.is_open and not request.is_duplicate


@dataclass(frozen=True)
class PublicRequest:
    """Vue publique minimale et anonymisée d'une demande (voir l'en-tête du module)."""

    id: str
    title: str
    category: RequestCategory
    status: RequestStatus
    location: str
    created_at: datetime
    support_count: int
    supported_by_me: bool = False
    is_mine: bool = False
    # Date du soutien de l'habitant connecté (liste « Demandes que je soutiens »).
    supported_at: datetime | None = None


def to_public(
    request: CitizenRequest,
    viewer_id: str | None,
    *,
    supported_by_me: bool = False,
    supported_at: datetime | None = None,
) -> PublicRequest:
    return PublicRequest(
        id=request.id,
        title=redact_personal_data(request.title),
        category=request.category,
        status=request.status,
        location=approximate_location(request.location),
        created_at=request.created_at,
        support_count=request.support_count,
        supported_by_me=supported_by_me,
        is_mine=viewer_id is not None and request.citizen_id == viewer_id,
        supported_at=supported_at,
    )


def ensure_can_support(actor: Actor, request: CitizenRequest) -> None:
    """Un habitant soutient une demande publique d'un autre habitant."""
    if actor.role is not Role.CITIZEN:
        raise ForbiddenError("Only citizens can support a request")
    if request.citizen_id == actor.user_id:
        raise CannotSupportOwnRequestError()
    if not is_public(request):
        raise RequestNotPublicError(request.id)


@dataclass(frozen=True)
class RequestSupport:
    request_id: str
    citizen_id: str
    created_at: datetime


class SupportRepository(ABC):
    @abstractmethod
    def add(self, support: RequestSupport) -> None: ...

    @abstractmethod
    def remove(self, request_id: str, citizen_id: str) -> bool:
        """Vrai si un soutien a été retiré."""

    @abstractmethod
    def get(self, request_id: str, citizen_id: str) -> RequestSupport | None: ...

    @abstractmethod
    def count_for(self, request_id: str) -> int: ...

    @abstractmethod
    def supporter_ids(self, request_id: str) -> list[str]: ...

    @abstractmethod
    def supported_by(self, citizen_id: str, request_ids: list[str]) -> set[str]:
        """Parmi `request_ids`, celles que l'habitant soutient."""

    @abstractmethod
    def list_for_citizen(self, citizen_id: str) -> list[RequestSupport]:
        """Soutiens de l'habitant, du plus récent au plus ancien."""
