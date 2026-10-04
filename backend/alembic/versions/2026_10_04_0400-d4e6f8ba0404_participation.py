"""participation des habitants : projets, consultations, idées, avis sur les services

F65, F66 (consultations et avis libres), F67 (projets de la ville),
F68 (boîte à idées), F76 (avis sur un service municipal).

Revision ID: d4e6f8ba0404
Revises: c4e8b2d71a56
Create Date: 2026-10-04 04:00:00.000000

"""

from collections.abc import Sequence
from datetime import UTC, date, datetime

import sqlalchemy as sa
from alembic import op

revision: str = "d4e6f8ba0404"
down_revision: str | Sequence[str] | None = "c4e8b2d71a56"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

DEFAULT_RULES = (
    "Une seule réponse par habitant connecté, modifiable jusqu'à la clôture. "
    "Les résultats sont publiés après la clôture, de façon anonyme et globale, "
    "avec la suite que la mairie leur donne."
)


# Types explicites des colonnes insérées : conversion correcte des dates et du JSON.
_TYPES: dict[str, sa.types.TypeEngine] = {
    "options": sa.JSON(),
    "planned_start": sa.Date(),
    "planned_end": sa.Date(),
    "progress": sa.Integer(),
    "is_published": sa.Boolean(),
    **{
        name: sa.DateTime(timezone=True)
        for name in ("opens_at", "closes_at", "created_at", "updated_at", "published_at")
    },
}


def _timestamps() -> list[sa.Column]:
    return [
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
    ]


