import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { AuditEntry, JournalFilters, Page, RequestActivity, dayBounds } from './journal.model';

const PAGE_SIZE = 20;

/** Lecture des journaux : activité des demandes et opérations d'administration. */
@Injectable({ providedIn: 'root' })
export class JournalService {
    private readonly http = inject(HttpClient);

    activity(filters: JournalFilters, pageSize = PAGE_SIZE): Observable<Page<RequestActivity>> {
        return this.http.get<Page<RequestActivity>>(`${environment.apiUrl}/requests/activity`, { params: this.params(filters, 'type', pageSize) });
    }

    audit(filters: JournalFilters, pageSize = PAGE_SIZE): Observable<Page<AuditEntry>> {
        return this.http.get<Page<AuditEntry>>(`${environment.apiUrl}/audit`, { params: this.params(filters, 'action', pageSize) });
    }

    private params(filters: JournalFilters, typeParam: 'type' | 'action', pageSize: number): Record<string, string | number> {
        const params: Record<string, string | number> = { page: filters.page, page_size: pageSize, ...dayBounds(filters) };
        if (filters.type) params[typeParam] = filters.type;
        if (filters.search.trim()) params['search'] = filters.search.trim();
        return params;
    }
}
