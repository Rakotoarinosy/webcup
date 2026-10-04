"""demandes citoyennes : soutiens (F52), doublons (F75), fil de messages (F84)

Revision ID: e5f7a9cb0505
Revises: c4e8b2d71a56
Create Date: 2026-10-04 05:05:00.000000

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "e5f7a9cb0505"
down_revision: str | Sequence[str] | None = "c4e8b2d71a56"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    with op.batch_alter_table("citizen_requests") as batch:
        batch.add_column(
            sa.Column("support_count", sa.Integer(), nullable=False, server_default="0")
        )
        batch.add_column(sa.Column("duplicate_of_id", sa.String(36), nullable=True))
        batch.add_column(
            sa.Column(
                "conversation_state", sa.String(20), nullable=False, server_default="none"
            )
        )
        batch.add_column(sa.Column("last_message_at", sa.DateTime(timezone=True), nullable=True))
        batch.create_foreign_key(
            "fk_citizen_requests_duplicate_of",
            "citizen_requests",
            ["duplicate_of_id"],
            ["id"],
            ondelete="SET NULL",
        )
        batch.create_index("ix_citizen_requests_duplicate_of_id", ["duplicate_of_id"])
        batch.create_index("ix_citizen_requests_conversation_state", ["conversation_state"])

    op.create_table(
        "citizen_request_supports",
        sa.Column(
            "request_id",
            sa.String(36),
            sa.ForeignKey("citizen_requests.id", ondelete="CASCADE"),
            primary_key=True,
        ),
        sa.Column(
            "citizen_id",
            sa.String(36),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            primary_key=True,
        ),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index(
        "ix_citizen_request_supports_citizen_id", "citizen_request_supports", ["citizen_id"]
    )

    op.create_table(
        "citizen_request_messages",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column(
            "request_id",
            sa.String(36),
            sa.ForeignKey("citizen_requests.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "author_id",
            sa.String(36),
            sa.ForeignKey("users.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column("author_name", sa.String(255), nullable=False),
        sa.Column("author_role", sa.String(20), nullable=False),
        sa.Column("visibility", sa.String(20), nullable=False),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index(
        "ix_citizen_request_messages_request_created",
        "citizen_request_messages",
        ["request_id", "created_at"],
    )


def downgrade() -> None:
    op.drop_table("citizen_request_messages")
    op.drop_table("citizen_request_supports")
    with op.batch_alter_table("citizen_requests") as batch:
        batch.drop_index("ix_citizen_requests_conversation_state")
        batch.drop_index("ix_citizen_requests_duplicate_of_id")
        batch.drop_constraint("fk_citizen_requests_duplicate_of", type_="foreignkey")
        batch.drop_column("last_message_at")
        batch.drop_column("conversation_state")
        batch.drop_column("duplicate_of_id")
        batch.drop_column("support_count")
