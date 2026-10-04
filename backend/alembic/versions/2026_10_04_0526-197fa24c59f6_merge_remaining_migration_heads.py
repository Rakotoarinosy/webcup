"""merge remaining migration heads

Revision ID: 197fa24c59f6
Revises: 3e65638c3359, c4e8b2d71a56, 91f0e7c2a8d4
Create Date: 2026-10-04 05:26:22.644339

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '197fa24c59f6'
down_revision: Union[str, Sequence[str], None] = ('3e65638c3359', 'c4e8b2d71a56', '91f0e7c2a8d4')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
