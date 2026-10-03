import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Observable, Subject, debounceTime, finalize } from 'rxjs';

import { ROLE_LABELS } from '@/app/auth/auth.model';
import { AuthService } from '@/app/auth/auth.service';
import { eventLabel } from '@/app/requests/request.model';
import { apiErrorMessage } from '@/app/users/user.service';
import { ACTIVITY_TYPES, AUDIT_LABELS, AuditAction, AuditEntry, JournalFilters, Page, RequestActivity, auditDetails, toCsv } from './journal.model';
import { JournalService } from './journal.service';

type View = 'requests' | 'administration';

const EMPTY_FILTERS: JournalFilters = { type: null, since: null, until: null, search: '', page: 1 };

/**
 * Journal (F47) : qui a fait quoi, quand, et sur quoi.
 * « Demandes » : toutes les étapes des demandes du périmètre (un agent : ses interventions).
 * « Administration » : comptes, instituts, agents, signalements (admin ; manager pour son institut).
 */
@Component({
    selector: 'app-journal',
    imports: [DatePipe, FormsModule, ButtonModule],
    templateUrl: './journal.html'
})
export class Journal implements OnInit {
    private readonly api = inject(JournalService);
    private readonly auth = inject(AuthService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly searches = new Subject<void>();

    readonly canAudit = computed(() => this.auth.hasRole('manager', 'admin'));
    readonly view = signal<View>('requests');
    readonly activityTypes = ACTIVITY_TYPES;
    readonly auditActions = (Object.keys(AUDIT_LABELS) as AuditAction[]).map((value) => ({ value, label: AUDIT_LABELS[value] }));
    readonly auditLabels = AUDIT_LABELS;
    readonly eventLabel = eventLabel;
    readonly details = auditDetails;

    readonly activity = signal<Page<RequestActivity> | null>(null);
    readonly audit = signal<Page<AuditEntry> | null>(null);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);

    filters: JournalFilters = { ...EMPTY_FILTERS };

    constructor() {
        this.searches.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.load(1));
    }

    ngOnInit(): void {
        this.load(1);
    }

    show(view: View): void {
        if (view === this.view()) return;
        this.view.set(view);
        this.filters = { ...EMPTY_FILTERS };
        this.load(1);
    }

    searchChanged(): void {
        this.searches.next();
    }

    reset(): void {
        this.filters = { ...EMPTY_FILTERS };
        this.load(1);
    }

    total(): number {
        return (this.view() === 'requests' ? this.activity() : this.audit())?.total ?? 0;
    }

    pages(): number {
        return Math.max(1, (this.view() === 'requests' ? this.activity() : this.audit())?.total_pages ?? 1);
    }

    load(page = this.filters.page): void {
        this.filters = { ...this.filters, page };
        this.loading.set(true);
        this.error.set(null);
        const done = () => this.loading.set(false);
        const fail = (error: unknown) => this.error.set(apiErrorMessage(error));
        if (this.view() === 'requests') {
            this.api.activity(this.filters).pipe(finalize(done)).subscribe({ next: (result) => this.activity.set(result), error: fail });
        } else {
            this.api.audit(this.filters).pipe(finalize(done)).subscribe({ next: (result) => this.audit.set(result), error: fail });
        }
    }

    /** Exporte toutes les lignes correspondant aux filtres (jusqu'à 100), pour justifier une action. */
    exportCsv(): void {
        const all = { ...this.filters, page: 1 };
        const date = (iso: string) => new Date(iso).toLocaleString('fr-FR');
        if (this.view() === 'requests') {
            this.download(this.api.activity(all, 100), (page: Page<RequestActivity>) =>
                toCsv(
                    ['Date', 'Auteur', 'Action', 'Demande', 'Statut actuel'],
                    page.items.map((item) => [date(item.event.created_at), item.event.actor_name ?? 'Système', eventLabel(item.event), item.request_title, item.request_status])
                )
            );
        } else {
            this.download(this.api.audit(all, 100), (page: Page<AuditEntry>) =>
                toCsv(
                    ['Date', 'Auteur', 'Rôle', 'Action', 'Objet', 'Détails'],
                    page.items.map((entry) => [date(entry.occurred_at), entry.actor_name, this.roleLabel(entry.actor_role), AUDIT_LABELS[entry.action], entry.target_label, auditDetails(entry)])
                )
            );
        }
    }

    roleLabel(role: string): string {
        return ROLE_LABELS[role as keyof typeof ROLE_LABELS] ?? role;
    }

    private download<T>(source: Observable<T>, build: (page: T) => string): void {
        source.subscribe({
            next: (page) => {
                const url = URL.createObjectURL(new Blob([build(page)], { type: 'text/csv;charset=utf-8' }));
                const link = document.createElement('a');
                link.href = url;
                link.download = `journal-${this.view()}-${new Date().toISOString().slice(0, 10)}.csv`;
                link.click();
                URL.revokeObjectURL(url);
            },
            error: (error: unknown) => this.error.set(apiErrorMessage(error))
        });
    }
}
