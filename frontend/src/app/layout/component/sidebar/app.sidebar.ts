import { Component, effect, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

import { LayoutService } from '@/app/layout/service/layout.service';
import { AppMenu } from '../menu/app.menu';

/** State patch that closes every menu variant (overlay, mobile, hover). */
const CLOSED_MENU_STATE = {
    overlayMenuActive: false,
    mobileMenuActive: false,
    menuHoverActive: false
} as const;

@Component({
    selector: 'app-sidebar',
    imports: [AppMenu, RouterModule],
    templateUrl: './app.sidebar.html',
    styleUrl: './app.sidebar.scss'
})
export class AppSidebar implements OnInit, OnDestroy {
    layoutService = inject(LayoutService);

    router = inject(Router);

    el = inject(ElementRef);

    private outsideClickListener: ((event: MouseEvent) => void) | null = null;

    private destroy$ = new Subject<void>();

    constructor() {
        // Listen for outside clicks only while the menu is open (overlay on desktop, mobile menu otherwise).
        effect(() => {
            const state = this.layoutService.layoutState();
            const isMenuOpen = this.layoutService.isDesktop() ? state.overlayMenuActive : state.mobileMenuActive;

            if (isMenuOpen) {
                this.bindOutsideClickListener();
            } else {
                this.unbindOutsideClickListener();
            }
        });
    }

    ngOnInit() {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe((event) => {
                const navEvent = event as NavigationEnd;
                this.onRouteChange(navEvent.urlAfterRedirects);
            });

        this.onRouteChange(this.router.url);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.unbindOutsideClickListener();
    }

    private onRouteChange(path: string) {
        this.layoutService.layoutState.update((val) => ({
            ...val,
            activePath: path,
            ...CLOSED_MENU_STATE
        }));
    }

    private bindOutsideClickListener() {
        if (!this.outsideClickListener) {
            this.outsideClickListener = (event: MouseEvent) => {
                if (this.isOutsideClicked(event)) {
                    this.layoutService.layoutState.update((val) => ({ ...val, ...CLOSED_MENU_STATE }));
                }
            };

            document.addEventListener('click', this.outsideClickListener);
        }
    }

    private unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
        }
    }

    private isOutsideClicked(event: MouseEvent): boolean {
        const topbarButtonEl = document.querySelector('.topbar-start > button');
        const sidebarEl = this.el.nativeElement;

        return !(sidebarEl?.isSameNode(event.target as Node) || sidebarEl?.contains(event.target as Node) || topbarButtonEl?.isSameNode(event.target as Node) || topbarButtonEl?.contains(event.target as Node));
    }
}
