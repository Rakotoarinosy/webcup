from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, model_validator

from src.domain.i18n import Language
from src.domain.municipal_content import TranslatableContent
from src.shared.validation import Email


class MunicipalServiceOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

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
    address: str | None
    latitude: float | None
    longitude: float | None
    # F27 : langue des textes renvoyés ; False = pas de traduction, textes en français.
    language: Language
    translation_available: bool


class UpdateMunicipalServiceCatalogIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    is_featured: bool | None = None
    display_order: int | None = Field(default=None, ge=0)

    @model_validator(mode="after")
    def require_catalog_field(self) -> "UpdateMunicipalServiceCatalogIn":
        if not self.model_fields_set:
            raise ValueError("At least one catalog field must be provided")
        return self


class MunicipalPublicationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    summary: str
    content: str
    category: str
    published_at: datetime
    is_published: bool
    image_url: str | None
    view_count: int
    like_count: int
    language: Language
    translation_available: bool


class CreateMunicipalPublicationIn(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    title: str = Field(min_length=3, max_length=255)
    summary: str = Field(min_length=3, max_length=500)
    content: str = Field(min_length=3, max_length=10_000)
    category: str = Field(min_length=2, max_length=80)
    published_at: datetime
    is_published: bool = True
    image_url: str | None = Field(default=None, max_length=2048)


class UpdateMunicipalPublicationIn(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    title: str | None = Field(default=None, min_length=3, max_length=255)
    summary: str | None = Field(default=None, min_length=3, max_length=500)
    content: str | None = Field(default=None, min_length=3, max_length=10_000)
    category: str | None = Field(default=None, min_length=2, max_length=80)
    published_at: datetime | None = None
    is_published: bool | None = None
    image_url: str | None = Field(default=None, max_length=2048)

    @model_validator(mode="after")
    def require_publication_field(self) -> "UpdateMunicipalPublicationIn":
        if not self.model_fields_set:
            raise ValueError("At least one publication field must be provided")
        return self


class CreatePublicationCommentIn(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    content: str = Field(min_length=1, max_length=1000)


class MunicipalPublicationCommentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    publication_id: str
    author_name: str
    content: str
    created_at: datetime


class PublicationLikeOut(BaseModel):
    like_count: int
    liked: bool


class UpdateServiceLocationIn(BaseModel):
    """Accueil physique d'un service. Position et adresse vont ensemble, ou sont toutes retirées."""

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    address: str | None = Field(default=None, min_length=3, max_length=255)
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)

    @model_validator(mode="after")
    def complete_or_empty(self) -> "UpdateServiceLocationIn":
        values = (self.address, self.latitude, self.longitude)
        if any(v is None for v in values) and any(v is not None for v in values):
            raise ValueError("address, latitude and longitude must be given together")
        return self


class CreateContactMessageIn(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    service_id: str | None = None
    sender_name: str = Field(min_length=2, max_length=255)
    sender_email: Email
    subject: str = Field(min_length=3, max_length=255)
    message: str = Field(min_length=10, max_length=5000)


class ContactReceiptOut(BaseModel):
    receipt_number: str
    created_at: datetime
    message: str = "Votre message a bien été envoyé aux services municipaux."


class ServiceTranslationIn(BaseModel):
    """Traduction d'un service : les champs absents ou vides retombent sur le français."""

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    name: str | None = Field(default=None, max_length=255)
    description: str | None = Field(default=None, max_length=5000)
    opening_hours: str | None = Field(default=None, max_length=255)
    contact_details: str | None = Field(default=None, max_length=500)


class PublicationTranslationIn(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    title: str | None = Field(default=None, max_length=255)
    summary: str | None = Field(default=None, max_length=500)
    content: str | None = Field(default=None, max_length=10_000)


class ContentTranslationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    content_type: TranslatableContent
    content_id: str
    language: Language
    fields: dict[str, str]
    updated_at: datetime | None
