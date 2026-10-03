import { MunicipalNavigation } from './municipal-navigation.service';
import { LiveDataService } from '@/app/shared/live-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Component, DestroyRef, ElementRef, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LocatedService, MunicipalService, directionsUrl, distanceKm, formatDistance, isLocated } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';
import { ServicesMap } from './services-map';

interface Position {
    latitude: number;
    longitude: number;
}

interface LocationForm {
    address: string;
    latitude: number | null;
    longitude: number | null;
}

@Component({ selector: 'app-municipal-services', imports: [CardModule, FormsModule, ServicesMap], templateUrl: './municipal-services.html', styleUrl: './municipal-services.scss' })
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
    /** Position de l'habitant, uniquement dans le navigateur : elle n'est jamais envoyée au serveur. */
    readonly position = signal<Position | null>(null);
    readonly locating = signal(false);
    readonly locateMessage = signal<string | null>(null);
    readonly editingLocation = signal<string | null>(null);
    readonly directionsUrl = directionsUrl;
    readonly isLocated = isLocated;
    locationForm: LocationForm = { address: '', latitude: null, longitude: null };
    private readonly map = viewChild(ServicesMap);
    private readonly mapSection = viewChild<ElementRef<HTMLElement>>('mapSection');
    readonly locatedServices = computed(() => this.visibleServices().filter(isLocated));
    readonly visibleServices = computed(() => {
        const normalize = (text: string) =>
            text
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLocaleLowerCase('fr');
        const query = normalize(this.search().trim());
        const items = [...this.services()];
        items.sort((a, b) => Number(normalize(b.category).includes('sant')) - Number(normalize(a.category).includes('sant')) || a.display_order - b.display_order);
        const position = this.position();
        if (position) {
            // Près de moi : les services localisés du plus proche au plus éloigné, puis les autres.
            const distance = (service: MunicipalService) => (isLocated(service) ? distanceKm(position, service) : Number.POSITIVE_INFINITY);
            items.sort((a, b) => distance(a) - distance(b));
        }
        return query ? items.filter((service) => normalize(`${service.name} ${service.category ?? ''} ${service.description} ${service.address ?? ''}`).includes(query)) : items;
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

    distance(service: MunicipalService): string | null {
        const position = this.position();
        return position && isLocated(service) ? formatDistance(distanceKm(position, service)) : null;
    }

    locateMe(): void {
        if (!('geolocation' in navigator)) {
            this.locateMessage.set('Votre navigateur ne permet pas de vous localiser. Recherchez le service par son nom ou son adresse.');
            return;
        }
        this.locating.set(true);
        this.locateMessage.set(null);
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                this.position.set({ latitude: coords.latitude, longitude: coords.longitude });
                this.locating.set(false);
                this.locateMessage.set('Services classés du plus proche au plus éloigné de vous.');
            },
            () => {
                this.locating.set(false);
                this.locateMessage.set('Position indisponible ou refusée. Recherchez le service par son nom ou son adresse.');
            },
            { timeout: 10000, maximumAge: 300000 }
        );
    }

    showOnMap(service: LocatedService): void {
        this.mapSection()?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.map()?.focus(service.id);
    }

    editLocation(service: MunicipalService): void {
        this.editingLocation.set(service.id);
        this.locationForm = { address: service.address ?? '', latitude: service.latitude, longitude: service.longitude };
    }

    saveLocation(service: MunicipalService, clear = false): void {
        if (this.saving()) return;
        const form = this.locationForm;
        const location = clear ? { address: null, latitude: null, longitude: null } : { address: form.address.trim(), latitude: form.latitude, longitude: form.longitude };
        if (!clear && (!location.address || location.latitude === null || location.longitude === null)) {
            this.error.set(`Renseignez l’adresse, la latitude et la longitude de « ${service.name} ».`);
            return;
        }
        this.saving.set(service.id);
        this.error.set(null);
        this.content
            .updateServiceLocation(service.id, location)
            .pipe(finalize(() => this.saving.set(null)))
            .subscribe({
                next: (updated) => {
                    this.services.update((items) => items.map((item) => (item.id === updated.id ? updated : item)));
                    this.editingLocation.set(null);
                },
                error: () => this.error.set(`Impossible d’enregistrer le lieu d’accueil de « ${service.name} ». Vérifiez les coordonnées puis réessayez.`)
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
