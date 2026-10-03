import { PreferencesService } from '@/app/preferences/preferences.service';
import { of } from 'rxjs';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from '@/environments/environment';
import { authInterceptor } from './auth.interceptor';
import { AUTH_URL, AuthService } from './auth.service';

const session = { access_token: 'old-token', token_type: 'bearer', expires_in: 900, user: { id: 'id', name: 'Rina', email: 'r@test.mg', role: 'citizen', agent_id: null, created_at: '' } };
const URL = `${environment.apiUrl}/demandes`;
describe('Auth interceptor', () => {
    let http: HttpTestingController;
    let client: HttpClient;
    let auth: AuthService;
    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [provideRouter([]), provideHttpClient(withInterceptors([authInterceptor])), provideHttpClientTesting(), { provide: PreferencesService, useValue: { load: () => of(null) } }] });
        http = TestBed.inject(HttpTestingController);
        client = TestBed.inject(HttpClient);
        auth = TestBed.inject(AuthService);
        auth.login('r@test.mg', 'Motdepasse123').subscribe();
        http.expectOne(`${AUTH_URL}/login`).flush(session);
    });
    afterEach(() => http.verify());
    it('refreshes once for two simultaneous expired requests', () => {
        client.get(URL).subscribe();
        client.get(URL).subscribe();
        const pending = http.match(URL);
        expect(pending[0].request.headers.get('Authorization')).toBe('Bearer old-token');
        for (const request of pending) request.flush({}, { status: 401, statusText: 'Unauthorized' });
        http.expectOne(`${AUTH_URL}/refresh`).flush({ ...session, access_token: 'new-token' });
        const retried = http.match(URL);
        expect(retried.length).toBe(2);
        for (const request of retried) {
            expect(request.request.headers.get('Authorization')).toBe('Bearer new-token');
            request.flush({});
        }
    });
    it('reuses the renewed token for a late 401', () => {
        client.get(URL).subscribe();
        client.get(URL).subscribe();
        const pending = http.match(URL);
        pending[0].flush({}, { status: 401, statusText: 'Unauthorized' });
        http.expectOne(`${AUTH_URL}/refresh`).flush({ ...session, access_token: 'new-token' });
        http.expectOne(URL).flush({});
        pending[1].flush({}, { status: 401, statusText: 'Unauthorized' });
        http.expectNone(`${AUTH_URL}/refresh`);
        const retry = http.expectOne(URL);
        expect(retry.request.headers.get('Authorization')).toBe('Bearer new-token');
        retry.flush({});
    });
    it('clears the session after an unauthorized retry', () => {
        const failed = jasmine.createSpy('failed');
        client.get(URL).subscribe({ error: failed });
        http.expectOne(URL).flush({}, { status: 401, statusText: 'Unauthorized' });
        http.expectOne(`${AUTH_URL}/refresh`).flush({ ...session, access_token: 'new-token' });
        http.expectOne(URL).flush({}, { status: 401, statusText: 'Unauthorized' });
        expect(auth.isAuthenticated()).toBeFalse();
        expect(failed).toHaveBeenCalled();
    });
    it('does not send the token to another origin or to public auth', () => {
        for (const url of [`${AUTH_URL}/login`, 'https://example.com/api/v1/demandes', '/api/v10/demandes']) {
            client.get(url).subscribe();
            const request = http.expectOne(url);
            expect(request.request.headers.has('Authorization')).toBeFalse();
            request.flush({});
        }
    });
    it('finishes profile validation when a disabled account cannot refresh', () => {
        const validated = jasmine.createSpy('validated');
        auth.validateSession().subscribe(validated);
        http.expectOne(`${AUTH_URL}/me`).flush({}, { status: 401, statusText: 'Unauthorized' });
        http.expectOne(`${AUTH_URL}/refresh`).flush({}, { status: 401, statusText: 'Unauthorized' });
        expect(validated).toHaveBeenCalledWith(null);
        expect(auth.isAuthenticated()).toBeFalse();
    });
});
