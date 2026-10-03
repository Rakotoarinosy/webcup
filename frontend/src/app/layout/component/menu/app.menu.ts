import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { AppMenuitem } from '../menuitem/app.menuitem';

const MENU_MODEL: MenuItem[] = [
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home/dashboard'] },
            { label: 'Demandes citoyennes', icon: 'pi pi-fw pi-inbox', routerLink: ['/home/requests'] },
            { label: 'Agents', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/agents'] },
            { label: 'Transaction', icon: 'pi pi-fw pi-objects-column', routerLink: ['/home/transaction'] }
        ]
    },
    {
        label: 'Terra Nova',
        items: [
            { label: 'Tableau de bord', icon: 'pi pi-fw pi-chart-line', routerLink: ['/home/terra-nova'], routerLinkActiveOptions: { exact: true } },
            { label: 'Demandes API', icon: 'pi pi-fw pi-list', routerLink: ['/home/terra-nova/demandes'] },
            { label: 'Notifications', icon: 'pi pi-fw pi-bell', routerLink: ['/home/terra-nova/notifications'] },
            { label: 'Pipeline', icon: 'pi pi-fw pi-objects-column', routerLink: ['/home/terra-nova/pipeline'] }
        ]
    },
    {
        label: 'Démo API',
        items: [{ label: 'Utilisateurs', icon: 'pi pi-fw pi-users', routerLink: ['/home/users'] }]
    },
    {
        label: 'UI Kit',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/uikit/formlayout'] },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/home/uikit/input'] },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/home/uikit/button'] },
            { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/home/uikit/table'] },
            { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/home/uikit/list'] },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/home/uikit/tree'] },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/home/uikit/panel'] },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/home/uikit/overlay'] },
            { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/home/uikit/media'] },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/home/uikit/menu'] },
            { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/home/uikit/message'] },
            { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/home/uikit/file'] },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/home/uikit/charts'] },
            { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/home/uikit/timeline'] },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/home/uikit/misc'] }
        ]
    },
    {
        label: 'Pages',
        items: [
            { label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/home/pages/crud'] },
            { label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/home/pages/empty'] },
            { label: 'Documentation', icon: 'pi pi-fw pi-book', routerLink: ['/home/pages/documentation'] },
            { label: 'Landing', icon: 'pi pi-fw pi-globe', routerLink: ['/landing'] },
            { label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/auth/login'] },
            { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound'] }
        ]
    }
];

@Component({
    selector: 'app-menu',
    imports: [CommonModule, AppMenuitem, RouterModule],
    templateUrl: './app.menu.html',
    styleUrl: './app.menu.scss'
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = MENU_MODEL;
    }
}
