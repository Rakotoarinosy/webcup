import { CommonModule } from '@angular/common';
import { Component, computed, inject, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';

import { ROLE_LABELS } from '@/app/auth/auth.model';
import { AuthService } from '@/app/auth/auth.service';
import { LayoutService } from '@/app/layout/service/layout.service';
import { AppConfigurator } from '../configurator/app.configurator';
import { Notifications } from './widget/notifications/notifications';

@Component({
    selector: 'app-topbar',
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, MenuModule, Notifications],
    templateUrl: './app.topbar.html',
    styleUrl: './app.topbar.scss'
})
export class AppTopbar {
    layoutService = inject(LayoutService);
    private readonly auth = inject(AuthService);

    // Référence vers le menu popup PrimeNG pour pouvoir le fermer explicitement
    readonly userMenu = viewChild<Menu>('menu');

    readonly user = this.auth.user;
    readonly roleLabel = this.auth.roleLabel;

    // Menu utilisateur : identité (non cliquable) puis déconnexion.
    readonly items = computed<MenuItem[]>(() => {
        const user = this.user();

        return [
            {
                label: user?.name ?? 'Utilisateur',
                items: [
                    {
                        label: user ? `${user.email} · ${ROLE_LABELS[user.role] ?? user.role}` : '',
                        icon: 'pi pi-user',
                        disabled: true
                    },
                    { label: 'Mon espace', icon: 'pi pi-user', routerLink: ['/home/account'] },
                    { separator: true },
                    {
                        label: 'Déconnexion',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            // Ferme le menu popup proprement avant de lancer la déconnexion
                            this.userMenu()?.hide();
                            this.auth.logout();
                        }
                    }
                ]
            }
        ];
    });
}
