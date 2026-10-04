import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import {
    AssignRequestIn,
    CitizenRequest,
    CitizenRequestPage,
    CitizenRequestQuery,
    DashboardStats,
    EditRequestIn,
    MapPoint,
    MessageIn,
    PublicRequest,
    PublicRequestPage,
    PublicRequestQuery,
    RequestGroup,
    RequestMessage,
    SimilarDraftIn,
    SimilarPublic,
    RequestAnalysis,
    RequestCategory,
    RequestEvent,
    RequestStatus,
    SubmitRequestIn
} from './request.model';

/** Client HTTP des demandes citoyennes : /api/v1/requests et /api/v1/dashboard. */
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
        if (query.has_similar) {
            params = params.set('has_similar', true);
        }
        if (query.awaiting_reply) {
            params = params.set('awaiting_reply', true);
        }

        return this.http.get<CitizenRequestPage>(this.baseUrl, { params });
    }

    get(id: string): Observable<CitizenRequest> {
        return this.http.get<CitizenRequest>(`${this.baseUrl}/${id}`);
    }

    events(id: string): Observable<RequestEvent[]> {
        return this.http.get<RequestEvent[]>(`${this.baseUrl}/${id}/events`);
    }

    submit(payload: SubmitRequestIn): Observable<CitizenRequest> {
        return this.http.post<CitizenRequest>(this.baseUrl, payload);
    }

    edit(id: string, payload: EditRequestIn): Observable<CitizenRequest> {
        return this.http.patch<CitizenRequest>(`${this.baseUrl}/${id}`, payload);
    }

    changeStatus(id: string, status: RequestStatus): Observable<CitizenRequest> {
        return this.http.post<CitizenRequest>(`${this.baseUrl}/${id}/status`, { status });
    }

    assign(id: string, payload: AssignRequestIn): Observable<CitizenRequest> {
        return this.http.post<CitizenRequest>(`${this.baseUrl}/${id}/assign`, payload);
    }

    analyze(id: string): Observable<RequestAnalysis> {
        return this.http.post<RequestAnalysis>(`${this.baseUrl}/${id}/analyze`, {});
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    map(filters: { status?: RequestStatus; category?: RequestCategory; activeOnly?: boolean; limit?: number } = {}): Observable<MapPoint[]> {
        let params = new HttpParams().set('active_only', filters.activeOnly ?? true).set('limit', filters.limit ?? 500);
        if (filters.status) {
            params = params.set('status', filters.status);
        }
        if (filters.category) {
            params = params.set('category', filters.category);
        }

        return this.http.get<MapPoint[]>(`${this.baseUrl}/map`, { params });
    }

    // ─── F52 : demandes publiques et soutiens ──────────────────────

    publicList(query: PublicRequestQuery): Observable<PublicRequestPage> {
        let params = new HttpParams().set('page', query.page).set('page_size', query.page_size);
        if (query.search) params = params.set('search', query.search);
        if (query.category) params = params.set('category', query.category);
        if (query.sort) params = params.set('sort', query.sort);
        return this.http.get<PublicRequestPage>(`${this.baseUrl}/public`, { params });
    }

    supported(): Observable<PublicRequest[]> {
        return this.http.get<PublicRequest[]>(`${this.baseUrl}/supported`);
    }

    support(id: string): Observable<PublicRequest> {
        return this.http.post<PublicRequest>(`${this.baseUrl}/${id}/support`, {});
    }

    unsupport(id: string): Observable<PublicRequest> {
        return this.http.delete<PublicRequest>(`${this.baseUrl}/${id}/support`);
    }

    // ─── F75 : similarité et doublons ──────────────────────────────

    similarCheck(draft: SimilarDraftIn): Observable<SimilarPublic[]> {
        return this.http.post<SimilarPublic[]>(`${this.baseUrl}/similar-check`, draft);
    }

    group(id: string): Observable<RequestGroup> {
        return this.http.get<RequestGroup>(`${this.baseUrl}/${id}/similar`);
    }

    markDuplicate(id: string, principalId: string): Observable<CitizenRequest> {
        return this.http.post<CitizenRequest>(`${this.baseUrl}/${id}/duplicate`, { duplicate_of_id: principalId });
    }

    // ─── F84 : fil de messages ─────────────────────────────────────

    messages(id: string): Observable<RequestMessage[]> {
        return this.http.get<RequestMessage[]>(`${this.baseUrl}/${id}/messages`);
    }

    postMessage(id: string, payload: MessageIn): Observable<RequestMessage> {
        return this.http.post<RequestMessage>(`${this.baseUrl}/${id}/messages`, payload);
    }

    dashboard(days = 7): Observable<DashboardStats> {
        return this.http.get<DashboardStats>(`${environment.apiUrl}/dashboard`, { params: { days } });
    }
}
