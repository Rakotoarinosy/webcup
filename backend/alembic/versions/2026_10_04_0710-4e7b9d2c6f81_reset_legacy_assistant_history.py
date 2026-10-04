"""reset legacy assistant history

Revision ID: 4e7b9d2c6f81
Revises: 91c8d3e6f45a
"""

from typing import Sequence, Union

from alembic import op

revision: str = "4e7b9d2c6f81"
down_revision: Union[str, Sequence[str], None] = "91c8d3e6f45a"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Les réponses antérieures pouvaient contenir des indications de navigation non fiables.
    op.execute("DELETE FROM assistant_messages")


def downgrade() -> None:
    # Une conversation supprimée pour sécurité ne doit pas être recréée artificiellement.
    pass
