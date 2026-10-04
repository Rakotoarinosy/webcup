"""add essential municipal services

Revision ID: 4d66dc8c800b
Revises: a0e37029c543
Create Date: 2026-10-04 02:29:44.641929

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4d66dc8c800b'
down_revision: Union[str, Sequence[str], None] = 'a0e37029c543'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def _insert_missing(table: sa.TableClause, rows: list[dict]) -> None:
    """Insère seulement les lignes absentes (même id ou même nom) : la base peut déjà les contenir via le seed."""
    bind = op.get_bind()
    existing = bind.execute(sa.select(table.c.id, table.c.name)).all()
    ids = {row.id for row in existing}
    names = {row.name for row in existing}
    missing = [row for row in rows if row["id"] not in ids and row["name"] not in names]
    if missing:
        op.bulk_insert(table, missing)


def upgrade() -> None:
    """Ajoute les pôles municipaux visibles dès la première visite."""
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
    _insert_missing(
        services,
        [
            {
                "id": "10000000-0000-0000-0000-000000000005",
                "name": "Accueil de la mairie",
                "category": "Administration",
                "description": "Orientation générale, informations pratiques et accompagnement dans vos démarches.",
                "contact_details": "Hôtel de ville — accueil principal",
                "opening_hours": "Lun-Ven, 8h-16h",
                "icon": "pi-building",
                "display_order": 1,
                "is_featured": True,
                "usage_count": 0,
                "is_active": True,
            },
            {
                "id": "10000000-0000-0000-0000-000000000006",
                "name": "Urbanisme et habitat",
                "category": "Urbanisme",
                "description": "Permis, constructions, occupation du sol et informations sur l'habitat.",
                "contact_details": "Service urbanisme — guichet 2",
                "opening_hours": "Lun-Ven, 8h-16h",
                "icon": "pi-home",
                "display_order": 2,
                "is_featured": True,
                "usage_count": 0,
                "is_active": True,
            },
            {
                "id": "10000000-0000-0000-0000-000000000007",
                "name": "Action sociale et solidarité",
                "category": "Solidarité",
                "description": "Aides sociales, accompagnement des familles et orientation vers les dispositifs utiles.",
                "contact_details": "Centre communal d'action sociale",
                "opening_hours": "Lun-Ven, 8h-16h",
                "icon": "pi-heart",
                "display_order": 3,
                "is_featured": True,
                "usage_count": 0,
                "is_active": True,
            },
            {
                "id": "10000000-0000-0000-0000-000000000008",
                "name": "Éducation, enfance et jeunesse",
                "category": "Éducation",
                "description": "Écoles, activités périscolaires, accompagnement de la jeunesse et vie familiale.",
                "contact_details": "Service éducation et jeunesse",
                "opening_hours": "Lun-Ven, 8h-16h",
                "icon": "pi-book",
                "display_order": 4,
                "is_featured": True,
                "usage_count": 0,
                "is_active": True,
            },
            {
                "id": "10000000-0000-0000-0000-000000000009",
                "name": "Culture, sport et vie associative",
                "category": "Vie locale",
                "description": "Équipements, événements, associations, culture et activités sportives municipales.",
                "contact_details": "Service culture et vie associative",
                "opening_hours": "Lun-Ven, 8h-16h",
                "icon": "pi-users",
                "display_order": 5,
                "is_featured": True,
                "usage_count": 0,
                "is_active": True,
            },
            {
                "id": "10000000-0000-0000-0000-000000000010",
                "name": "Sécurité et tranquillité publique",
                "category": "Sécurité",
                "description": "Prévention, signalements liés à la tranquillité et informations de sécurité locale.",
                "contact_details": "Police municipale — accueil",
                "opening_hours": "Lun-Ven, 8h-16h",
                "icon": "pi-shield",
                "display_order": 6,
                "is_featured": True,
                "usage_count": 0,
                "is_active": True,
            },
        ],
    )


def downgrade() -> None:
    op.execute(
        sa.text(
            "DELETE FROM municipal_services WHERE id IN "
            "('10000000-0000-0000-0000-000000000005', "
            "'10000000-0000-0000-0000-000000000006', "
            "'10000000-0000-0000-0000-000000000007', "
            "'10000000-0000-0000-0000-000000000008', "
            "'10000000-0000-0000-0000-000000000009', "
            "'10000000-0000-0000-0000-000000000010')"
        )
    )
