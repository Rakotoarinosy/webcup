import { AfterViewInit, Component, ElementRef, OnDestroy, effect, input, signal, viewChild } from '@angular/core';
import * as L from 'leaflet';

import { RequestPriority } from '@/app/requests/request.model';

export interface MapRequest {
    id: string;
    title: string;
    location: string;
    latitude: number;
    longitude: number;
    priority: RequestPriority;
    status: string;
    agent: string;
}

// Centre par défaut : Antananarivo.
const DEFAULT_CENTER: L.LatLngTuple = [-18.9068, 47.5244];

export const PRIORITY_COLORS: Record<RequestPriority, string> = {
    Basse: '#22c55e',
    Normale: '#3b82f6',
    Haute: '#f97316',
    Urgente: '#ef4444'
};

@Component({
    selector: 'app-map',
    imports: [],
    templateUrl: './map.html',
    styleUrl: './map.scss'
})
export class Map implements AfterViewInit, OnDestroy {
    requests = input<MapRequest[]>([]);

    readonly priorityColors = Object.entries(PRIORITY_COLORS);

    private readonly container = viewChild.required<ElementRef<HTMLElement>>('mapContainer');
    private readonly ready = signal(false);
    private map?: L.Map;
    private markers = L.layerGroup();

    constructor() {
        // Redessine les marqueurs dès que la carte existe et à chaque nouvelle liste de demandes.
        effect(() => {
            const requests = this.requests();
            if (this.ready()) {
                this.renderMarkers(requests);
            }
        });
    }

    ngAfterViewInit(): void {
        this.map = L.map(this.container().nativeElement).setView(DEFAULT_CENTER, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
        this.markers.addTo(this.map);
        this.ready.set(true);
    }

    ngOnDestroy(): void {
        this.map?.remove();
    }

    private renderMarkers(requests: MapRequest[]): void {
        this.markers.clearLayers();

        for (const req of requests) {
            const color = PRIORITY_COLORS[req.priority] ?? '#6b7280';
            const icon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="background-color: ${color}; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
                iconSize: [18, 18],
                iconAnchor: [9, 9]
            });

            // Les textes viennent des citoyens : on les échappe avant de les injecter dans le popup.
            const popup = `
        <div style="font-family: inherit; padding: 4px; min-width: 180px;">
          <div style="font-weight: 600; font-size: 14px; margin-bottom: 6px; color: #1e293b;">${escapeHtml(req.title)}</div>
          <div style="font-size: 13px; margin-bottom: 3px;"><strong>Lieu :</strong> ${escapeHtml(req.location)}</div>
          <div style="font-size: 13px; margin-bottom: 3px;"><strong>Priorité :</strong> <span style="color: ${color}; font-weight: bold;">${escapeHtml(req.priority)}</span></div>
          <div style="font-size: 13px; margin-bottom: 3px;"><strong>Statut :</strong> ${escapeHtml(req.status)}</div>
          <div style="font-size: 13px;"><strong>Agent :</strong> ${escapeHtml(req.agent)}</div>
        </div>
      `;

            L.marker([req.latitude, req.longitude], { icon }).bindPopup(popup).addTo(this.markers);
        }

        if (requests.length > 0) {
            this.map?.fitBounds(L.latLngBounds(requests.map((req) => [req.latitude, req.longitude] as L.LatLngTuple)), { padding: [30, 30], maxZoom: 15 });
        }
    }
}

function escapeHtml(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
