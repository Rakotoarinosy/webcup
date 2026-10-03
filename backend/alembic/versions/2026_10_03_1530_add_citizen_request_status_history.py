"""add status history for citizen requests

Revision ID: d11c0f4e8a21
Revises: 9d05403f852e
Create Date: 2026-10-03 15:30:00.000000

"""

from collections.abc import Sequence
from datetime import datetime
from uuid import uuid4

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "d11c0f4e8a21"
down_revision: str | Sequence[str] | None = "9d05403f852e"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "citizen_request_status_history",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("request_id", sa.String(length=36), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False),
        sa.Column("label", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["request_id"], ["citizen_requests.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_citizen_request_status_history_request_created",
        "citizen_request_status_history",
        ["request_id", "created_at"],
        unique=False,
    )

    connection = op.get_bind()
    requests = connection.execute(
        sa.text("SELECT id, status, created_at, resolved_at FROM citizen_requests")
    ).mappings()
    history_table = sa.table(
        "citizen_request_status_history",
        sa.column("id", sa.String),
        sa.column("request_id", sa.String),
        sa.column("status", sa.String),
        sa.column("label", sa.String),
        sa.column("created_at", sa.DateTime(timezone=True)),
    )
    for request in requests:
        connection.execute(
            history_table.insert().values(
                id=str(uuid4()),
                request_id=request["id"],
                status="Nouveau",
                label="Demande soumise",
                created_at=_as_datetime(request["created_at"]),
            )
        )
        if request["status"] == "Résolu" and request["resolved_at"] is not None:
            connection.execute(
                history_table.insert().values(
                    id=str(uuid4()),
                    request_id=request["id"],
                    status="Résolu",
                    label="Demande résolue",
                    created_at=_as_datetime(request["resolved_at"]),
                )
            )


def _as_datetime(value: datetime | str) -> datetime:
    return datetime.fromisoformat(value) if isinstance(value, str) else value


def downgrade() -> None:
    op.drop_index(
        "ix_citizen_request_status_history_request_created",
        table_name="citizen_request_status_history",
    )
    op.drop_table("citizen_request_status_history")
