import { Component, ElementRef, OnDestroy, AfterViewInit, effect, input, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as L from 'leaflet';

import { DashboardStats, MapPoint, RequestPriority } from '@/app/requests/request.model';

export interface AccountMapRequest {
    id: string;
    title: string;
    location: string;
    latitude: number;
    longitude: number;
    priority: RequestPriority;
    status: string;
    agent: string;
}

export interface AccountStatCards {
    openRequests: number;
    inProgressRequests: number;
    resolvedRequests: number;
    todayInterventions: number;
}

export function toAccountStatCards(stats: DashboardStats | null): AccountStatCards {
    if (!stats) return { openRequests: 0, inProgressRequests: 0, resolvedRequests: 0, todayInterventions: 0 };
    return {
        openRequests: (stats.by_status['Nouveau'] ?? 0) + (stats.by_status['En attente'] ?? 0),
        inProgressRequests: stats.in_progress,
        resolvedRequests: stats.resolved,
        todayInterventions: stats.resolved_today
    };
}

export function toAccountMapRequests(points: MapPoint[]): AccountMapRequest[] {
    return points.map((point) => ({ ...point, agent: point.agent_name ?? 'Non assigné' }));
}

@Component({
    selector: 'app-account-stats',
    imports: [RouterLink],
    template: `
        @for (card of cards(); track card.label; let index = $index) {
            <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                <a class="card mb-0 block cursor-pointer no-underline transition-transform hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary" [routerLink]="links()[index]">
                    <div class="mb-4 flex justify-between"><div><span class="mb-4 block font-medium text-muted-color">{{ card.label }}</span><div class="text-xl font-medium text-surface-900 dark:text-surface-0">{{ card.value }}</div></div><div class="flex size-10 items-center justify-center rounded-border" [class]="card.background"><i [class]="card.icon"></i></div></div>
                    <span class="font-medium" [class]="card.color">{{ card.help }}</span>
                </a>
            </div>
        }
    `
})
export class AccountStats {
    stats = input<AccountStatCards>({ openRequests: 0, inProgressRequests: 0, resolvedRequests: 0, todayInterventions: 0 });
    links = input<string[]>([]);
    readonly cards = () => [
        { label: 'Demandes ouvertes', value: this.stats().openRequests, help: 'En attente de prise en charge', icon: 'pi pi-folder-open text-xl text-blue-500', background: 'bg-blue-100 dark:bg-blue-400/10', color: 'text-primary' },
        { label: 'Demandes en cours', value: this.stats().inProgressRequests, help: 'Traitement en cours', icon: 'pi pi-clock text-xl text-orange-500', background: 'bg-orange-100 dark:bg-orange-400/10', color: 'text-orange-500' },
        { label: 'Demandes résolues', value: this.stats().resolvedRequests, help: 'Clôturées avec succès', icon: 'pi pi-check-circle text-xl text-green-500', background: 'bg-green-100 dark:bg-green-400/10', color: 'text-green-500' },
        { label: "Interventions (aujourd'hui)", value: this.stats().todayInterventions, help: "Résolues aujourd'hui", icon: 'pi pi-calendar text-xl text-purple-500', background: 'bg-purple-100 dark:bg-purple-400/10', color: 'text-purple-500' }
    ];
}

const PRIORITY_COLORS: Record<RequestPriority, string> = { Basse: '#22c55e', Normale: '#3b82f6', Haute: '#f97316', Urgente: '#ef4444' };

@Component({
    selector: 'app-account-map',
    template: `
        <div class="card z-1"><div class="mb-4 flex flex-wrap items-center justify-between gap-3"><div class="text-xl font-semibold">Carte des interventions en cours ({{ requests().length }})</div><div class="flex flex-wrap gap-4 text-sm text-muted-color">@for (entry of priorityColors; track entry[0]) {<span class="flex items-center gap-2"><span class="inline-block rounded-full" [style.background-color]="entry[1]" style="width:.75rem;height:.75rem"></span>{{ entry[0] }}</span>}</div></div><div #mapContainer class="w-full rounded-border shadow-sm" style="height:380px"></div></div>
    `
})
export class AccountMap implements AfterViewInit, OnDestroy {
    requests = input<AccountMapRequest[]>([]);
    readonly priorityColors = Object.entries(PRIORITY_COLORS);
    private readonly container = viewChild.required<ElementRef<HTMLElement>>('mapContainer');
    private readonly ready = signal(false);
    private map?: L.Map;
    private markers = L.layerGroup();

    constructor() {
        effect(() => {
            if (this.ready()) this.renderMarkers(this.requests());
        });
    }

    ngAfterViewInit(): void {
        this.map = L.map(this.container().nativeElement).setView([-18.9068, 47.5244], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap contributors' }).addTo(this.map);
        this.markers.addTo(this.map);
        this.ready.set(true);
    }

    ngOnDestroy(): void { this.map?.remove(); }

    private renderMarkers(requests: AccountMapRequest[]): void {
        this.markers.clearLayers();
        for (const request of requests) {
            const color = PRIORITY_COLORS[request.priority];
            const icon = L.divIcon({ className: 'custom-marker', html: `<div style="background-color:${color};width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>`, iconSize: [18, 18], iconAnchor: [9, 9] });
            L.marker([request.latitude, request.longitude], { icon }).bindPopup(`<strong>${escapeHtml(request.title)}</strong><br>${escapeHtml(request.location)}<br>Priorité : ${escapeHtml(request.priority)}<br>Statut : ${escapeHtml(request.status)}`).addTo(this.markers);
        }
        if (requests.length) this.map?.fitBounds(L.latLngBounds(requests.map((request) => [request.latitude, request.longitude] as L.LatLngTuple)), { padding: [30, 30], maxZoom: 15 });
    }
}

function escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
