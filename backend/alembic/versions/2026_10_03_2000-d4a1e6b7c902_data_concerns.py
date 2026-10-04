"""signalements des habitants sur l'usage de leurs données (F51)

Revision ID: d4a1e6b7c902
Revises: c3f9a7d2e815
Create Date: 2026-10-03 20:00:00.000000

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "d4a1e6b7c902"
down_revision: str | Sequence[str] | None = "c3f9a7d2e815"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "data_concerns",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("reference", sa.String(32), nullable=False),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("topic", sa.String(60), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("status", sa.String(30), nullable=False),
        sa.Column("response", sa.Text(), nullable=True),
        sa.Column("answered_by", sa.String(255), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("reviewed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("answered_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index("ix_data_concerns_reference", "data_concerns", ["reference"], unique=True)
    op.create_index("ix_data_concerns_user_id", "data_concerns", ["user_id"])
    op.create_index("ix_data_concerns_status", "data_concerns", ["status"])

    op.create_table(
        "services_essentiels",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("nom", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text, nullable=True),
        sa.Column("categorie", sa.String(length=100), nullable=False),
        sa.Column("date_creation", sa.DateTime, server_default=sa.func.now()),
    )
    op.bulk_insert(
        "services_essentiels",
        [
            {"nom": "État Civil", "description": "Services liés à l’état civil", "categorie": "État Civil"},
            {"nom": "Urbanisme", "description": "Services d’urbanisme", "categorie": "Urbanisme"},
            {"nom": "Santé/Social", "description": "Services de santé et sociaux", "categorie": "Santé/Social"},
            {"nom": "Éducation", "description": "Services éducatifs", "categorie": "Éducation"},
            {"nom": "Mobilité", "description": "Services de mobilité", "categorie": "Mobilité"},
            {"nom": "Sécurité", "description": "Services de sécurité", "categorie": "Sécurité"},
        ],
    )


def downgrade() -> None:
    op.drop_table("data_concerns")
    op.drop_table("services_essentiels")
