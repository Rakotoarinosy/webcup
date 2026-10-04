import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AuthService } from '@/app/auth/auth.service';
import { environment } from '@/environments/environment';
import { RealtimeService } from './realtime.service';

class TestSocket {
    static readonly OPEN = 1;
    static readonly CONNECTING = 0;
    static instances: TestSocket[] = [];
    readyState = TestSocket.CONNECTING;
    onopen: (() => void) | null = null;
    onclose: ((event: { code: number }) => void) | null = null;
    onerror: (() => void) | null = null;
    onmessage: ((event: { data: unknown }) => void) | null = null;

    constructor(readonly url: string) {
        TestSocket.instances.push(this);
    }

    close(code = 1000): void {
        this.readyState = 3;
        this.onclose?.({ code });
    }

    open(): void {
        this.readyState = TestSocket.OPEN;
        this.onopen?.();
    }
}

describe('Realtime session tickets', () => {
    const ticketUrl = `${environment.apiUrl}/realtime/ticket`;
    const token = signal<string | null>('access-secret');
    let http: HttpTestingController;
    let originalSocket: typeof WebSocket;

    beforeEach(() => {
        jasmine.clock().install();
        token.set('access-secret');
        originalSocket = window.WebSocket;
        TestSocket.instances = [];
        Object.defineProperty(window, 'WebSocket', { configurable: true, writable: true, value: TestSocket });
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting(), { provide: AuthService, useValue: { accessToken: token, isAuthenticated: () => !!token() } }]
        });
        http = TestBed.inject(HttpTestingController);
        TestBed.inject(RealtimeService);
        TestBed.tick();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        Object.defineProperty(window, 'WebSocket', { configurable: true, writable: true, value: originalSocket });
        http.verify();
        jasmine.clock().uninstall();
    });

    it('obtains a fresh one-use ticket for each reconnect without exposing the access token in the socket URL', () => {
        const firstRequest = http.expectOne(ticketUrl);
        expect(firstRequest.request.headers.get('Authorization')).toBe('Bearer access-secret');
        firstRequest.flush({ ticket: 'first-ticket' });
        expect(TestSocket.instances.length).toBe(1);
        expect(new URL(TestSocket.instances[0].url).searchParams.get('ticket')).toBe('first-ticket');
        expect(TestSocket.instances[0].url).not.toContain('access-secret');

        TestSocket.instances[0].close();
        jasmine.clock().tick(2000);
        const retryRequest = http.expectOne(ticketUrl);
        retryRequest.flush({ ticket: 'second-ticket' });
        expect(TestSocket.instances.length).toBe(2);
        expect(new URL(TestSocket.instances[1].url).searchParams.get('ticket')).toBe('second-ticket');
        token.set(null);
        TestBed.tick();
    });

    for (const status of [401, 403]) {
        it(`stops retrying after HTTP ${status} until a fresh access token arrives`, () => {
            http.expectOne(ticketUrl).flush({ error: 'ForbiddenError' }, { status, statusText: 'Denied' });
            jasmine.clock().tick(10000);
            http.expectNone(ticketUrl);
            expect(TestSocket.instances.length).toBe(0);
            token.set('fresh-access');
            TestBed.tick();
            const freshRequest = http.expectOne(ticketUrl);
            expect(freshRequest.request.headers.get('Authorization')).toBe('Bearer fresh-access');
            freshRequest.flush({ ticket: 'authorized-ticket' });
            expect(TestSocket.instances.length).toBe(1);
        });
    }

    it('stops retrying after a socket policy rejection until a fresh access token arrives', () => {
        http.expectOne(ticketUrl).flush({ ticket: 'rejected-ticket' });
        TestSocket.instances[0].close(1008);
        jasmine.clock().tick(10000);
        http.expectNone(ticketUrl);
        token.set('fresh-access');
        TestBed.tick();
        http.expectOne(ticketUrl).flush({ ticket: 'fresh-ticket' });
        expect(TestSocket.instances.length).toBe(2);
        expect(new URL(TestSocket.instances[1].url).searchParams.get('ticket')).toBe('fresh-ticket');
    });

    it('retries transient ticket network failures with a new ticket request', () => {
        http.expectOne(ticketUrl).error(new ProgressEvent('error'));
        jasmine.clock().tick(2000);
        http.expectOne(ticketUrl).flush({ ticket: 'network-retry-ticket' });
        expect(TestSocket.instances.length).toBe(1);
        expect(new URL(TestSocket.instances[0].url).searchParams.get('ticket')).toBe('network-retry-ticket');
    });

    it('spaces repeated failures up to one minute and resets the delay after a successful connection', () => {
        http.expectOne(ticketUrl).flush({}, { status: 503, statusText: 'Unavailable' });
        for (const delay of [2000, 4000, 8000, 16000, 32000, 60000, 60000]) {
            jasmine.clock().tick(delay - 1);
            http.expectNone(ticketUrl);
            jasmine.clock().tick(1);
            http.expectOne(ticketUrl).flush({}, { status: 503, statusText: 'Unavailable' });
        }
        jasmine.clock().tick(60000);
        http.expectOne(ticketUrl).flush({ ticket: 'recovered-ticket' });
        TestSocket.instances[0].open();
        TestSocket.instances[0].close();
        jasmine.clock().tick(2000);
        http.expectOne(ticketUrl).flush({ ticket: 'fresh-ticket' });
        expect(TestSocket.instances.length).toBe(2);
        expect(new URL(TestSocket.instances[1].url).searchParams.get('ticket')).toBe('fresh-ticket');
    });

    it('cancels a pending ticket when the session changes and again on logout', () => {
        const staleRequest = http.expectOne(ticketUrl);
        token.set('replacement-access');
        TestBed.tick();
        expect(staleRequest.cancelled).toBeTrue();
        const replacementRequest = http.expectOne(ticketUrl);
        expect(replacementRequest.request.headers.get('Authorization')).toBe('Bearer replacement-access');
        token.set(null);
        TestBed.tick();
        expect(replacementRequest.cancelled).toBeTrue();
        jasmine.clock().tick(4000);
        http.expectNone(ticketUrl);
        expect(TestSocket.instances.length).toBe(0);
    });
});
