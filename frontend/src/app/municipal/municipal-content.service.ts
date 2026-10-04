import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { ContactMessageIn, ContactReceipt, MunicipalPublication, MunicipalPublicationComment, MunicipalPublicationIn, MunicipalService, PublicationLikeResult, ServiceLocationIn } from './municipal-content.model';

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

    popularServices(limit = 6): Observable<MunicipalService[]> {
        const params = new HttpParams().set('limit', Math.min(Math.max(limit, 1), 6));
        return this.http.get<MunicipalService[]>(`${this.baseUrl}/services/popular`, { params });
    }

    updateServiceLocation(id: string, location: ServiceLocationIn): Observable<MunicipalService> {
        return this.http.patch<MunicipalService>(`${this.baseUrl}/services/${encodeURIComponent(id)}/location`, location);
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

    managedPublications(): Observable<MunicipalPublication[]> {
        return this.http.get<MunicipalPublication[]>(`${this.baseUrl}/publications/manage`);
    }

    createPublication(payload: MunicipalPublicationIn): Observable<MunicipalPublication> {
        return this.http.post<MunicipalPublication>(`${this.baseUrl}/publications`, payload);
    }

    /** Envoie l'image de couverture ; renvoie l'URL à mettre dans `image_url`. */
    uploadPublicationImage(file: File): Observable<{ url: string }> {
        const body = new FormData();
        body.append('file', file);
        return this.http.post<{ url: string }>(`${this.baseUrl}/publications/images`, body);
    }

    updatePublication(id: string, payload: Partial<MunicipalPublicationIn>): Observable<MunicipalPublication> {
        return this.http.patch<MunicipalPublication>(`${this.baseUrl}/publications/${encodeURIComponent(id)}`, payload);
    }

    deletePublication(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/publications/${encodeURIComponent(id)}`);
    }

    viewPublication(id: string): Observable<MunicipalPublication> {
        return this.http.post<MunicipalPublication>(`${this.baseUrl}/publications/${encodeURIComponent(id)}/view`, {});
    }

    likePublication(id: string): Observable<PublicationLikeResult> {
        return this.http.post<PublicationLikeResult>(`${this.baseUrl}/publications/${encodeURIComponent(id)}/like`, {});
    }

    publicationComments(id: string): Observable<MunicipalPublicationComment[]> {
        return this.http.get<MunicipalPublicationComment[]>(`${this.baseUrl}/publications/${encodeURIComponent(id)}/comments`);
    }

    addPublicationComment(id: string, content: string): Observable<MunicipalPublicationComment> {
        return this.http.post<MunicipalPublicationComment>(`${this.baseUrl}/publications/${encodeURIComponent(id)}/comments`, { content });
    }

    sendContact(payload: ContactMessageIn): Observable<ContactReceipt> {
        return this.http.post<ContactReceipt>(`${this.baseUrl}/contact`, payload);
    }
}