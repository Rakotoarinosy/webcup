import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { ConcernStatus, DataConcern, DataConcernAdmin, SubmitConcernIn } from './data-concern.model';

/** Client HTTP des signalements sur les données : /api/v1/data-concerns. */
@Injectable({ providedIn: 'root' })
export class DataConcernService {
    private readonly http = inject(HttpClient);
    private readonly url = `${environment.apiUrl}/data-concerns`;

    submit(payload: SubmitConcernIn): Observable<DataConcern> {
        return this.http.post<DataConcern>(this.url, payload);
    }

    mine(): Observable<DataConcern[]> {
        return this.http.get<DataConcern[]>(`${this.url}/mine`);
    }

    list(status: ConcernStatus | null = null): Observable<DataConcernAdmin[]> {
        return this.http.get<DataConcernAdmin[]>(this.url, { params: status ? { status } : {} });
    }

    review(id: string): Observable<DataConcernAdmin> {
        return this.http.post<DataConcernAdmin>(`${this.url}/${id}/review`, {});
    }

    answer(id: string, response: string): Observable<DataConcernAdmin> {
        return this.http.post<DataConcernAdmin>(`${this.url}/${id}/answer`, { response });
    }
}
