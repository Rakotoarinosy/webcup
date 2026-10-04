"""merge heads

Revision ID: 6684e47d4f72
Revises: b7c2e41a9f03, 8fac466a74fa
Create Date: 2026-10-04 03:48:46.591510

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6684e47d4f72'
down_revision: Union[str, Sequence[str], None] = ('b7c2e41a9f03', '8fac466a74fa')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
