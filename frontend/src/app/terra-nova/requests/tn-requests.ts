import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { arrivalMinutes, DIFFICULTY_OPTIONS, difficultyLabel, difficultySeverity, PipelineStatus, STATUS_OPTIONS, statusMeta, TerraRequest, waveLabel } from '../terra-nova.model';
import { ArrivalPipe, XpPipe } from '../terra-nova.pipes';
import { TerraNovaStore } from '../terra-nova.store';

type SortKey = 'xp_desc' | 'xp_asc' | 'difficulty_desc' | 'difficulty_asc' | 'wave_desc' | 'wave_asc' | 'arrival_desc' | 'arrival_asc' | 'code_asc';
type Origin = 'all' | 'initial' | 'wave';

const SORTERS: Record<SortKey, (a: TerraRequest, b: TerraRequest) => number> = {
    xp_desc: (a, b) => b.xp_total - a.xp_total,
    xp_asc: (a, b) => a.xp_total - b.xp_total,
    difficulty_desc: (a, b) => b.difficulty_level - a.difficulty_level || b.xp_total - a.xp_total,
    difficulty_asc: (a, b) => a.difficulty_level - b.difficulty_level || b.xp_total - a.xp_total,
    wave_desc: (a, b) => b.wave - a.wave,
    wave_asc: (a, b) => a.wave - b.wave,
    arrival_desc: (a, b) => arrivalMinutes(b.arrival_time) - arrivalMinutes(a.arrival_time),
    arrival_asc: (a, b) => arrivalMinutes(a.arrival_time) - arrivalMinutes(b.arrival_time),
    code_asc: (a, b) => a.request_code.localeCompare(b.request_code, 'fr', { numeric: true })
};

/** Toutes les demandes Terra Nova : recherche, filtres, tri, changement de statut. */
@Component({
    selector: 'app-terra-nova-requests',
    imports: [FormsModule, ButtonModule, IconFieldModule, InputIconModule, InputNumberModule, InputTextModule, MultiSelectModule, SelectModule, SelectButtonModule, TableModule, TagModule, TooltipModule, ArrivalPipe, XpPipe],
    templateUrl: './tn-requests.html'
})
export class TerraNovaRequests {
    protected readonly store = inject(TerraNovaStore);

    protected readonly statusOptions = STATUS_OPTIONS;
    protected readonly difficultyOptions = DIFFICULTY_OPTIONS;
    protected readonly difficultyLabel = difficultyLabel;
    protected readonly difficultySeverity = difficultySeverity;
    protected readonly statusMeta = statusMeta;
    protected readonly waveLabel = waveLabel;

    protected readonly sortOptions: { value: SortKey; label: string }[] = [
        { value: 'xp_desc', label: 'XP décroissant' },
        { value: 'xp_asc', label: 'XP croissant' },
        { value: 'difficulty_desc', label: 'Difficulté (expert → facile)' },
        { value: 'difficulty_asc', label: 'Difficulté (facile → expert)' },
        { value: 'wave_desc', label: 'Vague (récente → initiale)' },
        { value: 'wave_asc', label: 'Vague (initiale → récente)' },
        { value: 'arrival_desc', label: "Date d'arrivée (récente)" },
        { value: 'arrival_asc', label: "Date d'arrivée (ancienne)" },
        { value: 'code_asc', label: 'Code' }
    ];
    protected readonly originOptions: { value: Origin; label: string }[] = [
        { value: 'all', label: 'Toutes' },
        { value: 'initial', label: 'Initiales' },
        { value: 'wave', label: 'Vagues' }
    ];

    protected readonly search = signal('');
    protected readonly difficultyFilter = signal<number[]>([]);
    protected readonly statusFilter = signal<PipelineStatus[]>([]);
    protected readonly waveFilter = signal<number[]>([]);
    protected readonly requesterFilter = signal<string[]>([]);
    protected readonly origin = signal<Origin>('all');
    protected readonly xpMin = signal<number | null>(null);
    protected readonly xpMax = signal<number | null>(null);
    protected readonly onlyNew = signal(false);
    protected readonly sort = signal<SortKey>('xp_desc');
    protected readonly first = signal(0);

    // Options déduites des données : aucun nombre de vagues ni type de demandeur codé en dur.
    protected readonly waveOptions = computed(() => [...new Set(this.store.requests().map((r) => r.wave))].sort((a, b) => a - b).map((w) => ({ value: w, label: w === 0 ? 'Initiale' : `Vague ${w}` })));
    protected readonly requesterOptions = computed(() =>
        [
            ...new Set(
                this.store
                    .requests()
                    .map((r) => r.requester_type)
                    .filter(Boolean)
            )
        ]
            .sort((a, b) => a.localeCompare(b, 'fr'))
            .map((t) => ({ value: t, label: t }))
    );

    protected readonly activeFilterCount = computed(
        () =>
            [this.search().trim(), this.difficultyFilter().length, this.statusFilter().length, this.waveFilter().length, this.requesterFilter().length, this.origin() !== 'all', this.xpMin() !== null, this.xpMax() !== null, this.onlyNew()].filter(
                Boolean
            ).length
    );

    protected readonly filtered = computed(() => {
        const q = normalize(this.search().trim());
        const difficulties = this.difficultyFilter();
        const statuses = this.statusFilter();
        const waves = this.waveFilter();
        const types = this.requesterFilter();
        const origin = this.origin();
        const min = this.xpMin();
        const max = this.xpMax();
        const onlyNew = this.onlyNew();
        const fresh = this.store.newCodes();

        return this.store
            .requests()
            .filter((r) => {
                if (q && !normalize([r.request_code, r.message_public, r.requester_name, r.requester_type, r.group_name].join(' ')).includes(q)) return false;
                if (difficulties.length && !difficulties.includes(r.difficulty_level)) return false;
                if (statuses.length && !statuses.includes(r.status)) return false;
                if (waves.length && !waves.includes(r.wave)) return false;
                if (types.length && !types.includes(r.requester_type)) return false;
                if (origin === 'initial' && !r.is_initial) return false;
                if (origin === 'wave' && r.is_initial) return false;
                if (min !== null && r.xp_total < min) return false;
                if (max !== null && r.xp_total > max) return false;
                return !onlyNew || fresh.has(r.request_code);
            })
            .sort(SORTERS[this.sort()]);
    });

    protected readonly filteredXp = computed(() => this.filtered().reduce((sum, r) => sum + r.xp_total, 0));

    /** Clic sur un en-tête : bascule entre les deux sens du tri. */
    protected toggleSort(base: 'xp' | 'difficulty' | 'wave' | 'arrival'): void {
        const desc = `${base}_desc` as SortKey;
        this.sort.set(this.sort() === desc ? (`${base}_asc` as SortKey) : desc);
    }

    protected sortIcon(base: string): string {
        if (this.sort() === `${base}_desc`) return 'pi pi-sort-amount-down';
        if (this.sort() === `${base}_asc`) return 'pi pi-sort-amount-up-alt';
        return 'pi pi-sort-alt text-muted-color';
    }

    protected setFilter<T>(target: { set(value: T): void }, value: T): void {
        target.set(value);
        this.first.set(0);
    }

    protected resetFilters(): void {
        this.search.set('');
        this.difficultyFilter.set([]);
        this.statusFilter.set([]);
        this.waveFilter.set([]);
        this.requesterFilter.set([]);
        this.origin.set('all');
        this.xpMin.set(null);
        this.xpMax.set(null);
        this.onlyNew.set(false);
        this.first.set(0);
    }
}

function normalize(value: string): string {
    return value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}
