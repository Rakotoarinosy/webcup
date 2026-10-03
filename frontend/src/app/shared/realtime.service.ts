import { Injectable, effect, inject } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { environment } from '@/environments/environment';

export interface RealtimeMessage {
    type: 'data.changed' | 'realtime.ping';
    occurred_at?: string;
}

/** Connexion WebSocket authentifiée ; les messages ne contiennent aucune donnée métier. */
@Injectable({ providedIn: 'root' })
export class RealtimeService {
    private readonly auth = inject(AuthService, { optional: true });
    private socket: WebSocket | null = null;
    private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    private shouldConnect = false;
    private readonly changesSubject = new Subject<RealtimeMessage>();
    readonly changes$ = this.changesSubject.asObservable();

    constructor() {
        effect((onCleanup) => {
            const token = this.auth?.accessToken();
            const connected = this.auth?.isAuthenticated() ?? false;
            this.disconnect();
            if (!connected || !token || typeof WebSocket === 'undefined') return;

            this.shouldConnect = true;
            this.open(token);
            onCleanup(() => this.disconnect());
        });
    }

    private open(token: string): void {
        if (!this.shouldConnect || this.socket?.readyState === WebSocket.OPEN || this.socket?.readyState === WebSocket.CONNECTING) return;
        const url = this.websocketUrl(token);
        this.socket = new WebSocket(url);
        this.socket.onmessage = (event) => this.handleMessage(event.data);
        this.socket.onclose = () => this.scheduleReconnect(token);
        this.socket.onerror = () => this.socket?.close();
    }

    private disconnect(): void {
        this.shouldConnect = false;
        if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
        this.socket?.close();
        this.socket = null;
    }

    private scheduleReconnect(token: string): void {
        if (!this.shouldConnect || this.reconnectTimer) return;
        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.open(token);
        }, 2_000);
    }

    private handleMessage(data: unknown): void {
        if (typeof data !== 'string') return;
        try {
            const message = JSON.parse(data) as RealtimeMessage;
            if (message.type === 'data.changed') this.changesSubject.next(message);
        } catch {
            // Une réponse malformée ne doit jamais empêcher l'application de fonctionner.
        }
    }

    private websocketUrl(token: string): string {
        const url = environment.realtimeUrl
            ? new URL(environment.realtimeUrl, window.location.origin)
            : new URL(environment.apiUrl, window.location.origin);
        if (!environment.realtimeUrl) {
            url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
            url.pathname = `${url.pathname.replace(/\/$/, '')}/realtime`;
        }
        url.searchParams.set('token', token);
        return url.toString();
    }
}
