import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@/environments/environment';
import { AlertIn, CityAlert, CityAlertAdmin, CreateAlertIn, CreatedCityAlert, RecommendationIn } from './alert.model';

/** Client HTTP des alertes et messages officiels : /api/v1/alerts. */
@Injectable({ providedIn: 'root' })
export class AlertService {
    private readonly http = inject(HttpClient);
    private readonly url = `${environment.apiUrl}/alerts`;

    /** Alertes affichées maintenant (public, sans connexion). */
    current(): Observable<CityAlert[]> {
        return this.http.get<CityAlert[]>(`${this.url}/current`);
    }

    /** Alertes en cours et terminées récemment (public). */
    history(days = 30): Observable<CityAlert[]> {
        return this.http.get<CityAlert[]>(`${this.url}/history`, { params: { days } });
    }

    list(): Observable<CityAlertAdmin[]> {
        return this.http.get<CityAlertAdmin[]>(this.url);
    }

    create(payload: CreateAlertIn): Observable<CreatedCityAlert> {
        return this.http.post<CreatedCityAlert>(this.url, payload);
    }

    update(id: string, payload: AlertIn): Observable<CityAlertAdmin> {
        return this.http.put<CityAlertAdmin>(`${this.url}/${id}`, payload);
    }

    end(id: string): Observable<CityAlertAdmin> {
        return this.http.post<CityAlertAdmin>(`${this.url}/${id}/end`, {});
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }

    recommend(payload: RecommendationIn): Observable<string> {
        return this.http.post<{ recommendations: string }>(`${this.url}/recommendations`, payload).pipe(map((response) => response.recommendations));
    }
}
