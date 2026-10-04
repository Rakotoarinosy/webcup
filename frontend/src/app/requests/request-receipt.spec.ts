import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { RequestReceipt } from './request.model';
import { RequestReceiptPage, receiptText } from './request-receipt';
import { CitizenRequestService } from './request.service';

const receipt: RequestReceipt = {
    reference: 'TN-2026-1A2B3C4D',
    request_id: '1a2b3c4d-0000',
    title: 'Lampadaire en panne',
    description: 'Le lampadaire est éteint.',
    category: 'Éclairage public',
    location: 'Rue Centrale',
    status: 'Nouveau',
    received_at: '2026-10-03T10:00:00Z',
    service: 'Voirie',
    citizen_name: 'Rina',
    issued_at: '2026-10-04T09:00:00Z'
};

describe('RequestReceiptPage', () => {
    it('renders a printable receipt with the reference, time and receiving service', async () => {
        await TestBed.configureTestingModule({
            imports: [RequestReceiptPage],
            providers: [
                provideRouter([]),
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: '1a2b3c4d-0000' }) } } },
                { provide: CitizenRequestService, useValue: { receipt: () => of(receipt) } },
                { provide: AuthService, useValue: { user: () => ({ role: 'citizen' }) } }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(RequestReceiptPage);
        fixture.detectChanges();

        const text = fixture.nativeElement.textContent as string;
        expect(text).toContain('Accusé de réception');
        expect(text).toContain('TN-2026-1A2B3C4D');
        expect(text).toContain('Voirie');
        expect(fixture.nativeElement.querySelector('time').getAttribute('datetime')).toBe('2026-10-03T10:00:00Z');
        expect(text).toContain('Imprimer ou enregistrer en PDF');
        expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe('/home/my-requests/1a2b3c4d-0000');
    });

    it('produces a downloadable text with the same reference', () => {
        const text = receiptText(receipt);
        expect(text).toContain('Référence : TN-2026-1A2B3C4D');
        expect(text).toContain('Service destinataire : Voirie');
    });
});
