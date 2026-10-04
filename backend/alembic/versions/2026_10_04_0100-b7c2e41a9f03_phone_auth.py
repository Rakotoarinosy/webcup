"""connexion par téléphone : users.phone, email nullable, verification_codes.channel

Revision ID: b7c2e41a9f03
Revises: a9d3f1c7e520
"""

import sqlalchemy as sa
from alembic import op

revision = "b7c2e41a9f03"
down_revision = "a9d3f1c7e520"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # batch_alter_table : SQLite ne sait pas modifier une colonne en place, PostgreSQL passe en ALTER.
    with op.batch_alter_table("users") as batch:
        batch.alter_column("email", existing_type=sa.String(320), nullable=True)
        batch.add_column(sa.Column("phone", sa.String(20), nullable=True))
        batch.add_column(
            sa.Column("phone_verified", sa.Boolean(), nullable=False, server_default=sa.false())
        )
        batch.create_index("ix_users_phone", ["phone"], unique=True)
        batch.create_check_constraint("ck_users_contact", "email IS NOT NULL OR phone IS NOT NULL")
    with op.batch_alter_table("verification_codes") as batch:
        batch.add_column(
            sa.Column("channel", sa.String(10), nullable=False, server_default="email")
        )


def downgrade() -> None:
    with op.batch_alter_table("verification_codes") as batch:
        batch.drop_column("channel")
    # Les comptes sans email ne peuvent pas être conservés : on les supprime avant de remettre NOT NULL.
    op.execute("DELETE FROM users WHERE email IS NULL")
    with op.batch_alter_table("users") as batch:
        batch.drop_constraint("ck_users_contact", type_="check")
        batch.drop_index("ix_users_phone")
        batch.drop_column("phone_verified")
        batch.drop_column("phone")
        batch.alter_column("email", existing_type=sa.String(320), nullable=False)
