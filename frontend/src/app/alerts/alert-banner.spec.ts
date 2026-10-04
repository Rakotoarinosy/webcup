import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { LiveDataService } from '@/app/shared/live-data.service';
import { AlertBanner, acknowledgementKey } from './alert-banner';
import { CityAlert } from './alert.model';
import { AlertService } from './alert.service';

const base: Omit<CityAlert, 'id' | 'level' | 'title'> = {
    message: 'Une montée inhabituelle du niveau de l’eau est observée.',
    instructions: 'Éloignez-vous des berges.',
    audience: 'Habitants du quartier concerné',
    zone: 'Quartier sud',
    issuer: 'Centre de surveillance environnementale',
    starts_at: '2026-10-04T08:00:00Z',
    ends_at: null,
    ended_at: null,
    status: 'En cours',
    created_at: '2026-10-04T08:00:00Z',
    updated_at: '2026-10-04T08:00:00Z'
};
const flood: CityAlert = { ...base, id: 'a1', level: 'Urgence', title: 'Montée des eaux' };
const heat: CityAlert = { ...base, id: 'a2', level: 'Attention', title: 'Vague de chaleur', zone: null, audience: 'Personnes vulnérables', instructions: '' };

describe('AlertBanner', () => {
    let fixture: ComponentFixture<AlertBanner>;

    beforeEach(async () => {
        localStorage.removeItem('tn.alerts.acknowledged');
        await TestBed.configureTestingModule({
            imports: [AlertBanner],
            providers: [
                provideRouter([]),
                { provide: AlertService, useValue: { current: () => of([flood, heat]) } },
                { provide: LiveDataService, useValue: { watch: () => undefined } }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AlertBanner);
        fixture.componentRef.setInput('alertsLink', '/home/alerts');
        fixture.detectChanges();
    });

    afterEach(() => localStorage.removeItem('tn.alerts.acknowledged'));

    it('announces urgent alerts with role="alert" and the others with role="status", level in text', () => {
        const sections = Array.from(fixture.nativeElement.querySelectorAll('section.tn-alert')) as HTMLElement[];
        expect(sections.length).toBe(2);
        expect(sections[0].getAttribute('role')).toBe('alert');
        expect(sections[0].querySelector('.tn-alert-level')?.textContent).toContain('Urgence');
        expect(sections[0].querySelector('i')?.getAttribute('aria-hidden')).toBe('true');
        expect(sections[0].textContent).toContain('Que faire ?');
        expect(sections[0].textContent).toContain('Éloignez-vous des berges.');
        expect(sections[0].textContent).toContain('Zone : Quartier sud');
        expect(sections[1].getAttribute('role')).toBe('status');
        expect(sections[1].textContent).toContain('Attention');
        expect(sections[1].textContent).toContain('Personnes vulnérables');
        expect(fixture.nativeElement.querySelector('a.tn-alert-link').getAttribute('href')).toBe('/home/alerts');
    });

    it('remembers « J’ai compris » per alert', () => {
        (fixture.nativeElement.querySelector('button.tn-alert-ack') as HTMLButtonElement).click();
        fixture.detectChanges();

        const titles = Array.from(fixture.nativeElement.querySelectorAll('.tn-alert-title')).map((el) => (el as HTMLElement).textContent);
        expect(titles).toEqual(['Vague de chaleur']);
        expect(JSON.parse(localStorage.getItem('tn.alerts.acknowledged') ?? '[]')).toEqual([acknowledgementKey(flood)]);

        // Un nouveau bandeau (autre page) relit la mémoire locale.
        const other = TestBed.createComponent(AlertBanner);
        other.detectChanges();
        expect(other.nativeElement.querySelectorAll('section.tn-alert').length).toBe(1);
    });

    it('shows an updated alert again', () => {
        localStorage.setItem('tn.alerts.acknowledged', JSON.stringify([acknowledgementKey({ ...flood, updated_at: '2026-10-03T00:00:00Z' })]));
        const other = TestBed.createComponent(AlertBanner);
        other.detectChanges();
        expect(other.nativeElement.querySelectorAll('section.tn-alert').length).toBe(2);
    });
});
