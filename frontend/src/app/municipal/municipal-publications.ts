import { ActivatedRoute } from '@angular/router';
import { LiveDataService } from '@/app/shared/live-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MunicipalPublication } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';

@Component({ selector: 'app-municipal-publications', imports: [DatePipe, ButtonModule, SelectModule], templateUrl: './municipal-publications.html', styleUrl: './municipal-publications.scss' })
export class MunicipalPublications implements OnInit {
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly content = inject(MunicipalContentService);
    private readonly route = inject(ActivatedRoute);
    readonly expandedPublication = signal<string | null>(null);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly publications = signal<MunicipalPublication[]>([]);
    readonly selectedCategory = signal<string | null>(null);
    readonly categories = computed(() => [...new Set(this.publications().map((item) => item.category))].map((label) => ({ label, value: label })));

    readonly visiblePublications = computed(() => this.publications().filter((item) => !this.selectedCategory() || item.category === this.selectedCategory()));
    ngOnInit(): void {
        this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => this.expandedPublication.set(params.get('publication')));
        this.load();
        this.live.watch(
            this.destroyRef,
            () => this.load(),
            () => !this.loading()
        );
    }
    load(): void {
        if (this.loading()) return;
        this.loading.set(true);
        this.error.set(null);
        this.content
            .publications()
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: (items) => this.publications.set(items),
                error: () => this.error.set('Impossible de charger les publications. Réessayez.')
            });
    }
    togglePublication(id: string): void {
        this.expandedPublication.update((current) => (current === id ? null : id));
    }
    selectCategory(value: string | null): void {
        this.selectedCategory.set(value);
    }
}
