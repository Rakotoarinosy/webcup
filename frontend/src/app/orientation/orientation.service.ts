import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { MunicipalService } from '@/app/municipal/municipal-content.model';
import { OrientationAction, OrientationChannel, OrientationNeed, OrientationSituation, RequestCategory } from '@/app/shared/api-enums';
import { environment } from '@/environments/environment';

/** Miroir de GET /orientation (F72). */
export interface OrientationResult {
    needs: OrientationNeed[];
    services: { service: MunicipalService; needs: OrientationNeed[] }[];
    actions: { action: OrientationAction; category: RequestCategory | null; service_id: string | null }[];
}

@Injectable({ providedIn: 'root' })
export class OrientationService {
    private readonly http = inject(HttpClient);

    recommend(situation: OrientationSituation, needs: OrientationNeed[], channel: OrientationChannel): Observable<OrientationResult> {
        let params = new HttpParams().set('situation', situation).set('channel', channel);
        for (const need of needs) params = params.append('needs', need);
        return this.http.get<OrientationResult>(`${environment.apiUrl}/orientation`, { params });
    }
}
