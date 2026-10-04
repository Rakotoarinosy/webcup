import { STATUS_DEFAULTS } from './municipal-service.fixture';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LiveDataService } from '../shared/live-data.service';
import { ContactReceipt } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';
import { MunicipalContact } from './municipal-contact';

const service = { id: 'roads', name: 'Voirie', category: 'Travaux', description: '', contact_details: '', opening_hours: '', icon: 'pi-building', display_order: 1, is_featured: false, usage_count: 0, address: null, latitude: null, longitude: null, ...STATUS_DEFAULTS };
const receipt = { receipt_number: 'MC-20261003-ABC12345', created_at: '2026-10-03T10:00:00Z', message: 'Votre message a bien été envoyé aux services municipaux.' };
describe('MunicipalContact', () => {
    let fixture: ComponentFixture<MunicipalContact>;
    let api: jasmine.SpyObj<MunicipalContentService>;
    beforeEach(async () => {
        api = jasmine.createSpyObj('MunicipalContentService', ['services', 'sendContact']);
        api.services.and.returnValue(of([service]));
        await TestBed.configureTestingModule({
            imports: [MunicipalContact],
            providers: [
                provideRouter([]),
                { provide: MunicipalContentService, useValue: api },
                { provide: AuthService, useValue: { user: () => ({ name: 'Ada Lovelace', email: 'ada@test.mg' }) } },
                { provide: LiveDataService, useValue: { watch: () => {} } }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(MunicipalContact);
        fixture.detectChanges();
        await fixture.whenStable();
    });
    async function validForm(): Promise<NgForm> {
        fixture.componentInstance.form = { service_id: 'roads', sender_name: 'Ada Lovelace', sender_email: 'ada@test.mg', subject: 'Question voirie', message: 'Une question pour la mairie.' };
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
        return fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);
    }
    it('prefills identity and prevents a second submission until confirmation', async () => {
        expect(fixture.componentInstance.form.sender_email).toBe('ada@test.mg');
        const pending = new Subject<ContactReceipt>();
        api.sendContact.and.returnValue(pending);
        const form = await validForm();
        fixture.componentInstance.send(form);
        fixture.componentInstance.send(form);
        fixture.detectChanges();
        expect(api.sendContact).toHaveBeenCalledTimes(1);
        expect(fixture.nativeElement.querySelector('button[type="submit"]').disabled).toBeTrue();
        expect(fixture.nativeElement.querySelector('fieldset').disabled).toBeTrue();
        pending.next(receipt);
        pending.complete();
        fixture.detectChanges();
        const confirmation: HTMLElement = fixture.nativeElement.querySelector('.confirmation[role="status"]');
        expect(confirmation.textContent).toContain(receipt.receipt_number);
        expect(confirmation.textContent).toContain('Voirie');
        expect(fixture.nativeElement.querySelector('form')).toBeNull();
        fixture.componentInstance.newMessage();
        fixture.detectChanges();
        expect(fixture.componentInstance.form.sender_email).toBe('ada@test.mg');
        expect(fixture.componentInstance.form.message).toBe('');
    });
    it('preserves the draft and allows retry after a failed send', async () => {
        api.sendContact.and.returnValue(throwError(() => new Error('offline')));
        const form = await validForm();
        fixture.componentInstance.send(form);
        fixture.detectChanges();
        expect(fixture.componentInstance.form.message).toBe('Une question pour la mairie.');
        expect(fixture.componentInstance.receipt()).toBeNull();
        expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('conservées');
        api.sendContact.and.returnValue(of(receipt));
        fixture.componentInstance.send(form);
        fixture.detectChanges();
        expect(api.sendContact).toHaveBeenCalledTimes(2);
        expect(fixture.componentInstance.receipt()?.receipt_number).toBe(receipt.receipt_number);
    });
    it('does not send whitespace-only messages and exposes field errors', async () => {
        const form = await validForm();
        fixture.componentInstance.form.message = '             ';
        fixture.componentInstance.send(form);
        fixture.detectChanges();
        expect(api.sendContact).not.toHaveBeenCalled();
        expect(form.controls['message'].touched).toBeTrue();
        expect(fixture.nativeElement.querySelector('#message-error').textContent).toContain('10');
    });
    it('still accepts a general message if the optional directory is unavailable', async () => {
        api.services.and.returnValue(throwError(() => new Error('offline')));
        fixture.componentInstance.loadServices();
        const form = await validForm();
        fixture.componentInstance.form.service_id = null;
        api.sendContact.and.returnValue(of(receipt));
        fixture.componentInstance.send(form);
        fixture.detectChanges();
        expect(api.sendContact).toHaveBeenCalledWith(jasmine.objectContaining({ service_id: null }));
        expect(fixture.componentInstance.recipient()).toBe('Services municipaux');
    });
    it('warns before writing to an interrupted service and requires an explicit confirmation (F38/F64)', async () => {
        const water = { ...service, id: 'water', name: 'Eau', status: 'out_of_service' as const, status_message: 'Panne du réseau.', status_alternative: 'Utilisez les bornes-fontaines.' };
        api.services.and.returnValue(of([service, water]));
        fixture.componentInstance.loadServices();
        const form = await validForm();
        fixture.componentInstance.selectService('water');
        fixture.detectChanges();
        const host = fixture.nativeElement as HTMLElement;
        expect(host.querySelector('.service-state')?.textContent).toContain('Hors service');
        expect(host.querySelector('.service-state')?.textContent).toContain('Utilisez les bornes-fontaines.');
        expect(host.querySelector('.interruption-warning')).not.toBeNull();

        api.sendContact.and.returnValue(of(receipt));
        fixture.componentInstance.send(form);
        fixture.detectChanges();
        expect(api.sendContact).not.toHaveBeenCalled();
        expect(host.querySelector('#acknowledge-error [role="alert"]')?.textContent).toContain('Cochez la case');

        const checkbox = host.querySelector('#contact-acknowledge') as HTMLInputElement;
        checkbox.click();
        fixture.detectChanges();
        fixture.componentInstance.send(form);
        expect(api.sendContact).toHaveBeenCalledWith(jasmine.objectContaining({ service_id: 'water', acknowledge_interruption: true }));
    });
});
