import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MunicipalService } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';

describe('MunicipalContentService', () => {
    let service: MunicipalContentService;
    let http: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MunicipalContentService, provideHttpClient(), provideHttpClientTesting()]
        });
        service = TestBed.inject(MunicipalContentService);
        http = TestBed.inject(HttpTestingController);
    });

    afterEach(() => http.verify());

    it('requests a maximum of six popular services and preserves the server rank', () => {
        let result: MunicipalService[] = [];
        service.popularServices(100).subscribe((items) => (result = items));

        const request = http.expectOne((req) => req.url.endsWith('/municipal/services/popular'));
        expect(request.request.method).toBe('GET');
        expect(request.request.params.get('limit')).toBe('6');

        const ranked = [
            { id: 'most-used', usage_count: 30 },
            { id: 'next-used', usage_count: 12 }
        ] as MunicipalService[];
        request.flush(ranked);

        expect(result.map((item) => item.id)).toEqual(['most-used', 'next-used']);
    });
});
