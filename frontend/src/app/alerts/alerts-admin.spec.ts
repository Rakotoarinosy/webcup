import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { CityAlertAdmin } from './alert.model';
import { AlertService } from './alert.service';
import { AlertsAdmin } from './alerts-admin';

describe('AlertsAdmin', () => {
    let fixture: ComponentFixture<AlertsAdmin>;
    let api: jasmine.SpyObj<AlertService>;

    const created: CityAlertAdmin = {
        id: 'a1',
        title: 'Vague de chaleur',
        message: 'Une vague de chaleur extrême touche plusieurs secteurs.',
        instructions: '',
        level: 'Attention',
        audience: 'Personnes vulnérables',
        zone: null,
        issuer: 'Haut Conseil de la Ville',
        starts_at: '2026-10-04T08:00:00Z',
        ends_at: null,
        ended_at: null,
        status: 'En cours',
        created_at: '2026-10-04T08:00:00Z',
        updated_at: '2026-10-04T08:00:00Z',
        author_id: 'u1',
        author_name: 'Admin',
        can_manage: true
    };

    beforeEach(async () => {
        api = jasmine.createSpyObj<AlertService>('AlertService', ['list', 'create', 'update', 'end', 'remove', 'recommend']);
        api.list.and.returnValue(of([created]));
        api.create.and.returnValue(of({ ...created, email_recipients: 0 }));
        await TestBed.configureTestingModule({
            imports: [AlertsAdmin],
            providers: [
                { provide: AlertService, useValue: api },
                { provide: AuthService, useValue: { hasRole: () => true } }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AlertsAdmin);
        fixture.detectChanges();
        await fixture.whenStable();
    });

    async function openForm(): Promise<void> {
        (fixture.nativeElement.querySelector('p-button button') as HTMLButtonElement).click();
        fixture.detectChanges();
        await fixture.whenStable(); // ngModel écrit ses valeurs initiales de façon asynchrone
        fixture.detectChanges();
    }

    function type(selector: string, value: string): void {
        const field = fixture.nativeElement.querySelector(selector) as HTMLInputElement;
        field.value = value;
        field.dispatchEvent(new Event('input'));
    }

    it('lists alerts with an accessible label on each icon button', () => {
        expect(fixture.nativeElement.textContent).toContain('Vague de chaleur');
        expect(fixture.nativeElement.querySelector('button[aria-label="Terminer l’alerte Vague de chaleur"]')).not.toBeNull();
    });

    it('flags missing fields with aria-invalid and an error summary', async () => {
        await openForm();
        (fixture.nativeElement.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
        fixture.detectChanges();

        const title = fixture.nativeElement.querySelector('#alert-title') as HTMLInputElement;
        expect(title.getAttribute('aria-invalid')).toBe('true');
        expect(title.getAttribute('aria-describedby')).toContain('alert-title-error');
        expect(fixture.nativeElement.querySelector('#alert-form-error').getAttribute('role')).toBe('alert');
        expect(api.create).not.toHaveBeenCalled();
    });

    it('adds AI recommendations to the instructions, for review before publication', async () => {
        api.recommend.and.returnValue(of('- Buvez de l’eau régulièrement.'));
        await openForm();
        type('#alert-title', 'Vague de chaleur');
        type('#alert-message', 'Une vague de chaleur extrême touche plusieurs secteurs.');
        fixture.detectChanges();

        const aiButton = fixture.nativeElement.querySelector('button[aria-label="Proposer des recommandations pour les personnes vulnérables avec l’IA"]') as HTMLButtonElement;
        aiButton.click();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(api.recommend).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Vague de chaleur', audience: 'Personnes vulnérables' }));
        expect((fixture.nativeElement.querySelector('#alert-instructions') as HTMLTextAreaElement).value).toContain('Buvez de l’eau');
        expect(fixture.nativeElement.textContent).toContain('Relisez-les');
    });

    it('explains that the AI is unavailable and keeps manual entry possible', async () => {
        api.recommend.and.returnValue(throwError(() => new HttpErrorResponse({ status: 503 })));
        await openForm();
        type('#alert-title', 'Vague de chaleur');
        type('#alert-message', 'Une vague de chaleur extrême touche plusieurs secteurs.');
        fixture.detectChanges();
        (fixture.nativeElement.querySelector('button[aria-label="Proposer des recommandations pour les personnes vulnérables avec l’IA"]') as HTMLButtonElement).click();
        fixture.detectChanges();

        const error = fixture.nativeElement.querySelector('#alert-ai-status [role="alert"]') as HTMLElement;
        expect(error.textContent).toContain('indisponible');
        expect((fixture.nativeElement.querySelector('#alert-instructions') as HTMLTextAreaElement).disabled).toBeFalse();
    });

    it('publishes the alert and confirms it with role="status"', async () => {
        await openForm();
        type('#alert-title', 'Vague de chaleur');
        type('#alert-message', 'Une vague de chaleur extrême touche plusieurs secteurs.');
        fixture.detectChanges();
        (fixture.nativeElement.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(api.create).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Vague de chaleur', level: 'Information', notify_by_email: false, starts_at: null }));
        const notice = fixture.nativeElement.querySelector('#alerts-admin-notice') as HTMLElement;
        expect(notice.getAttribute('role')).toBe('status');
        expect(notice.textContent).toContain('publiée');
    });
});
