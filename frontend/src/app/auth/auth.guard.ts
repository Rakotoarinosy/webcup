import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';

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

export const roleGuard: CanActivateFn = (route) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.restoreSession().pipe(
        switchMap((authenticated) => (authenticated ? auth.me() : of(null))),
        map((user) => (user && (route.data['roles'] as string[]).includes(user.role) ? true : router.createUrlTree(['/home/requests']))),
        catchError(() => of(router.createUrlTree(['/auth/login'])))
    );
};
