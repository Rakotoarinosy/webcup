import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { AuthService } from '@/app/auth/auth.service';
import { NotificationService } from '@/app/notifications/notification.service';
import { PublicationReadService } from '@/app/municipal/publication-read.service';
import { AppMenuitem } from '../menuitem/app.menuitem';

@Component({
    selector: 'app-menu',
    imports: [CommonModule, AppMenuitem, RouterModule],
    templateUrl: './app.menu.html',
    styleUrl: './app.menu.scss'
})
export class AppMenu {
    private readonly auth = inject(AuthService);
    private readonly notifications = inject(NotificationService);
    private readonly publications = inject(PublicationReadService);

    readonly model = computed<MenuItem[]>(() => {
        const items: MenuItem[] = [{ label: 'Mon espace', icon: 'pi pi-fw pi-user', routerLink: ['/home/account'] }];

        if (this.auth.hasRole('agent')) {
            items.push(
                { label: 'Mes interventions', icon: 'pi pi-fw pi-inbox', routerLink: ['/home/agent'] },
                { label: 'Comptes citoyens', icon: 'pi pi-fw pi-users', routerLink: ['/home/users'] }
            );
        }
        if (this.auth.hasRole('citizen')) {
            items.push({ label: 'Mes demandes', icon: 'pi pi-fw pi-list', routerLink: ['/home/my-requests'], badge: this.notificationBadge() });
        }
        if (this.auth.hasRole('manager', 'admin')) {
            items.push({ label: 'Demandes citoyennes', icon: 'pi pi-fw pi-inbox', routerLink: ['/home/requests'], badge: this.notificationBadge() });
        }
        if (this.auth.hasRole('admin')) {
            // L'admin gère tous les comptes depuis « Utilisateurs » (citoyens compris).
            items.push(
                {
                    label: 'Utilisateurs',
                    icon: 'pi pi-fw pi-users',
                    path: '/home/accounts',
                    items: [
                        { label: 'Citoyens', icon: 'pi pi-fw pi-user', routerLink: ['/home/accounts/citizens'] },
                        { label: 'Agents', icon: 'pi pi-fw pi-wrench', routerLink: ['/home/accounts/agents'] },
                        { label: 'Managers', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/accounts/managers'] },
                        { label: 'Administrateurs', icon: 'pi pi-fw pi-shield', routerLink: ['/home/accounts/admins'] }
                    ]
                },
                { label: 'Instituts', icon: 'pi pi-fw pi-building', routerLink: ['/home/instituts'] },
                { label: 'Signalements données', icon: 'pi pi-fw pi-shield', routerLink: ['/home/data-concerns'] }
            );
        } else if (this.auth.hasRole('manager')) {
            items.push({ label: 'Comptes citoyens', icon: 'pi pi-fw pi-users', routerLink: ['/home/users'] });
        }
        if (this.auth.hasRole('agent', 'manager', 'admin')) {
            items.push({ label: 'Journal', icon: 'pi pi-fw pi-history', routerLink: ['/home/journal'] });
        }

        const groups: MenuItem[] = [{ label: 'Kotrana', items }];

        const mairieGroup: MenuItem = {
            label: 'La mairie',
            path: '__institution/mairie',
            icon: 'pi pi-fw pi-building',
            dropdownOnly: true,
            items: [
                { label: 'Accueil municipal', routerLink: ['/home/municipal'], routerLinkActiveOptions: { exact: true } },
                { label: 'Services municipaux', routerLink: ['/home/municipal/services'] },
                { label: 'Publications', routerLink: ['/home/municipal/publications'], badge: this.publicationBadge() },
                { label: 'Contacter la mairie', routerLink: ['/home/municipal/contact'] }
            ]
        };

        const institutionGroups: MenuItem[] = [
            {
                label: 'Accueil & démarches',
                path: '__institution/accueil',
                icon: 'pi pi-fw pi-id-card',
                dropdownOnly: true,
                items: [
                    { label: 'État civil et documents administratifs', routerLink: ['/home/municipal/services'] },
                    { label: 'Aide sociale et famille', routerLink: ['/home/municipal/services'] },
                    { label: 'Santé et prévention', routerLink: ['/home/municipal/services'] }
                ]
            },
            {
                label: 'Voirie',
                path: '__institution/voirie',
                icon: 'pi pi-fw pi-directions',
                dropdownOnly: true,
                items: [
                    { label: 'Voirie et circulation', routerLink: ['/home/municipal/services'] },
                    { label: 'Travaux et signalisation', routerLink: ['/home/municipal/services'] }
                ]
            },
            {
                label: 'Eau & assainissement',
                path: '__institution/eau',
                icon: 'pi pi-fw pi-droplet',
                dropdownOnly: true,
                items: [
                    { label: 'Eau et réseau', routerLink: ['/home/municipal/services'] },
                    { label: 'Assainissement', routerLink: ['/home/municipal/services'] }
                ]
            },
            {
                label: 'Propreté urbaine',
                path: '__institution/proprete',
                icon: 'pi pi-fw pi-trash',
                dropdownOnly: true,
                items: [
                    { label: 'Collecte et tri', routerLink: ['/home/municipal/services'] },
                    { label: 'Nettoyage et propreté', routerLink: ['/home/municipal/services'] }
                ]
            },
            {
                label: 'Éclairage public',
                path: '__institution/eclairage',
                icon: 'pi pi-fw pi-bolt',
                dropdownOnly: true,
                items: [
                    { label: 'Éclairage public', routerLink: ['/home/municipal/services'] },
                    { label: 'Signalement d’éclairage', routerLink: ['/home/municipal/services'] }
                ]
            },
            {
                label: 'Espaces verts',
                path: '__institution/environnement',
                icon: 'pi pi-fw pi-tree',
                dropdownOnly: true,
                items: [
                    { label: 'Espaces verts', routerLink: ['/home/municipal/services'] },
                    { label: 'Environnement et arbres', routerLink: ['/home/municipal/services'] }
                ]
            },
            {
                label: 'Sécurité civile',
                path: '__institution/securite',
                icon: 'pi pi-fw pi-shield',
                dropdownOnly: true,
                items: [
                    { label: 'Tranquillité publique', routerLink: ['/home/municipal/services'] },
                    { label: 'Prévention et sécurité', routerLink: ['/home/municipal/services'] }
                ]
            }
        ];

        // Même niveau que « Utilisateurs » : l'institution est un parent du menu Kotrana,
        // ses services deviennent les enfants indentés et seul le chevron indique le dropdown.
        items.push(mairieGroup, ...institutionGroups);

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

    private notificationBadge(): string | undefined {
        const count = this.notifications.unreadCount();
        return count ? (count > 99 ? '99+' : String(count)) : undefined;
    }

    private publicationBadge(): string | undefined {
        const count = this.publications.unreadCount();
        return count ? (count > 99 ? '99+' : String(count)) : undefined;
    }
}
