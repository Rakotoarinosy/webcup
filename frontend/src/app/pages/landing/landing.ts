import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { AuthService } from '@/app/auth/auth.service';
import { MunicipalContentService } from '@/app/municipal/municipal-content.service';
import { MunicipalService, MunicipalPublication } from '@/app/municipal/municipal-content.model';
import { LiveDataService } from '@/app/shared/live-data.service';
import { I18N_PIPES } from '@/app/i18n/t.pipe';
import { I18nService } from '@/app/i18n/i18n.service';
import { TopbarWidget } from './components/topbarwidget/topbarwidget.component';

@Component({ selector: 'app-landing', imports: [DatePipe, RouterModule, TopbarWidget, I18N_PIPES], templateUrl: './landing.html', styleUrl: './landing.scss' })
export class Landing implements OnInit {
    readonly auth = inject(AuthService);
    private readonly content = inject(MunicipalContentService);
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly i18n = inject(I18nService);
    readonly services = signal<MunicipalService[]>([]);
    readonly publications = signal<MunicipalPublication[]>([]);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly updatedAt = signal<Date | null>(null);
    readonly year = new Date().getFullYear();
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
        this.error.set(null);
        forkJoin({ services: this.content.services(), publications: this.content.publications() })
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: ({ services, publications }) => {
                    this.services.set(services);
                    this.publications.set(publications.slice(0, 3));
                    this.updatedAt.set(new Date());
                },
                error: () => this.error.set(this.i18n.t('landing.loadError'))
            });
    }
}
