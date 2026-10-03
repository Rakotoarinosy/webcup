import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterOutlet, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { CitizenRequestService } from './request.service';
import { MyRequests } from './my-requests';

@Component({ imports: [RouterOutlet], template: '<router-outlet />' })
class TestShell {}

describe('MyRequests', () => {
    let fixture: ComponentFixture<TestShell>;
    let router: Router;
    let requestsApi: jasmine.SpyObj<CitizenRequestService>;

    const savedRequest = {
        id: 'request-12345678',
        title: 'Lampadaire en panne',
        description: 'Le lampadaire est éteint.',
        category: 'Éclairage public' as const,
        priority: 'Normale' as const,
        status: 'Nouveau' as const,
        citizen_id: 'citizen-1',
        institut_id: 'institut-1',
        assigned_agent_id: null,
        location: 'Rue Centrale',
        latitude: null,
        longitude: null,
        urgency: 3,
        affected_citizens: 1,
        priority_score: 40,
        created_at: '2026-10-03T10:00:00Z',
        updated_at: '2026-10-03T10:00:00Z',
        scheduled_at: null,
        resolved_at: null
    };

    beforeEach(async () => {
        requestsApi = jasmine.createSpyObj<CitizenRequestService>('CitizenRequestService', ['get', 'events', 'list', 'submit']);
        requestsApi.get.and.returnValue(of(savedRequest));
        requestsApi.events.and.returnValue(
            of([
                { id: 'step-1', request_id: savedRequest.id, type: 'created' as const, actor_id: 'citizen-1', actor_name: 'Rina', payload: {}, created_at: '2026-10-03T10:00:00Z' },
                {
                    id: 'step-2',
                    request_id: savedRequest.id,
                    type: 'assigned' as const,
                    actor_id: 'manager-1',
                    actor_name: 'Hery',
                    payload: { agent_name: 'Jean Rakoto', from: 'Nouveau', to: 'En cours' },
                    created_at: '2026-10-04T10:00:00Z'
                }
            ])
        );
        requestsApi.list.and.returnValue(of({ items: [], total: 0, page: 1, page_size: 10, total_pages: 0 }));
        requestsApi.submit.and.returnValue(of(savedRequest));
        await TestBed.configureTestingModule({
            imports: [TestShell, MyRequests],
            providers: [
                provideRouter([
                    {
                        path: 'home/my-requests',
                        children: [
                            { path: '', component: MyRequests, data: { breadcrumb: 'Mes demandes' } },
                            { path: ':id', component: MyRequests, data: { breadcrumb: 'Détail' } }
                        ]
                    }
                ]),
                { provide: CitizenRequestService, useValue: requestsApi },
                { provide: AuthService, useValue: { user: () => ({ id: 'citizen-1' }) } }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestShell);
        router = TestBed.inject(Router);
    });

    it('shows the request detail with its processing timeline', async () => {
        await router.navigateByUrl('/home/my-requests/request-12345678');
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('Lampadaire en panne');
        const steps = Array.from(
            fixture.nativeElement.querySelectorAll('ol[aria-label="Étapes de votre demande, de la plus ancienne à la plus récente"] li')
        ) as HTMLElement[];
        expect(steps.length).toBe(2);
        expect(steps[0].textContent).toContain('Demande enregistrée');
        expect(steps[1].textContent).toContain('Prise en charge par Jean Rakoto');
        expect(steps[1].querySelector('time')?.getAttribute('datetime')).toBe('2026-10-04T10:00:00Z');
    });

    it('sends the search term when the citizen filters their table', async () => {
        await router.navigateByUrl('/home/my-requests');
        fixture.detectChanges();
        await fixture.whenStable();

        const search = fixture.nativeElement.querySelector('#request-search') as HTMLInputElement;
        search.value = 'canalisation';
        search.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(requestsApi.list.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({ search: 'canalisation', page: 1 }));
    });

    it('asks for the type of problem first, never for an agent', async () => {
        await router.navigateByUrl('/home/my-requests');
        fixture.detectChanges();

        (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('Quel est le problème ?');
        expect(fixture.nativeElement.textContent).toContain('transmise automatiquement au service compétent');
    });
});
