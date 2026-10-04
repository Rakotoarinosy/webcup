import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { AuthService } from '@/app/auth/auth.service';
import { Role } from '@/app/auth/auth.model';
import { NotificationService } from '@/app/notifications/notification.service';
import { PublicationReadService } from '@/app/municipal/publication-read.service';
import { AppMenu } from './app.menu';

describe('Menu follows the authenticated role', () => {
    const role = signal<Role>('citizen');
    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [
            { provide: AuthService, useValue: { hasRole: (...allowed: Role[]) => allowed.includes(role()) } },
            { provide: NotificationService, useValue: { unreadCount: signal(0) } },
            { provide: PublicationReadService, useValue: { unreadCount: signal(0) } }
        ] });
    });
    it('updates immediately when the current role changes', () => {
        const menu = TestBed.runInInjectionContext(() => new AppMenu());
        for (const value of ['citizen', 'agent', 'manager', 'admin'] as Role[]) {
            role.set(value);
            const labels = menu.model()[0].items!.map((item) => item.label);
            expect(labels).toContain('Mon espace');
            // L'admin gère tous les comptes dans « Utilisateurs » ; agents et managers, les comptes citoyens.
            expect(labels.includes('Comptes citoyens')).toBe(value === 'agent' || value === 'manager');
            expect(labels.includes('Utilisateurs')).toBe(value === 'admin');
            expect(labels.includes('Instituts')).toBe(value === 'admin');
            // Les comptes agents sont gérés dans Utilisateurs ▸ Agents (admin) : plus d'entrée « Agents » au premier niveau.
            expect(labels).not.toContain('Agents');
            expect(labels).not.toContain('Transaction');
            expect(menu.model().some((group) => group.label === 'API Terra Nova')).toBe(value !== 'citizen');
            const municipal = menu.model().find((group) => group.label === 'La mairie')!;
            expect(municipal.items!.map((item) => item.label)).toEqual([
                'Accueil municipal',
                'Accueil et démarches administratives',
                'Service de la voirie',
                'Service de l’eau et assainissement',
                'Propreté urbaine et déchets',
                'Éclairage public',
                'Espaces verts et environnement',
                'Sécurité civile et tranquillité publique',
                'Services municipaux',
                'Publications',
                'Contacter la mairie'
            ]);
            expect(municipal.items!.map((item) => item.routerLink?.[0] ?? null)).toContain('/home/municipal/services');
        }
    });
});
