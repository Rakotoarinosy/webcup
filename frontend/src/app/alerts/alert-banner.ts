import { Component, DestroyRef, ElementRef, Injector, OnInit, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { interval } from 'rxjs';

import { LiveDataService } from '@/app/shared/live-data.service';
import { CityAlert, LEVEL_DISPLAY } from './alert.model';
import { AlertService } from './alert.service';

const STORAGE_KEY = 'tn.alerts.acknowledged';
const REFRESH_MS = 60_000;

/** Une alerte modifiée (niveau relevé, consignes changées) est réaffichée : la clé inclut la date de mise à jour. */
export function acknowledgementKey(alert: Pick<CityAlert, 'id' | 'updated_at'>): string {
    return `${alert.id}@${alert.updated_at}`;
}

function readAcknowledged(): string[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed: unknown = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
    } catch {
        return [];
    }
}

function writeAcknowledged(keys: string[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(keys.slice(-100)));
    } catch {
        // Stockage indisponible (navigation privée…) : l'alerte reste masquée jusqu'au rechargement.
    }
}

/**
 * Bandeau des alertes en cours, en haut de toutes les pages (D18, F29, F73).
 * Niveau en texte + icône, consignes « Que faire ? », bouton « J'ai compris » mémorisé par alerte.
 */
@Component({
    selector: 'app-alert-banner',
    imports: [RouterLink],
    template: `
        @if (visible().length) {
            <div class="tn-alerts" role="region" aria-label="Alertes et messages officiels en cours">
                @for (alert of visible(); track alert.id) {
                    <section class="tn-alert" [class]="display[alert.level].tone" [attr.role]="display[alert.level].role" [attr.aria-labelledby]="'tn-alert-title-' + alert.id">
                        <i class="tn-alert-icon" [class]="display[alert.level].icon" aria-hidden="true"></i>
                        <div class="tn-alert-body">
                            <p class="tn-alert-meta">
                                <strong class="tn-alert-level">{{ display[alert.level].label }}</strong>
                                <span> · {{ alert.issuer }}</span>
                                @if (alert.zone) {
                                    <span> · Zone : {{ alert.zone }}</span>
                                }
                                @if (alert.audience !== 'Tous les habitants') {
                                    <span> · {{ alert.audience }}</span>
                                }
                            </p>
                            <p class="tn-alert-title" [id]="'tn-alert-title-' + alert.id">{{ alert.title }}</p>
                            <p class="tn-alert-message">{{ alert.message }}</p>
                            @if (alert.instructions) {
                                <div class="tn-alert-instructions">
                                    <strong>Que faire ?</strong>
                                    <p>{{ alert.instructions }}</p>
                                </div>
                            }
                            <a class="tn-alert-link" [routerLink]="alertsLink()">Toutes les alertes et messages officiels</a>
                        </div>
                        <button type="button" class="tn-alert-ack" [attr.aria-label]="'J’ai compris, masquer l’alerte : ' + alert.title" (click)="acknowledge(alert)">
                            <i class="pi pi-check" aria-hidden="true"></i> J’ai compris
                        </button>
                    </section>
                }
            </div>
        }
    `,
    styles: [
        `
            .tn-alerts {
                display: grid;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            .tn-alert {
                display: flex;
                flex-wrap: wrap;
                align-items: flex-start;
                gap: 0.75rem 1rem;
                padding: 0.9rem 1rem;
                border-radius: 0.75rem;
                border: 2px solid;
                border-left-width: 8px;
                color: #1f2937;
            }
            .alert-urgent {
                background: #fef2f2;
                border-color: #b91c1c;
            }
            .alert-attention {
                background: #fffbeb;
                border-color: #b45309;
            }
            .alert-info {
                background: #eff6ff;
                border-color: #1d4ed8;
            }
            :host-context(.app-dark) .tn-alert {
                color: #f9fafb;
            }
            :host-context(.app-dark) .alert-urgent {
                background: #450a0a;
                border-color: #f87171;
            }
            :host-context(.app-dark) .alert-attention {
                background: #451a03;
                border-color: #fbbf24;
            }
            :host-context(.app-dark) .alert-info {
                background: #172554;
                border-color: #60a5fa;
            }
            .tn-alert-icon {
                font-size: 1.5rem;
                margin-top: 0.15rem;
            }
            .tn-alert-body {
                flex: 1 1 18rem;
                min-width: 0;
            }
            .tn-alert-body p {
                margin: 0;
            }
            .tn-alert-meta {
                font-size: 0.875rem;
            }
            .tn-alert-level {
                text-transform: uppercase;
                letter-spacing: 0.04em;
            }
            .tn-alert-title {
                font-size: 1.1rem;
                font-weight: 700;
                margin-top: 0.15rem !important;
            }
            .tn-alert-message,
            .tn-alert-instructions p {
                white-space: pre-line;
                overflow-wrap: anywhere;
            }
            .tn-alert-instructions {
                margin-top: 0.5rem;
            }
            .tn-alert-link {
                display: inline-block;
                margin-top: 0.5rem;
                color: inherit;
                text-decoration: underline;
                font-weight: 600;
            }
            .tn-alert-ack {
                align-self: center;
                border: 2px solid currentColor;
                border-radius: 0.5rem;
                background: transparent;
                color: inherit;
                font-weight: 600;
                padding: 0.5rem 0.9rem;
                cursor: pointer;
            }
            .tn-alert-link:focus-visible,
            .tn-alert-ack:focus-visible {
                outline: 3px solid currentColor;
                outline-offset: 2px;
            }
        `
    ]
})
export class AlertBanner implements OnInit {
    private readonly api = inject(AlertService);
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly injector = inject(Injector);
    private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

    /** Page « Alertes et messages officiels » de l'espace courant (public ou connecté). */
    readonly alertsLink = input('/municipal/alertes');

    protected readonly display = LEVEL_DISPLAY;
    protected readonly alerts = signal<CityAlert[]>([]);
    protected readonly acknowledged = signal<string[]>(readAcknowledged());
    protected readonly visible = computed(() => {
        const hidden = new Set(this.acknowledged());
        return this.alerts().filter((alert) => !hidden.has(acknowledgementKey(alert)));
    });
    private loading = false;

    ngOnInit(): void {
        this.load();
        this.live.watch(this.destroyRef, () => this.load(), () => !this.loading);
        // Une alerte programmée doit apparaître à son heure, même sans autre activité.
        interval(REFRESH_MS)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.load());
    }

    load(): void {
        if (this.loading) return;
        this.loading = true;
        this.api
            .current()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (alerts) => {
                    this.alerts.set(alerts);
                    this.loading = false;
                },
                // Hors ligne : on garde les dernières alertes connues plutôt que de les effacer.
                error: () => (this.loading = false)
            });
    }

    acknowledge(alert: CityAlert): void {
        const keys = [...this.acknowledged().filter((key) => key !== acknowledgementKey(alert)), acknowledgementKey(alert)];
        this.acknowledged.set(keys);
        writeAcknowledged(keys);
        // Le bouton disparaît : le focus passe à l'alerte suivante, sinon au contenu principal.
        afterNextRender(
            () => {
                const next = this.host.nativeElement.querySelector<HTMLElement>('.tn-alert-ack');
                (next ?? document.getElementById('main-content'))?.focus();
            },
            { injector: this.injector }
        );
    }
}
