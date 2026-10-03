import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@/environments/environment';
import { UserService } from './user.service';

describe('User HTTP contract', () => {
    let service: UserService;
    let http: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
        service = TestBed.inject(UserService);
        http = TestBed.inject(HttpTestingController);
    });
    afterEach(() => http.verify());
    it('uses PATCH for partial changes and preserves an explicit agent detachment', () => {
        service.update('user-id', { agent_id: null, is_active: false }).subscribe();
        const req = http.expectOne(`${environment.apiUrl}/users/user-id`);
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toEqual({ agent_id: null, is_active: false });
        req.flush({});
    });
});