def upgrade() -> None:
    op.create_table(
        "city_projects",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("title", sa.String(200), nullable=False),
        sa.Column("summary", sa.String(500), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("district", sa.String(120), nullable=False),
        sa.Column("location", sa.String(255), nullable=True),
        sa.Column("budget", sa.String(120), nullable=True),
        sa.Column("status", sa.String(30), nullable=False),
        sa.Column("progress", sa.Integer(), nullable=False),
        sa.Column("planned_start", sa.Date(), nullable=True),
        sa.Column("planned_end", sa.Date(), nullable=True),
        sa.Column("is_published", sa.Boolean(), nullable=False, server_default=sa.true()),
        *_timestamps(),
    )
    op.create_index("ix_city_projects_district", "city_projects", ["district"])
    op.create_index("ix_city_projects_status", "city_projects", ["status"])

    op.create_table(
        "city_project_updates",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column(
            "project_id",
            sa.String(36),
            sa.ForeignKey("city_projects.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("title", sa.String(200), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("author_name", sa.String(255), nullable=False),
        sa.Column("published_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_city_project_updates_project_id", "city_project_updates", ["project_id"])

    op.create_table(
        "consultations",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column(
            "project_id",
            sa.String(36),
            sa.ForeignKey("city_projects.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column("title", sa.String(200), nullable=False),
        sa.Column("question", sa.String(500), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("kind", sa.String(30), nullable=False),
        sa.Column("options", sa.JSON(), nullable=False),
        sa.Column("rules", sa.Text(), nullable=False),
        sa.Column("opens_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("closes_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("is_published", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("decision", sa.Text(), nullable=True),
        sa.Column("decided_by", sa.String(255), nullable=True),
        sa.Column("decided_at", sa.DateTime(timezone=True), nullable=True),
        *_timestamps(),
    )
    op.create_index("ix_consultations_project_id", "consultations", ["project_id"])
    op.create_index("ix_consultations_closes_at", "consultations", ["closes_at"])

    op.create_table(
        "consultation_responses",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("reference", sa.String(32), nullable=False),
        sa.Column(
            "consultation_id",
            sa.String(36),
            sa.ForeignKey("consultations.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("choice", sa.String(120), nullable=True),
        sa.Column("comment", sa.Text(), nullable=True),
        *_timestamps(),
        sa.UniqueConstraint("consultation_id", "user_id", name="uq_consultation_responses_user"),
    )
    op.create_index(
        "ix_consultation_responses_reference", "consultation_responses", ["reference"], unique=True
    )
    op.create_index(
        "ix_consultation_responses_consultation_id", "consultation_responses", ["consultation_id"]
    )
    op.create_index("ix_consultation_responses_user_id", "consultation_responses", ["user_id"])

    op.create_table(
        "ideas",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("reference", sa.String(32), nullable=False),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("title", sa.String(150), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("theme", sa.String(60), nullable=False),
        sa.Column("district", sa.String(120), nullable=True),
        sa.Column("status", sa.String(30), nullable=False),
        sa.Column("visibility", sa.String(40), nullable=False),
        sa.Column("moderation_note", sa.String(500), nullable=True),
        sa.Column("support_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("response", sa.Text(), nullable=True),
        sa.Column("answered_by", sa.String(255), nullable=True),
        sa.Column("answered_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("history", sa.JSON(), nullable=False),
        *_timestamps(),
    )
    op.create_index("ix_ideas_reference", "ideas", ["reference"], unique=True)
    op.create_index("ix_ideas_user_id", "ideas", ["user_id"])
    op.create_index("ix_ideas_status", "ideas", ["status"])
    op.create_index("ix_ideas_visibility", "ideas", ["visibility"])

    op.create_table(
        "idea_supports",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column(
            "idea_id", sa.String(36), sa.ForeignKey("ideas.id", ondelete="CASCADE"), nullable=False
        ),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint("idea_id", "user_id", name="uq_idea_supports_user"),
    )
    op.create_index("ix_idea_supports_idea_id", "idea_supports", ["idea_id"])
    op.create_index("ix_idea_supports_user_id", "idea_supports", ["user_id"])

    op.create_table(
        "service_reviews",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("reference", sa.String(32), nullable=False),
        sa.Column(
            "service_id",
            sa.String(36),
            sa.ForeignKey("municipal_services.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("rating", sa.Integer(), nullable=False),
        sa.Column("comment", sa.Text(), nullable=False),
        sa.Column("response", sa.Text(), nullable=True),
        sa.Column("answered_by", sa.String(255), nullable=True),
        sa.Column("answered_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("is_hidden", sa.Boolean(), nullable=False, server_default=sa.false()),
        *_timestamps(),
        sa.UniqueConstraint("service_id", "user_id", name="uq_service_reviews_user"),
        sa.CheckConstraint("rating BETWEEN 1 AND 5", name="ck_service_reviews_rating"),
    )
    op.create_index("ix_service_reviews_reference", "service_reviews", ["reference"], unique=True)
    op.create_index("ix_service_reviews_service_id", "service_reviews", ["service_id"])
    op.create_index("ix_service_reviews_user_id", "service_reviews", ["user_id"])

    _seed_examples()


def _seed_examples() -> None:
    """Deux projets et une consultation d'exemple, modifiables ensuite depuis l'administration."""
    now = datetime(2026, 10, 4, 4, 0, tzinfo=UTC)
    projects = sa.table(
        "city_projects",
        *(
            sa.column(name, _TYPES.get(name))
            for name in [
                "id",
                "title",
                "summary",
                "description",
                "district",
                "location",
                "budget",
                "status",
                "progress",
                "planned_start",
                "planned_end",
                "is_published",
                "created_at",
                "updated_at",
            ]
        ),
    )
    park = "30000000-0000-0000-0000-000000000001"
    lighting = "30000000-0000-0000-0000-000000000002"
    op.bulk_insert(
        projects,
        [
            {
                "id": park,
                "title": "Jardin partagé du quartier Nord",
                "summary": "Transformer la friche de la rue des Serres en jardin cultivé par les habitants.",
                "description": (
                    "La friche de la rue des Serres devient un jardin partagé : parcelles "
                    "individuelles, compost collectif, point d'eau et bancs. Les parcelles "
                    "seront attribuées aux habitants du quartier qui en font la demande."
                ),
                "district": "Quartier Nord",
                "location": "Rue des Serres",
                "budget": "120 000 crédits",
                "status": "À l'étude",
                "progress": 10,
                "planned_start": date(2027, 1, 15),
                "planned_end": date(2027, 6, 30),
                "is_published": True,
                "created_at": now,
                "updated_at": now,
            },
            {
                "id": lighting,
                "title": "Éclairage solaire de l'avenue Centrale",
                "summary": "Remplacer les lampadaires de l'avenue Centrale par un éclairage solaire.",
                "description": (
                    "Les 48 lampadaires de l'avenue Centrale sont remplacés par des modèles "
                    "solaires à détection de présence, pour mieux éclairer les trottoirs et "
                    "consommer moins d'énergie."
                ),
                "district": "Centre-ville",
                "location": "Avenue Centrale",
                "budget": "300 000 crédits",
                "status": "En cours",
                "progress": 45,
                "planned_start": date(2026, 9, 1),
                "planned_end": date(2026, 12, 15),
                "is_published": True,
                "created_at": now,
                "updated_at": now,
            },
        ],
    )
    updates = sa.table(
        "city_project_updates",
        *(
            sa.column(name, _TYPES.get(name))
            for name in ["id", "project_id", "title", "content", "author_name", "published_at"]
        ),
    )
    op.bulk_insert(
        updates,
        [
            {
                "id": "31000000-0000-0000-0000-000000000001",
                "project_id": lighting,
                "title": "Début des travaux",
                "content": "Les premiers lampadaires ont été remplacés entre la place du Marché et l'école.",
                "author_name": "Mairie de Terra Nova",
                "published_at": now,
            }
        ],
    )
    consultations = sa.table(
        "consultations",
        *(
            sa.column(name, _TYPES.get(name))
            for name in [
                "id",
                "project_id",
                "title",
                "question",
                "description",
                "kind",
                "options",
                "rules",
                "opens_at",
                "closes_at",
                "is_published",
                "created_at",
                "updated_at",
            ]
        ),
    )
    op.bulk_insert(
        consultations,
        [
            {
                "id": "32000000-0000-0000-0000-000000000001",
                "project_id": park,
                "title": "Que voulez-vous en priorité dans le jardin partagé ?",
                "question": "Quel aménagement faut-il réaliser en premier ?",
                "description": "Le budget permet de commencer par un seul aménagement en 2027.",
                "kind": "Vote à choix",
                "options": ["Parcelles à cultiver", "Aire de jeux", "Verger collectif"],
                "rules": DEFAULT_RULES,
                "opens_at": now,
                "closes_at": datetime(2026, 12, 31, 23, 0, tzinfo=UTC),
                "is_published": True,
                "created_at": now,
                "updated_at": now,
            }
        ],
    )


def downgrade() -> None:
    for table in (
        "service_reviews",
        "idea_supports",
        "ideas",
        "consultation_responses",
        "consultations",
        "city_project_updates",
        "city_projects",
    ):
        op.drop_table(table)
