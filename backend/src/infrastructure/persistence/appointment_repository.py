"""Implémentation SQLAlchemy d'AppointmentRepository. Le mapping Model ↔ Entity reste privé ici."""

from datetime import datetime

from sqlalchemy import Select, and_, or_, select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, aliased

from src.domain.appointment import (
    Appointment,
    AppointmentModality,
    AppointmentNotice,
    AppointmentQuery,
    AppointmentRepository,
    AppointmentStatus,
    NoticeChannel,
    NoticeKind,
    NoticeStatus,
    ReminderDelay,
    Slot,
    SlotAlreadyBookedConflictError,
    SlotQuery,
)
from src.infrastructure.persistence.citizen_request_repository import as_utc
from src.infrastructure.persistence.models import (
    AgentModel,
    AppointmentModel,
    AppointmentNoticeModel,
    AppointmentSlotModel,
    InstitutModel,
    UserModel,
)

_AgentUser = aliased(UserModel)
_Citizen = aliased(UserModel)
_Active = aliased(AppointmentModel)


def _slot_select() -> Select:  # type: ignore[type-arg]
    return (
        select(
            AppointmentSlotModel,
            InstitutModel.name,
            _AgentUser.name,
            _Active.id,
        )
        .join(InstitutModel, InstitutModel.id == AppointmentSlotModel.institut_id)
        .outerjoin(AgentModel, AgentModel.id == AppointmentSlotModel.agent_id)
        .outerjoin(_AgentUser, _AgentUser.id == AgentModel.user_id)
        .outerjoin(_Active, _Active.active_slot_id == AppointmentSlotModel.id)
    )


def _appointment_select() -> Select:  # type: ignore[type-arg]
    return (
        select(
            AppointmentModel,
            AppointmentSlotModel,
            InstitutModel.name,
            _AgentUser.name,
            _Citizen,
        )
        .join(AppointmentSlotModel, AppointmentSlotModel.id == AppointmentModel.slot_id)
        .join(InstitutModel, InstitutModel.id == AppointmentSlotModel.institut_id)
        .outerjoin(AgentModel, AgentModel.id == AppointmentSlotModel.agent_id)
        .outerjoin(_AgentUser, _AgentUser.id == AgentModel.user_id)
        .outerjoin(_Citizen, _Citizen.id == AppointmentModel.citizen_id)
    )


