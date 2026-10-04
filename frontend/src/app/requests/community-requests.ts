import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { apiErrorMessage } from '@/app/users/user.service';
import { PublicRequest, PublicRequestSort, REQUEST_CATEGORIES, RequestCategory } from './request.model';
import { CitizenRequestService } from './request.service';

const PAGE_SIZE = 10;

/**
 * « Demandes du quartier » (F52) : un habitant consulte les demandes ouvertes des autres habitants
 * (vue publique anonymisée) et soutient celles qui le concernent aussi. Ses soutiens restent listés
 * avec leur statut à jour : il sait que sa participation a été prise en compte.
 */
@Component({
    selector: 'app-community-requests',
    imports: [DatePipe, FormsModule],
    templateUrl: './community-requests.html'
})
export class CommunityRequests implements OnInit {
    private readonly api = inject(CitizenRequestService);

    protected readonly items = signal<PublicRequest[]>([]);
    protected readonly supported = signal<PublicRequest[]>([]);
    protected readonly total = signal(0);
    protected readonly page = signal(1);
    protected readonly pages = signal(1);
    protected readonly loading = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly busy = signal<string | null>(null);
    protected readonly confirmation = signal<string | null>(null);
    protected readonly categories = [...REQUEST_CATEGORIES];
    protected search = '';
    protected category: RequestCategory | null = null;
    protected sort: PublicRequestSort = 'recent';

    ngOnInit(): void {
        this.load(1);
        this.loadSupported();
    }

    protected load(page = this.page()): void {
        this.loading.set(true);
        this.error.set(null);
        this.api
            .publicList({ page, page_size: PAGE_SIZE, search: this.search.trim() || undefined, category: this.category ?? undefined, sort: this.sort })
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (result) => {
                    this.items.set(result.items);
                    this.total.set(result.total);
                    this.page.set(result.page);
                    this.pages.set(Math.max(1, result.total_pages));
                },
                error: (error: unknown) => this.error.set(apiErrorMessage(error))
            });
    }

    protected loadSupported(): void {
        this.api.supported().subscribe({
            next: (items) => this.supported.set(items),
            error: (error: unknown) => this.error.set(apiErrorMessage(error))
        });
    }

    protected toggleSupport(item: PublicRequest): void {
        if (this.busy() || item.is_mine) return;
        this.busy.set(item.id);
        this.confirmation.set(null);
        const action = item.supported_by_me ? this.api.unsupport(item.id) : this.api.support(item.id);
        action.pipe(finalize(() => this.busy.set(null))).subscribe({
            next: (updated) => {
                this.items.update((items) => items.map((current) => (current.id === updated.id ? { ...current, ...updated } : current)));
                this.confirmation.set(
                    updated.supported_by_me
                        ? `Votre soutien à « ${updated.title} » est enregistré. Elle compte désormais ${updated.support_count} soutien(s) ; vous serez prévenu(e) de son évolution.`
                        : `Votre soutien à « ${updated.title} » a été retiré.`
                );
                this.loadSupported();
            },
            error: (error: unknown) => this.error.set(apiErrorMessage(error))
        });
    }

    protected goToPage(page: number): void {
        if (page < 1 || page > this.pages() || page === this.page() || this.loading()) return;
        this.load(page);
    }
}
