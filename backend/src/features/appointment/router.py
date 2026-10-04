"""Endpoints HTTP des rendez-vous (F39) ; les rappels (F40) partent de la tâche de fond.

Habitant
  GET  /appointments/policy                         fuseau, délai d'annulation, rappels proposés
  GET  /appointments/services                       services et créneaux libres
  GET  /appointments/services/{institut_id}/days    jours ayant des créneaux libres
  GET  /appointments/services/{institut_id}/slots?day=YYYY-MM-DD
  POST /appointments                                réserver
  GET  /appointments/mine                           mes rendez-vous
Habitant ou agent concerné
  GET  /appointments/{id}  ·  GET /appointments/{id}/calendar.ics  ·  POST /appointments/{id}/cancel
Agent / manager / admin
  POST /appointments/slots  ·  POST /appointments/slots/series  ·  GET /appointments/slots (planning)
  POST /appointments/slots/{id}/close  ·  POST /appointments/{id}/attendance
"""

from datetime import UTC, date, datetime, timedelta

from fastapi import APIRouter, Depends, Query, Response
from fastapi import status as http_status
from sqlalchemy.orm import Session

from src.domain.agent import AgentRepository
from src.domain.appointment import (
    DEFAULT_REMINDERS,
    REMINDER_LABELS,
    REMINDER_MINUTES,
    Appointment,
    AppointmentRepository,
    ReminderDelay,
)
from src.domain.appointment.messages import to_ics
from src.domain.appointment.timing import day_label, timezone_label
from src.domain.citizen_request import Actor
from src.domain.institut import InstitutRepository
from src.domain.user import Role, User, UserRepository
from src.features.appointment import use_cases
from src.features.appointment.presenters import (
    appointment_out,
    appointment_staff_out,
    slot_out,
    time_out,
)
from src.features.appointment.schemas import (
    AppointmentOut,
    AppointmentStaffOut,
    AttendanceIn,
    BookIn,
    CancelIn,
    CreateSeriesIn,
    CreateSlotIn,
    DayOut,
    PlanningSlotOut,
    PolicyOut,
    ReminderOptionOut,
    SeriesCreatedOut,
    ServiceOut,
    SlotOut,
)
from src.features.appointment.use_cases import AppointmentPolicy
from src.features.audit.recording import AuditTrail
from src.features.audit.router import get_audit_trail
from src.infrastructure.config import get_settings
from src.infrastructure.persistence.agent_repository import SqlAlchemyAgentRepository
from src.infrastructure.persistence.appointment_repository import (
    SqlAlchemyAppointmentRepository,
)
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.institut_repository import SqlAlchemyInstitutRepository
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository
from src.infrastructure.security.deps import get_current_actor, get_current_user
from src.shared.timezone import resolve_timezone

router = APIRouter(prefix="/appointments", tags=["appointments"])


def get_appointment_policy() -> AppointmentPolicy:
    settings = get_settings()
    return AppointmentPolicy(
        tz=resolve_timezone(settings.app_timezone),
        tz_name=settings.app_timezone,
        cancellation_notice=timedelta(hours=settings.appointment_cancellation_notice_hours),
        booking_horizon=timedelta(days=settings.appointment_booking_horizon_days),
    )


def get_appointment_repo(db: Session = Depends(get_db)) -> AppointmentRepository:
    return SqlAlchemyAppointmentRepository(db)


def get_institut_repo(db: Session = Depends(get_db)) -> InstitutRepository:
    return SqlAlchemyInstitutRepository(db)


def get_agent_repo(db: Session = Depends(get_db)) -> AgentRepository:
    return SqlAlchemyAgentRepository(db)


def get_users_repo(db: Session = Depends(get_db)) -> UserRepository:
    return SqlAlchemyUserRepository(db)


def _now() -> datetime:
    return datetime.now(UTC)


# ─── informations générales ───


