"""create demandes table

Revision ID: 9d4f1a6b8c52
Revises: 7b2e9c4a1f30
Create Date: 2026-10-01 11:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9d4f1a6b8c52'
down_revision: Union[str, Sequence[str], None] = '7b2e9c4a1f30'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table('demandes',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('category', sa.String(length=50), nullable=False),
    sa.Column('priority', sa.String(length=20), nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.Column('citizen_id', sa.String(length=36), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('address', sa.String(length=500), nullable=True),
    sa.Column('latitude', sa.Float(), nullable=True),
    sa.Column('longitude', sa.Float(), nullable=True),
    sa.Column('agent_id', sa.String(length=36), nullable=True),
    sa.Column('scheduled_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['agent_id'], ['agents.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['citizen_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('demandes', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_demandes_agent_id'), ['agent_id'], unique=False)
        batch_op.create_index(batch_op.f('ix_demandes_category'), ['category'], unique=False)
        batch_op.create_index(batch_op.f('ix_demandes_citizen_id'), ['citizen_id'], unique=False)
        batch_op.create_index(batch_op.f('ix_demandes_priority'), ['priority'], unique=False)
        batch_op.create_index(batch_op.f('ix_demandes_status'), ['status'], unique=False)
        batch_op.create_index('ix_demandes_status_created_at', ['status', 'created_at'], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    with op.batch_alter_table('demandes', schema=None) as batch_op:
        batch_op.drop_index('ix_demandes_status_created_at')
        batch_op.drop_index(batch_op.f('ix_demandes_status'))
        batch_op.drop_index(batch_op.f('ix_demandes_priority'))
        batch_op.drop_index(batch_op.f('ix_demandes_citizen_id'))
        batch_op.drop_index(batch_op.f('ix_demandes_category'))
        batch_op.drop_index(batch_op.f('ix_demandes_agent_id'))

    op.drop_table('demandes')
