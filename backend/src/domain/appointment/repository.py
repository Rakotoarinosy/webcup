"""Interface du repository des rendez-vous : créneaux, réservations et messages envoyés."""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime

from src.domain.appointment.entities import (
    Appointment,
    AppointmentNotice,
    AppointmentStatus,
    Slot,
)


@dataclass(frozen=True)
class SlotQuery:
    institut_id: str | None = None
    agent_id: str | None = None
    since: datetime | None = None  # début >= since
    until: datetime | None = None  # début < until
    available_only: bool = False  # ouverts et non réservés
    include_closed: bool = True


@dataclass(frozen=True)
class AppointmentQuery:
    citizen_id: str | None = None
    institut_id: str | None = None
    agent_id: str | None = None
    since: datetime | None = None  # début du créneau >= since
    until: datetime | None = None  # début du créneau < until
    statuses: frozenset[AppointmentStatus] = frozenset()


class AppointmentRepository(ABC):
    # ─── créneaux ───
    @abstractmethod
    def get_slot(self, slot_id: str) -> Slot | None: ...

    @abstractmethod
    def list_slots(self, query: SlotQuery) -> "list[Slot]":
        """Par heure de début croissante."""

    @abstractmethod
    def add_slots(self, slots: "list[Slot]") -> "list[Slot]": ...

    @abstractmethod
    def update_slot(self, slot: Slot) -> Slot: ...

    # ─── rendez-vous ───
    @abstractmethod
    def get_appointment(self, appointment_id: str) -> Appointment | None: ...

    @abstractmethod
    def get_active_for_slot(self, slot_id: str) -> Appointment | None:
        """Le rendez-vous qui occupe le créneau (confirmé, honoré ou absent)."""

    @abstractmethod
    def list_appointments(self, query: AppointmentQuery) -> "list[Appointment]":
        """Par heure de début croissante."""

    @abstractmethod
    def add_appointment(self, appointment: Appointment) -> Appointment:
        """Lève SlotAlreadyBookedConflictError si le créneau est déjà occupé (contrainte en base)."""

    @abstractmethod
    def update_appointment(self, appointment: Appointment) -> Appointment: ...

    # ─── messages (rappels, annulations) ───
    @abstractmethod
    def list_notices(self, appointment_ids: "list[str]") -> "list[AppointmentNotice]": ...

    @abstractmethod
    def add_notice_if_absent(self, notice: AppointmentNotice) -> bool:
        """Mémorise le message ; False s'il existe déjà (même rendez-vous, nature, délai, canal)."""

    @abstractmethod
    def deliverable_notices(self, limit: int, max_attempts: int) -> "list[AppointmentNotice]":
        """Messages email / SMS pas encore envoyés (en attente, en échec ou en cours), qui
        n'ont pas épuisé leurs essais. Les plus anciens d'abord."""

    @abstractmethod
    def claim_notice(self, notice: AppointmentNotice, now: datetime) -> bool:
        """Réserve le message pour un envoi (statut « en cours », un essai de plus).

        Échange conditionnel sur le nombre d'essais : un seul worker gagne, jamais de doublon."""

    @abstractmethod
    def save_notice(self, notice: AppointmentNotice) -> AppointmentNotice: ...
