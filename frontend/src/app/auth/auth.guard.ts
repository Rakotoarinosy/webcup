import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { Role } from './auth.model';
import { AuthService } from './auth.service';

/** Runs for every protected child navigation, including navigation within the shell. */
export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.validateSession().pipe(
        map((user) => {
            if (!user) {
                return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
            }
            // Lazy children keep the restrictions of their parent, even after a role change.
            let current: ActivatedRouteSnapshot | null = route;
            while (current) {
                const roles = current.data['roles'] as Role[] | undefined;
                if (roles && !roles.includes(user.role)) return router.parseUrl(auth.homeUrl());
                current = current.parent;
            }
            return true;
        })
    );
};

export const roleGuard = authGuard;

/** Public pages still validate and display an existing session. */
export const publicSessionGuard: CanActivateFn = () =>
    inject(AuthService)
        .validateSession()
        .pipe(map(() => true));

export const guestGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.validateSession().pipe(map((user) => (user ? router.parseUrl(auth.homeUrl()) : true)));
};

/** La page d'accueil publique n'est jamais affichée à une session déjà ouverte. */
export const landingGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.validateSession().pipe(map((user) => (user ? router.parseUrl('/home') : true)));
};
