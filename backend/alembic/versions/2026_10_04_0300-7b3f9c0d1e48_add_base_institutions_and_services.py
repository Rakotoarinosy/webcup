"""add base institutions and foundational municipal services

Revision ID: 7b3f9c0d1e48
Revises: 4d66dc8c800b
Create Date: 2026-10-04 03:00:00.000000

Ajoute les institutions de base de la plateforme et complète le catalogue public
avec les services de référence de la mairie, sans dupliquer le domaine existant.
"""

from collections.abc import Sequence
from datetime import UTC, datetime
from typing import Union

import sqlalchemy as sa
from alembic import op

revision: str = "7b3f9c0d1e48"
down_revision: Union[str, Sequence[str], None] = "4d66dc8c800b"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

NOW = datetime(2026, 10, 4, 3, 0, tzinfo=UTC)


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
    institutions = sa.table(
        "instituts",
        sa.column("id", sa.String(length=36)),
        sa.column("name", sa.String(length=255)),
        sa.column("description", sa.Text()),
        sa.column("categories", sa.JSON()),
        sa.column("manager_id", sa.String(length=36)),
        sa.column("is_active", sa.Boolean()),
        sa.column("created_at", sa.DateTime(timezone=True)),
    )
    _insert_missing(
        institutions,
        [
            {
                "id": "10000000-0000-0000-0000-000000000011",
                "name": "Accueil et démarches administratives",
                "description": "Orientation générale, informations pratiques et accompagnement des citoyens dans leurs démarches.",
                "categories": ["Autre"],
                "manager_id": None,
                "is_active": True,
                "created_at": NOW,
            },
            {
                "id": "10000000-0000-0000-0000-000000000012",
                "name": "Service de la voirie",
                "description": "Gestion de la voirie, des routes, de la signalétique et des travaux publics.",
                "categories": ["Voirie"],
                "manager_id": None,
                "is_active": True,
                "created_at": NOW,
            },
            {
                "id": "10000000-0000-0000-0000-000000000013",
                "name": "Service de l'eau et assainissement",
                "description": "Distribution d'eau, réseaux, assainissement et interventions sur les infrastructures.",
                "categories": ["Eau"],
                "manager_id": None,
                "is_active": True,
                "created_at": NOW,
            },
            {
                "id": "10000000-0000-0000-0000-000000000014",
                "name": "Propreté urbaine et déchets",
                "description": "Collecte, tri, propreté des espaces publics et gestion des déchets ménagers.",
                "categories": ["Déchets"],
                "manager_id": None,
                "is_active": True,
                "created_at": NOW,
            },
            {
                "id": "10000000-0000-0000-0000-000000000015",
                "name": "Éclairage public",
                "description": "Maintenance, réparation et gestion de l'éclairage public ainsi que des équipements lumineux.",
                "categories": ["Éclairage public"],
                "manager_id": None,
                "is_active": True,
                "created_at": NOW,
            },
            {
                "id": "10000000-0000-0000-0000-000000000016",
                "name": "Espaces verts et environnement",
                "description": "Entretien des espaces publics, arbres, parcs et gestion des problématiques environnementales.",
                "categories": ["Espaces verts"],
                "manager_id": None,
                "is_active": True,
                "created_at": NOW,
            },
            {
                "id": "10000000-0000-0000-0000-000000000017",
                "name": "Sécurité civile et tranquillité publique",
                "description": "Prévention, sécurité des biens et de la population, et signalements sur la tranquillité publique.",
                "categories": ["Sécurité"],
                "manager_id": None,
                "is_active": True,
                "created_at": NOW,
            },
        ],
    )

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
        sa.column("address", sa.String(length=255)),
        sa.column("latitude", sa.Float()),
        sa.column("longitude", sa.Float()),
    )
    _insert_missing(
        services,
        [
            {
                "id": "10000000-0000-0000-0000-000000000020",
                "name": "État civil et documents administratifs",
                "category": "État civil",
                "description": "Naissances, mariages, décès, cartes d'identité et autres démarches administratives.",
                "contact_details": "Guichet de l'état civil — mairie centrale",
                "opening_hours": "Lun-Ven, 8h-15h30",
                "icon": "pi-id-card",
                "display_order": 7,
                "is_featured": True,
                "usage_count": 0,
                "is_active": True,
                "address": "Hôtel de ville — guichet central",
                "latitude": None,
                "longitude": None,
            },
            {
                "id": "10000000-0000-0000-0000-000000000021",
                "name": "Aide sociale et famille",
                "category": "Social",
                "description": "Aides aux familles, soutien social, accompagnement des personnes en difficulté et orientation vers les dispositifs adaptés.",
                "contact_details": "Centre communal d'action sociale",
                "opening_hours": "Lun-Ven, 8h-16h",
                "icon": "pi-heart",
                "display_order": 8,
                "is_featured": True,
                "usage_count": 0,
                "is_active": True,
                "address": "Centre social municipal",
                "latitude": None,
                "longitude": None,
            },
            {
                "id": "10000000-0000-0000-0000-000000000022",
                "name": "Santé et prévention",
                "category": "Santé",
                "description": "Informations sanitaires, prévention, orientations vers les structures de santé et programmes municipaux.",
                "contact_details": "Service santé publique et prévention",
                "opening_hours": "Lun-Ven, 8h-16h",
                "icon": "pi-heart-fill",
                "display_order": 9,
                "is_featured": True,
                "usage_count": 0,
                "is_active": True,
                "address": "Maison de santé municipale",
                "latitude": None,
                "longitude": None,
            },
            {
                "id": "10000000-0000-0000-0000-000000000023",
                "name": "Mobilité, stationnement et transports",
                "category": "Mobilité",
                "description": "Stationnement, mobilité douce, transports publics et informations sur les aménagements de circulation.",
                "contact_details": "Service mobilité — bureau de circulation",
                "opening_hours": "Lun-Ven, 8h-16h",
                "icon": "pi-car",
                "display_order": 10,
                "is_featured": True,
                "usage_count": 0,
                "is_active": True,
                "address": "Service mobilité municipal",
                "latitude": None,
                "longitude": None,
            },
            {
                "id": "10000000-0000-0000-0000-000000000024",
                "name": "Jeunesse, culture et loisirs",
                "category": "Culture",
                "description": "Activités culturelles, sportives, associations, encadrement de la jeunesse et événements municipaux.",
                "contact_details": "Service culture et jeunesse",
                "opening_hours": "Lun-Ven, 8h-17h",
                "icon": "pi-users",
                "display_order": 11,
                "is_featured": True,
                "usage_count": 0,
                "is_active": True,
                "address": "Centre culturel municipal",
                "latitude": None,
                "longitude": None,
            },
        ],
    )


def downgrade() -> None:
    op.execute(
        sa.text(
            "DELETE FROM municipal_services WHERE id IN ("
            "'10000000-0000-0000-0000-000000000020', "
            "'10000000-0000-0000-0000-000000000021', "
            "'10000000-0000-0000-0000-000000000022', "
            "'10000000-0000-0000-0000-000000000023', "
            "'10000000-0000-0000-0000-000000000024')"
        )
    )
    op.execute(
        sa.text(
            "DELETE FROM instituts WHERE id IN ("
            "'10000000-0000-0000-0000-000000000011', "
            "'10000000-0000-0000-0000-000000000012', "
            "'10000000-0000-0000-0000-000000000013', "
            "'10000000-0000-0000-0000-000000000014', "
            "'10000000-0000-0000-0000-000000000015', "
            "'10000000-0000-0000-0000-000000000016', "
            "'10000000-0000-0000-0000-000000000017')"
        )
    )
