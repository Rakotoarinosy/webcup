"""merge assistant history head

Revision ID: a7c4d8e1f6b2
Revises: 4e7b9d2c6f81, 9266eb096efb
"""

from typing import Sequence, Union

revision: str = "a7c4d8e1f6b2"
down_revision: Union[str, Sequence[str], None] = ("4e7b9d2c6f81", "9266eb096efb")
branch_labels = None
depends_on = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
