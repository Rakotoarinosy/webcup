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

        if (this.auth.hasRole('agent')) {
            items.push({ label: 'Mes interventions', icon: 'pi pi-fw pi-inbox', routerLink: ['/home/agent'] });
        }
        if (this.auth.hasRole('manager', 'admin')) {
            items.push(
                { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/home/dashboard'] },
                { label: 'Agents', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/agents'] }
            );
        }
        if (this.auth.hasRole('admin')) {
            items.push(
                { label: 'Demandes historiques', icon: 'pi pi-fw pi-inbox', routerLink: ['/home/requests'] },
                { label: 'Utilisateurs', icon: 'pi pi-fw pi-users', routerLink: ['/home/users'] }
            );
        }
        items.push({ label: 'Accueil', icon: 'pi pi-fw pi-globe', routerLink: ['/'] });

        const groups: MenuItem[] = [{ label: 'Kotrana', items }];

        groups.push({
            label: 'La mairie',
            items: [
                { label: 'Accueil municipal', icon: 'pi pi-fw pi-building', routerLink: ['/home/municipal'], routerLinkActiveOptions: { exact: true } },
                { label: 'Services municipaux', icon: 'pi pi-fw pi-map-marker', routerLink: ['/home/municipal/services'] },
                { label: 'Publications', icon: 'pi pi-fw pi-megaphone', routerLink: ['/home/municipal/publications'] },
                { label: 'Contacter la mairie', icon: 'pi pi-fw pi-envelope', routerLink: ['/home/municipal/contact'] }
            ]
        });

        if (this.auth.hasRole('agent', 'manager', 'admin')) {
            groups.push({
                label: 'Terra Nova',
                items: [
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-chart-line', routerLink: ['/home/terra-nova'], routerLinkActiveOptions: { exact: true } },
                    { label: 'Demandes API', icon: 'pi pi-fw pi-list', routerLink: ['/home/terra-nova/demandes'] },
                    { label: 'Notifications', icon: 'pi pi-fw pi-bell', routerLink: ['/home/terra-nova/notifications'] },
                    { label: 'Pipeline', icon: 'pi pi-fw pi-objects-column', routerLink: ['/home/terra-nova/pipeline'] }
                ]
            });
        }
        return groups;
    });
}