@router.get("/policy", response_model=PolicyOut)
def policy_endpoint(
    _: User = Depends(get_current_user),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
) -> PolicyOut:
    return PolicyOut(
        timezone=policy.tz_name,
        timezone_label=timezone_label(policy.tz_name, _now(), policy.tz),
        cancellation_notice_hours=policy.cancellation_notice_hours,
        booking_horizon_days=policy.booking_horizon.days,
        reminder_options=[
            ReminderOptionOut(
                value=delay,
                label=REMINDER_LABELS[delay],
                minutes=REMINDER_MINUTES[delay],
                is_default=delay in DEFAULT_REMINDERS,
            )
            for delay in ReminderDelay
        ],
    )


# ─── habitant : choisir ───


@router.get("/services", response_model=list[ServiceOut])
def services_endpoint(
    _: User = Depends(get_current_user),
    repo: AppointmentRepository = Depends(get_appointment_repo),
    instituts: InstitutRepository = Depends(get_institut_repo),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
) -> list[ServiceOut]:
    return [
        ServiceOut(
            institut_id=item.institut_id,
            name=item.name,
            description=item.description,
            available_slots=item.available_slots,
            next_available=(
                time_out(item.next_available.starts_at, item.next_available.ends_at, policy)
                if item.next_available
                else None
            ),
        )
        for item in use_cases.list_services(repo, instituts, policy)
    ]


@router.get("/services/{institut_id}/days", response_model=list[DayOut])
def days_endpoint(
    institut_id: str,
    _: User = Depends(get_current_user),
    repo: AppointmentRepository = Depends(get_appointment_repo),
    instituts: InstitutRepository = Depends(get_institut_repo),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
) -> list[DayOut]:
    return [
        DayOut(day=day, day_label=day_label(day), available_slots=count)
        for day, count in use_cases.list_available_days(institut_id, repo, instituts, policy)
    ]


@router.get("/services/{institut_id}/slots", response_model=list[SlotOut])
def day_slots_endpoint(
    institut_id: str,
    day: date,
    _: User = Depends(get_current_user),
    repo: AppointmentRepository = Depends(get_appointment_repo),
    instituts: InstitutRepository = Depends(get_institut_repo),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
) -> list[SlotOut]:
    slots = use_cases.list_day_slots(institut_id, day, repo, instituts, policy)
    return [slot_out(slot, policy) for slot in slots]


# ─── habitant : réserver ───


@router.post("", response_model=AppointmentOut, status_code=http_status.HTTP_201_CREATED)
def book_endpoint(
    payload: BookIn,
    user: User = Depends(get_current_user),
    repo: AppointmentRepository = Depends(get_appointment_repo),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
) -> AppointmentOut:
    now = _now()
    return appointment_out(use_cases.book(user, payload, repo, policy, now), policy, now)


@router.get("/mine", response_model=list[AppointmentOut])
def mine_endpoint(
    user: User = Depends(get_current_user),
    repo: AppointmentRepository = Depends(get_appointment_repo),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
) -> list[AppointmentOut]:
    now = _now()
    return [
        appointment_out(item, policy, now) for item in use_cases.list_my_appointments(user, repo)
    ]


# ─── agent / manager / admin : créneaux (routes fixes avant /{appointment_id}) ───


@router.post("/slots", response_model=SlotOut, status_code=http_status.HTTP_201_CREATED)
def create_slot_endpoint(
    payload: CreateSlotIn,
    actor: Actor = Depends(get_current_actor),
    repo: AppointmentRepository = Depends(get_appointment_repo),
    agents: AgentRepository = Depends(get_agent_repo),
    instituts: InstitutRepository = Depends(get_institut_repo),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
    audit: AuditTrail = Depends(get_audit_trail),
) -> SlotOut:
    slot = use_cases.create_slot(actor, payload, repo, agents, instituts, policy, audit=audit)
    return slot_out(slot, policy)


