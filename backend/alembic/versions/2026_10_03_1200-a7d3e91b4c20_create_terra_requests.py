"""create terra_requests, terra_sessions and terra_request_reads tables

Revision ID: a7d3e91b4c20
Revises: 6f4a2b9d1e70
Create Date: 2026-10-03 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a7d3e91b4c20'
down_revision: Union[str, Sequence[str], None] = '6f4a2b9d1e70'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table('terra_requests',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('request_code', sa.String(length=40), nullable=False),
    sa.Column('api_id', sa.Integer(), nullable=True),
    sa.Column('requester_name', sa.String(length=255), nullable=False),
    sa.Column('requester_type', sa.String(length=100), nullable=False),
    sa.Column('message_public', sa.Text(), nullable=False),
    sa.Column('difficulty', sa.String(length=40), nullable=False),
    sa.Column('difficulty_level', sa.Integer(), nullable=False),
    sa.Column('xp_base', sa.Integer(), nullable=False),
    sa.Column('xp_time_bonus', sa.Integer(), nullable=False),
    sa.Column('xp_total', sa.Integer(), nullable=False),
    sa.Column('xp_available', sa.Integer(), nullable=False),
    sa.Column('is_initial', sa.Boolean(), nullable=False),
    sa.Column('visible_since_wave', sa.Integer(), nullable=True),
    sa.Column('arrival_type', sa.String(length=40), nullable=False),
    sa.Column('wave_number', sa.Integer(), nullable=True),
    sa.Column('arrival_time', sa.String(length=20), nullable=False),
    sa.Column('is_ai_related', sa.Boolean(), nullable=False),
    sa.Column('is_ai_request', sa.Boolean(), nullable=False),
    sa.Column('group_name', sa.String(length=100), nullable=False),
    sa.Column('sort_order', sa.Integer(), nullable=False),
    sa.Column('raw', sa.JSON(), nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.Column('first_seen_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('terra_requests', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_terra_requests_request_code'), ['request_code'], unique=True)
        batch_op.create_index(batch_op.f('ix_terra_requests_status'), ['status'], unique=False)

    op.create_table('terra_sessions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=40), nullable=False),
    sa.Column('is_running', sa.Boolean(), nullable=False),
    sa.Column('current_wave', sa.Integer(), nullable=False),
    sa.Column('elapsed_minutes', sa.Integer(), nullable=False),
    sa.Column('visible_requests_count', sa.Integer(), nullable=False),
    sa.Column('initial_requests_count', sa.Integer(), nullable=False),
    sa.Column('wave_requests_count', sa.Integer(), nullable=False),
    sa.Column('next_wave_number', sa.Integer(), nullable=False),
    sa.Column('minutes_until_next_wave', sa.Integer(), nullable=False),
    sa.Column('next_wave_eta', sa.DateTime(timezone=True), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('last_sync_attempt_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('last_sync_success_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('last_sync_error', sa.String(length=500), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )

    op.create_table('terra_request_reads',
    sa.Column('user_id', sa.String(length=36), nullable=False),
    sa.Column('key', sa.String(length=80), nullable=False),
    sa.Column('read_at', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('user_id', 'key')
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('terra_request_reads')
    op.drop_table('terra_sessions')
    with op.batch_alter_table('terra_requests', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_terra_requests_status'))
        batch_op.drop_index(batch_op.f('ix_terra_requests_request_code'))
    op.drop_table('terra_requests')
