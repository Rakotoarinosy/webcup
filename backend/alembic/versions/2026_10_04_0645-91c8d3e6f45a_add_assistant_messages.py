"""add assistant messages

Revision ID: 91c8d3e6f45a
Revises: d0e5ba014034
"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "91c8d3e6f45a"
down_revision: Union[str, Sequence[str], None] = "d0e5ba014034"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "assistant_messages",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("role", sa.String(12), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("reply", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_assistant_messages_user_created", "assistant_messages", ["user_id", "created_at"])


def downgrade() -> None:
    op.drop_index("ix_assistant_messages_user_created", table_name="assistant_messages")
    op.drop_table("assistant_messages")
