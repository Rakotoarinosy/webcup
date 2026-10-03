"""fusion des branches : traçabilité/lieux d'accueil (F47, F45) et connexion Google

Revision ID: a9d3f1c7e520
Revises: f2c8a5e1d4b6, af323a8bae9b
Create Date: 2026-10-03 23:30:00.000000

"""

from collections.abc import Sequence

revision: str = "a9d3f1c7e520"
down_revision: str | Sequence[str] | None = ("f2c8a5e1d4b6", "af323a8bae9b")
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    pass  # Les deux branches touchent des tables différentes : rien à réconcilier.


def downgrade() -> None:
    pass
