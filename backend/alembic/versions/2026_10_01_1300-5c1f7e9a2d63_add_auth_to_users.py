"""add authentication fields to users and refresh tokens table

Revision ID: 5c1f7e9a2d63
Revises: 3e8a5d2c7b41
Create Date: 2026-10-01 13:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5c1f7e9a2d63'
down_revision: Union[str, Sequence[str], None] = '3e8a5d2c7b41'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Les utilisateurs existants deviennent des citoyens actifs sans mot de passe
    # (ils ne peuvent pas se connecter tant qu'un mot de passe n'est pas défini).
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.String(length=255), server_default='', nullable=False))
        batch_op.add_column(sa.Column('role', sa.String(length=20), server_default='citizen', nullable=False))
        batch_op.add_column(sa.Column('is_active', sa.Boolean(), server_default=sa.true(), nullable=False))
        batch_op.add_column(sa.Column('agent_id', sa.String(length=36), nullable=True))
        batch_op.add_column(sa.Column('failed_login_attempts', sa.Integer(), server_default='0', nullable=False))
        batch_op.add_column(sa.Column('locked_until', sa.DateTime(timezone=True), nullable=True))
        batch_op.create_index(batch_op.f('ix_users_role'), ['role'], unique=False)
        batch_op.create_unique_constraint('uq_users_agent_id', ['agent_id'])
        batch_op.create_foreign_key(
            'users_agent_id_fkey', 'agents', ['agent_id'], ['id'], ondelete='SET NULL'
        )

    op.create_table('refresh_tokens',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('user_id', sa.String(length=36), nullable=False),
    sa.Column('family_id', sa.String(length=36), nullable=False),
    sa.Column('token_hash', sa.String(length=64), nullable=False),
    sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('revoked_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('refresh_tokens', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_refresh_tokens_family_id'), ['family_id'], unique=False)
        batch_op.create_index(batch_op.f('ix_refresh_tokens_token_hash'), ['token_hash'], unique=True)
        batch_op.create_index(batch_op.f('ix_refresh_tokens_user_id'), ['user_id'], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    with op.batch_alter_table('refresh_tokens', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_refresh_tokens_user_id'))
        batch_op.drop_index(batch_op.f('ix_refresh_tokens_token_hash'))
        batch_op.drop_index(batch_op.f('ix_refresh_tokens_family_id'))

    op.drop_table('refresh_tokens')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint('users_agent_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('uq_users_agent_id', type_='unique')
        batch_op.drop_index(batch_op.f('ix_users_role'))
        batch_op.drop_column('locked_until')
        batch_op.drop_column('failed_login_attempts')
        batch_op.drop_column('agent_id')
        batch_op.drop_column('is_active')
        batch_op.drop_column('role')
        batch_op.drop_column('password_hash')
