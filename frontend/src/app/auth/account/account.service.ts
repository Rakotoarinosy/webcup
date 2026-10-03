import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

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
    list(page = 1) {
        // The API imposes the citizen/agent scope, independently of client parameters.
        return this.http.get<PersonalDemandesPage>(`${environment.apiUrl}/demandes`, { params: { page, page_size: 10 } });
    }
}
