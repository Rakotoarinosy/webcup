import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthUser, VerificationChallenge } from '../auth.model';
import { ChallengeStore } from '../challenge.store';
import { VerificationService } from '../verification.service';
import { VerifyCode } from './verify-code';
import { AppFloatingConfigurator } from '../../layout/component/floatingconfigurator/app.floatingconfigurator';

@Component({ selector: 'app-floating-configurator', template: '' })
class FloatingStub {
    readonly float = input(false);
}

describe('Code confirmation screen', () => {
    let fixture: ComponentFixture<VerifyCode>;
    let service: jasmine.SpyObj<VerificationService>;
    const pending: VerificationChallenge = { challenge_id: 'challenge', channel: 'email', destination: 'citizen@test.mg', email: 'citizen@test.mg', expires_in: 600, resend_after: 0 };
    const user: AuthUser = { id: 'citizen', name: 'Citizen', email: pending.destination, role: 'citizen', agent_id: null, institut_id: null, created_at: '', email_verified: true, phone: null, phone_verified: false, avatar_url: null };
    beforeEach(async () => {
        service = jasmine.createSpyObj<VerificationService>('VerificationService', ['verify', 'resend']);
        TestBed.configureTestingModule({ imports: [VerifyCode], providers: [provideRouter([]), { provide: VerificationService, useValue: service }, { provide: AuthService, useValue: { homeUrl: () => '/home/account' } }] });
        TestBed.overrideComponent(VerifyCode, { remove: { imports: [AppFloatingConfigurator] }, add: { imports: [FloatingStub] } });
        TestBed.inject(ChallengeStore).set(pending);
        await TestBed.compileComponents();
        fixture = TestBed.createComponent(VerifyCode);
        fixture.detectChanges();
    });
    it('shows the destination and accepts only six digits', () => {
        expect(fixture.nativeElement.textContent).toContain(pending.email);
        fixture.componentInstance.code.setValue('123');
        fixture.componentInstance.submit();
        expect(service.verify).not.toHaveBeenCalled();
        expect(fixture.nativeElement.querySelectorAll('.p-inputotp-input').length).toBe(6);
    });
    it('blocks duplicate verification and resend while verifying', () => {
        const response = new Subject<AuthUser>();
        service.verify.and.returnValue(response);
        const navigate = spyOn(TestBed.inject(Router), 'navigateByUrl').and.resolveTo(true);
        const component = fixture.componentInstance;
        component.code.setValue('123456');
        component.submit();
        component.resend();
        expect(service.verify).toHaveBeenCalledOnceWith('123456');
        expect(service.resend).not.toHaveBeenCalled();
        expect(component.code.disabled).toBeTrue();
        response.next(user);
        response.complete();
        expect(navigate).toHaveBeenCalledWith('/home/account');
        expect(service.verify).toHaveBeenCalledTimes(1);
    });
    it('blocks verification during resend and announces a new code', () => {
        const response = new Subject<VerificationChallenge>();
        service.resend.and.returnValue(response);
        const component = fixture.componentInstance;
        component.resend();
        component.resend();
        component.submit();
        expect(service.resend).toHaveBeenCalledTimes(1);
        expect(service.verify).not.toHaveBeenCalled();
        response.next({ ...pending, challenge_id: 'new-challenge' });
        response.complete();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('nouveau code');
        expect(component.code.enabled).toBeTrue();
    });
    it('shows an error and allows retry after an invalid code', () => {
        service.verify.and.returnValue(throwError(() => new HttpErrorResponse({ status: 400, error: { error: 'InvalidVerificationCodeError' } })));
        fixture.componentInstance.code.setValue('123456');
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('incorrect');
        expect(fixture.componentInstance.code.enabled).toBeTrue();
        expect(fixture.componentInstance.code.value).toBe('');
    });
});
