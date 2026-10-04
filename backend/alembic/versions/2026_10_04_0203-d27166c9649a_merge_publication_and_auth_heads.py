"""merge publication and auth heads

Revision ID: d27166c9649a
Revises: a9d3f1c7e520, 428dcdf698ec
Create Date: 2026-10-04 02:03:57.924776

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd27166c9649a'
down_revision: Union[str, Sequence[str], None] = ('a9d3f1c7e520', '428dcdf698ec')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
