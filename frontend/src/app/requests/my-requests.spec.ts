import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterOutlet, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { NotificationService } from '@/app/notifications/notification.service';
import { CitizenRequestService } from './request.service';
import { MyRequests } from './my-requests';

@Component({ imports: [RouterOutlet], template: '<router-outlet />' })
class TestShell {}

describe('MyRequests', () => {
    let fixture: ComponentFixture<TestShell>;
    let router: Router;
    let requestsApi: jasmine.SpyObj<CitizenRequestService>;
    let notificationsApi: jasmine.SpyObj<NotificationService>;

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
        requestsApi = jasmine.createSpyObj<CitizenRequestService>('CitizenRequestService', [
            'get',
            'events',
            'list',
            'submit'
        ]);
        requestsApi.get.and.returnValue(of(savedRequest));
        requestsApi.events.and.returnValue(of([
            {
                id: 'step-1',
                request_id: savedRequest.id,
                type: 'created' as const,
                actor_id: 'citizen-1',
                actor_name: 'Rina',
                payload: {},
                created_at: '2026-10-03T10:00:00Z'
            },
            {
                id: 'step-2',
                request_id: savedRequest.id,
                type: 'assigned' as const,
                actor_id: 'manager-1',
                actor_name: 'Hery',
                payload: { agent_name: 'Jean Rakoto', from: 'Nouveau', to: 'En cours' },
                created_at: '2026-10-04T10:00:00Z'
            }
        ]));
        requestsApi.list.and.returnValue(of({ items: [], total: 0, page: 1, page_size: 10, total_pages: 0 }));
        requestsApi.submit.and.returnValue(of(savedRequest));
        notificationsApi = jasmine.createSpyObj<NotificationService>('NotificationService', ['list']);
        notificationsApi.list.and.returnValue(of({ items: [], unread_count: 0 }));
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
                { provide: NotificationService, useValue: notificationsApi },
                { provide: AuthService, useValue: { user: () => ({ id: 'citizen-1' }) } }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestShell);
        router = TestBed.inject(Router);
    });

    it('shows a persistent submission confirmation on the new request detail', async () => {
        await router.navigateByUrl('/home/my-requests/request-12345678?submitted=1');
        fixture.detectChanges();

        const banner = fixture.nativeElement.querySelector('[role="status"]') as HTMLElement;
        expect(banner).toBeTruthy();
        expect(banner.textContent).toContain('Votre demande a bien été envoyée');
        expect(banner.textContent).toContain('#request-');
        expect(banner.textContent).toContain('Nouveau');
    });

    it('shows an accessible chronological status timeline on request detail', async () => {
        await router.navigateByUrl('/home/my-requests/request-12345678');
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const timeline = fixture.nativeElement.querySelector(
            'ol[aria-label="Étapes de votre demande, de la plus ancienne à la plus récente"]'
        ) as HTMLOListElement | null;
        expect(timeline).toBeTruthy();
        if (!timeline) return;
        const steps = Array.from(timeline.querySelectorAll('li'));
        expect(steps.length).toBe(2);
        expect(steps[0].textContent).toContain('Demande enregistrée');
        expect(steps[1].textContent).toContain('Prise en charge par Jean Rakoto');
        expect(steps[1].querySelector('time')?.getAttribute('datetime')).toBe('2026-10-04T10:00:00Z');
        expect(fixture.nativeElement.textContent).toContain('Statut actuel');
    });

    it('shows unread notifications and requests awaiting citizen action', async () => {
        requestsApi.list.and.returnValues(
            of({ items: [], total: 0, page: 1, page_size: 10, total_pages: 0 }),
            of({ items: [{ ...savedRequest, status: 'En attente' }], total: 1, page: 1, page_size: 10, total_pages: 1 })
        );
        notificationsApi.list.and.returnValue(
            of({
                items: [{
                    key: 'notification-1',
                    kind: 'assigned',
                    title: 'Votre demande nécessite votre attention',
                    message: 'Veuillez apporter des précisions.',
                    request_id: 'd-1',
                    created_at: '2026-10-03T10:00:00Z',
                    is_read: false
                }],
                unread_count: 1
            })
        );

        await router.navigateByUrl('/home/my-requests');
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('Votre demande nécessite votre attention');
        expect(fixture.nativeElement.textContent).toContain('en attente d’une action ou d’informations de votre part');
    });
});
