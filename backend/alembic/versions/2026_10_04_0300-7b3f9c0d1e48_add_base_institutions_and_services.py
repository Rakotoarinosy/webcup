"""Keep the schema revision without inserting fictional institutions or services.

Revision ID: 7b3f9c0d1e48
Revises: 4d66dc8c800b
Create Date: 2026-10-04 03:00:00.000000
"""

from collections.abc import Sequence
from typing import Union

revision: str = "7b3f9c0d1e48"
down_revision: Union[str, Sequence[str], None] = "4d66dc8c800b"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Institutions and municipal services must be entered from verified data."""


def downgrade() -> None:
    """No data was inserted by this revision."""
