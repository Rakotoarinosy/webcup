"""accueil physique des services municipaux : adresse et position (F45)

Revision ID: f2c8a5e1d4b6
Revises: e7b2c4d9f031
Create Date: 2026-10-03 21:00:00.000000

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "f2c8a5e1d4b6"
down_revision: str | Sequence[str] | None = "e7b2c4d9f031"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

def upgrade() -> None:
    with op.batch_alter_table("municipal_services") as batch:
        batch.add_column(sa.Column("address", sa.String(255), nullable=True))
        batch.add_column(sa.Column("latitude", sa.Float(), nullable=True))
        batch.add_column(sa.Column("longitude", sa.Float(), nullable=True))

def downgrade() -> None:
    with op.batch_alter_table("municipal_services") as batch:
        batch.drop_column("longitude")
        batch.drop_column("latitude")
        batch.drop_column("address")
