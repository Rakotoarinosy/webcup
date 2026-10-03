import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { catchError, forkJoin, of } from 'rxjs';

import { Agent } from '@/app/agents/agent.model';
import { AgentService } from '@/app/agents/agent.service';
import { CitizenRequest } from '@/app/requests/request.model';
import { CitizenRequestService } from '@/app/requests/request.service';
import { apiErrorMessage } from '@/app/users/user.service';
import { DashboardSummary } from './dashboard.model';
import { DashboardService } from './dashboard.service';
import { CategoryChart } from './widget/category-chart/category-chart';
import { Map, MapRequest } from './widget/map/map';
import { Stats } from './widget/stats/stats';
import { TrendChart } from './widget/trend-chart/trend-chart';

// Nombre maximum de demandes « En cours » affichées sur la carte (limite de page de l'API).
const MAP_REQUEST_LIMIT = 100;

@Component({
    selector: 'app-dashboard',
    imports: [ButtonModule, ToastModule, Stats, TrendChart, CategoryChart, Map],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
    providers: [MessageService]
})
export class Dashboard implements OnInit {
    private readonly dashboardService = inject(DashboardService);
    private readonly requestService = inject(CitizenRequestService);
    private readonly agentService = inject(AgentService);
    private readonly messageService = inject(MessageService);

    private readonly summary = signal<DashboardSummary | null>(null);
    private readonly inProgressRequests = signal<CitizenRequest[]>([]);
    private readonly agents = signal<Agent[]>([]);
    readonly loading = signal(false);

    readonly dashboardStats = computed(() => {
        const summary = this.summary();

        return {
            openRequests: summary?.open_requests ?? 0,
            inProgressRequests: summary?.in_progress_requests ?? 0,
            resolvedRequests: summary?.resolved_requests ?? 0,
            todayInterventions: summary?.today_interventions ?? 0
        };
    });

    readonly trendStats = computed(() => {
        const days = this.summary()?.requests_last_7_days ?? [];
        // Dates « AAAA-MM-JJ » lues à midi UTC pour que le fuseau ne décale pas le jour affiché.
        const dayFormat = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', timeZone: 'UTC' });

        return {
            labels: days.map((day) => dayFormat.format(new Date(`${day.date}T12:00:00Z`))),
            data: days.map((day) => day.count)
        };
    });

    readonly categoryStats = computed(() => {
        const categories = this.summary()?.category_distribution ?? [];

        return {
            labels: categories.map((item) => item.category),
            data: categories.map((item) => item.count)
        };
    });

    readonly mapRequests = computed<MapRequest[]>(() => {
        const agentNames = new globalThis.Map(this.agents().map((agent) => [agent.id, agent.name]));

        return this.inProgressRequests()
            .filter((request) => request.latitude !== null && request.longitude !== null)
            .map((request) => ({
                id: request.id,
                title: request.title,
                location: request.location,
                latitude: request.latitude as number,
                longitude: request.longitude as number,
                priority: request.priority,
                status: request.status,
                agent: request.assigned_agent_id ? (agentNames.get(request.assigned_agent_id) ?? 'Agent inconnu') : 'Non assigné'
            }));
    });

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading.set(true);
        forkJoin({
            summary: this.dashboardService.summary(),
            inProgress: this.requestService.list({ page: 1, page_size: MAP_REQUEST_LIMIT, status: 'En cours', sort_by: 'created_at', sort_order: 'desc' }),
            // Réservé aux gestionnaires : sans ce droit, la carte affiche « Agent inconnu » au lieu d'échouer.
            agents: this.agentService.list().pipe(catchError(() => of([])))
        }).subscribe({
            next: ({ summary, inProgress, agents }) => {
                this.summary.set(summary);
                this.inProgressRequests.set(inProgress.items);
                this.agents.set(agents);
                this.loading.set(false);
            },
            error: (error: unknown) => {
                this.loading.set(false);
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: apiErrorMessage(error), life: 5000 });
            }
        });
    }
}
