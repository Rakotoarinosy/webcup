import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutService } from '@/app/layout/service/layout.service';
import { AppSidebar } from '../sidebar/app.sidebar';
import { AppTopbar } from '../topbar/app.topbar';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb';

@Component({
    selector: 'app-layout',
    imports: [CommonModule, AppTopbar, AppSidebar, RouterModule, BreadcrumbComponent],
    templateUrl: './app.layout.html',
    styleUrl: './app.layout.scss'
})
export class AppLayout {
    layoutService = inject(LayoutService);

    containerClass = computed(() => {
        const config = this.layoutService.layoutConfig();
        const state = this.layoutService.layoutState();
        return {
            'layout-overlay': config.menuMode === 'overlay',
            'layout-static': config.menuMode === 'static',
            'layout-static-inactive': state.staticMenuDesktopInactive && config.menuMode === 'static',
            'layout-overlay-active': state.overlayMenuActive,
            'layout-mobile-active': state.mobileMenuActive
        };
    });

    /**
     * Le lien d’évitement déplace le focus sur le contenu principal sans passer par le routeur
     * (un simple « #main-content » serait résolu par rapport au <base href> et rechargerait la page).
     */
    skipToContent(event: Event): void {
        event.preventDefault();
        const main = document.getElementById('main-content');
        main?.focus();
        main?.scrollIntoView({ block: 'start' });
    }

    constructor() {
        // Prevent the page from scrolling behind the open mobile menu.
        effect(() => {
            const state = this.layoutService.layoutState();
            if (state.mobileMenuActive) {
                document.body.classList.add('blocked-scroll');
            } else {
                document.body.classList.remove('blocked-scroll');
            }
        });
    }
}
