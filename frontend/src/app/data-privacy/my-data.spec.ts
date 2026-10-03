import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { DataConcern } from './data-concern.model';
import { DataConcernService } from './data-concern.service';
import { MyData } from './my-data';

describe('MyData', () => {
    let fixture: ComponentFixture<MyData>;
    let api: jasmine.SpyObj<DataConcernService>;

    const answered: DataConcern = {
        id: 'c-1',
        reference: 'DC-20261003-AAAA1111',
        topic: 'Utilisation',
        message: 'À quoi sert ma position ?',
        status: 'Répondu',
        created_at: '2026-10-01T08:00:00Z',
        updated_at: '2026-10-02T08:00:00Z',
        reviewed_at: '2026-10-01T09:00:00Z',
        response: 'À placer votre demande sur la carte.',
        answered_at: '2026-10-02T08:00:00Z',
        answered_by: 'Mairie'
    };

    beforeEach(async () => {
        api = jasmine.createSpyObj<DataConcernService>('DataConcernService', ['mine', 'submit']);
        api.mine.and.returnValue(of([answered]));
        await TestBed.configureTestingModule({
            imports: [MyData],
            providers: [provideRouter([]), { provide: DataConcernService, useValue: api }]
        }).compileComponents();
        fixture = TestBed.createComponent(MyData);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    const text = () => (fixture.nativeElement as HTMLElement).textContent ?? '';

    it('shows each concern with its dated handling steps and the city answer', () => {
        const steps = Array.from(fixture.nativeElement.querySelectorAll('ol[aria-label="Suivi du signalement DC-20261003-AAAA1111"] li')) as HTMLElement[];
        expect(steps.length).toBe(3);
        expect(steps.every((step) => step.querySelector('time') !== null)).toBeTrue();
        expect(text()).toContain('À placer votre demande sur la carte.');
    });

    it('flags missing fields accessibly instead of sending', async () => {
        (fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement).click();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const message = fixture.nativeElement.querySelector('#concern-message') as HTMLTextAreaElement;
        expect(api.submit).not.toHaveBeenCalled();
        expect(message.getAttribute('aria-invalid')).toBe('true');
        expect(message.getAttribute('aria-describedby')).toContain('concern-message-error');
        expect(fixture.nativeElement.querySelector('#concern-message-error').textContent).toContain('au moins 10 caractères');
    });

    it('announces the reference of a new concern and lists it first', async () => {
        const created: DataConcern = { ...answered, id: 'c-2', reference: 'DC-20261003-BBBB2222', status: 'Reçu', reviewed_at: null, response: null, answered_at: null, answered_by: null };
        api.submit.and.returnValue(of(created));
        const topic = fixture.nativeElement.querySelector('#concern-topic') as HTMLSelectElement;
        topic.value = 'Partage';
        topic.dispatchEvent(new Event('change'));
        const message = fixture.nativeElement.querySelector('#concern-message') as HTMLTextAreaElement;
        message.value = 'Mes données sont-elles partagées ?';
        message.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        (fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement).click();
        fixture.detectChanges();

        expect(api.submit).toHaveBeenCalledWith({ topic: 'Partage', message: 'Mes données sont-elles partagées ?' });
        const status = fixture.nativeElement.querySelector('[role="status"]') as HTMLElement;
        expect(status.textContent).toContain('DC-20261003-BBBB2222');
        expect(fixture.componentInstance.concerns()[0].id).toBe('c-2');
    });
});
