import { DashboardStats, MapPoint, REQUEST_CATEGORIES } from '@/app/requests/request.model';
import { MapRequest } from './widget/map/map';

/** Conversions des réponses de l'API vers les widgets, partagées par le dashboard et « Mon espace ». */

/** GET /dashboard/public : compteurs de toute la ville, sans connexion ni donnée personnelle. */
export interface PublicDashboard {
    total: number;
    open: number;
    in_progress: number;
    resolved: number;
}

export interface StatCards {
    openRequests: number;
    inProgressRequests: number;
    resolvedRequests: number;
    todayInterventions: number;
}

export const EMPTY_CARDS: StatCards = { openRequests: 0, inProgressRequests: 0, resolvedRequests: 0, todayInterventions: 0 };

export function toStatCards(stats: DashboardStats | null): StatCards {
    if (!stats) return EMPTY_CARDS;

    return {
        // « En attente de prise en charge » : nouvelles demandes et demandes en attente.
        openRequests: (stats.by_status['Nouveau'] ?? 0) + (stats.by_status['En attente'] ?? 0),
        inProgressRequests: stats.in_progress,
        resolvedRequests: stats.resolved,
        todayInterventions: stats.resolved_today
    };
}

export function toTrend(stats: DashboardStats | null): { labels: string[]; data: number[] } {
    const days = stats?.daily ?? [];
    // Dates « AAAA-MM-JJ » lues à midi UTC pour que le fuseau ne décale pas le jour affiché.
    const dayFormat = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', timeZone: 'UTC' });

    return {
        labels: days.map((day) => dayFormat.format(new Date(`${day.day}T12:00:00Z`))),
        data: days.map((day) => day.created)
    };
}

export function toCategories(stats: DashboardStats | null): { labels: string[]; data: number[] } {
    return {
        labels: [...REQUEST_CATEGORIES],
        data: REQUEST_CATEGORIES.map((category) => stats?.by_category[category] ?? 0)
    };
}

export function toMapRequests(points: MapPoint[]): MapRequest[] {
    return points.map((point) => ({
        id: point.id,
        title: point.title,
        location: point.location,
        latitude: point.latitude,
        longitude: point.longitude,
        priority: point.priority,
        status: point.status,
        agent: point.agent_name ?? 'Non assigné'
    }));
}
