"""add municipal content and contact messages

Revision ID: 6f4a2b9d1e70
Revises: 5c1f7e9a2d63
Create Date: 2026-10-03 10:00:00.000000
"""

from collections.abc import Sequence
from datetime import UTC, datetime

import sqlalchemy as sa
from alembic import op

revision: str = "6f4a2b9d1e70"
down_revision: str | Sequence[str] | None = "5c1f7e9a2d63"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "municipal_services",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("contact_details", sa.String(length=500), nullable=False),
        sa.Column("opening_hours", sa.String(length=255), nullable=False),
        sa.Column("icon", sa.String(length=80), nullable=False),
        sa.Column("display_order", sa.Integer(), nullable=False),
        sa.Column("is_active", sa.Boolean(), server_default=sa.true(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "municipal_publications",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("summary", sa.String(length=500), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("category", sa.String(length=80), nullable=False),
        sa.Column("published_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("is_published", sa.Boolean(), server_default=sa.true(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    with op.batch_alter_table("municipal_publications") as batch_op:
        batch_op.create_index(
            batch_op.f("ix_municipal_publications_category"), ["category"], unique=False
        )
        batch_op.create_index(
            batch_op.f("ix_municipal_publications_published_at"), ["published_at"], unique=False
        )
    op.create_table(
        "contact_messages",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("receipt_number", sa.String(length=32), nullable=False),
        sa.Column("service_id", sa.String(length=36), nullable=True),
        sa.Column("sender_name", sa.String(length=255), nullable=False),
        sa.Column("sender_email", sa.String(length=320), nullable=False),
        sa.Column("subject", sa.String(length=255), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["service_id"], ["municipal_services.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("receipt_number"),
    )
    with op.batch_alter_table("contact_messages") as batch_op:
        batch_op.create_index(
            batch_op.f("ix_contact_messages_receipt_number"), ["receipt_number"], unique=True
        )
        batch_op.create_index(
            batch_op.f("ix_contact_messages_service_id"), ["service_id"], unique=False
        )

    services = sa.table(
        "municipal_services",
        sa.column("id", sa.String),
        sa.column("name", sa.String),
        sa.column("description", sa.Text),
        sa.column("contact_details", sa.String),
        sa.column("opening_hours", sa.String),
        sa.column("icon", sa.String),
        sa.column("display_order", sa.Integer),
        sa.column("is_active", sa.Boolean),
    )
    op.bulk_insert(
        services,
        [
            {
                "id": "10000000-0000-0000-0000-000000000001",
                "name": "État civil",
                "description": "Actes, documents administratifs et démarches familiales.",
                "contact_details": "Hôtel de ville — guichet 1",
                "opening_hours": "Lun-Ven, 8h-16h",
                "icon": "pi-id-card",
                "display_order": 1,
                "is_active": True,
            },
            {
                "id": "10000000-0000-0000-0000-000000000002",
                "name": "Voirie et mobilité",
                "description": "Routes, signalisation, déplacements et espaces publics.",
                "contact_details": "Service technique — 034 00 000 02",
                "opening_hours": "Lun-Ven, 8h-16h",
                "icon": "pi-directions",
                "display_order": 2,
                "is_active": True,
            },
            {
                "id": "10000000-0000-0000-0000-000000000003",
                "name": "Eau et assainissement",
                "description": "Accès à l'eau, réseau et signalement des incidents.",
                "contact_details": "Service eau — 034 00 000 03",
                "opening_hours": "Lun-Ven, 8h-16h",
                "icon": "pi-sun",
                "display_order": 3,
                "is_active": True,
            },
        ],
    )
    publications = sa.table(
        "municipal_publications",
        sa.column("id", sa.String),
        sa.column("title", sa.String),
        sa.column("summary", sa.String),
        sa.column("content", sa.Text),
        sa.column("category", sa.String),
        sa.column("published_at", sa.DateTime),
        sa.column("is_published", sa.Boolean),
    )
    op.bulk_insert(
        publications,
        [
            {
                "id": "20000000-0000-0000-0000-000000000001",
                "title": "Bienvenue sur votre espace municipal",
                "summary": "Retrouvez les services, actualités et démarches utiles.",
                "content": "La municipalité vous informe de ses services et de leurs horaires d'accueil.",
                "category": "Information pratique",
                "published_at": datetime(2026, 10, 3, tzinfo=UTC),
                "is_published": True,
            },
            {
                "id": "20000000-0000-0000-0000-000000000002",
                "title": "Information sur les services techniques",
                "summary": "Les équipes interviennent sur les signalements reçus via la plateforme.",
                "content": "Utilisez la rubrique Demandes citoyennes pour signaler un problème localisé.",
                "category": "Services",
                "published_at": datetime(2026, 10, 2, tzinfo=UTC),
                "is_published": True,
            },
        ],
    )


def downgrade() -> None:
    op.drop_table("contact_messages")
    op.drop_table("municipal_publications")
    op.drop_table("municipal_services")
