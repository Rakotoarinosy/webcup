import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { filter } from 'rxjs/operators';

import { LayoutService } from '@/app/layout/service/layout.service';

type LayoutStatePatch = Partial<ReturnType<LayoutService['layoutState']>>;

@Component({
    selector: '[app-menuitem]',
    imports: [CommonModule, RouterModule, RippleModule],
    templateUrl: './app.menuitem.html',
    host: {
        '[class.active-menuitem]': 'isActive()',
        '[class.layout-root-menuitem]': 'root()',
        '[class.institution-menuitem]': 'isDropdownOnly()'
    },
    styleUrl: './app.menuitem.scss'
})
export class AppMenuitem {
    layoutService = inject(LayoutService);

    router = inject(Router);

    item = input<any>(null);

    root = input<boolean>(false);

    parentPath = input<string | null>(null);

    // Enables the submenu enter animation only after the first render.
    initialized = signal<boolean>(false);

    /** Rend l'URL courante réactive pour garder les parents ouverts après navigation/rechargement. */
    private readonly navigationVersion = signal(0);

    isVisible = computed(() => this.item()?.visible !== false);

    hasChildren = computed(() => this.item()?.items && this.item()?.items.length > 0);

    hasRouterLink = computed(() => !!this.item()?.routerLink);

    isDropdownOnly = computed(() => !!this.item()?.dropdownOnly);

    shouldRenderChildren = computed(() => {
        if (!this.hasChildren()) {
            return false;
        }

        return this.isDropdownOnly() ? this.isActive() : this.root() || this.isActive();
    });

    fullPath = computed(() => {
        const itemPath = this.item()?.path;
        if (!itemPath) return this.parentPath();
        const parent = this.parentPath();
        if (parent && !itemPath.startsWith(parent)) {
            return parent + itemPath;
        }
        return itemPath;
    });

    isActive = computed(() => {
        this.navigationVersion();
        const activePath = this.layoutService.layoutState().activePath;
        if (this.isDropdownOnly() && this.hasActiveDescendant(this.item())) {
            return true;
        }
        if (this.item()?.path) {
            return activePath?.startsWith(this.fullPath() ?? '') ?? false;
        }
        return false;
    });

    constructor() {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.navigationVersion.update((version) => version + 1);
            if (this.item()?.routerLink) {
                this.updateActiveStateFromRoute();
            }
        });
    }

    ngOnInit() {
        if (this.item()?.routerLink) {
            this.updateActiveStateFromRoute();
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.initialized.set(true);
        });
    }

    updateActiveStateFromRoute() {
        const item = this.item();
        if (!item?.routerLink) return;

        const isRouteActive = this.router.isActive(item.routerLink[0], {
            paths: 'exact',
            queryParams: 'ignored',
            matrixParams: 'ignored',
            fragment: 'ignored'
        });

        if (isRouteActive) {
            const parentPath = this.parentPath();
            if (parentPath) {
                this.patchLayoutState({ activePath: parentPath });
            }
        }
    }

    itemClick(event: Event) {
        const item = this.item();

        if (item?.disabled) {
            event.preventDefault();
            return;
        }

        if (item?.command) {
            item.command({ originalEvent: event, item: item });
        }

        if (this.hasChildren()) {
            if (this.isDropdownOnly()) {
                this.toggleSubmenu();
            } else {
                this.patchLayoutState({ activePath: this.fullPath(), menuHoverActive: true });
            }
        } else {
            this.closeMenus();
        }
    }

    /** Les parents institutionnels sont des boutons de divulgation, y compris au clavier. */
    onParentKeydown(event: KeyboardEvent): void {
        if (!this.isDropdownOnly() || (event.key !== 'Enter' && event.key !== ' ')) return;
        event.preventDefault();
        this.itemClick(event);
    }

    private toggleSubmenu() {
        if (this.isActive()) {
            this.patchLayoutState({ activePath: this.parentPath() });
        } else {
            this.patchLayoutState({ activePath: this.fullPath(), menuHoverActive: true });
        }
    }

    private hasActiveDescendant(item: any): boolean {
        if (!item?.items?.length) return false;
        const currentUrl = this.router.url.split('?')[0].split('#')[0];
        return item.items.some((child: any) => {
            const link = Array.isArray(child.routerLink)
                ? child.routerLink.filter((part: unknown) => typeof part === 'string').join('/')
                : child.routerLink;
            if (typeof link === 'string' && (currentUrl === link || currentUrl.startsWith(`${link}/`))) {
                return true;
            }
            return this.hasActiveDescendant(child);
        });
    }

    private closeMenus() {
        this.patchLayoutState({
            overlayMenuActive: false,
            mobileMenuActive: false,
            menuHoverActive: false
        });
    }

    private patchLayoutState(patch: LayoutStatePatch) {
        this.layoutService.layoutState.update((val) => ({ ...val, ...patch }));
    }
}
