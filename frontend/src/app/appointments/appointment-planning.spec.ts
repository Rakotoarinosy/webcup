import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AgentService } from '@/app/agents/agent.service';
import { AuthService } from '@/app/auth/auth.service';
import { InstitutService } from '@/app/instituts/institut.service';
import { AppointmentPlanning, addDays, mondayOf } from './appointment-planning';
import { PlanningSlot } from './appointment.model';
import { AppointmentService } from './appointment.service';
import { APPOINTMENT, POLICY, SLOT } from './testing';

describe('AppointmentPlanning', () => {
    let fixture: ComponentFixture<AppointmentPlanning>;
    let api: jasmine.SpyObj<AppointmentService>;
    const booked: PlanningSlot = { ...SLOT, is_booked: true, appointment: { ...APPOINTMENT, citizen_id: 'c1', citizen_name: 'Hery', citizen_email: 'hery@test.mg', citizen_phone: null } };
    const free: PlanningSlot = { ...SLOT, id: 's-2', time: { ...SLOT.time, start_time: '10:00', end_time: '10:30' }, appointment: null };

    const el = () => fixture.nativeElement as HTMLElement;
    const settle = async () => {
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    };

    beforeEach(async () => {
        api = jasmine.createSpyObj<AppointmentService>('AppointmentService', ['policy', 'planning', 'createSlot', 'createSeries', 'closeSlot', 'attendance', 'cancelByCity']);
        api.policy.and.returnValue(of(POLICY));
        api.planning.and.returnValue(of([booked, free]));
        const auth = { user: signal({ role: 'manager', institut_id: 'i-1' }), hasRole: (...roles: string[]) => roles.includes('manager') };
        await TestBed.configureTestingModule({
            imports: [AppointmentPlanning],
            providers: [
                { provide: AppointmentService, useValue: api },
                { provide: AuthService, useValue: auth },
                { provide: AgentService, useValue: { list: () => of([]) } },
                { provide: InstitutService, useValue: { list: () => of([]) } }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AppointmentPlanning);
        await settle();
    });

    it('computes weeks from Monday', () => {
        expect(mondayOf('2026-10-08')).toBe('2026-10-05');
        expect(addDays('2026-10-31', 1)).toBe('2026-11-01');
    });

    it('lists booked and free slots of the week by day', () => {
        expect(el().textContent).toContain('lundi 14 octobre 2030');
        expect(el().textContent).toContain('Hery');
        expect(el().textContent).toContain('Libre');
    });

    it('requires a reason before cancelling for the city', async () => {
        api.cancelByCity.and.returnValue(of(booked.appointment!));
        (el().querySelector('[aria-label="Annuler le rendez-vous RDV-20301014-ABC123"]') as HTMLElement).click();
        await settle();
        const confirm = Array.from(el().querySelectorAll('button')).find((button) => button.textContent?.includes('Confirmer l’annulation')) as HTMLButtonElement;
        confirm.click();
        await settle();
        expect(api.cancelByCity).not.toHaveBeenCalled();
        const input = el().querySelector('#city-cancel-ap-1') as HTMLInputElement;
        expect(input.getAttribute('aria-invalid')).toBe('true');

        input.value = 'Agent en intervention';
        input.dispatchEvent(new Event('input'));
        await settle();
        confirm.click();
        await settle();
        expect(api.cancelByCity).toHaveBeenCalledWith('ap-1', 'Agent en intervention');
    });

    it('creates a series with the checked weekdays', async () => {
        api.createSeries.and.returnValue(of({ created: 4, slots: [] }));
        (el().querySelector('#mode-series') as HTMLInputElement).click();
        await settle();
        const location = el().querySelector('#slot-location') as HTMLInputElement;
        location.value = 'Mairie annexe';
        location.dispatchEvent(new Event('input'));
        await settle();
        (el().querySelector('button[type="submit"]') as HTMLButtonElement).click();
        await settle();

        expect(api.createSeries).toHaveBeenCalled();
        const payload = api.createSeries.calls.mostRecent().args[0];
        expect(payload.weekdays).toEqual([0, 1, 2, 3, 4]);
        expect(payload.location).toBe('Mairie annexe');
        expect(el().querySelector('[role="status"]')?.textContent).toContain('4 créneau(x) créé(s)');
    });
});
