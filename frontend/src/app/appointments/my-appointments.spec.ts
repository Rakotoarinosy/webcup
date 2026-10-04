import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Appointment } from './appointment.model';
import { AppointmentService } from './appointment.service';
import { MyAppointments } from './my-appointments';
import { APPOINTMENT } from './testing';

describe('MyAppointments', () => {
    let fixture: ComponentFixture<MyAppointments>;
    let api: jasmine.SpyObj<AppointmentService>;
    const past: Appointment = { ...APPOINTMENT, id: 'ap-0', reference: 'RDV-OLD', status: 'honored', status_label: 'Honoré', is_upcoming: false, can_cancel: false };

    const el = () => fixture.nativeElement as HTMLElement;
    const settle = async () => {
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    };

    beforeEach(async () => {
        api = jasmine.createSpyObj<AppointmentService>('AppointmentService', ['mine', 'cancel', 'calendar']);
        api.mine.and.returnValue(of([past, APPOINTMENT]));
        await TestBed.configureTestingModule({
            imports: [MyAppointments],
            providers: [provideRouter([]), { provide: AppointmentService, useValue: api }]
        }).compileComponents();
        fixture = TestBed.createComponent(MyAppointments);
        await settle();
    });

    it('separates upcoming and past appointments', () => {
        const upcoming = el().querySelector('section[aria-labelledby="upcoming-heading"]') as HTMLElement;
        const before = el().querySelector('section[aria-labelledby="past-heading"]') as HTMLElement;
        expect(upcoming.textContent).toContain('RDV-20301014-ABC123');
        expect(upcoming.textContent).toContain('Indian/Antananarivo');
        expect(before.textContent).toContain('RDV-OLD');
        expect(before.textContent).not.toContain('RDV-20301014-ABC123');
    });

    it('asks for confirmation then cancels and announces it', async () => {
        api.cancel.and.returnValue(of({ ...APPOINTMENT, status: 'cancelled_by_citizen', status_label: 'Annulé par vous', is_upcoming: false, can_cancel: false }));
        (el().querySelector('[aria-label="Annuler le rendez-vous RDV-20301014-ABC123"]') as HTMLElement).click();
        await settle();
        expect(api.cancel).not.toHaveBeenCalled();
        const confirm = Array.from(el().querySelectorAll('button')).find((button) => button.textContent?.includes('Confirmer l’annulation')) as HTMLButtonElement;
        confirm.click();
        await settle();

        expect(api.cancel).toHaveBeenCalledWith('ap-1', null);
        expect(el().querySelector('[role="status"]')?.textContent).toContain('RDV-20301014-ABC123 est annulé');
    });
});
