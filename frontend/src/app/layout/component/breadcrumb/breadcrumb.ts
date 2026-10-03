import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

interface BreadcrumbItem {
    label: string;
    url: string;
}

@Component({
    selector: 'app-breadcrumb',
    imports: [RouterLink],
    templateUrl: './breadcrumb.html'
})
export class BreadcrumbComponent {
    private readonly router = inject(Router);
    readonly items = signal<BreadcrumbItem[]>([]);
    readonly previous = computed(() => this.items().at(-2) ?? null);

    constructor() {
        this.update();
        this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => this.update());
    }

    private update(): void {
        const items: BreadcrumbItem[] = [];
        let url = '';
        let route: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;

        while (route) {
            const segment = route.url.map((part) => part.path).join('/');
            if (segment) url += `/${segment}`;
            const label = route.data['breadcrumb'] as string | undefined;
            if (label) items.push({ label, url: url || '/' });
            route = route.firstChild;
        }

        this.items.set(items);
    }
}
