import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { CreateInstitutIn, Institut, UpdateInstitutIn } from './institut.model';

/** Client HTTP des instituts : /api/v1/instituts (admin ; un manager ne lit que le sien). */
@Injectable({ providedIn: 'root' })
export class InstitutService {
    private readonly http = inject(HttpClient);

    private readonly baseUrl = `${environment.apiUrl}/instituts`;

    list(activeOnly = false): Observable<Institut[]> {
        return this.http.get<Institut[]>(this.baseUrl, { params: { active_only: activeOnly } });
    }

    get(id: string): Observable<Institut> {
        return this.http.get<Institut>(`${this.baseUrl}/${id}`);
    }

    create(payload: CreateInstitutIn): Observable<Institut> {
        return this.http.post<Institut>(this.baseUrl, payload);
    }

    update(id: string, payload: UpdateInstitutIn): Observable<Institut> {
        return this.http.patch<Institut>(`${this.baseUrl}/${id}`, payload);
    }

    setManager(id: string, managerId: string | null): Observable<Institut> {
        return this.http.put<Institut>(`${this.baseUrl}/${id}/manager`, { manager_id: managerId });
    }
}
