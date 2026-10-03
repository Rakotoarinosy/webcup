import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';
import { PipelineStatus, TerraNotificationList, TerraOverview, TerraRequest, TerraSyncReport } from './terra-nova.model';

/** Appels HTTP du suivi Terra Nova. Le front n'appelle jamais l'API Terra Nova directement : la clé reste côté backend. */
@Injectable({ providedIn: 'root' })
export class TerraNovaService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/terra-requests`;

    list(): Observable<TerraRequest[]> {
        return this.http.get<TerraRequest[]>(this.baseUrl);
    }

    /** Lit la session ; le backend resynchronise au passage si ses données ont vieilli. */
    session(): Observable<TerraOverview> {
        return this.http.get<TerraOverview>(`${this.baseUrl}/session`);
    }

    sync(): Observable<TerraSyncReport> {
        return this.http.post<TerraSyncReport>(`${this.baseUrl}/sync`, {});
    }

    updateStatus(code: string, status: PipelineStatus): Observable<TerraRequest> {
        return this.http.patch<TerraRequest>(`${this.baseUrl}/${encodeURIComponent(code)}/status`, { status });
    }

    notifications(): Observable<TerraNotificationList> {
        return this.http.get<TerraNotificationList>(`${this.baseUrl}/notifications`);
    }

    markRead(key: string): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/notifications/${encodeURIComponent(key)}/read`, {});
    }

    markAllRead(): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/notifications/read-all`, {});
    }
}
