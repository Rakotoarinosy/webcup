import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '@/environments/environment';
import { UserService } from './user.service';

describe('UserService citizen account API', () => {
    let service: UserService;
    let http: HttpTestingController;
    const baseUrl = `${environment.apiUrl}/users`;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
        service = TestBed.inject(UserService);
        http = TestBed.inject(HttpTestingController);
    });

    afterEach(() => http.verify());

    it('lists accounts with a server-side search term', () => {
        service.list('Rina').subscribe();
        const request = http.expectOne((req) => req.url === baseUrl && req.params.get('search') === 'Rina');
        expect(request.request.method).toBe('GET');
        request.flush([]);
    });

    it('loads an account and submits only requested profile or activation fields', () => {
        service.get('citizen-1').subscribe();
        const details = http.expectOne(`${baseUrl}/citizen-1`);
        expect(details.request.method).toBe('GET');
        details.flush({});

        service.update('citizen-1', { name: 'Rina', email: 'rina@example.com' }).subscribe();
        const profile = http.expectOne(`${baseUrl}/citizen-1`);
        expect(profile.request.method).toBe('PATCH');
        expect(profile.request.body).toEqual({ name: 'Rina', email: 'rina@example.com' });
        profile.flush({});

        service.update('citizen-1', { is_active: false }).subscribe();
        const activation = http.expectOne(`${baseUrl}/citizen-1`);
        expect(activation.request.body).toEqual({ is_active: false });
        activation.flush({});
    });
});
