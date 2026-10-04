import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { ExplainSimply } from './explain-simply';
import { PlainExplanation, PlainLanguageService } from './plain-language.service';

@Component({
    imports: [ExplainSimply],
    template: `<app-explain-simply [text]="text()" subject="Aide sociale" />`
})
class Host {
    readonly text = signal('<p>Le dossier doit être déposé auprès du <strong>CCAS</strong> de la commune.</p>');
}

describe('ExplainSimply', () => {
    let fixture: ComponentFixture<Host>;
    let api: jasmine.SpyObj<PlainLanguageService>;
    const explanation: PlainExplanation = {
        summary: 'Déposez votre dossier au service social de la mairie.',
        key_points: ['Préparez votre dossier.'],
        terms: [{ term: 'CCAS', definition: 'Le service social de la mairie.' }]
    };

    beforeEach(async () => {
        api = jasmine.createSpyObj<PlainLanguageService>('PlainLanguageService', ['explain']);
        api.explain.and.returnValue(of(explanation));
        await TestBed.configureTestingModule({
            imports: [Host],
            providers: [{ provide: PlainLanguageService, useValue: api }]
        }).compileComponents();
        fixture = TestBed.createComponent(Host);
        fixture.detectChanges();
    });

    const element = () => fixture.nativeElement as HTMLElement;
    const button = () => element().querySelector('button') as HTMLButtonElement;

    it('asks nothing until the citizen requests an explanation', () => {
        expect(api.explain).not.toHaveBeenCalled();
        expect(button().getAttribute('aria-expanded')).toBe('false');
        expect(button().textContent).toContain('Expliquer plus simplement');
    });

    it('explains the plain text of the passage below it, without replacing it', () => {
        button().click();
        fixture.detectChanges();

        expect(api.explain).toHaveBeenCalledWith('Le dossier doit être déposé auprès du CCAS de la commune.');
        expect(button().getAttribute('aria-expanded')).toBe('true');
        const panel = element().querySelector('section') as HTMLElement;
        expect(panel.textContent).toContain('Déposez votre dossier au service social de la mairie.');
        expect(panel.textContent).toContain('Préparez votre dossier.');
        expect(panel.querySelector('dt')?.textContent).toContain('CCAS');
    });

    it('reopens the explanation without asking again', () => {
        button().click();
        fixture.detectChanges();
        button().click();
        fixture.detectChanges();
        expect(element().querySelector('section')).toBeNull();

        button().click();
        fixture.detectChanges();
        expect(api.explain).toHaveBeenCalledTimes(1);
        expect(element().querySelector('section')?.textContent).toContain('service social');
    });

    it('says clearly when the explanation is unavailable', () => {
        api.explain.and.returnValue(throwError(() => new HttpErrorResponse({ status: 503 })));
        button().click();
        fixture.detectChanges();

        const alert = element().querySelector('[role="alert"]') as HTMLElement;
        expect(alert.textContent).toContain('indisponible');
        expect(alert.textContent).toContain('texte officiel');
    });

    it('offers nothing for a passage too short to explain', () => {
        fixture.componentInstance.text.set('Ouvert.');
        fixture.detectChanges();
        expect(element().querySelector('button')).toBeNull();
    });
});
