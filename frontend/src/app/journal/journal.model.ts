/** Miroirs de GET /requests/activity et GET /audit (F47 : traçabilité). */
import { RequestEvent, RequestEventType, RequestStatus } from '@/app/requests/request.model';
import { AuditAction, AuditTarget, Role } from '@/app/shared/api-enums';

export interface RequestActivity {
    event: RequestEvent;
    request_title: string;
    request_status: RequestStatus;
}

export type { AuditAction };

export interface AuditEntry {
    id: string;
    action: AuditAction;
    occurred_at: string;
    target_type: AuditTarget;
    target_id: string;
    target_label: string;
    actor_id: string | null;
    actor_name: string;
    actor_role: Role;
    institut_id: string | null;
    details: Record<string, unknown>;
}

export interface Page<T> {
    items: T[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
}

export interface JournalFilters {
    type: string | null;
    since: string | null; // AAAA-MM-JJ, jour local inclus
    until: string | null; // AAAA-MM-JJ, jour local inclus
    search: string;
    page: number;
}

export const ACTIVITY_TYPES: { value: RequestEventType; label: string }[] = [
    { value: 'created', label: 'Demande enregistrée' },
    { value: 'assigned', label: 'Attribution à un agent' },
    { value: 'status_changed', label: 'Changement de statut' },
    { value: 'resolved', label: 'Demande résolue' },
    { value: 'rejected', label: 'Demande rejetée' },
    { value: 'priority_changed', label: 'Changement de priorité' },
    { value: 'updated', label: 'Demande modifiée' }
];

export const AUDIT_LABELS: Record<AuditAction, string> = {
    account_created: 'Compte créé',
    account_updated: 'Compte modifié',
    account_role_changed: 'Rôle modifié',
    account_password_reset: 'Mot de passe réinitialisé',
    account_deactivated: 'Compte désactivé',
    account_reactivated: 'Compte réactivé',
    account_deleted: 'Compte supprimé',
    institut_created: 'Institut créé',
    institut_updated: 'Institut modifié',
    institut_manager_changed: 'Responsable d’institut changé',
    agent_created: 'Profil agent créé',
    agent_moved: 'Agent changé d’institut',
    agent_activated: 'Agent réactivé',
    agent_deactivated: 'Agent désactivé',
    agent_status_changed: 'Disponibilité de l’agent modifiée',
    data_concern_reviewed: 'Signalement sur les données pris en charge',
    data_concern_answered: 'Réponse à un signalement sur les données',
    account_device_revoked: 'Appareil déconnecté par le titulaire du compte',
    account_suspicious_login_reported: 'Connexion suspecte signalée (« Ce n’était pas moi »)'
};

const FIELD_LABELS: Record<string, string> = {
    name: 'nom',
    email: 'email',
    role: 'rôle',
    description: 'description',
    categories: 'catégories',
    is_active: 'actif',
    manager: 'responsable',
    institut: 'institut',
    status: 'disponibilité'
};

/** « rôle : citizen → manager ; email : a → b » : lisible sans connaître le format technique. */
export function auditDetails(entry: AuditEntry): string {
    return Object.entries(entry.details)
        .map(([field, value]) => {
            const label = FIELD_LABELS[field] ?? field;
            if (value && typeof value === 'object' && 'from' in value && 'to' in value) {
                const change = value as { from: unknown; to: unknown };
                return `${label} : ${show(change.from)} → ${show(change.to)}`;
            }
            return `${label} : ${show(value)}`;
        })
        .join(' ; ');
}

function show(value: unknown): string {
    if (value === null || value === undefined || value === '') return '—';
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'boolean') return value ? 'oui' : 'non';
    return String(value);
}

/** Bornes de jour local converties en instants ISO pour l'API (la fin est exclusive). */
export function dayBounds(filters: Pick<JournalFilters, 'since' | 'until'>): { since?: string; until?: string } {
    const bounds: { since?: string; until?: string } = {};
    if (filters.since) bounds.since = new Date(`${filters.since}T00:00:00`).toISOString();
    if (filters.until) {
        const end = new Date(`${filters.until}T00:00:00`);
        end.setDate(end.getDate() + 1);
        bounds.until = end.toISOString();
    }
    return bounds;
}

/** Export CSV (séparateur « ; » pour Excel en français), champs toujours entre guillemets. */
export function toCsv(header: string[], rows: string[][]): string {
    const cell = (value: string) => `"${value.replace(/"/g, '""')}"`;
    return '﻿' + [header, ...rows].map((row) => row.map(cell).join(';')).join('\r\n');
}
