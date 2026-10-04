import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AppointmentService } from './appointment.service';
import { BookAppointment } from './book-appointment';
import { APPOINTMENT, POLICY, SLOT } from './testing';

describe('BookAppointment', () => {
    let fixture: ComponentFixture<BookAppointment>;
    let api: jasmine.SpyObj<AppointmentService>;

    const el = () => fixture.nativeElement as HTMLElement;
    const settle = async () => {
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    };

    beforeEach(async () => {
        api = jasmine.createSpyObj<AppointmentService>('AppointmentService', ['policy', 'services', 'days', 'slots', 'book', 'calendar']);
        api.policy.and.returnValue(of(POLICY));
        api.services.and.returnValue(of([{ institut_id: 'i-1', name: 'État civil', description: '', available_slots: 1, next_available: SLOT.time }]));
        api.days.and.returnValue(of([{ day: '2030-10-14', day_label: 'lundi 14 octobre 2030', available_slots: 1 }]));
        api.slots.and.returnValue(of([SLOT]));
        api.book.and.returnValue(of(APPOINTMENT));
        await TestBed.configureTestingModule({
            imports: [BookAppointment],
            providers: [provideRouter([]), { provide: AppointmentService, useValue: api }]
        }).compileComponents();
        fixture = TestBed.createComponent(BookAppointment);
        await settle();
    });

    async function goToRecap(): Promise<void> {
        (el().querySelector('section ul button') as HTMLButtonElement).click();
        await settle();
        (el().querySelector('section ul button') as HTMLButtonElement).click();
        await settle();
        (el().querySelector('section ul button') as HTMLButtonElement).click();
        await settle();
    }

    it('shows each slot with full date, time zone, duration, place and agent', async () => {
        (el().querySelector('section ul button') as HTMLButtonElement).click();
        await settle();
        (el().querySelector('section ul button') as HTMLButtonElement).click();
        await settle();

        const slot = el().querySelector('section ul button') as HTMLButtonElement;
        expect(slot.getAttribute('aria-label')).toContain('lundi 14 octobre 2030 de 09:30 à 10:00 (UTC+3');
        expect(slot.textContent).toContain('30 min');
        expect(slot.textContent).toContain('Hôtel de ville');
        expect(slot.textContent).toContain('Rado');
        expect(el().querySelector('[aria-current="step"]')?.textContent).toContain('Créneau');
    });

    it('requires a reason before confirming, accessibly', async () => {
        await goToRecap();
        expect(el().textContent).toContain('Carte d’identité');
        (el().querySelector('button[type="submit"]') as HTMLButtonElement).click();
        await settle();

        const reason = el().querySelector('#appt-reason') as HTMLTextAreaElement;
        expect(api.book).not.toHaveBeenCalled();
        expect(reason.getAttribute('aria-invalid')).toBe('true');
        expect(reason.getAttribute('aria-describedby')).toContain('appt-reason-error');
    });

    it('books with the chosen reminders and announces the reference', async () => {
        await goToRecap();
        const reason = el().querySelector('#appt-reason') as HTMLTextAreaElement;
        reason.value = 'Acte de naissance';
        reason.dispatchEvent(new Event('input'));
        (el().querySelector('#reminder-3h') as HTMLInputElement).click();
        await settle();
        (el().querySelector('button[type="submit"]') as HTMLButtonElement).click();
        await settle();

        expect(api.book).toHaveBeenCalledWith({ slot_id: 's-1', reason: 'Acte de naissance', reminders: ['24h', '1h', '3h'], contact_phone: null });
        const status = el().querySelector('[role="status"]') as HTMLElement;
        expect(status.textContent).toContain('RDV-20301014-ABC123');
        expect(el().textContent).toContain('Ajouter à mon agenda');
        expect(el().textContent).toContain('Itinéraire');
    });
});
