import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CommunityRequests } from './community-requests';
import { PublicRequest } from './request.model';
import { CitizenRequestService } from './request.service';

describe('CommunityRequests', () => {
    let fixture: ComponentFixture<CommunityRequests>;
    let api: jasmine.SpyObj<CitizenRequestService>;
    const open: PublicRequest = {
        id: 'r1',
        title: 'Lampadaire éteint',
        category: 'Éclairage public',
        status: 'Nouveau',
        location: 'rue des Lilas',
        created_at: '2026-10-03T10:00:00Z',
        support_count: 2,
        supported_by_me: false,
        is_mine: false,
        supported_at: null
    };
    const mine: PublicRequest = { ...open, id: 'r2', title: 'Ma demande', is_mine: true };

    beforeEach(async () => {
        api = jasmine.createSpyObj<CitizenRequestService>('CitizenRequestService', ['publicList', 'supported', 'support', 'unsupport']);
        api.publicList.and.returnValue(of({ items: [open, mine], total: 2, page: 1, page_size: 10, total_pages: 1 }));
        api.supported.and.returnValue(of([]));
        api.support.and.returnValue(of({ ...open, support_count: 3, supported_by_me: true, supported_at: '2026-10-04T10:00:00Z' }));
        await TestBed.configureTestingModule({ imports: [CommunityRequests], providers: [{ provide: CitizenRequestService, useValue: api }] }).compileComponents();
        fixture = TestBed.createComponent(CommunityRequests);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('lists open requests without identity and never offers to support your own', () => {
        const text = fixture.nativeElement.textContent as string;
        expect(text).toContain('Lampadaire éteint');
        expect(text).toContain('2 soutien(s)');
        expect(text).toContain('Votre demande');
        const buttons = fixture.nativeElement.querySelectorAll('button[aria-pressed]');
        expect(buttons.length).toBe(1);
    });

    it('confirms the support and keeps a trace in « Demandes que je soutiens »', () => {
        api.supported.and.returnValue(of([{ ...open, supported_by_me: true, support_count: 3, supported_at: '2026-10-04T10:00:00Z' }]));
        (fixture.nativeElement.querySelector('button[aria-pressed]') as HTMLButtonElement).click();
        fixture.detectChanges();

        expect(api.support).toHaveBeenCalledWith('r1');
        expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('Votre soutien à « Lampadaire éteint » est enregistré');
        expect(fixture.nativeElement.querySelector('button[aria-pressed]').getAttribute('aria-pressed')).toBe('true');
        const supportedList = fixture.nativeElement.querySelector('section[aria-labelledby="supported-title"] ul') as HTMLElement;
        expect(supportedList.textContent).toContain('Statut : Nouveau');
    });
});
