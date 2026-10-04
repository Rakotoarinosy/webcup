import { ALERT_AUDIENCE_VALUES, ALERT_LEVEL_VALUES, AlertAudience, AlertLevel, AlertStatus } from '@/app/shared/api-enums';

export type { AlertAudience, AlertLevel, AlertStatus };
export const ALERT_LEVELS = ALERT_LEVEL_VALUES;
export const ALERT_AUDIENCES = ALERT_AUDIENCE_VALUES;

/** Émetteurs proposés (le champ reste libre). */
export const ALERT_ISSUERS = ['Haut Conseil de la Ville', 'Centre de surveillance environnementale', 'Mairie de Terra Nova', 'Service de santé publique'];

/** Miroir de AlertOut (vue publique). */
export interface CityAlert {
    id: string;
    title: string;
    message: string;
    instructions: string;
    level: AlertLevel;
    audience: AlertAudience;
    zone: string | null;
    issuer: string;
    starts_at: string;
    ends_at: string | null;
    ended_at: string | null;
    status: AlertStatus;
    created_at: string;
    updated_at: string;
}

/** Miroir de AlertAdminOut. */
export interface CityAlertAdmin extends CityAlert {
    author_id: string | null;
    author_name: string;
    can_manage: boolean;
}

export interface CreatedCityAlert extends CityAlertAdmin {
    email_recipients: number;
}

export interface AlertIn {
    title: string;
    message: string;
    instructions: string;
    level: AlertLevel;
    audience: AlertAudience;
    zone: string | null;
    issuer: string;
    starts_at: string | null;
    ends_at: string | null;
}

export interface CreateAlertIn extends AlertIn {
    notify_by_email: boolean;
}

export interface RecommendationIn {
    title: string;
    message: string;
    level: AlertLevel;
    audience: AlertAudience;
    zone: string | null;
}

/**
 * Le niveau est toujours donné en texte ET par une icône : jamais seulement par la couleur.
 * `role` : une urgence interrompt le lecteur d'écran (alert), le reste est annoncé poliment (status).
 */
export const LEVEL_DISPLAY: Record<AlertLevel, { icon: string; label: string; role: 'alert' | 'status'; tone: string }> = {
    Urgence: { icon: 'pi pi-exclamation-triangle', label: 'Urgence', role: 'alert', tone: 'alert-urgent' },
    Attention: { icon: 'pi pi-exclamation-circle', label: 'Attention', role: 'status', tone: 'alert-attention' },
    Information: { icon: 'pi pi-info-circle', label: 'Information', role: 'status', tone: 'alert-info' }
};

export function alertSeverity(level: AlertLevel): 'danger' | 'warn' | 'info' {
    return level === 'Urgence' ? 'danger' : level === 'Attention' ? 'warn' : 'info';
}

export function statusSeverity(status: AlertStatus): 'success' | 'secondary' | 'info' {
    return status === 'En cours' ? 'success' : status === 'Programmée' ? 'info' : 'secondary';
}
