import { RequestCategory } from '@/app/requests/request.model';

/** Réponse de GET /api/v1/dashboard. */
export interface DashboardSummary {
    open_requests: number;
    in_progress_requests: number;
    resolved_requests: number;
    today_interventions: number;
    category_distribution: { category: RequestCategory; count: number }[];
    requests_last_7_days: { date: string; count: number }[];
}
