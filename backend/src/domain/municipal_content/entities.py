"""Entités du contenu municipal, indépendantes de HTTP et de la base de données."""

from dataclasses import dataclass
from datetime import datetime


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
