import { MunicipalNavigation } from './municipal-navigation.service';
import { LiveDataService } from '@/app/shared/live-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Component, DestroyRef, computed, inject, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MunicipalService } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';

@Component({ selector: 'app-municipal-services', imports: [CardModule, FormsModule], templateUrl: './municipal-services.html', styleUrl: './municipal-services.scss' })
export class MunicipalServices implements OnInit {
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly content = inject(MunicipalContentService);
    private readonly router = inject(Router);
    protected readonly auth = inject(AuthService);
    readonly navigation = inject(MunicipalNavigation);
    readonly openingService = signal<string | null>(null);
    readonly loading = signal(false);
    readonly services = signal<MunicipalService[]>([]);
    readonly search = signal('');
    readonly saving = signal<string | null>(null);
    readonly error = signal<string | null>(null);
    readonly visibleServices = computed(() => {
        const normalize = (text: string) =>
            text
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLocaleLowerCase('fr');
        const query = normalize(this.search().trim());
        const items = [...this.services()];
        items.sort((a, b) => Number(normalize(b.category).includes('sant')) - Number(normalize(a.category).includes('sant')) || a.display_order - b.display_order);
        return query ? items.filter((service) => normalize(`${service.name} ${service.category ?? ''} ${service.description}`).includes(query)) : items;
    });

    ngOnInit(): void {
        this.load();
        this.live.watch(
            this.destroyRef,
            () => this.load(),
            () => !this.loading() && !this.saving()
        );
    }
    load(): void {
        if (this.loading()) return;
        this.loading.set(true);
        this.error.set(null);
        this.content
            .services()
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: (items) => this.services.set(items),
                error: () => this.error.set('Impossible de charger les services. Réessayez.')
            });
    }

    onFeaturedChange(service: MunicipalService, event: Event): void {
        const input = event.target;
        if (input instanceof HTMLInputElement) this.updateFeatured(service, input.checked);
    }

    updateFeatured(service: MunicipalService, isFeatured: boolean, displayOrder = service.display_order): void {
        if (this.saving()) return;
        this.saving.set(service.id);
        this.error.set(null);
        this.content.updateFeaturedService(service.id, isFeatured, displayOrder).subscribe({
            next: (updated) => {
                this.services.update((items) => items.map((item) => (item.id === updated.id ? updated : item)));
                this.saving.set(null);
            },
            error: () => {
                this.error.set('Impossible de modifier la mise en avant. Vérifiez vos droits puis réessayez.');
                this.saving.set(null);
            }
        });
    }

    startService(service: MunicipalService): void {
        if (this.openingService()) return;
        this.openingService.set(service.id);
        this.error.set(null);
        this.content
            .startService(service.id)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.openingService.set(null))
            )
            .subscribe({
                next: () => void this.router.navigate([this.navigation.path('contact')], { queryParams: { service: service.id } }),
                error: () => this.error.set('Impossible d’ouvrir cette démarche. Réessayez dans quelques instants.')
            });
    }
}
