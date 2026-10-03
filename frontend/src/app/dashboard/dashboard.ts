import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { forkJoin } from 'rxjs';

import { DashboardStats, MapPoint } from '@/app/requests/request.model';
import { CitizenRequestService } from '@/app/requests/request.service';
import { apiErrorMessage } from '@/app/users/user.service';
import { toCategories, toMapRequests, toStatCards, toTrend } from './dashboard.model';
import { CategoryChart } from './widget/category-chart/category-chart';
import { Map } from './widget/map/map';
import { Stats } from './widget/stats/stats';
import { TrendChart } from './widget/trend-chart/trend-chart';

/** Tableau de bord : les chiffres couvrent le périmètre de l'utilisateur (son institut pour un manager). */
@Component({
    selector: 'app-dashboard',
    imports: [ButtonModule, ToastModule, Stats, TrendChart, CategoryChart, Map],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
    providers: [MessageService]
})
export class Dashboard implements OnInit {
    private readonly requestService = inject(CitizenRequestService);
    private readonly messageService = inject(MessageService);

    private readonly stats = signal<DashboardStats | null>(null);
    private readonly points = signal<MapPoint[]>([]);
    readonly loading = signal(false);

    readonly dashboardStats = computed(() => toStatCards(this.stats()));
    readonly trendStats = computed(() => toTrend(this.stats()));
    readonly categoryStats = computed(() => toCategories(this.stats()));
    readonly mapRequests = computed(() => toMapRequests(this.points()));

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading.set(true);
        forkJoin({
            stats: this.requestService.dashboard(),
            // Carte des interventions en cours (demandes géolocalisées « En cours »).
            points: this.requestService.map({ status: 'En cours' })
        }).subscribe({
            next: ({ stats, points }) => {
                this.stats.set(stats);
                this.points.set(points);
                this.loading.set(false);
            },
            error: (error: unknown) => {
                this.loading.set(false);
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: apiErrorMessage(error), life: 5000 });
            }
        });
    }
}
