from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from src.shared.validation import Email


class MunicipalServiceOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    description: str
    contact_details: str
    opening_hours: str
    icon: str
    display_order: int


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
