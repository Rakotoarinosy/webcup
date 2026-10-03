import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { PublicDashboard } from './dashboard.model';

/** Compteurs publics de la page d'accueil. Le tableau de bord connecté passe par CitizenRequestService. */
@Injectable({ providedIn: 'root' })
export class DashboardService {
    private readonly http = inject(HttpClient);

    publicSummary(): Observable<PublicDashboard> {
        return this.http.get<PublicDashboard>(`${environment.apiUrl}/dashboard/public`);
    }
}
