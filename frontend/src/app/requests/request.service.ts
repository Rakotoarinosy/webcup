import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import {
    CitizenRequest,
    CitizenRequestPage,
    CitizenRequestQuery,
    CreateCitizenRequestIn,
    RequestAnalysis,
    UpdateCitizenRequestIn
} from './request.model';

@Injectable({ providedIn: 'root' })
export class CitizenRequestService {
    private readonly http = inject(HttpClient);

    private readonly baseUrl = `${environment.apiUrl}/requests`;

    list(query: CitizenRequestQuery): Observable<CitizenRequestPage> {
        let params = new HttpParams()
            .set('page', query.page)
            .set('page_size', query.page_size)
            .set('sort_by', query.sort_by)
            .set('sort_order', query.sort_order);

        if (query.search) {
            params = params.set('search', query.search);
        }
        if (query.category) {
            params = params.set('category', query.category);
        }
        if (query.priority) {
            params = params.set('priority', query.priority);
        }
        if (query.status) {
            params = params.set('status', query.status);
        }
        if (query.mine) {
            params = params.set('mine', true);
        }

        return this.http.get<CitizenRequestPage>(this.baseUrl, { params });
    }

    get(id: string): Observable<CitizenRequest> {
        return this.http.get<CitizenRequest>(`${this.baseUrl}/${id}`);
    }

    create(payload: CreateCitizenRequestIn): Observable<CitizenRequest> {
        return this.http.post<CitizenRequest>(this.baseUrl, payload);
    }

    update(id: string, payload: UpdateCitizenRequestIn): Observable<CitizenRequest> {
        return this.http.put<CitizenRequest>(`${this.baseUrl}/${id}`, payload);
    }

    analyze(id: string): Observable<RequestAnalysis> {
        return this.http.post<RequestAnalysis>(`${this.baseUrl}/${id}/analyze`, {});
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
