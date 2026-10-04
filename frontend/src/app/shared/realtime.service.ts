import { Injectable, effect, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';

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
    private readonly http = inject(HttpClient);
    private socket: WebSocket | null = null;
    private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    private shouldConnect = false;
    private reconnectDelayMs = 2_000;
    private ticketRequest: Subscription | null = null;
    private readonly changesSubject = new Subject<RealtimeMessage>();
    readonly changes$ = this.changesSubject.asObservable();

    constructor() {
        effect((onCleanup) => {
            const token = this.auth?.accessToken();
            const connected = this.auth?.isAuthenticated() ?? false;
            this.disconnect();
            if (!connected || !token || typeof WebSocket === 'undefined') return;

            this.shouldConnect = true;
            this.reconnectDelayMs = 2_000;
            this.open(token);
            onCleanup(() => this.disconnect());
        });
    }

    private open(token: string): void {
        if (!this.shouldConnect || this.ticketRequest || this.socket?.readyState === WebSocket.OPEN || this.socket?.readyState === WebSocket.CONNECTING) return;
        this.ticketRequest = this.http.post<{ ticket: string }>(`${environment.apiUrl}/realtime/ticket`, {}, { headers: { Authorization: `Bearer ${token}` } }).subscribe({
            next: ({ ticket }) => {
                this.ticketRequest = null;
                if (!this.shouldConnect || this.auth?.accessToken() !== token) return;
                const socket = new WebSocket(this.websocketUrl(ticket));
                this.socket = socket;
                socket.onopen = () => {
                    if (this.socket === socket) this.reconnectDelayMs = 2_000;
                };
                socket.onmessage = (event) => this.handleMessage(event.data);
                socket.onclose = (event) => {
                    if (this.socket !== socket) return;
                    this.socket = null;
                    if (event.code === 1008) {
                        this.shouldConnect = false;
                        return;
                    }
                    this.scheduleReconnect(token);
                };
                socket.onerror = () => socket.close();
            },
            error: (error: unknown) => {
                this.ticketRequest = null;
                if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
                    this.shouldConnect = false;
                    return;
                }
                this.scheduleReconnect(token);
            }
        });
    }

    private disconnect(): void {
        this.shouldConnect = false;
        this.ticketRequest?.unsubscribe();
        this.ticketRequest = null;
        if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
        this.socket?.close();
        this.socket = null;
    }

    private scheduleReconnect(token: string): void {
        if (!this.shouldConnect || this.reconnectTimer) return;
        const delayMs = this.reconnectDelayMs;
        this.reconnectDelayMs = Math.min(delayMs * 2, 60_000);
        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.open(token);
        }, delayMs);
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

    private websocketUrl(ticket: string): string {
        const url = environment.realtimeUrl ? new URL(environment.realtimeUrl, window.location.origin) : new URL(environment.apiUrl, window.location.origin);
        if (!environment.realtimeUrl) {
            url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
            url.pathname = `${url.pathname.replace(/\/$/, '')}/realtime`;
        }
        url.searchParams.set('ticket', ticket);
        return url.toString();
    }
}
