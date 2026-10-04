"""fusion des branches : connexion par téléphone et publications

Revision ID: c4e8b2d71a56
Revises: b7c2e41a9f03, 8fac466a74fa
Create Date: 2026-10-04 03:00:00.000000

"""

from collections.abc import Sequence

revision: str = "c4e8b2d71a56"
down_revision: str | Sequence[str] | None = ("b7c2e41a9f03", "8fac466a74fa")
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    pass  # Les deux branches touchent des tables différentes.


def downgrade() -> None:
    pass
