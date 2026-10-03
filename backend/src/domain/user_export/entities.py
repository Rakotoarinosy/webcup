"""Valeurs métier utilisées pour l'export personnel de données."""

from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum

from src.domain.citizen_request.entities import RequestCategory, RequestPriority, RequestStatus
from src.domain.preferences.entities import FontFamily, FontSize, Theme
from src.domain.user.entities import Role


class ExportFormat(StrEnum):
    PDF = "pdf"
    CSV = "csv"
    EXCEL = "excel"
    WORD = "word"


@dataclass(frozen=True, slots=True)
class ExportedRequest:
    """Vue limitée à la demande appartenant à l'utilisateur exporteur."""

    title: str
    description: str
    category: RequestCategory
    status: RequestStatus
    priority: RequestPriority
    location: str
    created_at: datetime
    updated_at: datetime


@dataclass(frozen=True, slots=True)
class PersonalData:
    """Données exportables d'un compte, sans secrets d'authentification."""

    name: str
    email: str
    role: Role
    created_at: datetime
    theme: Theme
    font_size: FontSize
    font_family: FontFamily
    requests: tuple[ExportedRequest, ...]


@dataclass(frozen=True, slots=True)
class ExportDocument:
    content: bytes
    media_type: str
    filename: str
