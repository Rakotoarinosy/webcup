import { DatePipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, finalize, forkJoin, of } from 'rxjs';

import { CitizenRequest, RequestEvent, RequestStatus, STATUS_TRANSITIONS, awaitingReply, eventLabel } from '@/app/requests/request.model';
import { RequestThread } from '@/app/requests/request-thread';
import { CitizenRequestService } from '@/app/requests/request.service';
import { RequestActivity } from '@/app/journal/journal.model';
import { JournalService } from '@/app/journal/journal.service';
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
    imports: [DatePipe, RouterLink, RequestThread],
    templateUrl: './agent-workspace.html',
    styleUrl: './agent-workspace.scss'
})
export class AgentWorkspace {
    private readonly api = inject(CitizenRequestService);
    private readonly live = inject(LiveDataService);
    private readonly journal = inject(JournalService);
    private readonly destroyRef = inject(DestroyRef);

    protected readonly items = signal<CitizenRequest[]>([]);
    protected readonly page = signal(1);
    protected readonly pages = signal(1);
    protected readonly loading = signal(true);
    protected readonly error = signal<string | null>(null);
    protected readonly saving = signal<string | null>(null);
    protected readonly timelineFor = signal<string | null>(null);
    protected readonly timeline = signal<RequestEvent[]>([]);
    protected readonly eventLabel = eventLabel;
    protected readonly awaitingReply = awaitingReply;
    /** F84 : fil de messages ouvert (une demande à la fois) et filtre « réponse attendue ». */
    protected readonly threadFor = signal<string | null>(null);
    protected readonly awaitingOnly = signal(false);
    /** Dernières actions sur les demandes de l'agent (F47), le détail complet est dans le Journal. */
    protected readonly recentActivity = signal<RequestActivity[]>([]);

    protected readonly actionRequired = computed(() => this.items().filter((item) => item.status === 'En cours'));
    protected readonly awaitingCount = computed(() => this.items().filter((item) => awaitingReply(item)).length);

    constructor() {
        // Rafraîchit la liste quand la mairie la modifie ailleurs (autre onglet, autre poste).
        this.live.watch(this.destroyRef, () => this.refresh(), () => !this.loading() && !this.saving());
        this.refresh();
    }

    protected refresh(): void {
        this.loading.set(true);
        this.error.set(null);
        forkJoin({
            page: this.api.list({ page: this.page(), page_size: PAGE_SIZE, sort_by: 'created_at', sort_order: 'desc', awaiting_reply: this.awaitingOnly() || undefined }),
            // Le journal est un complément : son indisponibilité ne bloque pas la liste.
            activity: this.journal.activity({ type: null, since: null, until: null, search: '', page: 1 }, 5).pipe(catchError(() => of(null)))
        })
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: ({ page, activity }) => {
                    this.recentActivity.set(activity?.items ?? []);
                    this.items.set(page.items);
                    this.page.set(page.page);
                    this.pages.set(Math.max(1, page.total_pages));
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

    protected toggleAwaiting(): void {
        this.awaitingOnly.update((value) => !value);
        this.page.set(1);
        this.refresh();
    }

    protected toggleThread(item: CitizenRequest): void {
        this.threadFor.set(this.threadFor() === item.id ? null : item.id);
    }

    /** Après une réponse, l'indicateur « réponse attendue » se met à jour. */
    protected onPosted(item: CitizenRequest): void {
        this.api.get(item.id).subscribe({
            next: (updated) => this.items.update((items) => items.map((current) => (current.id === updated.id ? updated : current)))
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
