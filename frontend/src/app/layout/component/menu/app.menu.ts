import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { AuthService } from '@/app/auth/auth.service';
import { AppMenuitem } from '../menuitem/app.menuitem';

@Component({
    selector: 'app-menu',
    imports: [CommonModule, AppMenuitem, RouterModule],
    templateUrl: './app.menu.html',
    styleUrl: './app.menu.scss'
})
export class AppMenu {
    private readonly auth = inject(AuthService);
    readonly model = computed<MenuItem[]>(() => {
        const items: MenuItem[] = [{ label: 'Mon espace', icon: 'pi pi-fw pi-user', routerLink: ['/home/account'] }];
        if (this.auth.hasRole('manager', 'admin')) {
            items.push({ label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/home/dashboard'] }, { label: 'Agents', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/agents'] });
        }
        if (this.auth.hasRole('admin')) {
            items.push({ label: 'Demandes historiques', icon: 'pi pi-fw pi-inbox', routerLink: ['/home/requests'] }, { label: 'Utilisateurs', icon: 'pi pi-fw pi-users', routerLink: ['/home/users'] });
        }
        items.push({ label: 'Accueil', icon: 'pi pi-fw pi-globe', routerLink: ['/'] });
        return [{ label: 'Kotrana', items }];
    });
}
