import { MunicipalNavigation } from './municipal-navigation.service';
import { LiveDataService } from '@/app/shared/live-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Component, DestroyRef, ElementRef, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TermHelp } from '../glossary/term-help';
import { LocatedService, MunicipalService, SERVICE_STATUS_DISPLAY, SERVICE_STATUS_VALUES_FOR_FORM, ServiceStatus, canStart, directionsUrl, distanceKm, formatDistance, isLocated } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';
import { ServicesMap } from './services-map';
import { ServiceStatusBadge } from './service-status';

interface Position {
    latitude: number;
    longitude: number;
}

interface StatusForm {
    status: ServiceStatus;
    message: string;
    expected_back_at: string; // datetime-local, heure de l'appareil
    alternative: string;
    alternative_service_id: string | null;
}

interface LocationForm {
    address: string;
    latitude: number | null;
    longitude: number | null;
}

@Component({ selector: 'app-municipal-services', imports: [CardModule, FormsModule, RouterLink, ServicesMap, ServiceStatusBadge, TermHelp], templateUrl: './municipal-services.html', styleUrl: './municipal-services.scss' })
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
    readonly canStart = canStart;
    readonly statusDisplay = SERVICE_STATUS_DISPLAY;
    readonly statusOptions = SERVICE_STATUS_VALUES_FOR_FORM;
    /** F63 : « disponibles uniquement » masque les services où l'on ne peut rien commencer. */
    readonly availableOnly = signal(false);
    readonly editingStatus = signal<string | null>(null);
    readonly statusError = signal<string | null>(null);
    readonly statusNotice = signal<string | null>(null);
    statusForm: StatusForm = { status: 'out_of_service', message: '', expected_back_at: '', alternative: '', alternative_service_id: null };
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
        const usable = this.availableOnly() ? items.filter(canStart) : items;
        return query ? usable.filter((service) => normalize(`${service.name} ${service.category ?? ''} ${service.description} ${service.address ?? ''}`).includes(query)) : usable;
    });
    readonly interruptedCount = computed(() => this.services().filter((service) => !canStart(service)).length);

    ngOnInit(): void {
        this.load();
        this.live.watch(
            this.destroyRef,
            () => this.load(),
            () => !this.loading() && !this.saving() && this.editingStatus() === null
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

    /** Autres services vers lesquels orienter les habitants pendant l'interruption. */
    alternativesFor(service: MunicipalService): MunicipalService[] {
        return this.services().filter((item) => item.id !== service.id && canStart(item));
    }

    editStatus(service: MunicipalService, status: ServiceStatus = service.status === 'available' ? 'out_of_service' : service.status): void {
        this.editingStatus.set(service.id);
        this.statusError.set(null);
        this.statusNotice.set(null);
        this.statusForm = {
            status,
            message: service.status_message ?? '',
            expected_back_at: toLocalInput(service.status_expected_back_at),
            alternative: service.status_alternative ?? '',
            alternative_service_id: service.alternative_service_id
        };
    }

    saveStatus(service: MunicipalService): void {
        const form = this.statusForm;
        if (form.status !== 'available' && !form.message.trim()) {
            this.statusError.set('Expliquez aux habitants pourquoi le service n’est pas pleinement disponible.');
            return;
        }
        if (form.expected_back_at && new Date(form.expected_back_at).getTime() <= Date.now()) {
            this.statusError.set('La date de retour prévue doit être dans le futur.');
            return;
        }
        const payload =
            form.status === 'available'
                ? { status: form.status }
                : {
                      status: form.status,
                      message: form.message.trim(),
                      expected_back_at: form.expected_back_at ? new Date(form.expected_back_at).toISOString() : null,
                      alternative: form.alternative.trim() || null,
                      alternative_service_id: form.alternative_service_id || null
                  };
        this.sendStatus(service, payload);
    }

    /** F63 : remise en service en un clic. */
    restore(service: MunicipalService): void {
        this.sendStatus(service, { status: 'available' });
    }

    private sendStatus(service: MunicipalService, payload: Parameters<MunicipalContentService['updateServiceStatus']>[1]): void {
        if (this.saving()) return;
        this.saving.set(service.id);
        this.statusError.set(null);
        this.statusNotice.set(null);
        this.content
            .updateServiceStatus(service.id, payload)
            .pipe(finalize(() => this.saving.set(null)))
            .subscribe({
                next: (updated) => {
                    this.services.update((items) => items.map((item) => (item.id === updated.id ? updated : item)));
                    this.editingStatus.set(null);
                    this.statusNotice.set(`« ${updated.name} » : ${SERVICE_STATUS_DISPLAY[updated.status].label}.`);
                },
                error: () => this.statusError.set(`Impossible de modifier l’état de « ${service.name} ». Vérifiez les informations puis réessayez.`)
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

/** ISO → valeur d'un champ datetime-local (heure de l'appareil). */
function toLocalInput(iso: string | null): string {
    if (!iso) return '';
    const date = new Date(iso);
    const pad = (value: number) => String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
