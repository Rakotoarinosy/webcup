// Types alignés sur l'API backend /api/v1/terra-requests (snake_case comme l'API).

export const PIPELINE_STATUSES = ['todo', 'in_progress', 'validation', 'done'] as const;
export type PipelineStatus = (typeof PIPELINE_STATUSES)[number];

export interface TerraRequest {
    request_code: string;
    api_id: number | null;
    requester_name: string;
    requester_type: string;
    message_public: string;
    difficulty: string;
    difficulty_level: number;
    xp_base: number;
    xp_time_bonus: number;
    xp_total: number;
    xp_available: number;
    is_initial: boolean;
    visible_since_wave: number | null;
    arrival_type: string;
    wave_number: number | null;
    arrival_time: string;
    is_ai_related: boolean;
    is_ai_request: boolean;
    group_name: string;
    sort_order: number;
    /** Vague d'apparition, 0 pour une demande initiale. */
    wave: number;
    status: PipelineStatus;
    first_seen_at: string | null;
    updated_at: string | null;
}

export interface TerraSession {
    status: string;
    is_running: boolean;
    current_wave: number;
    elapsed_minutes: number;
    visible_requests_count: number;
    initial_requests_count: number;
    wave_requests_count: number;
    next_wave_number: number;
    minutes_until_next_wave: number;
    next_wave_eta: string | null;
    updated_at: string | null;
    api_ok: boolean;
    last_sync_attempt_at: string | null;
    last_sync_success_at: string | null;
    last_sync_error: string | null;
}

export interface TerraOverview {
    session: TerraSession;
    server_time: string;
    sync_interval_seconds: number;
}

export interface TerraSyncReport {
    new_codes: string[];
    updated_codes: string[];
}

export interface TerraNotification {
    key: string;
    kind: 'new_request' | 'new_wave' | string;
    title: string;
    message: string;
    request_code: string | null;
    created_at: string;
    is_read: boolean;
}

export interface TerraNotificationList {
    items: TerraNotification[];
    unread_count: number;
}

type Severity = 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast';

export const STATUS_OPTIONS: { value: PipelineStatus; label: string; severity: Severity; icon: string }[] = [
    { value: 'todo', label: 'À traiter', severity: 'secondary', icon: 'pi pi-inbox' },
    { value: 'in_progress', label: 'En cours', severity: 'info', icon: 'pi pi-spinner' },
    { value: 'validation', label: 'En validation', severity: 'warn', icon: 'pi pi-eye' },
    { value: 'done', label: 'Terminée', severity: 'success', icon: 'pi pi-check-circle' }
];

export const DIFFICULTY_OPTIONS = [
    { value: 1, label: 'Facile' },
    { value: 2, label: 'Moyenne' },
    { value: 3, label: 'Difficile' },
    { value: 4, label: 'Expert' }
];

export function statusMeta(status: PipelineStatus) {
    return STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];
}

export function difficultyLabel(level: number, fallback = ''): string {
    return DIFFICULTY_OPTIONS.find((d) => d.value === level)?.label ?? (fallback || 'Inconnue');
}

export function difficultySeverity(level: number): Severity {
    return (['secondary', 'success', 'info', 'warn', 'danger'] as const)[level] ?? 'secondary';
}

export function waveLabel(request: TerraRequest): string {
    return request.is_initial ? 'Initiale' : `Vague ${request.wave}`;
}

/** "02:00:00" → minutes depuis le début du concours (H+2 = 120). Vide → 0 (lancement). */
export function arrivalMinutes(arrival: string): number {
    if (!arrival) return 0;
    const [h = '0', m = '0'] = arrival.split(':');
    return (parseInt(h, 10) || 0) * 60 + (parseInt(m, 10) || 0);
}
