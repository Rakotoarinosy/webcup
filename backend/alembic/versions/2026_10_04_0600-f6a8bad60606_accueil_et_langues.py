"""accueil et langues : langue préférée, premiers pas, traductions des contenus

D14 : user_preferences.language (NULL = jamais choisie, interface en français).
D12/F35 : onboarding_progress (checklist « Premiers pas », bulles d'aide vues).
F27 : municipal_content_translations (une ligne par contenu et par langue, champs en JSON),
      avec les traductions anglaises et malgaches des services et publications de démonstration.

Revision ID: f6a8bad60606
Revises: c4e8b2d71a56
Create Date: 2026-10-04 06:00:00.000000

"""

import uuid
from collections.abc import Sequence
from datetime import UTC, datetime

import sqlalchemy as sa
from alembic import op

revision: str = "f6a8bad60606"
down_revision: str | Sequence[str] | None = "c4e8b2d71a56"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

HOURS = {"en": "Mon–Fri, 8 am–4 pm", "mg": "Alatsinainy–Zoma, 8 ora maraina–4 ora hariva"}

DEMO_SERVICES: dict[str, dict[str, dict[str, str]]] = {
    "10000000-0000-0000-0000-000000000001": {
        "en": {
            "name": "Civil registry",
            "description": "Certificates, official documents and family procedures.",
            "contact_details": "Town hall — desk 1",
        },
        "mg": {
            "name": "Sora-piankohonana",
            "description": "Kopia, taratasy ofisialy ary fikarakarana raharaha ara-pianakaviana.",
            "contact_details": "Lapan'ny tanàna — varavarankely 1",
        },
    },
    "10000000-0000-0000-0000-000000000002": {
        "en": {
            "name": "Roads and mobility",
            "description": "Roads, signage, getting around and public spaces.",
            "contact_details": "Technical department — 034 00 000 02",
        },
        "mg": {
            "name": "Lalana sy fifamoivoizana",
            "description": "Lalana, famantarana, fivezivezena ary toerana ho an'ny daholobe.",
            "contact_details": "Sampan-draharaha teknika — 034 00 000 02",
        },
    },
    "10000000-0000-0000-0000-000000000003": {
        "en": {
            "name": "Water and sanitation",
            "description": "Access to water, the network and reporting incidents.",
            "contact_details": "Water department — 034 00 000 03",
        },
        "mg": {
            "name": "Rano sy fahadiovana",
            "description": "Fahazoana rano, ny tambajotra ary fanairana raha misy olana.",
            "contact_details": "Sampan-draharahan'ny rano — 034 00 000 03",
        },
    },
    "10000000-0000-0000-0000-000000000004": {
        "en": {
            "name": "Health centre",
            "description": "Information and guidance towards municipal health services.",
            "contact_details": "Municipal health centre",
        },
        "mg": {
            "name": "Toeram-pahasalamana",
            "description": (
                "Fampahalalana sy fitarihana mankany amin'ireo tolotra ara-pahasalamana "
                "an'ny kaominina."
            ),
            "contact_details": "Toeram-pahasalamana an'ny kaominina",
        },
    },
}

DEMO_PUBLICATIONS: dict[str, dict[str, dict[str, str]]] = {
    "20000000-0000-0000-0000-000000000001": {
        "en": {
            "title": "Welcome to your municipal space",
            "summary": "Find services, news and useful procedures.",
            "content": "The municipality keeps you informed about its services and opening hours.",
        },
        "mg": {
            "title": "Tongasoa eto amin'ny sehatry ny kaominina",
            "summary": "Hitanao eto ireo tolotra, vaovao ary fikarakarana ilaina.",
            "content": "Ampahafantarin'ny kaominina anao ny tolotrany sy ny ora fandraisana.",
        },
    },
    "20000000-0000-0000-0000-000000000002": {
        "en": {
            "title": "Information about technical services",
            "summary": "Teams act on the reports received through the platform.",
            "content": "Use the Citizen requests section to report a problem at a given place.",
        },
        "mg": {
            "title": "Fampahalalana momba ny sampan-draharaha teknika",
            "summary": "Mandray an-tanana ireo olana voalaza amin'ny sehatra ireo ekipa.",
            "content": "Ampiasao ny fizarana Fangatahana hilazana olana amin'ny toerana iray.",
        },
    },
}


def _existing_ids(table: str, ids: list[str]) -> set[str]:
    rows = op.get_bind().execute(
        sa.text(f"SELECT id FROM {table} WHERE id IN :ids").bindparams(  # noqa: S608
            sa.bindparam("ids", expanding=True)
        ),
        {"ids": ids},
    )
    return {row[0] for row in rows}


def upgrade() -> None:
    with op.batch_alter_table("user_preferences") as batch:
        batch.add_column(sa.Column("language", sa.String(length=5), nullable=True))

    op.create_table(
        "onboarding_progress",
        sa.Column("user_id", sa.String(length=36), nullable=False),
        sa.Column("completed_steps", sa.JSON(), nullable=False),
        sa.Column("seen_hints", sa.JSON(), nullable=False),
        sa.Column("dismissed", sa.Boolean(), server_default=sa.false(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("user_id"),
    )

    op.create_table(
        "municipal_content_translations",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("content_type", sa.String(length=20), nullable=False),
        sa.Column("content_id", sa.String(length=36), nullable=False),
        sa.Column("language", sa.String(length=5), nullable=False),
        sa.Column("fields", sa.JSON(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint(
            "content_type", "content_id", "language", name="uq_municipal_translation"
        ),
    )
    with op.batch_alter_table("municipal_content_translations") as batch:
        batch.create_index(
            "ix_municipal_content_translations_content_id", ["content_id"], unique=False
        )

    translations = sa.table(
        "municipal_content_translations",
        sa.column("id", sa.String),
        sa.column("content_type", sa.String),
        sa.column("content_id", sa.String),
        sa.column("language", sa.String),
        sa.column("fields", sa.JSON),
        sa.column("updated_at", sa.DateTime(timezone=True)),
    )
    now = datetime.now(UTC)
    rows: list[dict[str, object]] = []
    services = _existing_ids("municipal_services", list(DEMO_SERVICES))
    for service_id, by_language in DEMO_SERVICES.items():
        if service_id not in services:
            continue
        for language, fields in by_language.items():
            rows.append(
                {
                    "id": str(uuid.uuid4()),
                    "content_type": "service",
                    "content_id": service_id,
                    "language": language,
                    "fields": {**fields, "opening_hours": HOURS[language]},
                    "updated_at": now,
                }
            )
    publications = _existing_ids("municipal_publications", list(DEMO_PUBLICATIONS))
    for publication_id, by_language in DEMO_PUBLICATIONS.items():
        if publication_id not in publications:
            continue
        for language, fields in by_language.items():
            rows.append(
                {
                    "id": str(uuid.uuid4()),
                    "content_type": "publication",
                    "content_id": publication_id,
                    "language": language,
                    "fields": fields,
                    "updated_at": now,
                }
            )
    if rows:
        op.bulk_insert(translations, rows)


def downgrade() -> None:
    with op.batch_alter_table("municipal_content_translations") as batch:
        batch.drop_index("ix_municipal_content_translations_content_id")
    op.drop_table("municipal_content_translations")
    op.drop_table("onboarding_progress")
    with op.batch_alter_table("user_preferences") as batch:
        batch.drop_column("language")
