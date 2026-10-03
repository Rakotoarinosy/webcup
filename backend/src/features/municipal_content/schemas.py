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


class CreateContactMessageIn(BaseModel):
    service_id: str | None = None
    sender_name: str = Field(min_length=2, max_length=255)
    sender_email: Email
    subject: str = Field(min_length=3, max_length=255)
    message: str = Field(min_length=10, max_length=5000)


class ContactReceiptOut(BaseModel):
    receipt_number: str
    created_at: datetime
    message: str = "Votre message a bien été envoyé aux services municipaux."
