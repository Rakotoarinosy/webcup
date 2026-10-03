/** Miroir de backend/src/features/data_concern/schemas.py. */

export const CONCERN_TOPICS = ['Collecte', 'Utilisation', 'Partage', 'Conservation', 'Accès, rectification ou suppression', 'Autre'] as const;
export type ConcernTopic = (typeof CONCERN_TOPICS)[number];

export const CONCERN_STATUSES = ['Reçu', "En cours d'examen", 'Répondu'] as const;
export type ConcernStatus = (typeof CONCERN_STATUSES)[number];

export interface DataConcern {
    id: string;
    reference: string;
    topic: ConcernTopic;
    message: string;
    status: ConcernStatus;
    created_at: string;
    updated_at: string;
    reviewed_at: string | null;
    response: string | null;
    answered_at: string | null;
    answered_by: string | null;
}

export interface DataConcernAdmin extends DataConcern {
    user_id: string;
    user_name: string;
    user_email: string;
}

export interface SubmitConcernIn {
    topic: ConcernTopic;
    message: string;
}

/** Étapes affichées à l'habitant : chacune est datée dès qu'elle est franchie. */
export interface ConcernStep {
    label: string;
    date: string | null;
}

export function concernSteps(concern: DataConcern): ConcernStep[] {
    return [
        { label: 'Signalement reçu', date: concern.created_at },
        { label: 'Examen par la mairie', date: concern.reviewed_at },
        { label: 'Réponse envoyée', date: concern.answered_at }
    ];
}

export function concernStatusSeverity(status: ConcernStatus): 'info' | 'warn' | 'success' {
    return status === 'Répondu' ? 'success' : status === 'Reçu' ? 'info' : 'warn';
}
