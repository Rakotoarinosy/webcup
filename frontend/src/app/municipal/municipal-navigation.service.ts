import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class MunicipalNavigation {
    private readonly router = inject(Router);
    path(section = ''): string {
        const base = this.router.url.startsWith('/home/') ? '/home/municipal' : '/municipal';
        return section ? `${base}/${section}` : base;
    }
}
