/** Miroir de backend/src/features/appointment/schemas.py (F39 rendez-vous, F40 rappels). */

import { HttpErrorResponse } from '@angular/common/http';

import { AppointmentModality, AppointmentStatus, ReminderDelay } from '@/app/shared/api-enums';
import { apiErrorMessage } from '@/app/users/user.service';

export type { AppointmentModality, AppointmentStatus, ReminderDelay };

/** Horaire décrit par le serveur dans le fuseau de la mairie : aucune conversion côté client. */
export interface SlotTime {
    starts_at: string;
    ends_at: string;
    day: string;
    day_label: string;
    start_time: string;
    end_time: string;
    utc_offset: string;
    timezone: string;
    duration_minutes: number;
    label: string;
}

export interface Slot {
    id: string;
    institut_id: string;
    institut_name: string;
    agent_id: string | null;
    agent_name: string;
    modality: AppointmentModality;
    modality_label: string;
    location: string;
    preparation: string;
    instructions: string;
    directions_url: string | null;
    capacity: number;
    is_open: boolean;
    is_booked: boolean;
    time: SlotTime;
}

export interface Appointment {
    id: string;
    reference: string;
    status: AppointmentStatus;
    status_label: string;
    reason: string;
    reminders: ReminderDelay[];
    reminder_labels: string[];
    contact_phone: string | null;
    created_at: string;
    cancelled_at: string | null;
    cancel_reason: string | null;
    attendance_recorded_at: string | null;
    is_upcoming: boolean;
    can_cancel: boolean;
    cancellation_deadline: string;
    slot: Slot;
}

export interface StaffAppointment extends Appointment {
    citizen_id: string;
    citizen_name: string;
    citizen_email: string | null;
    citizen_phone: string | null;
}

export interface PlanningSlot extends Slot {
    appointment: StaffAppointment | null;
}

export interface Service {
    institut_id: string;
    name: string;
    description: string;
    available_slots: number;
    next_available: SlotTime | null;
}

export interface AvailableDay {
    day: string;
    day_label: string;
    available_slots: number;
}

export interface ReminderOption {
    value: ReminderDelay;
    label: string;
    minutes: number;
    is_default: boolean;
}

export interface AppointmentPolicy {
    timezone: string;
    timezone_label: string;
    cancellation_notice_hours: number;
    booking_horizon_days: number;
    reminder_options: ReminderOption[];
}

export interface BookIn {
    slot_id: string;
    reason: string;
    reminders: ReminderDelay[];
    contact_phone?: string | null;
}

interface SlotFields {
    institut_id?: string | null;
    agent_id?: string | null;
    modality: AppointmentModality;
    location: string;
    preparation: string;
}

export interface CreateSlotIn extends SlotFields {
    day: string;
    start_time: string;
    duration_minutes: number;
}

export interface CreateSeriesIn extends SlotFields {
    first_day: string;
    last_day: string;
    weekdays: number[];
    day_start: string;
    day_end: string;
    duration_minutes: number;
    break_minutes: number;
}

export const MODALITY_LABELS: Record<AppointmentModality, string> = {
    in_person: 'Sur place',
    phone: 'Par téléphone',
    video: 'En visio'
};

export const MODALITY_ICONS: Record<AppointmentModality, string> = {
    in_person: 'pi pi-map-marker',
    phone: 'pi pi-phone',
    video: 'pi pi-video'
};

export const STATUS_LABELS: Record<AppointmentStatus, string> = {
    confirmed: 'Confirmé',
    cancelled_by_citizen: 'Annulé par vous',
    cancelled_by_city: 'Annulé par la mairie',
    honored: 'Honoré',
    no_show: 'Absent'
};

export const WEEKDAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export function statusSeverity(status: AppointmentStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
        case 'confirmed':
            return 'info';
        case 'honored':
            return 'success';
        case 'no_show':
            return 'warn';
        case 'cancelled_by_city':
            return 'danger';
        default:
            return 'secondary';
    }
}

export function durationLabel(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    if (hours && rest) return `${hours} h ${String(rest).padStart(2, '0')}`;
    return hours ? `${hours} h` : `${rest} min`;
}

/** Messages d'erreur métier en français. */
export function appointmentErrorMessage(error: unknown): string {
    const messages: Record<string, string> = {
        SlotAlreadyBookedConflictError: 'Ce créneau vient d’être réservé ou est déjà occupé. Choisissez-en un autre.',
        SlotClosedError: 'Ce créneau n’est plus proposé. Choisissez-en un autre.',
        SlotInPastError: 'Ce créneau est déjà passé ou commencé.',
        SlotOverlapConflictError: 'L’agent a déjà un créneau qui chevauche celui-ci.',
        CitizenOverlapConflictError: 'Vous avez déjà un rendez-vous à ce moment-là.',
        CancellationTooLateError: 'Il est trop tard pour annuler en ligne. Contactez directement le service.',
        AppointmentNotCancellableError: 'Ce rendez-vous ne peut plus être annulé.',
        AttendanceTooEarlyError: 'La présence se note une fois l’heure du rendez-vous arrivée.',
        ContactPhoneRequiredError: 'Indiquez le numéro auquel l’agent doit vous appeler.',
        InstitutNotFoundError: 'Ce service n’existe plus.'
    };
    if (error instanceof HttpErrorResponse) {
        const message = messages[error.error?.error];
        if (message) return message;
    }
    return apiErrorMessage(error);
}

/** Téléchargement d'un fichier reçu de l'API (agenda .ics). */
export function saveBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}
