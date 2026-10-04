/** Miroir de backend/src/features/participation/schemas.py. */

import { HttpErrorResponse } from '@angular/common/http';

import {
    CONSULTATION_KIND_VALUES,
    CONSULTATION_PHASE_VALUES,
    ConsultationKind,
    ConsultationPhase,
    IDEA_STATUS_VALUES,
    IDEA_THEME_VALUES,
    IDEA_VISIBILITY_VALUES,
    IdeaStatus,
    IdeaTheme,
    IdeaVisibility,
    PROJECT_STATUS_VALUES,
    ProjectStatus
} from '@/app/shared/api-enums';
import { apiErrorMessage } from '@/app/users/user.service';

export const PROJECT_STATUSES = PROJECT_STATUS_VALUES;
export const CONSULTATION_KINDS = CONSULTATION_KIND_VALUES;
export const CONSULTATION_PHASES = CONSULTATION_PHASE_VALUES;
export const IDEA_THEMES = IDEA_THEME_VALUES;
export const IDEA_STATUSES = IDEA_STATUS_VALUES;
export const IDEA_VISIBILITIES = IDEA_VISIBILITY_VALUES;
export type { ConsultationKind, ConsultationPhase, IdeaStatus, IdeaTheme, IdeaVisibility, ProjectStatus };

// ─── projets ────────────────────────────────────────────────────────

export interface ProjectUpdate {
    id: string;
    title: string;
    content: string;
    published_at: string;
    author_name: string;
}

export interface CityProject {
    id: string;
    title: string;
    summary: string;
    description: string;
    district: string;
    location: string | null;
    budget: string | null;
    status: ProjectStatus;
    progress: number;
    planned_start: string | null;
    planned_end: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    updates: ProjectUpdate[];
}

export interface ProjectIn {
    title: string;
    summary: string;
    description: string;
    district: string;
    location: string | null;
    budget: string | null;
    status: ProjectStatus;
    progress: number;
    planned_start: string | null;
    planned_end: string | null;
    is_published: boolean;
}

// ─── consultations ──────────────────────────────────────────────────

export interface OptionResult {
    option: string;
    count: number;
}

export interface ConsultationResults {
    total: number;
    options: OptionResult[];
}

export interface Consultation {
    id: string;
    title: string;
    question: string;
    description: string;
    kind: ConsultationKind;
    options: string[];
    rules: string;
    opens_at: string;
    closes_at: string;
    phase: ConsultationPhase;
    is_published: boolean;
    project_id: string | null;
    project_title: string | null;
    results: ConsultationResults | null;
    decision: string | null;
    decided_at: string | null;
    decided_by: string | null;
}

export interface ConsultationIn {
    title: string;
    question: string;
    description: string;
    kind: ConsultationKind;
    options: string[];
    rules: string | null;
    opens_at: string;
    closes_at: string;
    project_id: string | null;
    is_published: boolean;
}

export interface ConsultationResponse {
    id: string;
    reference: string;
    consultation_id: string;
    choice: string | null;
    comment: string | null;
    created_at: string;
    updated_at: string;
}

export interface Contribution {
    choice: string | null;
    comment: string | null;
    submitted_at: string;
}

// ─── idées ──────────────────────────────────────────────────────────

export interface IdeaStep {
    status: IdeaStatus;
    at: string;
    note: string | null;
    by: string | null;
}

export interface PublicIdea {
    id: string;
    reference: string;
    title: string;
    description: string;
    theme: IdeaTheme;
    district: string | null;
    status: IdeaStatus;
    support_count: number;
    response: string | null;
    answered_by: string | null;
    answered_at: string | null;
    created_at: string;
}

export interface Idea extends PublicIdea {
    visibility: IdeaVisibility;
    moderation_note: string | null;
    updated_at: string;
    history: IdeaStep[];
}

export interface IdeaAdmin extends Idea {
    user_id: string;
    user_name: string;
}

export interface IdeaIn {
    title: string;
    description: string;
    theme: IdeaTheme;
    district: string | null;
}

// ─── avis sur les services ──────────────────────────────────────────

export interface PublicReview {
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
    response: string | null;
    answered_by: string | null;
    answered_at: string | null;
}

