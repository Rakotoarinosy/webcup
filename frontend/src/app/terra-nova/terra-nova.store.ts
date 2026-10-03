import { HttpErrorResponse } from '@angular/common/http';
import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize, forkJoin } from 'rxjs';
import { RealtimeService } from '../shared/realtime.service';
import { apiErrorMessage } from '../users/user.service';
import { DIFFICULTY_OPTIONS, PipelineStatus, statusMeta, TerraNotification, TerraOverview, TerraRequest } from './terra-nova.model';
import { TerraNovaService } from './terra-nova.service';

const MAX_TOASTS = 5;

/**
 * État partagé des pages Terra Nova (fourni par le composant TerraNova, détruit en quittant la section).
 *
 * Le backend notifie les changements par WebSocket ; l'horloge locale ne sert qu'à l'affichage.
 */
@Injectable()
export class TerraNovaStore {
    private readonly api = inject(TerraNovaService);
    private readonly messages = inject(MessageService);
    private readonly realtime = inject(RealtimeService);

    readonly requests = signal<TerraRequest[]>([]);
    readonly overview = signal<TerraOverview | null>(null);
    readonly notifications = signal<TerraNotification[]>([]);
    readonly unreadCount = signal(0);
    readonly loaded = signal(false);
    readonly syncing = signal(false);
    /** Erreur d'accès au backend (403 citoyen, backend arrêté…), null si tout va bien. */
    readonly loadError = signal<string | null>(null);
    readonly forbidden = signal(false);

    /** Horloge locale (1 s) : comptes à rebours et « il y a X s » uniquement. */
    readonly now = signal(Date.now());
    private readonly clockOffset = signal(0);

    readonly selectedCode = signal<string | null>(null);

    readonly session = computed(() => this.overview()?.session ?? null);
    readonly byCode = computed(() => new Map(this.requests().map((r) => [r.request_code, r])));
    readonly selected = computed(() => {
        const code = this.selectedCode();
        return code ? (this.byCode().get(code) ?? null) : null;
    });

    /** Une demande est « nouvelle » tant que sa notification d'arrivée n'est pas lue. */
    readonly newCodes = computed(
        () =>
            new Set(
                this.notifications()
                    .filter((n) => !n.is_read && n.kind === 'new_request' && n.request_code)
                    .map((n) => n.request_code!)
            )
    );

    readonly isActive = computed(() => {
        const s = this.session();
        return !!s && s.status !== 'none' && s.is_running;
    });

    /** Temps restant avant la prochaine vague, pour l'affichage seulement. */
    readonly msUntilNextWave = computed(() => {
        const s = this.session();
        if (!s?.next_wave_eta || s.next_wave_number <= 0) return null;
        return new Date(s.next_wave_eta).getTime() - (this.now() + this.clockOffset());
    });

    readonly stats = computed(() => {
        const list = this.requests();
        const xp = (items: TerraRequest[]) => items.reduce((sum, r) => sum + r.xp_available, 0);
        const count = (status: PipelineStatus) => list.filter((r) => r.status === status).length;
        const done = list.filter((r) => r.status === 'done');
        return {
            total: list.length,
            fresh: list.filter((r) => this.newCodes().has(r.request_code)).length,
            todo: count('todo'),
            inProgress: count('in_progress'),
            validation: count('validation'),
            done: done.length,
            donePercent: list.length ? Math.round((done.length / list.length) * 100) : 0,
            xpAvailable: xp(list),
            xpDone: xp(done),
            byDifficulty: DIFFICULTY_OPTIONS.map((d) => {
                const items = list.filter((r) => r.difficulty_level === d.value);
                return { ...d, count: items.length, xp: xp(items) };
            })
        };
    });

    /** Demandes non terminées à plus forte valeur. */
    readonly priorities = computed(() =>
        this.requests()
            .filter((r) => r.status !== 'done')
            .sort((a, b) => b.xp_total - a.xp_total || b.difficulty_level - a.difficulty_level)
            .slice(0, 6)
    );

    private refreshing = false;
    private seenKeys: Set<string> | null = null;

    constructor() {
        const clock = setInterval(() => this.now.set(Date.now()), 1000);
        const realtimeSubscription = this.realtime.changes$.subscribe(() => this.refresh());
        inject(DestroyRef).onDestroy(() => {
            clearInterval(clock);
            realtimeSubscription.unsubscribe();
        });
        this.refresh();
    }

