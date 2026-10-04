import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { LineStatus, TransportLine } from './transport.model';

@Injectable({ providedIn: 'root' })
export class TransportService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/transport`;

    lines(query = ''): Observable<TransportLine[]> {
        const q = query.trim();
        return this.http.get<TransportLine[]>(`${this.baseUrl}/lines`, { params: q ? new HttpParams().set('q', q) : undefined });
    }

    updateStatus(id: string, status: LineStatus, message: string | null): Observable<TransportLine> {
        return this.http.patch<TransportLine>(`${this.baseUrl}/lines/${encodeURIComponent(id)}/status`, { status, message });
    }
}
