"""Use cases des rendez-vous (F39).

Habitant : services → jours → créneaux libres → réservation → « Mes rendez-vous » / annulation.
Agent / manager / admin : création de créneaux (unitaires ou en série), planning, présence,
annulation avec motif (l'habitant est prévenu). Les opérations des agents sont journalisées.
"""

import uuid
from collections import Counter
from dataclasses import dataclass
from datetime import UTC, date, datetime, time, timedelta, tzinfo

from src.domain.agent import AgentRepository
from src.domain.appointment import (
    ATTENDANCE_STATUSES,
    OCCUPYING_STATUSES,
    Appointment,
    AppointmentNotFoundError,
    AppointmentNotice,
    AppointmentQuery,
    AppointmentRepository,
    AppointmentStatus,
    CitizenOverlapConflictError,
    ContactPhoneRequiredError,
    InvalidSlotError,
    NoticeChannel,
    NoticeKind,
    NoticeStatus,
    Slot,
    SlotAlreadyBookedConflictError,
    SlotInPastError,
    SlotNotFoundError,
    SlotOverlapConflictError,
    SlotQuery,
    ensure_can_manage_slot,
    ensure_can_view_appointment,
    ensure_staff,
    planning_scope,
)
from src.domain.appointment.entities import AppointmentModality
from src.domain.appointment.messages import cancellation_message
from src.domain.appointment.reminders import channels_for
from src.domain.appointment.timing import (
    SlotSeries,
    check_duration,
    local_day_bounds,
    local_to_utc,
    series_times,
)
from src.domain.audit import AuditAction, AuditTarget
from src.domain.citizen_request import Actor
from src.domain.institut import InstitutNotFoundError, InstitutRepository
from src.domain.user import ForbiddenError, Role, User, UserRepository
from src.features.appointment.schemas import (
    BookIn,
    CancelIn,
    CreateSeriesIn,
    CreateSlotIn,
    SlotFields,
)
from src.features.audit.recording import AuditTrail, record


