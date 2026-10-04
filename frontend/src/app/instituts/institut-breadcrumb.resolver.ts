import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Institut } from './institut.model';
import { InstitutService } from './institut.service';

/** Fournit le nom réel à afficher dans le fil d’Ariane d’un institut. */
export const institutBreadcrumbResolver: ResolveFn<Institut> = (route) =>
    inject(InstitutService).get(route.paramMap.get('id') ?? '');
