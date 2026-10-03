import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { finalize, forkJoin } from 'rxjs';

import { DashboardStats, MapPoint } from '@/app/requests/request.model';
import { CitizenRequestService } from '@/app/requests/request.service';
import { LiveDataService } from '@/app/shared/live-data.service';
import { apiErrorMessage } from '@/app/users/user.service';
import { toCategories, toMapRequests, toStatCards, toTrend } from './dashboard.model';
import { CategoryChart } from './widget/category-chart/category-chart';
import { Map } from './widget/map/map';
import { Stats } from './widget/stats/stats';
import { TrendChart } from './widget/trend-chart/trend-chart';

/** Tableau de bord : les chiffres couvrent le périmètre de l'utilisateur (son institut pour un manager). */
@Component({
    selector: 'app-dashboard',
    imports: [DatePipe, ButtonModule, Stats, TrendChart, CategoryChart, Map],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
    private readonly requestService = inject(CitizenRequestService);
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);

    private readonly stats = signal<DashboardStats | null>(null);
    private readonly points = signal<MapPoint[]>([]);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly updatedAt = signal<Date | null>(null);
    /** Distingue un premier échec d'un tableau de bord réellement vide. */
    readonly hasData = computed(() => this.stats() !== null);

    readonly dashboardStats = computed(() => toStatCards(this.stats()));
    readonly trendStats = computed(() => toTrend(this.stats()));
    readonly categoryStats = computed(() => toCategories(this.stats()));
    readonly mapRequests = computed(() => toMapRequests(this.points()));

    ngOnInit(): void {
        this.load();
        this.live.watch(this.destroyRef, () => this.load(), () => !this.loading());
    }

    load(): void {
        if (this.loading()) return;
        this.loading.set(true);
        this.error.set(null);
        forkJoin({
            stats: this.requestService.dashboard(),
            // Carte des interventions en cours (demandes géolocalisées « En cours »).
            points: this.requestService.map({ status: 'En cours' })
        })
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: ({ stats, points }) => {
                    this.stats.set(stats);
                    this.points.set(points);
                    this.updatedAt.set(new Date());
                },
                // En cas d'échec, les derniers chiffres reçus restent affichés.
                error: (error: unknown) => this.error.set(apiErrorMessage(error))
            });
    }
}
