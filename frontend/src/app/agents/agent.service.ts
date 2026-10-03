import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CitizenRequest } from '@/app/requests/request.model';
import { environment } from '@/environments/environment';
import { Agent, AgentQuery, AgentStatus, CreateAgentProfileIn } from './agent.model';

/** Client HTTP des profils agents : /api/v1/agents. Le périmètre est imposé par le serveur. */
@Injectable({ providedIn: 'root' })
export class AgentService {
    private readonly http = inject(HttpClient);

    private readonly baseUrl = `${environment.apiUrl}/agents`;

    list(query: AgentQuery = {}): Observable<Agent[]> {
        let params = new HttpParams();

        if (query.search) {
            params = params.set('search', query.search);
        }
        if (query.institut_id) {
            params = params.set('institut_id', query.institut_id);
        }
        if (query.status) {
            params = params.set('status', query.status);
        }
        if (query.is_active !== undefined) {
            params = params.set('is_active', query.is_active);
        }

        return this.http.get<Agent[]>(this.baseUrl, { params });
    }

    get(id: string): Observable<Agent> {
        return this.http.get<Agent>(`${this.baseUrl}/${id}`);
    }

    /** Profil de l'agent connecté. */
    me(): Observable<Agent> {
        return this.http.get<Agent>(`${this.baseUrl}/me`);
    }

    create(payload: CreateAgentProfileIn): Observable<Agent> {
        return this.http.post<Agent>(this.baseUrl, payload);
    }

    setStatus(id: string, status: AgentStatus): Observable<Agent> {
        return this.http.patch<Agent>(`${this.baseUrl}/${id}/status`, { status });
    }

    move(id: string, institutId: string): Observable<Agent> {
        return this.http.post<Agent>(`${this.baseUrl}/${id}/move`, { institut_id: institutId });
    }

    deactivate(id: string): Observable<Agent> {
        return this.http.post<Agent>(`${this.baseUrl}/${id}/deactivate`, {});
    }

    activate(id: string): Observable<Agent> {
        return this.http.post<Agent>(`${this.baseUrl}/${id}/activate`, {});
    }

    interventions(id: string): Observable<CitizenRequest[]> {
        return this.http.get<CitizenRequest[]>(`${this.baseUrl}/${id}/interventions`);
    }
}
