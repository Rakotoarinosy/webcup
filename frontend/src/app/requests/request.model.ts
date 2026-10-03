export const REQUEST_CATEGORIES = [
    'Éclairage public',
    'Voirie',
    'Eau',
    'Déchets',
    'Sécurité',
    'Espaces verts',
    'Autre'
] as const;

export type RequestCategory = (typeof REQUEST_CATEGORIES)[number];

export const REQUEST_PRIORITIES = ['Basse', 'Normale', 'Haute', 'Urgente'] as const;

export type RequestPriority = (typeof REQUEST_PRIORITIES)[number];

export const REQUEST_STATUSES = ['Nouveau', 'En cours', 'En attente', 'Résolu', 'Rejeté'] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

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

export type RequestSortBy = 'created_at' | 'title' | 'category' | 'priority' | 'status';

export interface CitizenRequest {
    id: string;
    title: string;
    description: string;
    category: RequestCategory;
    priority: RequestPriority;
    status: RequestStatus;
    citizen_id: string;
    created_at: string;
    location: string;
    latitude: number | null;
    longitude: number | null;
    assigned_agent_id: string | null;
    resolved_at: string | null;
}

export interface CreateCitizenRequestIn {
    title: string;
    description: string;
    category: RequestCategory;
    priority: RequestPriority;
    status: RequestStatus;
    citizen_id: string;
    location: string;
    assigned_agent_id: string | null;
}

export type UpdateCitizenRequestIn = Partial<CreateCitizenRequestIn>;

export interface CitizenRequestPage {
    items: CitizenRequest[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
}

export interface CitizenRequestQuery {
    page: number;
    page_size: number;
    search?: string;
    category?: RequestCategory;
    priority?: RequestPriority;
    status?: RequestStatus;
    sort_by: RequestSortBy;
    sort_order: 'asc' | 'desc';
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
        department: string;
        status: 'available' | 'in_intervention' | 'unavailable' | 'offline';
        interventions: number;
    } | null;
}
