"""add trusted device fingerprint to refresh tokens

Revision ID: 91f0e7c2a8d4
Revises: 6684e47d4f72
Create Date: 2026-10-04 05:20:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "91f0e7c2a8d4"
down_revision: Union[str, Sequence[str], None] = "6684e47d4f72"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table("refresh_tokens") as batch:
        batch.add_column(sa.Column("device_fingerprint", sa.String(length=64), nullable=True))
        batch.create_index(batch.f("ix_refresh_tokens_device_fingerprint"), ["device_fingerprint"], unique=False)


def downgrade() -> None:
    with op.batch_alter_table("refresh_tokens") as batch:
        batch.drop_index(batch.f("ix_refresh_tokens_device_fingerprint"))
        batch.drop_column("device_fingerprint")
