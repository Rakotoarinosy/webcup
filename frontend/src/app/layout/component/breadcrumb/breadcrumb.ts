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
            // `data` est hérité par les routes enfants : on privilégie donc le
            // libellé déclaré sur la route courante (ex. « Description »), puis
            // le nom dynamique résolu pour le niveau institut.
            const configuredLabel = route.routeConfig?.data?.['breadcrumb'] as string | undefined;
            const resolvedInstitut = route.data['institutBreadcrumb'] as { name?: string } | undefined;
            const label = configuredLabel ?? resolvedInstitut?.name ?? (route.data['breadcrumb'] as string | undefined);
            const currentUrl = url || '/';
            // Les routes enfant vides héritent des données de leur parent dans Angular.
            // Elles ne doivent pas dupliquer le même niveau dans le fil d'Ariane.
            if (label && !items.some((item) => item.label === label && item.url === currentUrl)) {
                items.push({ label, url: currentUrl });
            }
            route = route.firstChild;
        }

        this.items.set(items);
    }
}
