"""rendez-vous : créneaux, réservations et rappels (F39, F40)

Revision ID: c3d5e7a90303
Revises: c4e8b2d71a56
"""

import sqlalchemy as sa
from alembic import op

revision = "c3d5e7a90303"
down_revision = "c4e8b2d71a56"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "appointment_slots",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("institut_id", sa.String(36), sa.ForeignKey("instituts.id"), nullable=False),
        sa.Column("agent_id", sa.String(36), sa.ForeignKey("agents.id"), nullable=True),
        sa.Column("starts_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("ends_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("modality", sa.String(20), nullable=False),
        sa.Column("location", sa.String(500), nullable=False),
        sa.Column("preparation", sa.Text(), nullable=False, server_default=""),
        sa.Column("is_open", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_by", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.CheckConstraint("ends_at > starts_at", name="ck_appointment_slots_order"),
    )
    op.create_index("ix_appointment_slots_institut_id", "appointment_slots", ["institut_id"])
    op.create_index("ix_appointment_slots_agent_id", "appointment_slots", ["agent_id"])
    op.create_index("ix_appointment_slots_starts_at", "appointment_slots", ["starts_at"])

    op.create_table(
        "appointments",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("reference", sa.String(32), nullable=False),
        sa.Column("citizen_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column(
            "slot_id", sa.String(36), sa.ForeignKey("appointment_slots.id"), nullable=False
        ),
        sa.Column("active_slot_id", sa.String(36), nullable=True),
        sa.Column("reason", sa.Text(), nullable=False),
        sa.Column("status", sa.String(30), nullable=False),
        sa.Column("reminders", sa.JSON(), nullable=False),
        sa.Column("contact_phone", sa.String(20), nullable=True),
        sa.Column("cancel_reason", sa.Text(), nullable=True),
        sa.Column("cancelled_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("attendance_recorded_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_appointments_reference", "appointments", ["reference"], unique=True)
    op.create_index("ix_appointments_citizen_id", "appointments", ["citizen_id"])
    op.create_index("ix_appointments_slot_id", "appointments", ["slot_id"])
    op.create_index("ix_appointments_status", "appointments", ["status"])
    # Pas de double réservation : un créneau n'a qu'un rendez-vous actif.
    op.create_index(
        "ix_appointments_active_slot_id", "appointments", ["active_slot_id"], unique=True
    )

    op.create_table(
        "appointment_notices",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column(
            "appointment_id",
            sa.String(36),
            sa.ForeignKey("appointments.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("user_id", sa.String(36), nullable=False),
        sa.Column("kind", sa.String(30), nullable=False),
        sa.Column("channel", sa.String(10), nullable=False),
        sa.Column("delay", sa.String(10), nullable=False),
        sa.Column("title", sa.String(255), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("status", sa.String(10), nullable=False),
        sa.Column("attempts", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("last_attempt_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("sent_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("last_error", sa.String(255), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint(
            "appointment_id", "kind", "delay", "channel", name="uq_appointment_notices_once"
        ),
    )
    op.create_index(
        "ix_appointment_notices_appointment_id", "appointment_notices", ["appointment_id"]
    )
    op.create_index("ix_appointment_notices_user_id", "appointment_notices", ["user_id"])
    op.create_index("ix_appointment_notices_status", "appointment_notices", ["status"])


def downgrade() -> None:
    op.drop_table("appointment_notices")
    op.drop_table("appointments")
    op.drop_table("appointment_slots")
