import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

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
