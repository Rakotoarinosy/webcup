/** Données de test partagées par les specs des rendez-vous. */
import { Appointment, AppointmentPolicy, Slot } from './appointment.model';

export const POLICY: AppointmentPolicy = {
    timezone: 'Indian/Antananarivo',
    timezone_label: 'heure de la mairie (Indian/Antananarivo, UTC+3)',
    cancellation_notice_hours: 2,
    booking_horizon_days: 60,
    reminder_options: [
        { value: '2d', label: '2 jours avant', minutes: 2880, is_default: false },
        { value: '24h', label: '24 heures avant', minutes: 1440, is_default: true },
        { value: '3h', label: '3 heures avant', minutes: 180, is_default: false },
        { value: '1h', label: '1 heure avant', minutes: 60, is_default: true }
    ]
};

export const SLOT: Slot = {
    id: 's-1',
    institut_id: 'i-1',
    institut_name: 'État civil',
    agent_id: 'a-1',
    agent_name: 'Rado',
    modality: 'in_person',
    modality_label: 'Sur place',
    location: 'Hôtel de ville, guichet 2',
    preparation: 'Carte d’identité',
    instructions: 'Présentez-vous 10 minutes avant l’heure.',
    directions_url: 'https://www.google.com/maps/dir/?api=1&destination=H',
    capacity: 1,
    is_open: true,
    is_booked: false,
    time: {
        starts_at: '2030-10-14T06:30:00Z',
        ends_at: '2030-10-14T07:00:00Z',
        day: '2030-10-14',
        day_label: 'lundi 14 octobre 2030',
        start_time: '09:30',
        end_time: '10:00',
        utc_offset: 'UTC+3',
        timezone: 'Indian/Antananarivo',
        duration_minutes: 30,
        label: 'lundi 14 octobre 2030 de 09:30 à 10:00 (UTC+3, durée 30 min)'
    }
};

export const APPOINTMENT: Appointment = {
    id: 'ap-1',
    reference: 'RDV-20301014-ABC123',
    status: 'confirmed',
    status_label: 'Confirmé',
    reason: 'Acte de naissance',
    reminders: ['24h', '1h'],
    reminder_labels: ['24 heures avant', '1 heure avant'],
    contact_phone: null,
    created_at: '2030-10-01T08:00:00Z',
    cancelled_at: null,
    cancel_reason: null,
    attendance_recorded_at: null,
    is_upcoming: true,
    can_cancel: true,
    cancellation_deadline: '2030-10-14T04:30:00Z',
    slot: { ...SLOT, is_booked: true }
};
