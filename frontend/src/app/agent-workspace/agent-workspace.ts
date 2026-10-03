import { DatePipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';

import { CitizenRequest, DashboardStats, RequestEvent, RequestStatus, STATUS_TRANSITIONS, eventLabel } from '@/app/requests/request.model';
import { CitizenRequestService } from '@/app/requests/request.service';
import { LiveDataService } from '@/app/shared/live-data.service';
import { apiErrorMessage } from '@/app/users/user.service';

const PAGE_SIZE = 20;
// Un agent fait avancer le traitement ; rejeter une demande reste une décision du manager.
const AGENT_TARGETS: RequestStatus[] = ['En cours', 'En attente', 'Résolu'];
const ACTION_LABELS: Partial<Record<RequestStatus, string>> = {
    'En cours': 'Reprendre',
    'En attente': 'Mettre en attente',
    Résolu: 'Résoudre'
};

/** « Mes interventions » : le serveur ne renvoie que les demandes attribuées à l'agent connecté. */
@Component({
    selector: 'app-agent-workspace',
    imports: [DatePipe],
    templateUrl: './agent-workspace.html',
    styleUrl: './agent-workspace.scss'
})
export class AgentWorkspace {
    private readonly api = inject(CitizenRequestService);
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);

    protected readonly items = signal<CitizenRequest[]>([]);
    protected readonly stats = signal<DashboardStats | null>(null);
    protected readonly page = signal(1);
    protected readonly pages = signal(1);
    protected readonly loading = signal(true);
    protected readonly error = signal<string | null>(null);
    protected readonly saving = signal<string | null>(null);
    protected readonly timelineFor = signal<string | null>(null);
    protected readonly timeline = signal<RequestEvent[]>([]);
    protected readonly eventLabel = eventLabel;

    protected readonly actionRequired = computed(() => this.items().filter((item) => item.status === 'En cours'));
    protected readonly count = (status: RequestStatus) => this.stats()?.by_status[status] ?? 0;
    /** Demandes encore ouvertes qui attendent une action de l'agent. */
    protected readonly pendingCount = computed(() => this.count('En cours') + this.count('En attente'));

    constructor() {
        // Rafraîchit la liste quand la mairie la modifie ailleurs (autre onglet, autre poste).
        this.live.watch(this.destroyRef, () => this.refresh(), () => !this.loading() && !this.saving());
        this.refresh();
    }

    protected refresh(): void {
        this.loading.set(true);
        this.error.set(null);
        forkJoin({
            page: this.api.list({ page: this.page(), page_size: PAGE_SIZE, sort_by: 'created_at', sort_order: 'desc' }),
            stats: this.api.dashboard()
        })
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: ({ page, stats }) => {
                    this.items.set(page.items);
                    this.page.set(page.page);
                    this.pages.set(Math.max(1, page.total_pages));
                    this.stats.set(stats);
                },
                error: () => this.error.set('Impossible de charger vos demandes. Réessayez dans quelques instants.')
            });
    }

    protected goToPage(page: number): void {
        if (page < 1 || page > this.pages() || page === this.page()) return;
        this.page.set(page);
        this.refresh();
    }

    protected pageNumbers(): number[] {
        const total = this.pages();
        const first = Math.max(1, Math.min(this.page() - 2, total - 4));
        return Array.from({ length: Math.min(5, total) }, (_, index) => first + index);
    }

    protected actions(item: CitizenRequest): { target: RequestStatus; label: string }[] {
        return STATUS_TRANSITIONS[item.status]
            .filter((target) => AGENT_TARGETS.includes(target))
            .map((target) => ({ target, label: ACTION_LABELS[target] ?? target }));
    }

    protected move(item: CitizenRequest, target: RequestStatus): void {
        if (this.saving()) return;
        this.saving.set(item.id);
        this.api
            .changeStatus(item.id, target)
            .pipe(finalize(() => this.saving.set(null)))
            .subscribe({
                next: () => this.refresh(),
                error: (error: unknown) => this.error.set(`« ${item.title} » : ${apiErrorMessage(error)}`)
            });
    }

    protected toggleTimeline(item: CitizenRequest): void {
        if (this.timelineFor() === item.id) {
            this.timelineFor.set(null);
            return;
        }
        this.timelineFor.set(item.id);
        this.timeline.set([]);
        this.api.events(item.id).subscribe({
            next: (events) => this.timeline.set(events),
            error: (error: unknown) => this.error.set(apiErrorMessage(error))
        });
    }

    /** Clé CSS stable du statut (« En cours » → « en_cours »). */
    protected statusKey(status: RequestStatus): string {
        return status
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .toLowerCase()
            .replace(' ', '_');
    }
}
