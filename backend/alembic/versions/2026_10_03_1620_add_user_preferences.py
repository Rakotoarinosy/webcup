"""add user preferences

Revision ID: 8b2f0d1e6a4c
Revises: 7f1c6a3e2d9b
"""
from collections.abc import Sequence
import sqlalchemy as sa
from alembic import op

revision: str = "8b2f0d1e6a4c"
down_revision: str | Sequence[str] | None = "7f1c6a3e2d9b"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

def upgrade() -> None:
    op.create_table("user_preferences", sa.Column("user_id", sa.String(36), nullable=False), sa.Column("theme", sa.String(10), server_default="system", nullable=False), sa.Column("font_size", sa.String(10), server_default="medium", nullable=False), sa.Column("font_family", sa.String(10), server_default="system", nullable=False), sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"), sa.PrimaryKeyConstraint("user_id"))

def downgrade() -> None:
    op.drop_table("user_preferences")
