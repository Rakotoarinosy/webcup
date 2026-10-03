import { LiveDataService } from '../shared/live-data.service';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterOutlet, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { AgentService } from '@/app/agents/agent.service';
import { CitizenRequestService } from './request.service';
import { MyRequests } from './my-requests';

@Component({ imports: [RouterOutlet], template: '<router-outlet />' })
class TestShell {}

describe('MyRequests', () => {
    let fixture: ComponentFixture<TestShell>;
    let router: Router;
    let requestsApi: jasmine.SpyObj<CitizenRequestService>;
    let agentsApi: jasmine.SpyObj<AgentService>;

    const savedRequest = {
        id: 'request-12345678',
        title: 'Lampadaire en panne',
        description: 'Le lampadaire est éteint.',
        category: 'Éclairage public' as const,
        priority: 'Normale' as const,
        status: 'Nouveau' as const,
        citizen_id: 'citizen-1',
        created_at: '2026-10-03T10:00:00Z',
        location: 'Rue Centrale',
        latitude: null,
        longitude: null,
        assigned_agent_id: null,
        resolved_at: null
    };

    beforeEach(async () => {
        requestsApi = jasmine.createSpyObj<CitizenRequestService>('CitizenRequestService', ['get', 'list', 'create']);
        requestsApi.get.and.returnValue(of(savedRequest));
        requestsApi.list.and.returnValue(of({ items: [], total: 0, page: 1, page_size: 10, total_pages: 0 }));
        requestsApi.create.and.returnValue(of(savedRequest));
        agentsApi = jasmine.createSpyObj<AgentService>('AgentService', ['availableForCitizen']);
        agentsApi.availableForCitizen.and.returnValue(of([{ id: 'agent-1', name: 'Mairie Centre', email: 'centre@mairie.mg', department: 'Accueil', status: 'available', is_active: true, interventions: 0, created_at: '2026-10-03T10:00:00Z' }]));
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
                { provide: LiveDataService, useValue: { watch: () => {} } },
                { provide: AgentService, useValue: agentsApi },
                { provide: AuthService, useValue: { user: () => ({ id: 'citizen-1' }) } }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestShell);
        router = TestBed.inject(Router);
    });

    it('shows the selected request detail', async () => {
        await router.navigateByUrl('/home/my-requests/request-12345678');
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('Lampadaire en panne');
    });

    it('sends the search term when the citizen filters their table', async () => {
        await router.navigateByUrl('/home/my-requests');
        fixture.detectChanges();
        await fixture.whenStable();

        const search = fixture.nativeElement.querySelector('#request-search') as HTMLInputElement;
        search.value = 'canalisation';
        search.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(requestsApi.list.calls.mostRecent().args[0]).toEqual(
            jasmine.objectContaining({ mine: true, search: 'canalisation', page: 1 })
        );
    });

    it('opens the three-step creation workflow and submits the selected agent', async () => {
        await router.navigateByUrl('/home/my-requests');
        fixture.detectChanges();

        (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('Choisissez le service qui traitera votre demande');
        expect(agentsApi.availableForCitizen).toHaveBeenCalled();
    });
});
