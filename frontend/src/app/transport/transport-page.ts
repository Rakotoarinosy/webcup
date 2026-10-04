import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { EMPTY, Subject, catchError, debounceTime, finalize, interval, switchMap } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { TermHelp } from '@/app/glossary/term-help';
import { LINE_STATUS_VALUES } from '@/app/shared/api-enums';
import { LiveDataService } from '@/app/shared/live-data.service';
import { LINE_STATUS_DISPLAY, LineStatus, TRANSPORT_MODE_LABELS, TransportLine, formatPassage } from './transport.model';
import { TransportService } from './transport.service';

/**
 * Transports municipaux (F36) : une seule page pour trouver sa ligne ou son arrêt, voir le
 * prochain passage et les perturbations (affichées en premier), sans changer d'écran.
 */
@Component({
    selector: 'app-transport-page',
    imports: [FormsModule, TermHelp],
    templateUrl: './transport-page.html',
    styleUrl: './transport-page.scss'
})
export class TransportPage implements OnInit {
    private readonly transport = inject(TransportService);
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);
    protected readonly auth = inject(AuthService);
    private readonly searches = new Subject<string>();

    readonly lines = signal<TransportLine[]>([]);
    readonly query = signal('');
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly now = signal(new Date());
    readonly statusDisplay = LINE_STATUS_DISPLAY;
    readonly modeLabels = TRANSPORT_MODE_LABELS;
    readonly statusOptions = LINE_STATUS_VALUES;
    readonly disruptedCount = computed(() => this.lines().filter((line) => line.status !== 'normal').length);

    // Gestion (manager / administrateur) : état d'une ligne.
    readonly editing = signal<string | null>(null);
    readonly saving = signal(false);
    readonly manageError = signal<string | null>(null);
    readonly manageNotice = signal<string | null>(null);
    statusForm: { status: LineStatus; message: string } = { status: 'normal', message: '' };

    ngOnInit(): void {
        this.searches
            .pipe(
                debounceTime(250),
                switchMap((query) => {
                    this.loading.set(true);
                    this.error.set(null);
                    return this.transport.lines(query).pipe(
                        catchError(() => {
                            this.error.set('Impossible de charger les horaires. Réessayez dans quelques instants.');
                            return EMPTY;
                        }),
                        finalize(() => this.loading.set(false))
                    );
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((lines) => {
                this.lines.set(lines);
                this.now.set(new Date());
            });
        this.load();
        this.live.watch(
            this.destroyRef,
            () => this.load(),
            () => this.editing() === null && !this.saving()
        );
        // Les délais « dans 4 min » restent justes sans recharger la page.
        interval(30000)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.now.set(new Date()));
    }

    load(): void {
        this.searches.next(this.query());
    }

    onSearch(value: string): void {
        this.query.set(value);
        this.searches.next(value);
    }

    passage(iso: string): string {
        return formatPassage(iso, this.now());
    }

    canManage(): boolean {
        return this.auth.hasRole('manager', 'admin');
    }

    edit(line: TransportLine): void {
        this.editing.set(line.id);
        this.manageError.set(null);
        this.manageNotice.set(null);
        this.statusForm = { status: line.status, message: line.status_message ?? '' };
    }

    save(line: TransportLine): void {
        if (this.saving()) return;
        const { status, message } = this.statusForm;
        if (status !== 'normal' && !message.trim()) {
            this.manageError.set('Expliquez la perturbation aux voyageurs (arrêts non desservis, solution de remplacement…).');
            return;
        }
        this.saving.set(true);
        this.manageError.set(null);
        this.transport
            .updateStatus(line.id, status, status === 'normal' ? null : message.trim())
            .pipe(finalize(() => this.saving.set(false)))
            .subscribe({
                next: (updated) => {
                    this.lines.update((lines) => lines.map((item) => (item.id === updated.id ? updated : item)));
                    this.editing.set(null);
                    this.manageNotice.set(`Ligne ${updated.code} : ${LINE_STATUS_DISPLAY[updated.status].label}.`);
                },
                error: () => this.manageError.set(`Impossible de modifier l’état de la ligne ${line.code}. Réessayez.`)
            });
    }
}
