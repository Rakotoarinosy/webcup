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
                    demande_id: 'd-1',
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
