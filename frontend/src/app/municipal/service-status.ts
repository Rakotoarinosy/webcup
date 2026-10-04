import { DatePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MunicipalService, SERVICE_STATUS_DISPLAY } from './municipal-content.model';
import { MunicipalNavigation } from './municipal-navigation.service';

/**
 * État d'un service (F38/F63/F64) : icône + texte (jamais la couleur seule) et, en mode détaillé,
 * l'explication, l'heure de retour prévue et « que faire à la place ».
 */
@Component({
    selector: 'app-service-status',
    imports: [DatePipe, RouterLink],
    template: `
        <span [class]="'status-badge tone-' + display().tone">
            <i [class]="'pi ' + display().icon" aria-hidden="true"></i>
            <span class="sr-only">État du service : </span>{{ display().label }}
        </span>
        @if (detailed() && service().status !== 'available') {
            <div [class]="'status-details tone-' + display().tone">
                @if (service().status_message; as message) {
                    <p class="m-0">{{ message }}</p>
                }
                @if (service().status_expected_back_at; as back) {
                    <p class="m-0"><strong>Retour prévu :</strong> {{ back | date: "EEEE d MMMM 'à' HH:mm" }}</p>
                } @else if (service().status !== 'disrupted') {
                    <p class="m-0"><strong>Retour prévu :</strong> date non connue pour le moment.</p>
                }
                @if (service().status_alternative || alternative()) {
                    <p class="m-0">
                        <strong>Que faire à la place :</strong> {{ service().status_alternative }}
                        @if (alternative(); as other) {
                            <a class="alt-link" [routerLink]="navigation.path('contact')" [queryParams]="{ service: other.id }">Contacter « {{ other.name }} » <i class="pi pi-arrow-right" aria-hidden="true"></i></a>
                        }
                    </p>
                }
                @if (service().status_updated_at; as updated) {
                    <p class="m-0 updated">Information mise à jour le {{ updated | date: "d MMMM 'à' HH:mm" }}</p>
                }
            </div>
        }
    `,
    styles: `
        :host {
            display: block;
        }
        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            border-radius: 999px;
            padding: 0.2rem 0.65rem;
            font-size: 0.875rem;
            font-weight: 700;
            border: 1px solid currentColor;
        }
        .status-badge i {
            margin: 0;
            color: inherit;
        }
        .tone-ok {
            color: var(--p-green-700, #15803d);
        }
        .tone-warn {
            color: var(--p-orange-700, #c2410c);
        }
        .tone-down {
            color: var(--p-red-700, #b91c1c);
        }
        .status-details {
            display: grid;
            gap: 0.4rem;
            margin-top: 0.6rem;
            padding: 0.75rem;
            border-left: 4px solid currentColor;
            border-radius: 0.5rem;
            background: var(--p-content-hover-background, rgba(0, 0, 0, 0.03));
        }
        .status-details p {
            color: var(--p-text-color);
        }
        .status-details .updated {
            color: var(--p-text-muted-color);
            font-size: 0.85rem;
        }
        .alt-link {
            font-weight: 700;
            color: var(--p-primary-color);
            text-decoration: underline;
        }
        .alt-link:focus-visible {
            outline: 2px solid var(--p-primary-color);
            outline-offset: 2px;
        }
    `
})
export class ServiceStatusBadge {
    readonly navigation = inject(MunicipalNavigation);
    readonly service = input.required<MunicipalService>();
    /** Liste des services, pour nommer le service de remplacement. */
    readonly services = input<MunicipalService[]>([]);
    readonly detailed = input(false);
    readonly display = computed(() => SERVICE_STATUS_DISPLAY[this.service().status] ?? SERVICE_STATUS_DISPLAY.available);
    readonly alternative = computed(() => {
        const id = this.service().alternative_service_id;
        return id ? (this.services().find((item) => item.id === id) ?? null) : null;
    });
}
