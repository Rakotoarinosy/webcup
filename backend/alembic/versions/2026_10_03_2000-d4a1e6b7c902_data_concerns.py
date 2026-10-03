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


def downgrade() -> None:
    op.drop_table("data_concerns")
