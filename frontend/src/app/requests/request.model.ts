import {
    REQUEST_CATEGORY_VALUES,
    REQUEST_PRIORITY_VALUES,
    REQUEST_STATUS_VALUES,
    RequestCategory,
    RequestEventType,
    RequestPriority,
    RequestSortBy,
    RequestStatus,
    SortOrder
} from '@/app/shared/api-enums';

// Valeurs générées depuis les Enum du backend (shared/api-enums.ts).
export const REQUEST_CATEGORIES = REQUEST_CATEGORY_VALUES;
export const REQUEST_PRIORITIES = REQUEST_PRIORITY_VALUES;
export const REQUEST_STATUSES = REQUEST_STATUS_VALUES;
export type { RequestCategory, RequestEventType, RequestPriority, RequestSortBy, RequestStatus, SortOrder };

/**
 * Miroir des transitions du domaine (backend : CitizenRequest.change_status).
 * Sert uniquement à n'afficher que les actions possibles : l'API reste seule juge.
 */
export const STATUS_TRANSITIONS: Record<RequestStatus, RequestStatus[]> = {
    Nouveau: ['En cours', 'Rejeté'],
    'En cours': ['En attente', 'Résolu', 'Rejeté'],
    'En attente': ['En cours', 'Rejeté'],
    Résolu: [],
    Rejeté: []
};

export function isOpen(status: RequestStatus): boolean {
    return STATUS_TRANSITIONS[status].length > 0;
}

export function requestStatusSeverity(status: RequestStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
        case 'Nouveau':
            return 'info';
        case 'En cours':
            return 'warn';
        case 'En attente':
            return 'secondary';
        case 'Résolu':
            return 'success';
        case 'Rejeté':
            return 'danger';
    }
}

export function requestPrioritySeverity(priority: RequestPriority): 'warn' | 'danger' | 'secondary' | 'info' {
    switch (priority) {
        case 'Basse':
            return 'secondary';
        case 'Normale':
            return 'info';
        case 'Haute':
            return 'warn';
        case 'Urgente':
            return 'danger';
    }
}

/** Miroir de CitizenRequestOut. */
export interface CitizenRequest {
    id: string;
    /** Référence lisible « TN-2026-1A2B3C4D », identique partout (liste, détail, accusé). */
    reference: string;
    title: string;
    description: string;
    category: RequestCategory;
    priority: RequestPriority;
    status: RequestStatus;
    citizen_id: string;
    institut_id: string | null;
    assigned_agent_id: string | null;
    location: string;
    latitude: number | null;
    longitude: number | null;
    urgency: number;
    affected_citizens: number;
    priority_score: number;
    created_at: string;
    updated_at: string;
    scheduled_at: string | null;
    resolved_at: string | null;
}

/** POST /requests : statut, priorité, institut et agent sont décidés par le serveur. */
export interface SubmitRequestIn {
    title: string;
    description: string;
    category: RequestCategory;
    location: string;
    latitude?: number | null;
    longitude?: number | null;
    /** Saisie pour le compte d'un citoyen (manager, admin) ; ignoré pour un citoyen. */
    citizen_id?: string;
    urgency?: number;
    affected_citizens?: number;
}

/** PATCH /requests/{id} : `category` et `priority` sont réservés au gestionnaire. */
export type EditRequestIn = Partial<Pick<CitizenRequest, 'title' | 'description' | 'location' | 'latitude' | 'longitude' | 'category' | 'priority'>>;

export interface AssignRequestIn {
    agent_id: string;
    scheduled_at?: string | null;
}

/** Une entrée du journal de la demande (GET /requests/{id}/events). */
export interface RequestEvent {
    id: string;
    request_id: string;
    type: RequestEventType;
    actor_id: string | null;
    actor_name: string | null;
    payload: Record<string, unknown>;
    created_at: string;
}

/** Libellé lisible d'un événement, pour les timelines. */
export function eventLabel(event: RequestEvent): string {
    const payload = event.payload;
    switch (event.type) {
        case 'created':
            return 'Demande enregistrée';
        case 'status_changed':
            return `Statut : ${payload['from'] ?? '?'} → ${payload['to'] ?? '?'}`;
        case 'assigned':
            return payload['agent_name'] ? `Prise en charge par ${payload['agent_name']}` : 'Agent attribué';
        case 'resolved':
            return 'Demande résolue';
        case 'rejected':
            return 'Demande rejetée';
        case 'priority_changed':
            return `Priorité : ${payload['from'] ?? '?'} → ${payload['to'] ?? '?'}`;
        case 'updated':
            return 'Demande modifiée';
        case 'intervention_started':
            return 'Intervention commencée';
        case 'intervention_finished':
            return 'Intervention terminée';
    }
}

export interface CitizenRequestPage {
    items: CitizenRequest[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
}

/** Le périmètre (mes demandes, mes interventions, mon institut) est imposé par le serveur. */
export interface CitizenRequestQuery {
    page: number;
    page_size: number;
    search?: string;
    category?: RequestCategory;
    priority?: RequestPriority;
    status?: RequestStatus;
    sort_by: RequestSortBy;
    sort_order: SortOrder;
}

/** Point de la carte (GET /requests/map). */
export interface MapPoint {
    id: string;
    title: string;
    category: RequestCategory;
    priority: RequestPriority;
    status: RequestStatus;
    latitude: number;
    longitude: number;
    created_at: string;
    location: string;
    assigned_agent_id: string | null;
    agent_name: string | null;
}

/** Statistiques (GET /dashboard), limitées au périmètre de l'utilisateur connecté. */
export interface DashboardStats {
    total: number;
    open: number;
    in_progress: number;
    resolved: number;
    rejected: number;
    resolution_rate: number;
    interventions_today: number;
    resolved_today: number;
    pending_count: number;
    by_status: Record<RequestStatus, number>;
    by_category: Record<RequestCategory, number>;
    by_priority: Record<RequestPriority, number>;
    daily: { day: string; created: number; resolved: number }[];
}

/** Suggestion de l'IA (POST /requests/{id}/analyze) : rien n'est appliqué sans validation. */
export interface RequestAnalysis {
    category: RequestCategory;
    priority: RequestPriority;
    summary: string;
    reason: string;
    recommended_agent: {
        id: string;
        name: string;
        institut_name: string;
        status: 'available' | 'in_intervention' | 'unavailable' | 'offline';
        interventions: number;
    } | null;
}

/** Accusé de réception (GET /requests/{id}/receipt) : D16, F83. */
export interface RequestReceipt {
    reference: string;
    request_id: string;
    title: string;
    description: string;
    category: RequestCategory;
    location: string;
    status: RequestStatus;
    received_at: string;
    service: string;
    citizen_name: string;
    issued_at: string;
}
