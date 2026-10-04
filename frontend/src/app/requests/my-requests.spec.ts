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
        resolved_at: null,
        support_count: 2,
        duplicate_of_id: null,
        conversation_state: 'answered' as const,
        last_message_at: '2026-10-04T11:00:00Z',
        similar_count: 0
    };

    beforeEach(async () => {
        requestsApi = jasmine.createSpyObj<CitizenRequestService>('CitizenRequestService', ['get', 'events', 'list', 'submit', 'messages', 'postMessage', 'similarCheck', 'support']);
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
        requestsApi.messages.and.returnValue(
            of([
                { id: 'm1', request_id: savedRequest.id, visibility: 'public' as const, body: 'Intervention prévue jeudi.', created_at: '2026-10-04T11:00:00Z', author_name: 'Jean', author_role: 'agent' as const, from_staff: true }
            ])
        );
        requestsApi.similarCheck.and.returnValue(
            of([
                {
                    id: 'other-1',
                    title: 'Lampadaire éteint',
                    category: 'Éclairage public' as const,
                    status: 'Nouveau' as const,
                    location: 'Rue Centrale',
                    created_at: '2026-10-02T10:00:00Z',
                    support_count: 3,
                    supported_by_me: false,
                    is_mine: false,
                    supported_at: null,
                    score: 80,
                    same_place: true
                }
            ])
        );
        requestsApi.support.and.returnValue(
            of({ id: 'other-1', title: 'Lampadaire éteint', category: 'Éclairage public' as const, status: 'Nouveau' as const, location: 'Rue Centrale', created_at: '2026-10-02T10:00:00Z', support_count: 4, supported_by_me: true, is_mine: false, supported_at: '2026-10-04T12:00:00Z' })
        );
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

    it('shows the conversation with the town hall as an accessible log', async () => {
        await router.navigateByUrl('/home/my-requests/request-12345678');
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const log = fixture.nativeElement.querySelector('ol[role="log"]') as HTMLElement;
        expect(log).not.toBeNull();
        expect(log.textContent).toContain('Intervention prévue jeudi.');
        expect(log.textContent).toContain('Jean (agent)');
        expect(fixture.nativeElement.textContent).toContain('La mairie vous a répondu');
        // Le citoyen n'a pas d'option de note interne.
        expect(fixture.nativeElement.textContent).not.toContain('Note interne');
    });

    it('suggests supporting a similar request instead of creating a duplicate', async () => {
        await router.navigateByUrl('/home/my-requests');
        fixture.detectChanges();
        const component = fixture.debugElement.query((el) => el.componentInstance instanceof MyRequests).componentInstance as MyRequests;
        const internals = component as unknown as { form: { title: string; description: string; category: string; location: string }; creationStep: { set(v: number): void }; nextCreationStep(): void; createDialogVisible: { set(v: boolean): void } };
        internals.createDialogVisible.set(true);
        internals.form = { title: 'Lampadaire éteint', description: 'Plus de lumière', category: 'Éclairage public', location: 'Rue Centrale' };
        internals.creationStep.set(2);
        internals.nextCreationStep();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(requestsApi.similarCheck).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Lampadaire éteint', category: 'Éclairage public' }));
        const button = Array.from(document.querySelectorAll('button')).find((b) => b.textContent?.includes('Soutenir plutôt que créer un doublon')) as HTMLButtonElement;
        expect(button).toBeTruthy();
        button.click();
        fixture.detectChanges();
        expect(requestsApi.support).toHaveBeenCalledWith('other-1');
        expect(document.body.textContent).toContain('votre soutien à « Lampadaire éteint » est enregistré');
    });
});
