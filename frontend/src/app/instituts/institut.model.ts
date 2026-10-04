import { RequestCategory } from '@/app/requests/request.model';

/** Service qui reçoit et traite les demandes de certaines catégories (InstitutOut). */
export interface Institut {
    id: string;
    name: string;
    description: string;
    categories: RequestCategory[];
    manager_id: string | null;
    is_active: boolean;
    created_at: string;
}

export interface CreateInstitutIn {
    name: string;
    description: string;
    categories: RequestCategory[];
    manager_id: string | null;
}

export type UpdateInstitutIn = Partial<Pick<Institut, 'name' | 'description' | 'categories' | 'is_active'>>;

export interface RequestMetrics {
    received: number;
    in_progress: number;
    resolved: number;
}

export interface InstitutService {
    id: string;
    institut_id: string;
    name: string;
    category: string;
    description: string;
    contact_details: string;
    opening_hours: string;
    icon: string;
    request_category: RequestCategory | null;
    responsible_agent_id: string | null;
    responsible_agent_name: string | null;
    associated_agents: number;
    metrics: RequestMetrics;
}

export interface InstitutDashboard {
    institut: Institut;
    manager_name: string | null;
    associated_agents: number;
    metrics: RequestMetrics;
    services: InstitutService[];
}

/** Vue citoyenne : uniquement ses demandes, jamais les agents de l'institut. */
export interface CitizenInstitutService {
    id: string;
    institut_id: string;
    name: string;
    category: string;
    description: string;
    contact_details: string;
    opening_hours: string;
    icon: string;
    request_category: RequestCategory | null;
    metrics: RequestMetrics;
}

export interface CitizenInstitutDashboard {
    institut: Institut;
    metrics: RequestMetrics;
    services: CitizenInstitutService[];
}

export interface CreateInstitutServiceIn {
    name: string;
    category: string;
    description: string;
    contact_details: string;
    opening_hours: string;
    icon: string;
    request_category: RequestCategory | null;
    responsible_agent_id: string | null;
    agent_ids: string[];
}
