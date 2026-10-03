import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { ContactMessageIn, ContactReceipt, MunicipalPublication, MunicipalService } from './municipal-content.model';

@Injectable({ providedIn: 'root' })
export class MunicipalContentService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/municipal`;

    services(): Observable<MunicipalService[]> {
        return this.http.get<MunicipalService[]>(`${this.baseUrl}/services`);
    }

    featuredServices(): Observable<MunicipalService[]> {
        return this.http.get<MunicipalService[]>(`${this.baseUrl}/services/featured`);
    }

    updateFeaturedService(id: string, isFeatured: boolean, displayOrder: number): Observable<MunicipalService> {
        return this.http.patch<MunicipalService>(`${this.baseUrl}/services/${encodeURIComponent(id)}/featured`, {
            is_featured: isFeatured,
            display_order: displayOrder
        });
    }

    startService(id: string): Observable<MunicipalService> {
        return this.http.post<MunicipalService>(`${this.baseUrl}/services/${encodeURIComponent(id)}/start`, {});
    }

    publications(category?: string): Observable<MunicipalPublication[]> {
        const params = category ? new HttpParams().set('category', category) : undefined;
        return this.http.get<MunicipalPublication[]>(`${this.baseUrl}/publications`, { params });
    }

    sendContact(payload: ContactMessageIn): Observable<ContactReceipt> {
        return this.http.post<ContactReceipt>(`${this.baseUrl}/contact`, payload);
    }
}
