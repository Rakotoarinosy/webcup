import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';

export const EXPORT_FORMATS = ['pdf', 'csv', 'excel', 'word'] as const;
export type UserExportFormat = (typeof EXPORT_FORMATS)[number];

@Injectable({ providedIn: 'root' })
export class ProfileExportService {
    private readonly http = inject(HttpClient);

    exportPersonalData(format: UserExportFormat): Observable<HttpResponse<Blob>> {
        return this.http.get(`${environment.apiUrl}/exports/me`, {
            params: { format },
            observe: 'response',
            responseType: 'blob'
        });
    }
}
