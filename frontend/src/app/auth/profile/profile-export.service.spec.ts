import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ProfileExportService } from './profile-export.service';

describe('ProfileExportService', () => {
    let service: ProfileExportService;
    let http: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
        service = TestBed.inject(ProfileExportService);
        http = TestBed.inject(HttpTestingController);
    });

    afterEach(() => http.verify());

    it('downloads the selected format as a binary response', () => {
        service.exportPersonalData('excel').subscribe((response) => {
            expect(response.body).toEqual(new Blob(['file']));
            expect(response.headers.get('content-disposition')).toContain('.xlsx');
        });
        const request = http.expectOne('/api/v1/exports/me?format=excel');
        expect(request.request.responseType).toBe('blob');
        request.flush(new Blob(['file']), { headers: { 'content-disposition': 'attachment; filename="mes-donnees.xlsx"' } });
    });
});
