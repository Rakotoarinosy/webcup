import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@/environments/environment';
import { liveDataInterceptor } from './live-data.interceptor';
import { LiveDataService } from './live-data.service';

describe('Live data interceptor', () => {
    let client: HttpClient;
    let http: HttpTestingController;
    let notify: jasmine.Spy;
    const url = `${environment.apiUrl}/requests`;
    beforeEach(() => {
        notify = jasmine.createSpy('notifyChange');
        TestBed.configureTestingModule({ providers: [provideHttpClient(withInterceptors([liveDataInterceptor])), provideHttpClientTesting(), { provide: LiveDataService, useValue: { notifyChange: notify } }] });
        client = TestBed.inject(HttpClient);
        http = TestBed.inject(HttpTestingController);
    });
    afterEach(() => http.verify());
    it('notifies only after a successful API mutation', () => {
        client.post(url, {}).subscribe();
        expect(notify).not.toHaveBeenCalled();
        http.expectOne(url).flush({ id: 'new-request' });
        expect(notify).toHaveBeenCalledTimes(1);
        client.delete(`${url}/id`).subscribe();
        http.expectOne(`${url}/id`).flush(null);
        expect(notify).toHaveBeenCalledTimes(2);
    });
    it('does not refresh after reads, authentication, external calls or failed mutations', () => {
        client.get(url).subscribe();
        http.expectOne(url).flush({});
        for (const destination of [`${environment.apiUrl}/auth/login`, 'https://example.com/api/v1/requests', '/api/v10/requests']) {
            client.post(destination, {}).subscribe();
            http.expectOne(destination).flush({});
        }
        client.patch(url, {}).subscribe({ error: () => {} });
        http.expectOne(url).flush({}, { status: 500, statusText: 'Error' });
        expect(notify).not.toHaveBeenCalled();
    });
});
