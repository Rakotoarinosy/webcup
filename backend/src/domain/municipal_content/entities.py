"""Entités du contenu municipal, indépendantes de HTTP et de la base de données."""

from dataclasses import dataclass, field
from datetime import datetime
from enum import StrEnum

from src.domain.i18n import DEFAULT_LANGUAGE, Language


class TranslatableContent(StrEnum):
    """Contenus municipaux traduisibles (F27)."""

    SERVICE = "service"
    PUBLICATION = "publication"


# Champs traduisibles par type de contenu : le reste (icône, compteurs…) ne dépend pas de la langue.
TRANSLATABLE_FIELDS: dict[TranslatableContent, tuple[str, ...]] = {
    TranslatableContent.SERVICE: ("name", "description", "opening_hours", "contact_details"),
    TranslatableContent.PUBLICATION: ("title", "summary", "content"),
}


@dataclass(frozen=True)
class ContentTranslation:
    content_type: TranslatableContent
    content_id: str
    language: Language
    fields: dict[str, str] = field(default_factory=dict)
    updated_at: datetime | None = None


@dataclass(frozen=True)
class MunicipalService:
    id: str
    name: str
    category: str
    description: str
    contact_details: str
    opening_hours: str
    icon: str
    display_order: int
    is_featured: bool
    usage_count: int
    is_active: bool
    # Accueil physique : None tant que la mairie ne l'a pas renseigné.
    address: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    # Langue du contenu renvoyé, et False quand la langue demandée n'a pas de traduction.
    language: Language = DEFAULT_LANGUAGE
    translation_available: bool = True


@dataclass(frozen=True)
class MunicipalPublication:
    id: str
    title: str
    summary: str
    content: str
    category: str
    published_at: datetime
    is_published: bool
    image_url: str | None = None
    view_count: int = 0
    like_count: int = 0
    language: Language = DEFAULT_LANGUAGE
    translation_available: bool = True


@dataclass(frozen=True)
class MunicipalPublicationComment:
    id: str
    publication_id: str
    user_id: str
    author_name: str
    content: str
    created_at: datetime


@dataclass(frozen=True)
class ContactMessage:
    id: str
    receipt_number: str
    service_id: str | None
    sender_name: str
    sender_email: str
    subject: str
    message: str
    created_at: datetime
