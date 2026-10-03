"""fusion des branches : refonte (instituts, CitizenRequest) et préférences utilisateur

Revision ID: c3f9a7d2e815
Revises: b8e4f2a91c37, 51b874ba1d46
Create Date: 2026-10-03 19:00:00.000000

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "c3f9a7d2e815"
down_revision: str | Sequence[str] | None = ("b8e4f2a91c37", "51b874ba1d46")
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # Si 51b874ba1d46 est passée avant la refonte, elle a pu recréer demande_events :
    # la refonte a remplacé ce journal par citizen_request_events.
    if "demande_events" in sa.inspect(op.get_bind()).get_table_names():
        op.drop_table("demande_events")


def downgrade() -> None:
    pass
