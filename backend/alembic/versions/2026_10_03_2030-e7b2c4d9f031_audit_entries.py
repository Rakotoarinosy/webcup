"""journal d'audit des opérations d'administration (F47)

Revision ID: e7b2c4d9f031
Revises: d4a1e6b7c902
Create Date: 2026-10-03 20:30:00.000000

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "e7b2c4d9f031"
down_revision: str | Sequence[str] | None = "d4a1e6b7c902"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "audit_entries",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("action", sa.String(40), nullable=False),
        sa.Column("occurred_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("target_type", sa.String(30), nullable=False),
        sa.Column("target_id", sa.String(36), nullable=False),
        sa.Column("target_label", sa.String(255), nullable=False),
        sa.Column("actor_id", sa.String(36), nullable=True),
        sa.Column("actor_name", sa.String(255), nullable=False),
        sa.Column("actor_role", sa.String(20), nullable=False),
        sa.Column("institut_id", sa.String(36), nullable=True),
        sa.Column("details", sa.JSON(), nullable=False),
    )
    for column in ("action", "target_type", "target_id", "actor_id", "institut_id"):
        op.create_index(f"ix_audit_entries_{column}", "audit_entries", [column])
    op.create_index("ix_audit_entries_occurred_at", "audit_entries", ["occurred_at"])


def downgrade() -> None:
    op.drop_table("audit_entries")
