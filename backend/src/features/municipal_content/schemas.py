from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, model_validator

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
