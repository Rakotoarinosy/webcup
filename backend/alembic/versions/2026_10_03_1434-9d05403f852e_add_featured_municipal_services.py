"""add featured municipal services

Revision ID: 9d05403f852e
Revises: a7d3e91b4c20
Create Date: 2026-10-03 14:34:39.866042

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "9d05403f852e"
down_revision: str | Sequence[str] | None = "a7d3e91b4c20"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    with op.batch_alter_table("municipal_services") as batch_op:
        batch_op.add_column(
            sa.Column("is_featured", sa.Boolean(), server_default=sa.false(), nullable=False)
        )
        batch_op.add_column(
            sa.Column("usage_count", sa.Integer(), server_default="0", nullable=False)
        )
        batch_op.add_column(
            sa.Column("category", sa.String(length=80), server_default="Autres", nullable=False)
        )

    op.execute(sa.text("""
            UPDATE municipal_services
            SET category = CASE
                WHEN lower(name) LIKE '%santé%' THEN 'Santé'
                WHEN lower(name) LIKE '%voirie%' THEN 'Voirie'
                WHEN lower(name) LIKE '%eau%' THEN 'Eau et assainissement'
                WHEN lower(name) LIKE '%civil%' THEN 'Administration'
                ELSE 'Autres'
            END
            """))

    services = sa.table(
        "municipal_services",
        sa.column("id", sa.String(length=36)),
        sa.column("name", sa.String(length=255)),
        sa.column("category", sa.String(length=80)),
        sa.column("description", sa.Text()),
        sa.column("contact_details", sa.String(length=500)),
        sa.column("opening_hours", sa.String(length=255)),
        sa.column("icon", sa.String(length=80)),
        sa.column("display_order", sa.Integer()),
        sa.column("is_featured", sa.Boolean()),
        sa.column("usage_count", sa.Integer()),
        sa.column("is_active", sa.Boolean()),
    )
    op.bulk_insert(
        services,
        [
            {
                "id": "10000000-0000-0000-0000-000000000004",
                "name": "Centre de santé",
                "category": "Santé",
                "description": "Informations et orientation vers les services de santé municipaux.",
                "contact_details": "Centre de santé municipal",
                "opening_hours": "Lun-Ven, 8h-16h",
                "icon": "pi-heart",
                "display_order": 0,
                "is_featured": True,
                "usage_count": 0,
                "is_active": True,
            }
        ],
    )


def downgrade() -> None:
    op.execute(
        sa.text(
            "DELETE FROM municipal_services " "WHERE id = '10000000-0000-0000-0000-000000000004'"
        )
    )
    with op.batch_alter_table("municipal_services") as batch_op:
        batch_op.drop_column("category")
        batch_op.drop_column("usage_count")
        batch_op.drop_column("is_featured")