@router.post(
    "/slots/series", response_model=SeriesCreatedOut, status_code=http_status.HTTP_201_CREATED
)
def create_series_endpoint(
    payload: CreateSeriesIn,
    actor: Actor = Depends(get_current_actor),
    repo: AppointmentRepository = Depends(get_appointment_repo),
    agents: AgentRepository = Depends(get_agent_repo),
    instituts: InstitutRepository = Depends(get_institut_repo),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
    audit: AuditTrail = Depends(get_audit_trail),
) -> SeriesCreatedOut:
    slots = use_cases.create_series(actor, payload, repo, agents, instituts, policy, audit=audit)
    return SeriesCreatedOut(created=len(slots), slots=[slot_out(slot, policy) for slot in slots])


@router.get("/slots", response_model=list[PlanningSlotOut])
def planning_endpoint(
    from_day: date,
    to_day: date,
    institut_id: str | None = Query(default=None, max_length=36),
    actor: Actor = Depends(get_current_actor),
    repo: AppointmentRepository = Depends(get_appointment_repo),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
) -> list[PlanningSlotOut]:
    now = _now()
    entries = use_cases.planning(actor, from_day, to_day, repo, policy, institut_id)
    return [
        PlanningSlotOut(
            **slot_out(entry.slot, policy).model_dump(),
            appointment=(
                appointment_staff_out(entry.appointment, policy, now) if entry.appointment else None
            ),
        )
        for entry in entries
    ]


@router.post("/slots/{slot_id}/close", response_model=SlotOut)
def close_slot_endpoint(
    slot_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: AppointmentRepository = Depends(get_appointment_repo),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
    audit: AuditTrail = Depends(get_audit_trail),
) -> SlotOut:
    return slot_out(use_cases.close_slot(actor, slot_id, repo, policy, audit=audit), policy)


# ─── un rendez-vous ───


def _out(actor: Actor, appointment: Appointment, policy: AppointmentPolicy) -> AppointmentOut:
    now = _now()
    if actor.role is Role.CITIZEN:
        return appointment_out(appointment, policy, now)
    return appointment_staff_out(appointment, policy, now)


@router.get("/{appointment_id}", response_model=AppointmentStaffOut | AppointmentOut)
def get_endpoint(
    appointment_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: AppointmentRepository = Depends(get_appointment_repo),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
) -> AppointmentOut:
    return _out(actor, use_cases.get_appointment(actor, appointment_id, repo), policy)


@router.get("/{appointment_id}/calendar.ics")
def calendar_endpoint(
    appointment_id: str,
    actor: Actor = Depends(get_current_actor),
    repo: AppointmentRepository = Depends(get_appointment_repo),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
) -> Response:
    appointment = use_cases.get_appointment(actor, appointment_id, repo)
    return Response(
        content=to_ics(appointment, policy.tz, _now()),
        media_type="text/calendar; charset=utf-8",
        headers={
            "Content-Disposition": f'attachment; filename="{appointment.reference}.ics"',
        },
    )


@router.post("/{appointment_id}/cancel", response_model=AppointmentStaffOut | AppointmentOut)
def cancel_endpoint(
    appointment_id: str,
    payload: CancelIn,
    actor: Actor = Depends(get_current_actor),
    repo: AppointmentRepository = Depends(get_appointment_repo),
    users: UserRepository = Depends(get_users_repo),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
    audit: AuditTrail = Depends(get_audit_trail),
) -> AppointmentOut:
    appointment = use_cases.cancel_appointment(
        actor, appointment_id, payload, repo, users, policy, audit=audit
    )
    return _out(actor, appointment, policy)


@router.post("/{appointment_id}/attendance", response_model=AppointmentStaffOut)
def attendance_endpoint(
    appointment_id: str,
    payload: AttendanceIn,
    actor: Actor = Depends(get_current_actor),
    repo: AppointmentRepository = Depends(get_appointment_repo),
    policy: AppointmentPolicy = Depends(get_appointment_policy),
    audit: AuditTrail = Depends(get_audit_trail),
) -> AppointmentStaffOut:
    appointment = use_cases.record_attendance(
        actor, appointment_id, payload.status, repo, audit=audit
    )
    return appointment_staff_out(appointment, policy, _now())
