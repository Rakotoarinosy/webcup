import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { map } from 'rxjs';
import { AuthService } from '../auth.service';
import { CitizenRequestService } from '@/app/requests/request.service';
import { environment } from '@/environments/environment';

export interface PersonalDemande {
    id: string;
    title: string;
    description: string;
    status: string;
    address: string | null;
    created_at: string;
}
export interface PersonalDemandesPage {
    items: PersonalDemande[];
    total: number;
    page: number;
    pages: number;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
    private readonly http = inject(HttpClient);
    private readonly auth = inject(AuthService);
    private readonly requests = inject(CitizenRequestService);
    list(page = 1) {
        if (this.auth.hasRole('agent')) {
            return this.http.get<PersonalDemandesPage>(`${environment.apiUrl}/demandes`, { params: { page, page_size: 10 } });
        }
        return this.requests.list({ page, page_size: 10, sort_by: 'created_at', sort_order: 'desc', mine: this.auth.hasRole('citizen') }).pipe(
            map((result) => ({
                ...result,
                pages: result.total_pages,
                items: result.items.map((request) => ({ ...request, address: request.location }))
            }))
        );
    }
}
