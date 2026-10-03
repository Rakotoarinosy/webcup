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

# Positions de démonstration pour les services créés par add_municipal_content, autour de
# l'hôtel de ville d'Antananarivo. À remplacer depuis la page des services (gestionnaire).
DEMO_LOCATIONS = {
    "10000000-0000-0000-0000-000000000001": (
        "Hôtel de ville, avenue de l'Indépendance",
        -18.9097,
        47.5256,
    ),
    "10000000-0000-0000-0000-000000000002": ("Service technique, rue Rainitovo", -18.9120, 47.5290),
    "10000000-0000-0000-0000-000000000003": (
        "Service des eaux, rue Ravoninahitriniarivo",
        -18.9046,
        47.5218,
    ),
    "10000000-0000-0000-0000-000000000004": (
        "Centre de santé municipal, Analakely",
        -18.9075,
        47.5235,
    ),
}


def upgrade() -> None:
    with op.batch_alter_table("municipal_services") as batch:
        batch.add_column(sa.Column("address", sa.String(255), nullable=True))
        batch.add_column(sa.Column("latitude", sa.Float(), nullable=True))
        batch.add_column(sa.Column("longitude", sa.Float(), nullable=True))

    services = sa.table(
        "municipal_services",
        sa.column("id", sa.String),
        sa.column("address", sa.String),
        sa.column("latitude", sa.Float),
        sa.column("longitude", sa.Float),
    )
    for service_id, (address, latitude, longitude) in DEMO_LOCATIONS.items():
        op.execute(
            services.update()
            .where(services.c.id == service_id, services.c.address.is_(None))
            .values(address=address, latitude=latitude, longitude=longitude)
        )


def downgrade() -> None:
    with op.batch_alter_table("municipal_services") as batch:
        batch.drop_column("longitude")
        batch.drop_column("latitude")
        batch.drop_column("address")
