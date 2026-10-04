"""alertes et messages officiels diffusés aux habitants (D18, F29, F31, F73)

Revision ID: a1f3c5e70101
Revises: c4e8b2d71a56
Create Date: 2026-10-04 04:00:00.000000

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "a1f3c5e70101"
down_revision: str | Sequence[str] | None = "c4e8b2d71a56"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "alerts",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("title", sa.String(200), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("instructions", sa.Text(), nullable=False, server_default=""),
        sa.Column("level", sa.String(30), nullable=False),
        sa.Column("audience", sa.String(60), nullable=False),
        sa.Column("zone", sa.String(200), nullable=True),
        sa.Column("issuer", sa.String(200), nullable=False),
        sa.Column("author_id", sa.String(36), nullable=True),
        sa.Column("author_name", sa.String(255), nullable=False),
        sa.Column("starts_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("ends_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("ended_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_alerts_level", "alerts", ["level"])
    op.create_index("ix_alerts_author_id", "alerts", ["author_id"])
    op.create_index("ix_alerts_starts_at", "alerts", ["starts_at"])


def downgrade() -> None:
    op.drop_index("ix_alerts_starts_at", table_name="alerts")
    op.drop_index("ix_alerts_author_id", table_name="alerts")
    op.drop_index("ix_alerts_level", table_name="alerts")
    op.drop_table("alerts")
