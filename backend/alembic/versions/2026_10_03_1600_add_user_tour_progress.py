"""add user tour progress

Revision ID: 5c7e2b91f0ad
Revises: 9d05403f852e
Create Date: 2026-10-03 16:00:00.000000
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "5c7e2b91f0ad"
down_revision: str | Sequence[str] | None = "9d05403f852e"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "user_tour_progress",
        sa.Column("user_id", sa.String(length=36), nullable=False),
        sa.Column("page_key", sa.String(length=80), nullable=False),
        sa.Column("status", sa.String(length=12), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("user_id", "page_key"),
    )
    op.create_index("ix_user_tour_progress_updated_at", "user_tour_progress", ["updated_at"])


def downgrade() -> None:
    op.drop_index("ix_user_tour_progress_updated_at", table_name="user_tour_progress")
    op.drop_table("user_tour_progress")