    refresh(): void {
        if (this.refreshing) return;
        this.refreshing = true;
        forkJoin({ overview: this.api.session(), requests: this.api.list(), notifications: this.api.notifications() })
            .pipe(finalize(() => (this.refreshing = false)))
            .subscribe({
                next: ({ overview, requests, notifications }) => {
                    this.overview.set(overview);
                    this.clockOffset.set(new Date(overview.server_time).getTime() - Date.now());
                    this.requests.set(requests);
                    this.announce(notifications.items);
                    this.notifications.set(notifications.items);
                    this.unreadCount.set(notifications.unread_count);
                    this.loaded.set(true);
                    this.loadError.set(null);
                    this.forbidden.set(false);
                },
                error: (error: unknown) => {
                    this.forbidden.set(error instanceof HttpErrorResponse && error.status === 403);
                    this.loadError.set(this.forbidden() ? 'Espace réservé au personnel municipal.' : apiErrorMessage(error));
                }
            });
    }

    syncNow(): void {
        if (this.syncing()) return;
        this.syncing.set(true);
        this.api
            .sync()
            .pipe(finalize(() => this.syncing.set(false)))
            .subscribe({
                next: (report) => {
                    const n = report.new_codes.length;
                    this.messages.add({ severity: 'success', summary: 'Synchronisation réussie', detail: n ? `${n} nouvelle(s) demande(s)` : 'Aucune nouvelle demande', life: 3000 });
                    this.refresh();
                },
                error: (error: unknown) => {
                    this.messages.add({ severity: 'error', summary: 'Synchronisation échouée', detail: apiErrorMessage(error), life: 5000 });
                    this.refresh();
                }
            });
    }

    /** Changement de statut optimiste, annulé si le backend refuse. */
    updateStatus(code: string, status: PipelineStatus): void {
        const previous = this.byCode().get(code)?.status;
        if (!previous || previous === status) return;
        this.patch(code, { status });
        this.api.updateStatus(code, status).subscribe({
            next: (updated) => {
                this.patch(code, updated);
                this.messages.add({ severity: 'success', summary: code, detail: `Statut : ${statusMeta(status).label}`, life: 2000 });
            },
            error: (error: unknown) => {
                this.patch(code, { status: previous });
                this.messages.add({ severity: 'error', summary: 'Erreur', detail: apiErrorMessage(error), life: 4000 });
            }
        });
    }

    openDetail(code: string): void {
        this.selectedCode.set(code);
        // Ouvrir une demande vaut prise de connaissance de son arrivée.
        const notification = this.notifications().find((n) => n.key === code && !n.is_read);
        if (notification) this.markRead(notification);
    }

    closeDetail(): void {
        this.selectedCode.set(null);
    }

    markRead(notification: TerraNotification): void {
        if (notification.is_read) return;
        this.setRead((n) => n.key === notification.key);
        this.api.markRead(notification.key).subscribe({ error: () => this.refresh() });
    }

    markAllRead(): void {
        this.setRead(() => true);
        this.api.markAllRead().subscribe({ error: () => this.refresh() });
    }

    private setRead(match: (n: TerraNotification) => boolean): void {
        this.notifications.update((list) => list.map((n) => (match(n) ? { ...n, is_read: true } : n)));
        this.unreadCount.set(this.notifications().filter((n) => !n.is_read).length);
    }

    private patch(code: string, changes: Partial<TerraRequest>): void {
        this.requests.update((list) => list.map((r) => (r.request_code === code ? { ...r, ...changes } : r)));
    }

    /** Toast pour chaque notification apparue depuis le dernier rafraîchissement (pas au premier chargement). */
    private announce(items: TerraNotification[]): void {
        if (this.seenKeys) {
            const fresh = items.filter((n) => !n.is_read && !this.seenKeys!.has(n.key)).reverse();
            for (const n of fresh.slice(0, MAX_TOASTS)) {
                this.messages.add({ severity: n.kind === 'new_wave' ? 'info' : 'success', summary: n.title, detail: n.message, life: 8000 });
            }
            if (fresh.length > MAX_TOASTS) {
                this.messages.add({ severity: 'info', summary: `+${fresh.length - MAX_TOASTS} autres notifications`, life: 8000 });
            }
        }
        this.seenKeys = new Set(items.map((n) => n.key));
    }
}
