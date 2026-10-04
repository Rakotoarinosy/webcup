"""Qui peut voir et gérer créneaux et rendez-vous.

| Rôle    | Créneaux (créer, fermer, planning)   | Rendez-vous                                 |
|---------|--------------------------------------|---------------------------------------------|
| CITIZEN | non (voit les créneaux libres)       | les siens uniquement                        |
| AGENT   | les siens, dans son institut         | ceux de ses créneaux                        |
| MANAGER | ceux de son institut                 | ceux de son institut                        |
| ADMIN   | tous                                 | tous                                        |
"""

from dataclasses import dataclass

from src.domain.appointment.entities import Appointment, Slot
from src.domain.citizen_request.access import Actor
from src.domain.user.entities import Role
from src.domain.user.exceptions import ForbiddenError


@dataclass(frozen=True)
class PlanningScope:
    """Périmètre du planning ; `is_empty` pour un agent ou manager non rattaché."""

    institut_id: str | None = None
    agent_id: str | None = None
    is_empty: bool = False


def planning_scope(actor: Actor, institut_id: str | None = None) -> PlanningScope:
    match actor.role:
        case Role.ADMIN:
            return PlanningScope(institut_id=institut_id)
        case Role.MANAGER if actor.institut_id is not None:
            return PlanningScope(institut_id=actor.institut_id)
        case Role.AGENT if actor.agent_id is not None:
            return PlanningScope(agent_id=actor.agent_id)
        case _:
            return PlanningScope(is_empty=True)


def can_manage_slot(actor: Actor, slot: Slot) -> bool:
    match actor.role:
        case Role.ADMIN:
            return True
        case Role.MANAGER:
            return actor.institut_id is not None and slot.institut_id == actor.institut_id
        case Role.AGENT:
            return actor.agent_id is not None and slot.agent_id == actor.agent_id
        case _:
            return False


def can_view_appointment(actor: Actor, appointment: Appointment) -> bool:
    if actor.role is Role.CITIZEN:
        return appointment.citizen_id == actor.user_id
    return can_manage_slot(actor, appointment.slot)


def ensure_can_manage_slot(actor: Actor, slot: Slot) -> None:
    if not can_manage_slot(actor, slot):
        raise ForbiddenError()


def ensure_can_view_appointment(actor: Actor, appointment: Appointment) -> None:
    if not can_view_appointment(actor, appointment):
        raise ForbiddenError()


def ensure_staff(actor: Actor) -> None:
    if actor.role not in (Role.ADMIN, Role.MANAGER, Role.AGENT):
        raise ForbiddenError()
