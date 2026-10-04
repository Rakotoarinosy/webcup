import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { LiveDataService } from '@/app/shared/live-data.service';
import { apiErrorMessage } from '@/app/users/user.service';
import { CityAlert, LEVEL_DISPLAY } from './alert.model';
import { AlertService } from './alert.service';

const HISTORY_DAYS = 30;

/** « Alertes et messages officiels » : alertes en cours et terminées récemment (public et connecté). */
@Component({
    selector: 'app-alerts-page',
    imports: [DatePipe, NgTemplateOutlet],
    template: `
        <section class="card mx-auto max-w-5xl" aria-labelledby="alerts-page-title" [attr.aria-busy]="loading()">
            <h1 id="alerts-page-title" class="m-0 text-2xl font-semibold">Alertes et messages officiels</h1>
            <p class="mt-2 text-muted-color">Messages diffusés par la ville à tous les habitants : alertes en cours et alertes terminées depuis {{ days }} jours.</p>

            @if (loading() && !alerts().length) {
                <p role="status">Chargement des alertes…</p>
            } @else if (error(); as message) {
                <p role="alert" class="text-red-700 dark:text-red-300">{{ message }}</p>
            }

            <h2 id="alerts-current-title" class="mt-6 text-lg font-semibold">En cours ({{ current().length }})</h2>
            @if (current().length) {
                <ul class="m-0 grid list-none gap-4 p-0" aria-labelledby="alerts-current-title">
                    @for (alert of current(); track alert.id) {
                        <li>
                            <ng-container *ngTemplateOutlet="item; context: { $implicit: alert }" />
                        </li>
                    }
                </ul>
            } @else if (!loading()) {
                <p>Aucune alerte en cours.</p>
            }

            <h2 id="alerts-past-title" class="mt-8 text-lg font-semibold">Terminées récemment ({{ past().length }})</h2>
            @if (past().length) {
                <ul class="m-0 grid list-none gap-4 p-0" aria-labelledby="alerts-past-title">
                    @for (alert of past(); track alert.id) {
                        <li>
                            <ng-container *ngTemplateOutlet="item; context: { $implicit: alert }" />
                        </li>
                    }
                </ul>
            } @else if (!loading()) {
                <p>Aucune alerte terminée ces {{ days }} derniers jours.</p>
            }
        </section>

        <ng-template #item let-alert>
            <article class="rounded-xl border border-surface p-4" [attr.aria-labelledby]="'alert-item-' + alert.id">
                <p class="m-0 flex flex-wrap items-center gap-2 text-sm">
                    <i [class]="display(alert).icon" aria-hidden="true"></i>
                    <strong class="uppercase tracking-wide">{{ display(alert).label }}</strong>
                    <span>· {{ alert.issuer }}</span>
                    <span>· {{ alert.status }}</span>
                </p>
                <h3 [id]="'alert-item-' + alert.id" class="mb-1 mt-2 text-lg font-semibold">{{ alert.title }}</h3>
                <p class="m-0 whitespace-pre-line">{{ alert.message }}</p>
                @if (alert.instructions) {
                    <div class="mt-3 rounded-lg bg-emphasis p-3">
                        <strong>Que faire ?</strong>
                        <p class="m-0 mt-1 whitespace-pre-line">{{ alert.instructions }}</p>
                    </div>
                }
                <dl class="mb-0 mt-3 grid gap-x-4 gap-y-1 text-sm text-muted-color sm:grid-cols-[10rem_1fr]">
                    <dt>Public visé</dt>
                    <dd class="m-0">{{ alert.audience }}</dd>
                    @if (alert.zone) {
                        <dt>Zone concernée</dt>
                        <dd class="m-0">{{ alert.zone }}</dd>
                    }
                    <dt>Diffusée le</dt>
                    <dd class="m-0"><time [attr.datetime]="alert.starts_at">{{ alert.starts_at | date: 'dd/MM/yyyy à HH:mm' }}</time></dd>
                    @if (alert.ended_at || alert.ends_at) {
                        <dt>{{ alert.status === 'Terminée' ? 'Terminée le' : 'Jusqu’au' }}</dt>
                        <dd class="m-0">{{ (alert.ended_at ?? alert.ends_at) | date: 'dd/MM/yyyy à HH:mm' }}</dd>
                    }
                </dl>
            </article>
        </ng-template>
    `
})
export class AlertsPage implements OnInit {
    private readonly api = inject(AlertService);
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);

    protected readonly days = HISTORY_DAYS;
    protected readonly alerts = signal<CityAlert[]>([]);
    protected readonly loading = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly current = computed(() => this.alerts().filter((alert) => alert.status === 'En cours'));
    protected readonly past = computed(() => this.alerts().filter((alert) => alert.status === 'Terminée'));

    ngOnInit(): void {
        this.load();
        this.live.watch(this.destroyRef, () => this.load(), () => !this.loading());
    }

    protected display(alert: CityAlert) {
        return LEVEL_DISPLAY[alert.level];
    }

    load(): void {
        this.loading.set(true);
        this.api
            .history(HISTORY_DAYS)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (alerts) => {
                    this.alerts.set(alerts);
                    this.error.set(null);
                },
                error: (error: unknown) => this.error.set(apiErrorMessage(error))
            });
    }
}
