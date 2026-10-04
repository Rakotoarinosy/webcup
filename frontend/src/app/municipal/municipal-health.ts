import { Component, DestroyRef, ElementRef, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { TermHelp } from '../glossary/term-help';
import { LiveDataService } from '../shared/live-data.service';
import { LocatedService, MunicipalService, directionsUrl, distanceKm, formatDistance, isHealthService, isLocated } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';
import { ServiceStatusBadge } from './service-status';
import { ServicesMap } from './services-map';

export interface EmergencyNumber {
    label: string;
    number: string;
    description: string;
    icon: string;
}

/**
 * Numéros d'urgence nationaux affichés en tête de page. À faire valider par la mairie avant la mise
 * en service (les services de santé, eux, viennent de l'API et sont gérés par la ville).
 */
export const EMERGENCY_NUMBERS: readonly EmergencyNumber[] = [
    { label: 'Police secours', number: '117', description: 'Agression, accident, danger immédiat', icon: 'pi-shield' },
    { label: 'Sapeurs-pompiers', number: '118', description: 'Incendie, personne blessée ou en détresse', icon: 'pi-exclamation-circle' }
];

/** Premier numéro de téléphone trouvé dans les coordonnées d'un service, pour un lien d'appel direct. */
export function phoneHref(text: string): string | null {
    const match = text.match(/\+?\d[\d .-]{4,}\d/);
    return match ? `tel:${match[0].replace(/[ .-]/g, '')}` : null;
}

/** F46 : hôpitaux, urgences et santé, accessibles en un clic, avec appel direct et itinéraire. */
@Component({
    selector: 'app-municipal-health',
    imports: [ServicesMap, ServiceStatusBadge, TermHelp],
    templateUrl: './municipal-health.html',
    styleUrl: './municipal-health.scss'
})
export class MunicipalHealth implements OnInit {
    private readonly content = inject(MunicipalContentService);
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly mapSection = viewChild<ElementRef<HTMLElement>>('mapSection');
    private readonly map = viewChild(ServicesMap);

    readonly emergencyNumbers = EMERGENCY_NUMBERS;
    readonly directionsUrl = directionsUrl;
    readonly isLocated = isLocated;
    readonly phoneHref = phoneHref;
    readonly services = signal<MunicipalService[]>([]);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly position = signal<{ latitude: number; longitude: number } | null>(null);
    readonly locating = signal(false);
    readonly locateMessage = signal<string | null>(null);
    readonly emergencyOnly = signal(false);

    /** Urgences ouvertes 24h/24 d'abord ; une fois la position connue, du plus proche au plus loin. */
    readonly healthServices = computed(() => {
        const position = this.position();
        const items = this.services()
            .filter(isHealthService)
            .filter((service) => !this.emergencyOnly() || service.emergency_care);
        const rank = (service: MunicipalService) => (service.emergency_care ? 0 : 2) + (service.open_24_7 ? 0 : 1);
        const distance = (service: MunicipalService) => (position && isLocated(service) ? distanceKm(position, service) : Number.POSITIVE_INFINITY);
        return [...items].sort((a, b) => (position ? distance(a) - distance(b) : 0) || rank(a) - rank(b) || a.display_order - b.display_order);
    });
    readonly locatedServices = computed(() => this.healthServices().filter(isLocated));
    /** Le lieu d'urgence ouvert le plus proche (si la position est connue). */
    readonly nearestEmergency = computed<LocatedService | null>(() => {
        const position = this.position();
        if (!position) return null;
        const candidates = this.services()
            .filter((service) => isHealthService(service) && service.emergency_care && service.status !== 'out_of_service' && service.status !== 'maintenance')
            .filter(isLocated)
            .sort((a, b) => distanceKm(position, a) - distanceKm(position, b));
        return candidates[0] ?? null;
    });

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
        this.content
            .services()
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: (items) => this.services.set(items),
                error: () => this.error.set('Impossible de charger les lieux de santé. En cas d’urgence, appelez directement un numéro ci-dessus.')
            });
    }

    distance(service: MunicipalService): string | null {
        const position = this.position();
        return position && isLocated(service) ? formatDistance(distanceKm(position, service)) : null;
    }

    locateMe(): void {
        if (!('geolocation' in navigator)) {
            this.locateMessage.set('Votre navigateur ne permet pas de vous localiser. Consultez la liste ci-dessous.');
            return;
        }
        this.locating.set(true);
        this.locateMessage.set(null);
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                this.position.set({ latitude: coords.latitude, longitude: coords.longitude });
                this.locating.set(false);
                const nearest = this.nearestEmergency();
                this.locateMessage.set(nearest ? `Urgences les plus proches : ${nearest.name}, à ${this.distance(nearest)}.` : 'Lieux classés du plus proche au plus éloigné de vous.');
            },
            () => {
                this.locating.set(false);
                this.locateMessage.set('Position indisponible ou refusée. Consultez la liste ci-dessous.');
            },
            { timeout: 10000, maximumAge: 300000 }
        );
    }

    showOnMap(service: LocatedService): void {
        this.mapSection()?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.map()?.focus(service.id);
    }
}
