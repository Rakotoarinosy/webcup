import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { Institut } from './institut.model';
import { InstitutService } from './institut.service';

/** Fournit le nom réel à afficher dans le fil d’Ariane d’un institut. */
export const institutBreadcrumbResolver: ResolveFn<Institut> = (route) => {
    const api = inject(InstitutService);
    const id = route.paramMap.get('id') ?? '';
    return inject(AuthService).hasRole('citizen')
        ? api.citizenDashboard(id).pipe(map((dashboard) => dashboard.institut))
        : api.get(id);
};
