import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CitizenRequest } from '@/app/requests/request.model';
import { environment } from '@/environments/environment';
import { Agent, AgentQuery, CreateAgentIn, UpdateAgentIn } from './agent.model';

/** Client HTTP du domaine `agent` : /api/v1/agents. */
@Injectable({ providedIn: 'root' })
export class AgentService {
    private readonly http = inject(HttpClient);

    private readonly baseUrl = `${environment.apiUrl}/agents`;

    list(query: AgentQuery = {}): Observable<Agent[]> {
        let params = new HttpParams();

        if (query.search) {
            params = params.set('search', query.search);
        }
        if (query.department) {
            params = params.set('department', query.department);
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

    create(payload: CreateAgentIn): Observable<Agent> {
        return this.http.post<Agent>(this.baseUrl, payload);
    }

    update(id: string, payload: UpdateAgentIn): Observable<Agent> {
        return this.http.patch<Agent>(`${this.baseUrl}/${id}`, payload);
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
