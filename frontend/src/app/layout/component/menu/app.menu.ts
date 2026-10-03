import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { Role } from '@/app/auth/auth.model';
import { AuthService } from '@/app/auth/auth.service';
import { AppMenuitem } from '../menuitem/app.menuitem';

interface RoleMenuItem extends MenuItem {
    roles?: Role[];
    items?: RoleMenuItem[];
}

const ALL_ROLES: Role[] = ['admin', 'manager', 'agent', 'citizen'];
const STAFF_ROLES: Role[] = ['admin', 'manager'];

const MENU_MODEL: RoleMenuItem[] = [
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home/dashboard'], roles: STAFF_ROLES },
            { label: 'Demandes citoyennes', icon: 'pi pi-fw pi-inbox', routerLink: ['/home/requests'], roles: ALL_ROLES },
            { label: 'Accueil municipal', icon: 'pi pi-fw pi-building', routerLink: ['/home/municipal'], roles: ALL_ROLES },
            { label: 'Services municipaux', icon: 'pi pi-fw pi-map-marker', routerLink: ['/home/municipal/services'], roles: ALL_ROLES },
            { label: 'Publications', icon: 'pi pi-fw pi-megaphone', routerLink: ['/home/municipal/publications'], roles: ALL_ROLES },
            { label: 'Contacter la mairie', icon: 'pi pi-fw pi-envelope', routerLink: ['/home/municipal/contact'], roles: ALL_ROLES },
            { label: 'Agents', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/agents'], roles: STAFF_ROLES }
        ]
    },
    {
        label: 'Démo API',
        items: [{ label: 'Utilisateurs', icon: 'pi pi-fw pi-users', routerLink: ['/home/users'], roles: ['admin'] }]
    }
];

@Component({
    selector: 'app-menu',
    imports: [CommonModule, AppMenuitem, RouterModule],
    templateUrl: './app.menu.html',
    styleUrl: './app.menu.scss'
})
export class AppMenu {
    private readonly auth = inject(AuthService);

    /** Menu dérivé du rôle chargé depuis `/auth/login` ou `/auth/refresh`. */
    readonly model = computed<MenuItem[]>(() => filterMenu(MENU_MODEL, this.auth.user()?.role));
}

function filterMenu(items: RoleMenuItem[], role: Role | undefined): MenuItem[] {
    return items
        .filter((item) => !item.roles || (role !== undefined && item.roles.includes(role)))
        .map((item) => {
            const children = item.items ? filterMenu(item.items, role) : undefined;
            return { ...item, ...(children ? { items: children } : {}) };
        })
        .filter((item) => !('items' in item) || (item.items?.length ?? 0) > 0);
}
