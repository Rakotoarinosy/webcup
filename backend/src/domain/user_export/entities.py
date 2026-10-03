"""Valeurs métier utilisées pour l'export personnel de données."""

from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum


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
    category: str
    status: str
    priority: str
    location: str
    created_at: datetime
    updated_at: datetime


@dataclass(frozen=True, slots=True)
class PersonalData:
    """Données exportables d'un compte, sans secrets d'authentification."""

    name: str
    email: str
    role: str
    created_at: datetime
    theme: str
    font_size: str
    font_family: str
    requests: tuple[ExportedRequest, ...]


@dataclass(frozen=True, slots=True)
class ExportDocument:
    content: bytes
    media_type: str
    filename: str
