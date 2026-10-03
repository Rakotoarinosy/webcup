export const AGENT_STATUSES = ['available', 'in_intervention', 'unavailable', 'offline'] as const;

export type AgentStatus = (typeof AGENT_STATUSES)[number];

/** Libellés affichés : l'API renvoie les statuts en anglais. */
export const AGENT_STATUS_LABELS: Record<AgentStatus, string> = {
    available: 'Disponible',
    in_intervention: 'En intervention',
    unavailable: 'Indisponible',
    offline: 'Hors ligne'
};

/** Profil agent (AgentOut) : nom et email viennent du compte, l'institut de son rattachement. */
export interface Agent {
    id: string;
    user_id: string;
    name: string;
    email: string;
    institut_id: string;
    institut_name: string;
    status: AgentStatus;
    is_active: boolean;
    interventions: number;
    created_at: string;
}

/** Profil d'un compte existant de rôle « agent ». Un manager crée toujours dans son institut. */
export interface CreateAgentProfileIn {
    user_id: string;
    institut_id?: string | null;
    status: AgentStatus;
}

export interface AgentQuery {
    search?: string;
    institut_id?: string;
    status?: AgentStatus;
    is_active?: boolean;
}
