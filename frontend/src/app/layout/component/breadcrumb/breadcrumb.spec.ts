import { Component } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { BreadcrumbComponent } from './breadcrumb';

@Component({ template: '' })
class TestPage {}

describe('BreadcrumbComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BreadcrumbComponent],
            providers: [
                provideRouter([
                    {
                        path: 'home',
                        data: { breadcrumb: 'Espace personnel' },
                        children: [
                            {
                                path: 'municipal',
                                data: { breadcrumb: 'Accueil municipal' },
                                children: [{ path: 'services', data: { breadcrumb: 'Services municipaux' }, component: TestPage }]
                            },
                            {
                                path: 'my-requests',
                                data: { breadcrumb: 'Mes demandes' },
                                children: [
                                    { path: '', component: TestPage },
                                    { path: ':id', data: { breadcrumb: 'Détail' }, component: TestPage }
                                ]
                            }
                        ]
                    }
                ])
            ]
        });
    });

    it('shows route labels and contextual parent navigation', async () => {
        const fixture = TestBed.createComponent(BreadcrumbComponent);
        const router = TestBed.inject(Router);

        await router.navigateByUrl('/home/municipal/services');
        fixture.detectChanges();

        expect(fixture.componentInstance.items().map((item) => item.label)).toEqual([
            'Espace personnel',
            'Accueil municipal',
            'Services municipaux'
        ]);
        expect(fixture.componentInstance.previous()?.url).toBe('/home/municipal');
        expect(fixture.nativeElement.querySelector('nav').getAttribute('aria-label')).toBe('Fil d’Ariane');
        expect(fixture.nativeElement.querySelector('[aria-current="page"]').textContent.trim()).toBe('Services municipaux');
    });

    it('returns to the history route from a request detail', async () => {
        const fixture = TestBed.createComponent(BreadcrumbComponent);
        const router = TestBed.inject(Router);

        await router.navigateByUrl('/home/my-requests/request-1');
        fixture.detectChanges();

        expect(fixture.componentInstance.previous()?.url).toBe('/home/my-requests');
        expect(fixture.componentInstance.items().at(-1)?.label).toBe('Détail');
    });

    it('does not repeat inherited breadcrumb data for an empty child route', async () => {
        const fixture = TestBed.createComponent(BreadcrumbComponent);
        const router = TestBed.inject(Router);

        await router.navigateByUrl('/home/my-requests');
        fixture.detectChanges();

        expect(fixture.componentInstance.items().map((item) => item.label)).toEqual([
            'Espace personnel',
            'Mes demandes'
        ]);
    });
});
