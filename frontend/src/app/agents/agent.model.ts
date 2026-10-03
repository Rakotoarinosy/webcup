export const AGENT_STATUSES = ['available', 'in_intervention', 'unavailable', 'offline'] as const;

export type AgentStatus = (typeof AGENT_STATUSES)[number];

/** Libellés affichés : l'API renvoie les statuts en anglais. */
export const AGENT_STATUS_LABELS: Record<AgentStatus, string> = {
    available: 'Disponible',
    in_intervention: 'En intervention',
    unavailable: 'Indisponible',
    offline: 'Hors ligne'
};

export interface Agent {
    id: string;
    name: string;
    email: string;
    department: string;
    status: AgentStatus;
    is_active: boolean;
    interventions: number;
    created_at: string;
}

export interface CreateAgentIn {
    name: string;
    email: string;
    department: string;
    status: AgentStatus;
}

export type UpdateAgentIn = Partial<CreateAgentIn>;

export interface AgentQuery {
    search?: string;
    department?: string;
    status?: AgentStatus;
    is_active?: boolean;
}
