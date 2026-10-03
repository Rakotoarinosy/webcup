import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { EMPTY, catchError, exhaustMap, startWith, switchMap } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { environment } from '@/environments/environment';
import { RealtimeService } from '../shared/realtime.service';

export interface PlatformNotification {
    key: string;
    kind: string;
    title: string;
    message: string;
    request_id: string;
    created_at: string;
    is_read: boolean;
}

interface NotificationList { items: PlatformNotification[]; unread_count: number; }

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private readonly http = inject(HttpClient);
    private readonly auth = inject(AuthService);
    private readonly realtime = inject(RealtimeService);
    private readonly baseUrl = `${environment.apiUrl}/notifications`;

    readonly items = signal<PlatformNotification[]>([]);
    readonly unreadCount = signal(0);
    readonly error = signal<string | null>(null);
    readonly recent = computed(() => this.items().slice(0, 8));

    constructor() {
        effect((onCleanup) => {
            if (!this.auth.isAuthenticated()) {
                this.items.set([]);
                this.unreadCount.set(0);
                return;
            }
            const subscription = this.realtime.changes$
                .pipe(startWith(null), exhaustMap(() => this.fetch().pipe(catchError(() => EMPTY))))
                .subscribe();
            onCleanup(() => subscription.unsubscribe());
        });
    }

    fetch() {
        return this.http.get<NotificationList>(this.baseUrl).pipe(
            catchError((error: unknown) => {
                this.error.set('Impossible de charger les notifications.');
                throw error;
            }),
            switchMap((response) => {
                this.items.set(response.items);
                this.unreadCount.set(response.unread_count);
                this.error.set(null);
                return EMPTY;
            })
        );
    }

    markRead(key: string) {
        this.items.update((items) => items.map((item) => item.key === key ? { ...item, is_read: true } : item));
        this.unreadCount.update((count) => Math.max(0, count - 1));
        return this.http.post<void>(`${this.baseUrl}/${encodeURIComponent(key)}/read`, {});
    }

    markAllRead() {
        this.items.update((items) => items.map((item) => ({ ...item, is_read: true })));
        this.unreadCount.set(0);
        return this.http.post<void>(`${this.baseUrl}/read-all`, {});
    }
}
