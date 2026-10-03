import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { DashboardSummary } from './dashboard.model';

/** Client HTTP du dashboard : /api/v1/dashboard. */
@Injectable({ providedIn: 'root' })
export class DashboardService {
    private readonly http = inject(HttpClient);

    summary(): Observable<DashboardSummary> {
        return this.http.get<DashboardSummary>(`${environment.apiUrl}/dashboard`);
    }
}
