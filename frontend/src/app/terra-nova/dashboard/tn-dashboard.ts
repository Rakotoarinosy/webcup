import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { difficultyLabel, difficultySeverity, STATUS_OPTIONS, statusMeta } from '../terra-nova.model';
import { CountdownPipe, XpPipe } from '../terra-nova.pipes';
import { TerraNovaStore } from '../terra-nova.store';

const BAR_COLORS = ['', 'bg-green-500', 'bg-sky-500', 'bg-orange-500', 'bg-red-500'];

/** Vue d'ensemble : session → nouvelles demandes → priorités → pipeline. */
@Component({
    selector: 'app-terra-nova-dashboard',
    imports: [RouterLink, ProgressBarModule, SkeletonModule, TagModule, TooltipModule, CountdownPipe, XpPipe],
    templateUrl: './tn-dashboard.html'
})
export class TerraNovaDashboard {
    protected readonly store = inject(TerraNovaStore);
    protected readonly statuses = STATUS_OPTIONS;
    protected readonly difficultyLabel = difficultyLabel;
    protected readonly difficultySeverity = difficultySeverity;
    protected readonly statusMeta = statusMeta;
    protected readonly barColors = BAR_COLORS;

    protected readonly freshRequests = computed(() => {
        const codes = this.store.newCodes();
        return this.store
            .requests()
            .filter((r) => codes.has(r.request_code))
            .sort((a, b) => (b.first_seen_at ?? '').localeCompare(a.first_seen_at ?? '') || b.xp_total - a.xp_total)
            .slice(0, 6);
    });

    protected readonly maxDifficultyCount = computed(() => Math.max(1, ...this.store.stats().byDifficulty.map((d) => d.count)));

    protected readonly elapsedLabel = computed(() => {
        const minutes = this.store.session()?.elapsed_minutes ?? 0;
        return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}`;
    });

    protected readonly countdownState = computed(() => {
        const s = this.store.session();
        if (!s?.last_sync_success_at) return 'unknown';
        if (s.status === 'none') return 'inactive';
        if (s.next_wave_number <= 0) return 'finished';
        const ms = this.store.msUntilNextWave();
        return ms !== null && ms <= 0 ? 'imminent' : 'running';
    });

    protected columnCount(status: string): number {
        return this.store.requests().filter((r) => r.status === status).length;
    }
}
