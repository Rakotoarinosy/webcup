import { AfterViewInit, Component, ElementRef, OnDestroy, effect, input, signal, viewChild } from '@angular/core';
import * as L from 'leaflet';

import { LocatedService, SERVICE_STATUS_DISPLAY, directionsUrl } from './municipal-content.model';

const MARKER_COLORS = { ok: '#124f70', warn: '#b45309', down: '#b91c1c' } as const;
// Pastille ajoutée au marqueur : l'état ne repose pas que sur la couleur.
const MARKER_BADGES = { ok: '', warn: '!', down: '×' } as const;

// Centre par défaut : Antananarivo.
const DEFAULT_CENTER: L.LatLngTuple = [-18.9068, 47.5244];

/**
 * Carte des lieux d'accueil (F45). La liste des services à côté reste l'accès principal
 * (clavier, lecteur d'écran) : la carte en est la vue géographique.
 */
@Component({
    selector: 'app-services-map',
    template: `<div #mapContainer class="services-map" role="region" [attr.aria-label]="label()"></div>`,
    styles: `
        .services-map {
            height: 360px;
            border-radius: 0.75rem;
            z-index: 0;
        }
    `
})
export class ServicesMap implements AfterViewInit, OnDestroy {
    readonly services = input<LocatedService[]>([]);
    readonly position = input<{ latitude: number; longitude: number } | null>(null);
    readonly label = input('Carte des lieux d’accueil des services municipaux');

    private readonly container = viewChild.required<ElementRef<HTMLElement>>('mapContainer');
    private readonly ready = signal(false);
    private map?: L.Map;
    private readonly layer = L.layerGroup();
    private readonly markers = new globalThis.Map<string, L.Marker>();

    constructor() {
        effect(() => {
            const services = this.services();
            const position = this.position();
            if (this.ready()) this.render(services, position);
        });
    }

    ngAfterViewInit(): void {
        this.map = L.map(this.container().nativeElement).setView(DEFAULT_CENTER, 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap contributors' }).addTo(this.map);
        this.layer.addTo(this.map);
        this.ready.set(true);
    }

    ngOnDestroy(): void {
        this.map?.remove();
        this.map = undefined;
    }

    /** Centre la carte sur un service et ouvre sa fiche (bouton « Voir sur la carte »). */
    focus(serviceId: string): void {
        const marker = this.markers.get(serviceId);
        if (!marker || !this.map) return;
        this.map.setView(marker.getLatLng(), 17, { animate: false });
        marker.openPopup();
    }

    private render(services: LocatedService[], position: { latitude: number; longitude: number } | null): void {
        this.layer.clearLayers();
        this.markers.clear();
        const points: L.LatLngTuple[] = [];

        for (const service of services) {
            const state = SERVICE_STATUS_DISPLAY[service.status] ?? SERVICE_STATUS_DISPLAY.available;
            const badge = MARKER_BADGES[state.tone]
                ? `<span style="position:absolute;top:-6px;right:-6px;display:grid;place-items:center;width:16px;height:16px;border-radius:50%;background:#fff;color:${MARKER_COLORS[state.tone]};font:700 12px/1 sans-serif;border:1px solid ${MARKER_COLORS[state.tone]}">${MARKER_BADGES[state.tone]}</span>`
                : '';
            const icon = L.divIcon({
                className: 'service-marker',
                html: `<div style="position:relative;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:${MARKER_COLORS[state.tone]};color:#fff;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35)"><i class="pi ${escapeHtml(service.icon)}"></i>${badge}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            const popup = `
                <div style="min-width:200px">
                    <strong style="font-size:14px">${escapeHtml(service.name)}</strong>
                    <div style="margin-top:4px;font-weight:700;color:${MARKER_COLORS[state.tone]}">État : ${escapeHtml(state.label)}</div>
                    ${service.status_message ? `<div style="margin-top:2px">${escapeHtml(service.status_message)}</div>` : ''}
                    ${service.open_24_7 ? '<div style="margin-top:2px;font-weight:700">Ouvert 24h/24</div>' : ''}
                    <div style="margin-top:4px">${escapeHtml(service.address ?? '')}</div>
                    <div style="margin-top:2px">${escapeHtml(service.opening_hours)}</div>
                    <a style="display:inline-block;margin-top:6px;font-weight:600" href="${directionsUrl(service)}" target="_blank" rel="noopener">Itinéraire</a>
                </div>`;
            const label = `${service.name} — ${state.label}`;
            const marker = L.marker([service.latitude, service.longitude], { icon, title: label, alt: label }).bindPopup(popup).addTo(this.layer);
            this.markers.set(service.id, marker);
            points.push([service.latitude, service.longitude]);
        }

        if (position) {
            L.circleMarker([position.latitude, position.longitude], { radius: 8, color: '#fff', weight: 3, fillColor: '#2563eb', fillOpacity: 1 }).bindTooltip('Vous êtes ici').addTo(this.layer);
            points.push([position.latitude, position.longitude]);
        }
        if (points.length) {
            this.map?.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 16, animate: false });
        }
    }
}

function escapeHtml(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
