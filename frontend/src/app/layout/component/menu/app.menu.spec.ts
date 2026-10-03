import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { AuthService } from '@/app/auth/auth.service';
import { Role } from '@/app/auth/auth.model';
import { AppMenu } from './app.menu';

describe('Menu follows the authenticated role', () => {
    const role = signal<Role>('citizen');
    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [{ provide: AuthService, useValue: { hasRole: (...allowed: Role[]) => allowed.includes(role()) } }] });
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
            expect(menu.model().some((group) => group.label === 'Terra Nova')).toBe(value !== 'citizen');
            const municipal = menu.model().find((group) => group.label === 'La mairie')!;
            expect(municipal.items!.map((item) => item.routerLink[0])).toEqual([
                '/home/municipal', '/home/municipal/services', '/home/municipal/publications', '/home/municipal/contact'
            ]);
        }
    });
});
