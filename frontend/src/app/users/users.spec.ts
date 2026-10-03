import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UserService } from './user.service';
import { User } from './user.model';
import { Users } from './users';

const CITIZEN: User = {
    id: 'citizen-1',
    name: 'Rina',
    email: 'rina@example.com',
    role: 'citizen',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
};

describe('Users citizen account management', () => {
    let fixture: ComponentFixture<Users>;
    let component: Users;
    let userService: jasmine.SpyObj<UserService>;

    beforeEach(() => {
        userService = jasmine.createSpyObj<UserService>('UserService', ['list', 'get', 'update']);
        userService.list.and.returnValue(of([CITIZEN]));
        userService.get.and.returnValue(of(CITIZEN));
        userService.update.and.returnValue(of(CITIZEN));
        TestBed.configureTestingModule({
            imports: [Users],
            providers: [provideHttpClient(), provideHttpClientTesting(), { provide: UserService, useValue: userService }]
        });
        fixture = TestBed.createComponent(Users);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('loads citizen accounts and sends search to the API', () => {
        expect(userService.list).toHaveBeenCalledWith('');
        component.loadUsers('Rina');
        expect(userService.list).toHaveBeenCalledWith('Rina');
        expect(component.users()).toEqual([CITIZEN]);
    });

    it('loads the selected account detail for viewing', () => {
        component.openDetails(CITIZEN);
        expect(component.detailsVisible()).toBeTrue();
        expect(userService.get).toHaveBeenCalledWith(CITIZEN.id);
    });

    it('exposes only profile fields for editing and updates account activation separately', () => {
        component.openEdit(CITIZEN);
        expect(Object.keys(component.form).sort()).toEqual(['email', 'name']);
        component.save({ invalid: false } as never);
        expect(userService.update).toHaveBeenCalledWith(CITIZEN.id, { email: CITIZEN.email, name: CITIZEN.name });

        component.confirmActivationChange(CITIZEN);
        expect(component.selectedUser()).toEqual(CITIZEN);
    });

    it('does not render role, password, or deletion controls', () => {
        const page = fixture.nativeElement.textContent as string;
        expect(page).not.toContain('Supprimer');
        expect(page).not.toContain('Mot de passe');
        expect(page).not.toContain('Modifier le rôle');
    });
});
