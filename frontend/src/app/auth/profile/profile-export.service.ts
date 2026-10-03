import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';

import { EXPORT_FORMAT_VALUES, ExportFormat } from '@/app/shared/api-enums';

export const EXPORT_FORMATS = EXPORT_FORMAT_VALUES;
export type UserExportFormat = ExportFormat;

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
