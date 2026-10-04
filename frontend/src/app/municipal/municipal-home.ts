import { MunicipalNavigation } from './municipal-navigation.service';
import { LiveDataService } from '@/app/shared/live-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, forkJoin } from 'rxjs';
import { I18nService } from '@/app/i18n/i18n.service';
import { I18N_PIPES } from '@/app/i18n/t.pipe';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { MunicipalContentService } from './municipal-content.service';
import { MunicipalPublication, MunicipalService } from './municipal-content.model';

@Component({
    selector: 'app-municipal-home',
    imports: [RouterLink, ButtonModule, CardModule, I18N_PIPES],
    templateUrl: './municipal-home.html',
    styleUrl: './municipal-home.scss'
})
export class MunicipalHome implements OnInit {
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly content = inject(MunicipalContentService);
    private readonly router = inject(Router);
    private readonly i18n = inject(I18nService);
    readonly navigation = inject(MunicipalNavigation);
    readonly openingService = signal<string | null>(null);
    readonly loading = signal(false);
    readonly loadError = signal<string | null>(null);
    readonly popularServices = signal<MunicipalService[]>([]);
    readonly publications = signal<MunicipalPublication[]>([]);
    readonly startError = signal<string | null>(null);

    ngOnInit(): void {
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
        this.loadError.set(null);
        forkJoin({ popular: this.content.popularServices(6), publications: this.content.publications() })
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: ({ popular, publications }) => {
                    this.popularServices.set(popular.slice(0, 6));
                    this.publications.set(publications.slice(0, 2));
                },
                error: () => this.loadError.set(this.i18n.t('municipal.loadError'))
            });
    }

    startService(service: MunicipalService): void {
        if (this.openingService()) return;
        this.openingService.set(service.id);
        this.startError.set(null);
        this.content
            .startService(service.id)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.openingService.set(null))
            )
            .subscribe({
                next: () => void this.router.navigate([this.navigation.path('contact')], { queryParams: { service: service.id } }),
                error: () => this.startError.set(this.i18n.t('municipal.startError'))
            });
    }
}