class SqlAlchemyAppointmentRepository(AppointmentRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    # ─── créneaux ───

    def get_slot(self, slot_id: str) -> Slot | None:
        row = self.db.execute(_slot_select().where(AppointmentSlotModel.id == slot_id)).first()
        return _slot_from_row(row) if row else None

    def list_slots(self, query: SlotQuery) -> "list[Slot]":
        statement = _slot_select().order_by(AppointmentSlotModel.starts_at)
        if query.institut_id is not None:
            statement = statement.where(AppointmentSlotModel.institut_id == query.institut_id)
        if query.agent_id is not None:
            statement = statement.where(AppointmentSlotModel.agent_id == query.agent_id)
        if query.since is not None:
            statement = statement.where(AppointmentSlotModel.starts_at >= query.since)
        if query.until is not None:
            statement = statement.where(AppointmentSlotModel.starts_at < query.until)
        if query.available_only:
            statement = statement.where(
                AppointmentSlotModel.is_open.is_(True), _Active.id.is_(None)
            )
        elif not query.include_closed:
            statement = statement.where(
                or_(AppointmentSlotModel.is_open.is_(True), _Active.id.is_not(None))
            )
        return [_slot_from_row(row) for row in self.db.execute(statement)]

    def add_slots(self, slots: "list[Slot]") -> "list[Slot]":
        for slot in slots:
            self.db.add(_slot_to_model(slot))
        self.db.commit()
        return [saved for slot in slots if (saved := self.get_slot(slot.id)) is not None]

    def update_slot(self, slot: Slot) -> Slot:
        self.db.merge(_slot_to_model(slot))
        self.db.commit()
        saved = self.get_slot(slot.id)
        assert saved is not None
        return saved

    # ─── rendez-vous ───

    def get_appointment(self, appointment_id: str) -> Appointment | None:
        row = self.db.execute(
            _appointment_select().where(AppointmentModel.id == appointment_id)
        ).first()
        return _appointment_from_row(row) if row else None

    def get_active_for_slot(self, slot_id: str) -> Appointment | None:
        row = self.db.execute(
            _appointment_select().where(AppointmentModel.active_slot_id == slot_id)
        ).first()
        return _appointment_from_row(row) if row else None

    def list_appointments(self, query: AppointmentQuery) -> "list[Appointment]":
        statement = _appointment_select().order_by(AppointmentSlotModel.starts_at)
        if query.citizen_id is not None:
            statement = statement.where(AppointmentModel.citizen_id == query.citizen_id)
        if query.institut_id is not None:
            statement = statement.where(AppointmentSlotModel.institut_id == query.institut_id)
        if query.agent_id is not None:
            statement = statement.where(AppointmentSlotModel.agent_id == query.agent_id)
        if query.since is not None:
            statement = statement.where(AppointmentSlotModel.starts_at >= query.since)
        if query.until is not None:
            statement = statement.where(AppointmentSlotModel.starts_at < query.until)
        if query.statuses:
            statement = statement.where(
                AppointmentModel.status.in_([status.value for status in query.statuses])
            )
        return [_appointment_from_row(row) for row in self.db.execute(statement)]

    def add_appointment(self, appointment: Appointment) -> Appointment:
        self.db.add(_appointment_to_model(appointment))
        try:
            self.db.commit()
        except IntegrityError as exc:
            # Deux réservations simultanées du même créneau : la contrainte d'unicité tranche.
            self.db.rollback()
            raise SlotAlreadyBookedConflictError(appointment.slot.id) from exc
        saved = self.get_appointment(appointment.id)
        assert saved is not None
        return saved

    def update_appointment(self, appointment: Appointment) -> Appointment:
        self.db.merge(_appointment_to_model(appointment))
        try:
            self.db.commit()
        except IntegrityError as exc:
            self.db.rollback()
            raise SlotAlreadyBookedConflictError(appointment.slot.id) from exc
        saved = self.get_appointment(appointment.id)
        assert saved is not None
        return saved

    # ─── messages ───

    def list_notices(self, appointment_ids: "list[str]") -> "list[AppointmentNotice]":
        if not appointment_ids:
            return []
        statement = (
            select(AppointmentNoticeModel)
            .where(AppointmentNoticeModel.appointment_id.in_(appointment_ids))
            .order_by(AppointmentNoticeModel.created_at)
        )
        return [_notice_to_entity(model) for model in self.db.scalars(statement)]

    def add_notice_if_absent(self, notice: AppointmentNotice) -> bool:
        exists = self.db.scalar(
            select(AppointmentNoticeModel.id).where(
                AppointmentNoticeModel.appointment_id == notice.appointment_id,
                AppointmentNoticeModel.kind == notice.kind.value,
                AppointmentNoticeModel.delay == notice.delay,
                AppointmentNoticeModel.channel == notice.channel.value,
            )
        )
        if exists is not None:
            return False
        self.db.add(_notice_to_model(notice))
        try:
            self.db.commit()
        except IntegrityError:  # mémorisé en parallèle par un autre worker
            self.db.rollback()
            return False
        return True

    def deliverable_notices(self, limit: int, max_attempts: int) -> "list[AppointmentNotice]":
        statement = (
            select(AppointmentNoticeModel)
            .where(
                AppointmentNoticeModel.channel != NoticeChannel.IN_APP.value,
                AppointmentNoticeModel.attempts < max_attempts,
                AppointmentNoticeModel.status.in_(
                    [
                        NoticeStatus.PENDING.value,
                        NoticeStatus.FAILED.value,
                        NoticeStatus.SENDING.value,
                    ]
                ),
            )
            .order_by(AppointmentNoticeModel.created_at)
            .limit(limit)
        )
        return [_notice_to_entity(model) for model in self.db.scalars(statement)]

    def claim_notice(self, notice: AppointmentNotice, now: datetime) -> bool:
        result = self.db.execute(
            update(AppointmentNoticeModel)
            .where(
                and_(
                    AppointmentNoticeModel.id == notice.id,
                    AppointmentNoticeModel.status == notice.status.value,
                    AppointmentNoticeModel.attempts == notice.attempts,
                )
            )
            .values(
                status=NoticeStatus.SENDING.value,
                attempts=notice.attempts + 1,
                last_attempt_at=now,
            )
        )
        self.db.commit()
        claimed = result.rowcount == 1  # type: ignore[attr-defined]
        if claimed:
            notice.status = NoticeStatus.SENDING
            notice.attempts += 1
            notice.last_attempt_at = now
        return claimed

    def save_notice(self, notice: AppointmentNotice) -> AppointmentNotice:
        model = self.db.merge(_notice_to_model(notice))
        self.db.commit()
        return _notice_to_entity(model)


# ─── mapping ───


def _slot_from_row(row) -> Slot:  # type: ignore[no-untyped-def]
    model, institut_name, agent_name, active_id = row
    return Slot(
        id=model.id,
        institut_id=model.institut_id,
        agent_id=model.agent_id,
        starts_at=as_utc(model.starts_at),
        ends_at=as_utc(model.ends_at),
        modality=AppointmentModality(model.modality),
        location=model.location,
        preparation=model.preparation,
        is_open=model.is_open,
        created_by=model.created_by,
        created_at=as_utc(model.created_at),
        institut_name=institut_name or "",
        agent_name=agent_name or "",
        is_booked=active_id is not None,
    )


def _slot_to_model(slot: Slot) -> AppointmentSlotModel:
    return AppointmentSlotModel(
        id=slot.id,
        institut_id=slot.institut_id,
        agent_id=slot.agent_id,
        starts_at=slot.starts_at,
        ends_at=slot.ends_at,
        modality=slot.modality.value,
        location=slot.location,
        preparation=slot.preparation,
        is_open=slot.is_open,
        created_by=slot.created_by,
        created_at=slot.created_at,
    )


def _appointment_from_row(row) -> Appointment:  # type: ignore[no-untyped-def]
    model, slot_model, institut_name, agent_name, citizen = row
    status = AppointmentStatus(model.status)
    slot = _slot_from_row((slot_model, institut_name, agent_name, model.active_slot_id))
    return Appointment(
        id=model.id,
        reference=model.reference,
        citizen_id=model.citizen_id,
        slot=slot,
        reason=model.reason,
        status=status,
        reminders=tuple(ReminderDelay(value) for value in model.reminders or []),
        contact_phone=model.contact_phone,
        cancel_reason=model.cancel_reason,
        cancelled_at=as_utc(model.cancelled_at) if model.cancelled_at else None,
        attendance_recorded_at=(
            as_utc(model.attendance_recorded_at) if model.attendance_recorded_at else None
        ),
        created_at=as_utc(model.created_at),
        updated_at=as_utc(model.updated_at),
        citizen_name=citizen.name if citizen else "Compte supprimé",
        citizen_email=citizen.email if citizen else None,
        citizen_phone=citizen.phone if citizen else None,
    )


def _appointment_to_model(appointment: Appointment) -> AppointmentModel:
    return AppointmentModel(
        id=appointment.id,
        reference=appointment.reference,
        citizen_id=appointment.citizen_id,
        slot_id=appointment.slot.id,
        active_slot_id=appointment.slot.id if appointment.occupies_slot else None,
        reason=appointment.reason,
        status=appointment.status.value,
        reminders=[delay.value for delay in appointment.reminders],
        contact_phone=appointment.contact_phone,
        cancel_reason=appointment.cancel_reason,
        cancelled_at=appointment.cancelled_at,
        attendance_recorded_at=appointment.attendance_recorded_at,
        created_at=appointment.created_at,
        updated_at=appointment.updated_at,
    )


def _notice_to_entity(model: AppointmentNoticeModel) -> AppointmentNotice:
    return AppointmentNotice(
        id=model.id,
        appointment_id=model.appointment_id,
        user_id=model.user_id,
        kind=NoticeKind(model.kind),
        channel=NoticeChannel(model.channel),
        delay=model.delay,
        title=model.title,
        message=model.message,
        status=NoticeStatus(model.status),
        attempts=model.attempts,
        last_attempt_at=as_utc(model.last_attempt_at) if model.last_attempt_at else None,
        sent_at=as_utc(model.sent_at) if model.sent_at else None,
        last_error=model.last_error,
        created_at=as_utc(model.created_at),
    )


def _notice_to_model(notice: AppointmentNotice) -> AppointmentNoticeModel:
    return AppointmentNoticeModel(
        id=notice.id,
        appointment_id=notice.appointment_id,
        user_id=notice.user_id,
        kind=notice.kind.value,
        channel=notice.channel.value,
        delay=notice.delay,
        title=notice.title[:255],
        message=notice.message,
        status=notice.status.value,
        attempts=notice.attempts,
        last_attempt_at=notice.last_attempt_at,
        sent_at=notice.sent_at,
        last_error=(notice.last_error or None) and notice.last_error[:255],
        created_at=notice.created_at,
    )