@dataclass(frozen=True)
class AppointmentPolicy:
    """Réglages de la mairie (Settings), passés par le router."""

    tz: tzinfo = UTC
    tz_name: str = "UTC"
    cancellation_notice: timedelta = timedelta(hours=2)
    booking_horizon: timedelta = timedelta(days=60)

    @property
    def cancellation_notice_hours(self) -> int:
        return int(self.cancellation_notice.total_seconds() // 3600)


def _now(now: datetime | None) -> datetime:
    return now or datetime.now(UTC)


# ─── habitant : choisir un créneau ──────────────────────────────────


@dataclass(frozen=True)
class ServiceAvailability:
    institut_id: str
    name: str
    description: str
    available_slots: int
    next_available: Slot | None


def list_services(
    repo: AppointmentRepository,
    instituts: InstitutRepository,
    policy: AppointmentPolicy,
    now: datetime | None = None,
) -> list[ServiceAvailability]:
    """Services actifs et créneaux libres d'ici l'horizon de réservation."""
    now = _now(now)
    free = repo.list_slots(
        SlotQuery(since=now, until=now + policy.booking_horizon, available_only=True)
    )
    counts = Counter(slot.institut_id for slot in free)
    first: dict[str, Slot] = {}
    for slot in free:  # triés par heure de début
        first.setdefault(slot.institut_id, slot)
    services = [
        ServiceAvailability(
            institut_id=institut.id,
            name=institut.name,
            description=institut.description,
            available_slots=counts.get(institut.id, 0),
            next_available=first.get(institut.id),
        )
        for institut in instituts.list(active_only=True)
    ]
    # Les services qui ont des créneaux d'abord, puis par nom.
    return sorted(services, key=lambda item: (item.available_slots == 0, item.name.lower()))


def _free_slots(
    institut_id: str,
    repo: AppointmentRepository,
    instituts: InstitutRepository,
    policy: AppointmentPolicy,
    now: datetime,
    since: datetime,
    until: datetime,
) -> list[Slot]:
    institut = instituts.get_by_id(institut_id)
    if institut is None or not institut.is_active:
        raise InstitutNotFoundError(institut_id)
    since = max(since, now)
    until = min(until, now + policy.booking_horizon)
    if until <= since:
        return []
    return repo.list_slots(
        SlotQuery(institut_id=institut_id, since=since, until=until, available_only=True)
    )


def list_available_days(
    institut_id: str,
    repo: AppointmentRepository,
    instituts: InstitutRepository,
    policy: AppointmentPolicy,
    now: datetime | None = None,
) -> list[tuple[date, int]]:
    """Jours (locaux) qui ont au moins un créneau libre, avec leur nombre de créneaux."""
    now = _now(now)
    slots = _free_slots(
        institut_id, repo, instituts, policy, now, now, now + policy.booking_horizon
    )
    counts = Counter(slot.starts_at.astimezone(policy.tz).date() for slot in slots)
    return sorted(counts.items())


def list_day_slots(
    institut_id: str,
    day: date,
    repo: AppointmentRepository,
    instituts: InstitutRepository,
    policy: AppointmentPolicy,
    now: datetime | None = None,
) -> list[Slot]:
    now = _now(now)
    start, end = local_day_bounds(day, policy.tz)
    return _free_slots(institut_id, repo, instituts, policy, now, start, end)


# ─── habitant : réserver, consulter, annuler ────────────────────────


def book(
    user: User,
    dto: BookIn,
    repo: AppointmentRepository,
    policy: AppointmentPolicy,
    now: datetime | None = None,
) -> Appointment:
    now = _now(now)
    if user.role is not Role.CITIZEN:
        raise ForbiddenError("Only citizens can book an appointment")
    slot = repo.get_slot(dto.slot_id)
    if slot is None:
        raise SlotNotFoundError(dto.slot_id)
    slot.ensure_bookable(now)

    # Un habitant ne peut pas être à deux rendez-vous en même temps.
    mine = repo.list_appointments(
        AppointmentQuery(
            citizen_id=user.id,
            since=slot.starts_at - timedelta(days=1),
            until=slot.ends_at,
            statuses=frozenset({AppointmentStatus.CONFIRMED}),
        )
    )
    if any(other.slot.overlaps(slot.starts_at, slot.ends_at) for other in mine):
        raise CitizenOverlapConflictError()

    contact_phone = dto.contact_phone or user.phone
    if slot.modality is AppointmentModality.PHONE and not contact_phone:
        raise ContactPhoneRequiredError()

    appointment_id = str(uuid.uuid4())
    local_day = slot.starts_at.astimezone(policy.tz).date()
    appointment = Appointment(
        id=appointment_id,
        reference=f"RDV-{local_day:%Y%m%d}-{appointment_id[:6].upper()}",
        citizen_id=user.id,
        slot=slot,
        reason=dto.reason.strip(),
        reminders=tuple(dict.fromkeys(dto.reminders)),
        contact_phone=contact_phone if slot.modality is AppointmentModality.PHONE else None,
        created_at=now,
        updated_at=now,
    )
    # La contrainte d'unicité en base tranche entre deux réservations simultanées.
    return repo.add_appointment(appointment)


def list_my_appointments(user: User, repo: AppointmentRepository) -> list[Appointment]:
    return repo.list_appointments(AppointmentQuery(citizen_id=user.id))


def get_appointment(actor: Actor, appointment_id: str, repo: AppointmentRepository) -> Appointment:
    appointment = repo.get_appointment(appointment_id)
    if appointment is None:
        raise AppointmentNotFoundError(appointment_id)
    ensure_can_view_appointment(actor, appointment)
    return appointment


def cancel_appointment(
    actor: Actor,
    appointment_id: str,
    dto: CancelIn,
    repo: AppointmentRepository,
    users: UserRepository,
    policy: AppointmentPolicy,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Appointment:
    """L'habitant annule le sien (jusqu'à X heures avant) ; la mairie annule avec un motif."""
    now = _now(now)
    appointment = get_appointment(actor, appointment_id, repo)

    if actor.role is Role.CITIZEN:
        appointment.cancel_by_citizen(now, policy.cancellation_notice)
        if dto.reason and dto.reason.strip():
            appointment.cancel_reason = dto.reason.strip()
        return repo.update_appointment(appointment)

    ensure_can_manage_slot(actor, appointment.slot)
    reason = (dto.reason or "").strip()
    if len(reason) < 5:
        raise InvalidSlotError("Give the citizen a reason for the cancellation (5 characters min.)")
    appointment.cancel_by_city(reason, now)
    saved = repo.update_appointment(appointment)
    # Créneau retiré de l'offre : la mairie l'annule parce qu'elle ne peut pas l'assurer.
    slot = saved.slot
    slot.is_open = False
    repo.update_slot(slot)

    citizen = users.get_by_id(saved.citizen_id)
    if citizen is not None and citizen.is_active:
        _queue_notices(saved, citizen, NoticeKind.CANCELLED_BY_CITY, "-", repo, policy, now)
    record(
        audit,
        AuditAction.APPOINTMENT_CANCELLED,
        AuditTarget.APPOINTMENT,
        saved.id,
        saved.reference,
        institut_id=slot.institut_id,
        details={"reason": reason, "starts_at": slot.starts_at.isoformat()},
    )
    return saved


def _queue_notices(
    appointment: Appointment,
    citizen: User,
    kind: NoticeKind,
    delay: str,
    repo: AppointmentRepository,
    policy: AppointmentPolicy,
    now: datetime,
) -> None:
    """Notification dans l'application tout de suite ; email / SMS par la tâche de fond."""
    message = cancellation_message(appointment, policy.tz)
    for channel in channels_for(
        email=citizen.email,
        email_verified=citizen.email_verified,
        phone=citizen.phone,
        phone_verified=citizen.phone_verified,
    ):
        in_app = channel is NoticeChannel.IN_APP
        repo.add_notice_if_absent(
            AppointmentNotice(
                id=str(uuid.uuid4()),
                appointment_id=appointment.id,
                user_id=citizen.id,
                kind=kind,
                channel=channel,
                delay=delay,
                title=message.title,
                message=message.sms if channel is NoticeChannel.SMS else message.text,
                created_at=now,
                status=NoticeStatus.SENT if in_app else NoticeStatus.PENDING,
                sent_at=now if in_app else None,
            )
        )


def record_attendance(
    actor: Actor,
    appointment_id: str,
    status: AppointmentStatus,
    repo: AppointmentRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Appointment:
    if status not in ATTENDANCE_STATUSES:
        raise InvalidSlotError("Attendance is either 'honored' or 'no_show'")
    appointment = get_appointment(actor, appointment_id, repo)
    ensure_can_manage_slot(actor, appointment.slot)
    previous = appointment.status
    appointment.record_attendance(status, _now(now))
    saved = repo.update_appointment(appointment)
    record(
        audit,
        AuditAction.APPOINTMENT_ATTENDANCE_RECORDED,
        AuditTarget.APPOINTMENT,
        saved.id,
        saved.reference,
        institut_id=saved.slot.institut_id,
        details={"status": {"from": previous.value, "to": saved.status.value}},
    )
    return saved


# ─── agent / manager / admin : créneaux et planning ─────────────────


def _resolve_owner(
    actor: Actor,
    fields: SlotFields,
    agents: AgentRepository,
    instituts: InstitutRepository,
) -> tuple[str, str | None]:
    """(institut, agent) du créneau selon le rôle de l'auteur."""
    ensure_staff(actor)
    if actor.role is Role.AGENT:
        if actor.agent_id is None or actor.institut_id is None:
            raise ForbiddenError()
        return actor.institut_id, actor.agent_id

    if actor.role is Role.MANAGER:
        if actor.institut_id is None:
            raise ForbiddenError()
        institut_id = actor.institut_id
    else:
        if not fields.institut_id:
            raise InvalidSlotError("Choose the service (institut) offering the slot")
        institut_id = fields.institut_id

    institut = instituts.get_by_id(institut_id)
    if institut is None or not institut.is_active:
        raise InstitutNotFoundError(institut_id)

    if not fields.agent_id:
        return institut_id, None
    agent = agents.get_by_id(fields.agent_id)
    if agent is None or not agent.is_active or agent.institut_id != institut_id:
        raise InvalidSlotError("The agent must be an active member of this service")
    return institut_id, agent.id


def _check_agent_free(
    agent_id: str | None,
    times: list[tuple[datetime, datetime]],
    repo: AppointmentRepository,
) -> None:
    if agent_id is None or not times:
        return
    existing = repo.list_slots(
        SlotQuery(
            agent_id=agent_id,
            since=times[0][0] - timedelta(days=1),
            until=times[-1][1],
            include_closed=False,
        )
    )
    for start, end in times:
        if any(slot.overlaps(start, end) for slot in existing):
            raise SlotOverlapConflictError(agent_id)


def _new_slots(
    actor: Actor,
    fields: SlotFields,
    times: list[tuple[datetime, datetime]],
    repo: AppointmentRepository,
    agents: AgentRepository,
    instituts: InstitutRepository,
    now: datetime,
) -> list[Slot]:
    institut_id, agent_id = _resolve_owner(actor, fields, agents, instituts)
    if any(start <= now for start, _ in times):
        raise SlotInPastError()
    _check_agent_free(agent_id, times, repo)
    return [
        Slot(
            id=str(uuid.uuid4()),
            institut_id=institut_id,
            agent_id=agent_id,
            starts_at=start,
            ends_at=end,
            modality=fields.modality,
            location=fields.location.strip(),
            preparation=fields.preparation.strip(),
            created_by=actor.user_id,
            created_at=now,
        )
        for start, end in times
    ]


def create_slot(
    actor: Actor,
    dto: CreateSlotIn,
    repo: AppointmentRepository,
    agents: AgentRepository,
    instituts: InstitutRepository,
    policy: AppointmentPolicy,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Slot:
    now = _now(now)
    check_duration(dto.duration_minutes)
    start = local_to_utc(dto.day, dto.start_time, policy.tz)
    times = [(start, start + timedelta(minutes=dto.duration_minutes))]
    slots = repo.add_slots(_new_slots(actor, dto, times, repo, agents, instituts, now))
    _audit_created(audit, slots, policy)
    return slots[0]


def create_series(
    actor: Actor,
    dto: CreateSeriesIn,
    repo: AppointmentRepository,
    agents: AgentRepository,
    instituts: InstitutRepository,
    policy: AppointmentPolicy,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> list[Slot]:
    now = _now(now)
    series = SlotSeries(
        first_day=dto.first_day,
        last_day=dto.last_day,
        weekdays=frozenset(dto.weekdays),
        day_start=dto.day_start,
        day_end=dto.day_end,
        duration_minutes=dto.duration_minutes,
        break_minutes=dto.break_minutes,
    )
    # Les créneaux déjà commencés (série démarrant aujourd'hui) sont simplement omis.
    times = [(start, end) for start, end in series_times(series, policy.tz) if start > now]
    if not times:
        raise SlotInPastError()
    slots = repo.add_slots(_new_slots(actor, dto, times, repo, agents, instituts, now))
    _audit_created(audit, slots, policy)
    return slots


def _audit_created(audit: AuditTrail | None, slots: list[Slot], policy: AppointmentPolicy) -> None:
    if not slots:
        return
    first, last = slots[0], slots[-1]
    label = f"{len(slots)} créneau(x) — {first.institut_name}"
    record(
        audit,
        AuditAction.APPOINTMENT_SLOTS_CREATED,
        AuditTarget.APPOINTMENT_SLOT,
        first.id,
        label,
        institut_id=first.institut_id,
        details={
            "count": len(slots),
            "first": first.starts_at.astimezone(policy.tz).isoformat(),
            "last": last.starts_at.astimezone(policy.tz).isoformat(),
            "agent": first.agent_name or None,
        },
    )


def close_slot(
    actor: Actor,
    slot_id: str,
    repo: AppointmentRepository,
    policy: AppointmentPolicy,
    audit: AuditTrail | None = None,
) -> Slot:
    """Retire un créneau libre de l'offre. Un créneau réservé s'annule par son rendez-vous."""
    slot = repo.get_slot(slot_id)
    if slot is None:
        raise SlotNotFoundError(slot_id)
    ensure_can_manage_slot(actor, slot)
    if slot.is_booked:
        raise SlotAlreadyBookedConflictError(slot.id)
    if not slot.is_open:
        return slot
    slot.is_open = False
    saved = repo.update_slot(slot)
    record(
        audit,
        AuditAction.APPOINTMENT_SLOT_CLOSED,
        AuditTarget.APPOINTMENT_SLOT,
        saved.id,
        f"{saved.institut_name} — {saved.starts_at.astimezone(policy.tz):%d/%m/%Y %H:%M}",
        institut_id=saved.institut_id,
    )
    return saved


@dataclass
class PlanningEntry:
    slot: Slot
    appointment: Appointment | None = None


def planning(
    actor: Actor,
    first_day: date,
    last_day: date,
    repo: AppointmentRepository,
    policy: AppointmentPolicy,
    institut_id: str | None = None,
) -> list[PlanningEntry]:
    """Créneaux proposés (libres ou réservés) du périmètre, jour par jour."""
    ensure_staff(actor)
    if last_day < first_day or (last_day - first_day).days > 62:
        raise InvalidSlotError("The planning covers 1 to 62 days")
    scope = planning_scope(actor, institut_id)
    if scope.is_empty:
        return []
    since = local_to_utc(first_day, time(0, 0), policy.tz)
    until = local_to_utc(last_day + timedelta(days=1), time(0, 0), policy.tz)
    slots = repo.list_slots(
        SlotQuery(
            institut_id=scope.institut_id,
            agent_id=scope.agent_id,
            since=since,
            until=until,
            include_closed=False,
        )
    )
    booked = repo.list_appointments(
        AppointmentQuery(
            institut_id=scope.institut_id,
            agent_id=scope.agent_id,
            since=since,
            until=until,
            statuses=OCCUPYING_STATUSES,
        )
    )
    by_slot = {appointment.slot.id: appointment for appointment in booked}
    return [PlanningEntry(slot=slot, appointment=by_slot.get(slot.id)) for slot in slots]
