import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
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
            const roles = route.data['roles'] as Role[] | undefined;
            return !roles || roles.includes(user.role) ? true : router.parseUrl(auth.homeUrl());
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
