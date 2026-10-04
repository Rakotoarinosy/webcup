"""add essential municipal services

Revision ID: 4d66dc8c800b
Revises: a0e37029c543
Create Date: 2026-10-04 02:29:44.641929

"""
from typing import Sequence, Union


# revision identifiers, used by Alembic.
revision: str = '4d66dc8c800b'
down_revision: Union[str, Sequence[str], None] = 'a0e37029c543'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Aucun service municipal fictif n'est ajouté automatiquement."""
    pass


def downgrade() -> None:
    pass