export interface Review extends PublicReview {
    reference: string;
    service_id: string;
    service_name: string;
    is_hidden: boolean;
}

export interface ReviewAdmin extends Review {
    user_name: string;
}

export interface ServiceRating {
    service_id: string;
    average: number;
    count: number;
}

export interface ServiceReviews {
    service_id: string;
    service_name: string;
    average: number | null;
    count: number;
    reviews: PublicReview[];
}

// ─── ma participation ───────────────────────────────────────────────

export interface MyConsultationResponse extends ConsultationResponse {
    consultation_title: string;
    kind: ConsultationKind;
    phase: ConsultationPhase;
    closes_at: string;
    decision: string | null;
    decided_at: string | null;
}

export interface MyParticipation {
    ideas: Idea[];
    consultation_responses: MyConsultationResponse[];
    reviews: Review[];
    supported_idea_ids: string[];
}

// ─── affichage ──────────────────────────────────────────────────────

export type Severity = 'info' | 'warn' | 'success' | 'danger' | 'secondary' | 'contrast';

export function projectSeverity(status: ProjectStatus): Severity {
    return ({ "À l'étude": 'info', 'En cours': 'warn', Terminé: 'success', Suspendu: 'danger' } as const)[status];
}

export function phaseSeverity(phase: ConsultationPhase): Severity {
    return ({ 'À venir': 'secondary', Ouverte: 'success', Clôturée: 'warn', 'Décision publiée': 'info' } as const)[phase];
}

export function ideaSeverity(status: IdeaStatus): Severity {
    return ({ Reçue: 'info', "À l'étude": 'warn', Retenue: 'success', 'Non retenue': 'danger', Réalisée: 'success' } as const)[status];
}

/** Pourcentage arrondi d'une option : lisible sans le graphique. */
export function share(count: number, total: number): number {
    return total ? Math.round((count / total) * 100) : 0;
}

/** « 4,5 sur 5 » : la note est toujours dite en texte, jamais seulement avec des étoiles. */
export function ratingText(average: number | null): string {
    return average === null ? 'Pas encore de note' : `${average.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} sur 5`;
}

export const RATING_LABELS: Record<number, string> = {
    1: 'Très insatisfait',
    2: 'Insatisfait',
    3: 'Correct',
    4: 'Satisfait',
    5: 'Très satisfait'
};

/** Étapes de l'idée telles que l'habitant les lit. */
export function ideaStepLabel(step: IdeaStep): string {
    return (
        {
            Reçue: 'Idée reçue',
            "À l'étude": 'Étudiée par la mairie',
            Retenue: 'Idée retenue',
            'Non retenue': 'Idée non retenue',
            Réalisée: 'Idée réalisée'
        } as const
    )[step.status];
}

const ERRORS: Record<string, string> = {
    ConsultationNotOpenError: 'Cette consultation n’est pas ouverte : vous ne pouvez plus y répondre.',
    InvalidConsultationError: 'Réponse ou consultation incomplète : vérifiez les choix proposés et le texte.',
    ConsultationLockedConflictError: 'Des habitants ont déjà répondu : le type de question et les choix ne peuvent plus changer.',
    ConsultationNotClosedError: 'La décision se publie après la clôture de la consultation.',
    DecisionAlreadyPublishedError: 'La décision a déjà été publiée.',
    IdeaTransitionError: 'Cette étape ne peut pas suivre l’état actuel de l’idée.',
    MotivatedResponseRequiredError: 'Cette décision doit être motivée par une réponse écrite.',
    IdeaNotSupportableError: 'Vous ne pouvez soutenir que les idées publiées d’autres habitants.',
    ReviewAlreadyAnsweredError: 'Cet avis a déjà reçu une réponse.',
    InvalidProjectScheduleError: 'Calendrier invalide : la fin prévue doit suivre le début.',
    ForbiddenError: 'Cette action est réservée.'
};

export function participationError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
        const message = ERRORS[error.error?.error];
        if (message) return message;
        if (error.status === 401) return 'Connectez-vous pour participer.';
    }
    return apiErrorMessage(error);
}
