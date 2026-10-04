"""merge phone auth and publication heads

Revision ID: a0e37029c543
Revises: b7c2e41a9f03, 8fac466a74fa
Create Date: 2026-10-04 02:29:28.597422

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a0e37029c543'
down_revision: Union[str, Sequence[str], None] = ('b7c2e41a9f03', '8fac466a74fa')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
