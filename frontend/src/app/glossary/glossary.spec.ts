import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { REQUEST_STATUS_VALUES } from '@/app/shared/api-enums';
import { GLOSSARY, glossaryEntry, requestStatusTerm, searchGlossary } from './glossary';
import { GlossaryPage } from './glossary-page';
import { TermHelp } from './term-help';

describe('Lexique (D13)', () => {
    it('defines every request status shown on the platform', () => {
        for (const status of REQUEST_STATUS_VALUES) {
            expect(glossaryEntry(requestStatusTerm(status))).withContext(status).toBeDefined();
        }
        expect(new Set(GLOSSARY.map((entry) => entry.id)).size).toBe(GLOSSARY.length);
    });

    it('searches terms and aliases without accents, then definitions', () => {
        expect(searchGlossary('etat civil')[0].id).toBe('etat-civil');
        expect(searchGlossary('panne').map((entry) => entry.id)).toContain('hors-service');
        expect(searchGlossary('')).toHaveSize(GLOSSARY.length);
        expect(searchGlossary('zzz')).toEqual([]);
    });

    it('filters the public glossary page and announces the count', async () => {
        await TestBed.configureTestingModule({ imports: [GlossaryPage], providers: [provideRouter([])] }).compileComponents();
        const fixture = TestBed.createComponent(GlossaryPage);
        fixture.detectChanges();
        fixture.componentInstance.query.set('institut');
        fixture.detectChanges();
        const host = fixture.nativeElement as HTMLElement;
        expect(host.querySelector('#terme-institut')).not.toBeNull();
        expect(host.querySelector('[role="status"]')?.textContent).toContain('mot(s) trouvé(s)');
        expect(TestBed.inject(ActivatedRoute)).toBeTruthy();
    });
});

describe('TermHelp', () => {
    it('opens with the keyboard-accessible button and closes with Escape', async () => {
        await TestBed.configureTestingModule({ imports: [TermHelp], providers: [provideRouter([])] }).compileComponents();
        const fixture = TestBed.createComponent(TermHelp);
        fixture.componentRef.setInput('term', 'institut');
        fixture.detectChanges();
        const host = fixture.nativeElement as HTMLElement;
        const button = host.querySelector('button') as HTMLButtonElement;
        expect(button.getAttribute('aria-expanded')).toBe('false');
        expect(button.getAttribute('aria-label')).toBe('Que veut dire « Institut » ?');

        button.click();
        fixture.detectChanges();
        expect(button.getAttribute('aria-expanded')).toBe('true');
        const panel = host.querySelector('[role="note"]') as HTMLElement;
        expect(panel.id).toBe(button.getAttribute('aria-controls') as string);
        expect(panel.textContent).toContain('Une équipe de la mairie');

        host.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        fixture.detectChanges();
        expect(host.querySelector('[role="note"]')).toBeNull();
    });
});
