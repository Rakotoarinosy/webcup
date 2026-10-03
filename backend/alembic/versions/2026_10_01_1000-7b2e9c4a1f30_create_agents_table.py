"""create agents table and link citizen requests to agents

Revision ID: 7b2e9c4a1f30
Revises: 462099655b53
Create Date: 2026-10-01 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7b2e9c4a1f30'
down_revision: Union[str, Sequence[str], None] = '462099655b53'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

FK_NAME = 'citizen_requests_assigned_agent_id_fkey'
# Nomme la contrainte à la réflexion : SQLite ne nomme pas ses clés étrangères, PostgreSQL
# utilise déjà ce nom par défaut. Le même drop_constraint marche ainsi sur les deux.
NAMING = {'fk': '%(table_name)s_%(column_0_name)s_fkey'}


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table('agents',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('email', sa.String(length=320), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('department', sa.String(length=255), nullable=False),
    sa.Column('status', sa.String(length=32), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('agents', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_agents_email'), ['email'], unique=True)
        batch_op.create_index(batch_op.f('ix_agents_status'), ['status'], unique=False)
        batch_op.create_index(batch_op.f('ix_agents_is_active'), ['is_active'], unique=False)

    # Les agents déjà attribués étaient des utilisateurs : on les recopie dans agents
    # (même id) pour que la nouvelle clé étrangère reste valide.
    op.execute(
        """
        INSERT INTO agents (id, email, name, department, status, is_active, created_at)
        SELECT u.id, u.email, u.name, '', 'available', TRUE, u.created_at
        FROM users u
        WHERE u.id IN (
            SELECT assigned_agent_id FROM citizen_requests WHERE assigned_agent_id IS NOT NULL
        )
        """
    )

    with op.batch_alter_table('citizen_requests', naming_convention=NAMING) as batch_op:
        batch_op.drop_constraint(FK_NAME, type_='foreignkey')
        batch_op.create_foreign_key(
            FK_NAME, 'agents', ['assigned_agent_id'], ['id'], ondelete='SET NULL'
        )


def downgrade() -> None:
    """Downgrade schema."""
    with op.batch_alter_table('citizen_requests', naming_convention=NAMING) as batch_op:
        batch_op.drop_constraint(FK_NAME, type_='foreignkey')
    # Les agents qui ne sont pas aussi des utilisateurs perdent leurs attributions.
    op.execute(
        """
        UPDATE citizen_requests SET assigned_agent_id = NULL
        WHERE assigned_agent_id NOT IN (SELECT id FROM users)
        """
    )
    with op.batch_alter_table('citizen_requests', naming_convention=NAMING) as batch_op:
        batch_op.create_foreign_key(
            FK_NAME, 'users', ['assigned_agent_id'], ['id'], ondelete='SET NULL'
        )

    with op.batch_alter_table('agents', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_agents_is_active'))
        batch_op.drop_index(batch_op.f('ix_agents_status'))
        batch_op.drop_index(batch_op.f('ix_agents_email'))

    op.drop_table('agents')
