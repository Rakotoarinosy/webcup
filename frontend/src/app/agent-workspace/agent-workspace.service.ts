import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';

export type DemandeStatus = 'nouveau' | 'en_cours' | 'en_attente' | 'resolu' | 'rejete';
export type DemandePriority = 'faible' | 'moyenne' | 'haute' | 'critique';

export interface AssignedDemande {
    id: string;
    title: string;
    description: string;
    category: string;
    priority: DemandePriority;
    status: DemandeStatus;
    citizen_id: string;
    created_at: string;
    updated_at: string;
    address: string | null;
    latitude: number | null;
    longitude: number | null;
    agent_id: string | null;
    scheduled_at: string | null;
}

export interface DemandePage {
    items: AssignedDemande[];
    total: number;
    page: number;
    page_size: number;
    pages: number;
}

export interface AgentDemandeSummary {
    total: number;
    nouveau: number;
    en_cours: number;
    en_attente: number;
    resolu: number;
    rejete: number;
}

@Injectable({ providedIn: 'root' })
export class AgentWorkspaceService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/demandes`;

    list(page: number, pageSize = 20): Observable<DemandePage> {
        const params = new HttpParams().set('page', page).set('page_size', pageSize).set('sort_by', 'created_at').set('order', 'desc');
        return this.http.get<DemandePage>(this.baseUrl, { params });
    }

    summary(): Observable<AgentDemandeSummary> {
        return this.http.get<AgentDemandeSummary>(`${this.baseUrl}/agent/summary`);
    }

    resolve(id: string): Observable<AssignedDemande> {
        return this.http.post<AssignedDemande>(`${this.baseUrl}/${encodeURIComponent(id)}/resolve`, {});
    }
}
