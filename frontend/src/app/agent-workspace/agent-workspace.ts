import { LiveDataService } from '@/app/shared/live-data.service';
import { DatePipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { AgentDemandeSummary, AgentWorkspaceService, AssignedDemande, DemandeStatus } from './agent-workspace.service';

@Component({
    selector: 'app-agent-workspace',
    imports: [DatePipe],
    templateUrl: './agent-workspace.html',
    styleUrl: './agent-workspace.scss'
})
export class AgentWorkspace {
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly api = inject(AgentWorkspaceService);

    protected readonly items = signal<AssignedDemande[]>([]);
    protected readonly summary = signal<AgentDemandeSummary | null>(null);
    protected readonly page = signal(1);
    protected readonly pages = signal(1);
    protected readonly loading = signal(true);
    protected readonly error = signal<string | null>(null);
    protected readonly resolving = signal<string | null>(null);
    protected readonly actionRequired = computed(() => this.items().filter((item) => item.status === 'en_cours'));
    protected readonly pendingCount = computed(() => {
        const stats = this.summary();
        return stats ? stats.nouveau + stats.en_attente : 0;
    });

    constructor() {
        this.live.watch(
            this.destroyRef,
            () => {
                this.refresh();
            },
            () => !this.loading() && !this.resolving()
        );
        this.refresh();
    }

    protected refresh(): void {
        this.loading.set(true);
        this.error.set(null);
        forkJoin({ page: this.api.list(this.page()), summary: this.api.summary() })
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: ({ page, summary }) => {
                    this.items.set(page.items);
                    this.page.set(page.page);
                    this.pages.set(Math.max(1, page.pages));
                    this.summary.set(summary);
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

    protected resolve(item: AssignedDemande): void {
        if (this.resolving()) return;
        this.resolving.set(item.id);
        this.api
            .resolve(item.id)
            .pipe(finalize(() => this.resolving.set(null)))
            .subscribe({
                next: () => this.refresh(),
                error: () => this.error.set(`La demande « ${item.title} » n’a pas pu être résolue.`)
            });
    }

    protected statusLabel(status: DemandeStatus): string {
        return { nouveau: 'Nouvelle', en_cours: 'En cours', en_attente: 'En attente', resolu: 'Résolue', rejete: 'Rejetée' }[status];
    }

    protected priorityLabel(priority: string): string {
        return { faible: 'Faible', moyenne: 'Moyenne', haute: 'Haute', critique: 'Critique' }[priority] ?? priority;
    }

    protected categoryLabel(category: string): string {
        return category.replaceAll('_', ' ').replace(/^./, (letter) => letter.toLocaleUpperCase('fr'));
    }
}
