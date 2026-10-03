import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { Role } from './auth.model';
import { AuthService } from './auth.service';

/** Pages de l'application : connexion obligatoire (la session est restaurée après un refresh). */
export const authGuard: CanActivateFn = (_route, state) => {
    const router = inject(Router);

    return inject(AuthService)
        .restoreSession()
        .pipe(map((authenticated) => authenticated || router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } })));
};

/** Page de connexion : inutile si l'utilisateur est déjà connecté. */
export const guestGuard: CanActivateFn = () => {
    const router = inject(Router);

    return inject(AuthService)
        .restoreSession()
        .pipe(map((authenticated) => (authenticated ? router.createUrlTree(['/home/dashboard']) : true)));
};

/**
 * Complément du contrôle côté API : empêche aussi l'accès direct à une URL dont le rôle
 * n'est pas autorisé. Les rôles permis sont déclarés sur la route via `data.roles`.
 */
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
    const router = inject(Router);
    const auth = inject(AuthService);
    const allowedRoles = (route.data['roles'] as Role[] | undefined) ?? [];

    return auth.restoreSession().pipe(
        map((authenticated) => {
            if (!authenticated) {
                return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
            }

            const role = auth.user()?.role;
            return role && allowedRoles.includes(role)
                ? true
                : router.createUrlTree(['/home/municipal']);
        })
    );
};
