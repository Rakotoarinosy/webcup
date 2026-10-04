import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RequestMessage } from './request.model';
import { CitizenRequestService } from './request.service';
import { RequestThread } from './request-thread';

describe('RequestThread', () => {
    let fixture: ComponentFixture<RequestThread>;
    let api: jasmine.SpyObj<CitizenRequestService>;
    const citizenMessage: RequestMessage = {
        id: 'm1',
        request_id: 'r1',
        visibility: 'public',
        body: 'Des nouvelles ?',
        created_at: '2026-10-04T08:00:00Z',
        author_name: 'Rina',
        author_role: 'citizen',
        from_staff: false
    };

    async function create(staff: boolean): Promise<void> {
        api = jasmine.createSpyObj<CitizenRequestService>('CitizenRequestService', ['messages', 'postMessage']);
        api.messages.and.returnValue(of([citizenMessage]));
        api.postMessage.and.callFake((_id, payload) =>
            of({ ...citizenMessage, id: 'm2', body: payload.body, visibility: payload.visibility ?? 'public', author_name: 'Jean', author_role: 'agent', from_staff: true })
        );
        await TestBed.configureTestingModule({ imports: [RequestThread], providers: [{ provide: CitizenRequestService, useValue: api }] }).compileComponents();
        fixture = TestBed.createComponent(RequestThread);
        fixture.componentRef.setInput('requestId', 'r1');
        fixture.componentRef.setInput('staff', staff);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    }

    it('lists messages with author and time in an accessible log', async () => {
        await create(true);
        const log = fixture.nativeElement.querySelector('ol[role="log"]') as HTMLElement;
        expect(log.querySelectorAll('li').length).toBe(1);
        expect(log.textContent).toContain('Rina (citoyen)');
        expect(log.querySelector('time')?.getAttribute('datetime')).toBe('2026-10-04T08:00:00Z');
    });

    it('fills the answer from a quick reply template and sends an internal note', async () => {
        await create(true);
        const template = fixture.nativeElement.querySelector('[role="group"] button') as HTMLButtonElement;
        template.click();
        fixture.detectChanges();
        await fixture.whenStable();
        const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
        expect(textarea.value).toContain('nous avons bien reçu votre demande');
        expect(textarea.getAttribute('aria-describedby')).toContain('-help');

        const internal = fixture.nativeElement.querySelector('input[value="internal"]') as HTMLInputElement;
        internal.click();
        fixture.detectChanges();
        (fixture.nativeElement.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
        fixture.detectChanges();

        expect(api.postMessage).toHaveBeenCalledWith('r1', jasmine.objectContaining({ visibility: 'internal' }));
        expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('Note interne enregistrée');
        expect(fixture.nativeElement.textContent).toContain('Note interne');
    });

    it('refuses an empty message with an announced error, and hides staff options from citizens', async () => {
        await create(false);
        expect(fixture.nativeElement.querySelector('input[value="internal"]')).toBeNull();
        expect(fixture.nativeElement.querySelector('[role="group"]')).toBeNull();
        (fixture.nativeElement.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
        fixture.detectChanges();

        expect(api.postMessage).not.toHaveBeenCalled();
        expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('Écrivez un message');
        expect(fixture.nativeElement.querySelector('textarea').getAttribute('aria-invalid')).toBe('true');
    });
});
