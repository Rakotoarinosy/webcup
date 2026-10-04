"""état des services, transports municipaux, santé et urgences (F38, F63, F64, F36, F46)

Revision ID: b2e4d6f80202
Revises: c4e8b2d71a56
Create Date: 2026-10-04 04:00:00.000000

Données de démonstration clairement fictives (noms suffixés « (démo) », numéros fictifs) :
lignes de transport et lieux de santé à remplacer par la mairie.
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "b2e4d6f80202"
down_revision: str | Sequence[str] | None = "c4e8b2d71a56"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

HEALTH_CATEGORY = "Santé et urgences"

DEMO_HEALTH_SERVICES = [
    {
        "id": "10000000-0000-0000-0000-000000000101",
        "name": "Hôpital municipal Terra Nova (démo)",
        "description": "Urgences adultes et enfants, consultations, maternité. Lieu de démonstration.",
        "contact_details": "Standard : 020 00 000 10 (numéro fictif)",
        "opening_hours": "Urgences 24h/24, 7j/7",
        "icon": "pi-heart",
        "address": "Avenue de l'Hôpital (adresse fictive)",
        "latitude": -18.9150,
        "longitude": 47.5310,
        "open_24_7": True,
        "emergency_care": True,
    },
    {
        "id": "10000000-0000-0000-0000-000000000102",
        "name": "Centre d'urgences Nord (démo)",
        "description": "Accueil des urgences sans rendez-vous. Lieu de démonstration.",
        "contact_details": "Accueil : 020 00 000 11 (numéro fictif)",
        "opening_hours": "Urgences 24h/24, 7j/7",
        "icon": "pi-plus-circle",
        "address": "Rue du Nord (adresse fictive)",
        "latitude": -18.8950,
        "longitude": 47.5280,
        "open_24_7": True,
        "emergency_care": True,
    },
    {
        "id": "10000000-0000-0000-0000-000000000103",
        "name": "Pharmacie de garde municipale (démo)",
        "description": "Médicaments et conseils en dehors des heures habituelles. Lieu de démonstration.",
        "contact_details": "020 00 000 12 (numéro fictif)",
        "opening_hours": "Tous les jours, 8h-20h",
        "icon": "pi-shopping-bag",
        "address": "Place du Marché (adresse fictive)",
        "latitude": -18.9080,
        "longitude": 47.5200,
        "open_24_7": False,
        "emergency_care": False,
    },
    {
        "id": "10000000-0000-0000-0000-000000000104",
        "name": "Centre de santé de quartier Est (démo)",
        "description": "Consultations, vaccinations et petits soins. Lieu de démonstration.",
        "contact_details": "020 00 000 13 (numéro fictif)",
        "opening_hours": "Lun-Sam, 7h-17h",
        "icon": "pi-heart",
        "address": "Rue de l'Est (adresse fictive)",
        "latitude": -18.9100,
        "longitude": 47.5400,
        "open_24_7": False,
        "emergency_care": False,
    },
]

DEMO_LINES = [
    {
        "id": "30000000-0000-0000-0000-000000000001",
        "code": "D1",
        "name": "Hôtel de ville ↔ Gare routière (démo)",
        "mode": "bus",
        "first_departure": "05:30",
        "last_departure": "21:00",
        "frequency_minutes": 15,
        "days_label": "Tous les jours",
        "status": "normal",
        "status_message": None,
        "display_order": 1,
        "stops": [
            ("Hôtel de ville", 0, -18.9097, 47.5256),
            ("Analakely", 6, -18.9075, 47.5235),
            ("Marché central", 11, -18.9080, 47.5200),
            ("Gare routière", 20, -18.9180, 47.5150),
        ],
    },
    {
        "id": "30000000-0000-0000-0000-000000000002",
        "code": "D2",
        "name": "Hôpital municipal ↔ Quartier Est (démo)",
        "mode": "minibus",
        "first_departure": "06:00",
        "last_departure": "20:00",
        "frequency_minutes": 20,
        "days_label": "Tous les jours",
        "status": "disrupted",
        "status_message": (
            "Exemple de perturbation (démo) : travaux, l'arrêt « Lycée municipal » n'est pas "
            "desservi. Montez ou descendez à l'arrêt « Centre de santé Est »."
        ),
        "display_order": 2,
        "stops": [
            ("Hôpital municipal", 0, -18.9150, 47.5310),
            ("Centre de santé Est", 8, -18.9100, 47.5400),
            ("Lycée municipal", 15, -18.9060, 47.5450),
            ("Quartier Est", 22, -18.9030, 47.5500),
        ],
    },
    {
        "id": "30000000-0000-0000-0000-000000000003",
        "code": "N3",
        "name": "Navette du marché (démo)",
        "mode": "shuttle",
        "first_departure": "07:00",
        "last_departure": "13:00",
        "frequency_minutes": 30,
        "days_label": "Tous les jours, le matin",
        "status": "normal",
        "status_message": None,
        "display_order": 3,
        "stops": [
            ("Centre d'urgences Nord", 0, -18.8950, 47.5280),
            ("Hôtel de ville", 9, -18.9097, 47.5256),
            ("Marché central", 14, -18.9080, 47.5200),
        ],
    },
]


def upgrade() -> None:
    with op.batch_alter_table("municipal_services") as batch:
        batch.add_column(
            sa.Column("status", sa.String(20), nullable=False, server_default="available")
        )
        batch.add_column(sa.Column("status_message", sa.Text(), nullable=True))
        batch.add_column(
            sa.Column("status_expected_back_at", sa.DateTime(timezone=True), nullable=True)
        )
        batch.add_column(sa.Column("status_alternative", sa.Text(), nullable=True))
        batch.add_column(sa.Column("alternative_service_id", sa.String(36), nullable=True))
        batch.add_column(sa.Column("status_updated_at", sa.DateTime(timezone=True), nullable=True))
        batch.add_column(
            sa.Column("open_24_7", sa.Boolean(), nullable=False, server_default=sa.false())
        )
        batch.add_column(
            sa.Column("emergency_care", sa.Boolean(), nullable=False, server_default=sa.false())
        )
        batch.create_index("ix_municipal_services_status", ["status"], unique=False)

    op.create_table(
        "transport_lines",
        sa.Column("id", sa.String(36), nullable=False),
        sa.Column("code", sa.String(10), nullable=False),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("mode", sa.String(20), nullable=False),
        sa.Column("first_departure", sa.String(5), nullable=False),
        sa.Column("last_departure", sa.String(5), nullable=False),
        sa.Column("frequency_minutes", sa.Integer(), nullable=False),
        sa.Column("days_label", sa.String(120), nullable=False),
        sa.Column("status", sa.String(20), nullable=False, server_default="normal"),
        sa.Column("status_message", sa.Text(), nullable=True),
        sa.Column("status_updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("display_order", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("code"),
    )
    op.create_table(
        "transport_stops",
        sa.Column("id", sa.String(36), nullable=False),
        sa.Column("line_id", sa.String(36), nullable=False),
        sa.Column("position", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("minutes_from_start", sa.Integer(), nullable=False),
        sa.Column("latitude", sa.Float(), nullable=True),
        sa.Column("longitude", sa.Float(), nullable=True),
        sa.ForeignKeyConstraint(["line_id"], ["transport_lines.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_transport_stops_line_id", "transport_stops", ["line_id"], unique=False)

    services = sa.table(
        "municipal_services",
        sa.column("id", sa.String),
        sa.column("name", sa.String),
        sa.column("category", sa.String),
        sa.column("description", sa.Text),
        sa.column("contact_details", sa.String),
        sa.column("opening_hours", sa.String),
        sa.column("icon", sa.String),
        sa.column("display_order", sa.Integer),
        sa.column("is_featured", sa.Boolean),
        sa.column("usage_count", sa.Integer),
        sa.column("is_active", sa.Boolean),
        sa.column("address", sa.String),
        sa.column("latitude", sa.Float),
        sa.column("longitude", sa.Float),
        sa.column("status", sa.String),
        sa.column("open_24_7", sa.Boolean),
        sa.column("emergency_care", sa.Boolean),
    )
    op.bulk_insert(
        services,
        [
            {
                **service,
                "category": HEALTH_CATEGORY,
                "display_order": 50 + index,
                "is_featured": False,
                "usage_count": 0,
                "is_active": True,
                "status": "available",
            }
            for index, service in enumerate(DEMO_HEALTH_SERVICES)
        ],
    )

    lines = sa.table(
        "transport_lines",
        sa.column("id", sa.String),
        sa.column("code", sa.String),
        sa.column("name", sa.String),
        sa.column("mode", sa.String),
        sa.column("first_departure", sa.String),
        sa.column("last_departure", sa.String),
        sa.column("frequency_minutes", sa.Integer),
        sa.column("days_label", sa.String),
        sa.column("status", sa.String),
        sa.column("status_message", sa.Text),
        sa.column("display_order", sa.Integer),
    )
    stops = sa.table(
        "transport_stops",
        sa.column("id", sa.String),
        sa.column("line_id", sa.String),
        sa.column("position", sa.Integer),
        sa.column("name", sa.String),
        sa.column("minutes_from_start", sa.Integer),
        sa.column("latitude", sa.Float),
        sa.column("longitude", sa.Float),
    )
    op.bulk_insert(lines, [{k: v for k, v in line.items() if k != "stops"} for line in DEMO_LINES])
    op.bulk_insert(
        stops,
        [
            {
                "id": f"31000000-0000-0000-{line_index:04d}-{position:012d}",
                "line_id": line["id"],
                "position": position,
                "name": name,
                "minutes_from_start": minutes,
                "latitude": latitude,
                "longitude": longitude,
            }
            for line_index, line in enumerate(DEMO_LINES, start=1)
            for position, (name, minutes, latitude, longitude) in enumerate(line["stops"])
        ],
    )


def downgrade() -> None:
    op.drop_index("ix_transport_stops_line_id", table_name="transport_stops")
    op.drop_table("transport_stops")
    op.drop_table("transport_lines")
    ids = ", ".join(f"'{service['id']}'" for service in DEMO_HEALTH_SERVICES)
    op.execute(f"DELETE FROM municipal_services WHERE id IN ({ids})")  # noqa: S608
    with op.batch_alter_table("municipal_services") as batch:
        batch.drop_index("ix_municipal_services_status")
        batch.drop_column("emergency_care")
        batch.drop_column("open_24_7")
        batch.drop_column("status_updated_at")
        batch.drop_column("alternative_service_id")
        batch.drop_column("status_alternative")
        batch.drop_column("status_expected_back_at")
        batch.drop_column("status_message")
        batch.drop_column("status")
