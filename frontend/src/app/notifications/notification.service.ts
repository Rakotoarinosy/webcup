import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';

export interface CitizenNotification {
    key: string;
    kind: string;
    title: string;
    message: string;
    demande_id: string;
    created_at: string;
    is_read: boolean;
}

export interface CitizenNotificationList {
    items: CitizenNotification[];
    unread_count: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/notifications`;

    list(limit = 20): Observable<CitizenNotificationList> {
        const params = new HttpParams().set('limit', limit);
        return this.http.get<CitizenNotificationList>(this.baseUrl, { params });
    }

    markRead(key: string): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/${encodeURIComponent(key)}/read`, {});
    }
}
