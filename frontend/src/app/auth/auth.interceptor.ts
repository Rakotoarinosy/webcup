import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

import { environment } from '@/environments/environment';
import { AUTH_URL, AuthService } from './auth.service';

// Appels qui gèrent eux-mêmes leur authentification (identifiants ou cookie de refresh).
const PUBLIC_AUTH_PATHS = ['login', 'refresh', 'logout', 'register'].map((path) => `${AUTH_URL}/${path}`);

function withToken(request: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
    return token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request;
}

/**
 * Ajoute le token aux appels de l'API. Sur un 401 (token expiré), renouvelle le token une fois
 * puis rejoue la requête ; si le renouvellement échoue, renvoie vers la page de connexion.
 */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
    if (!request.url.startsWith(environment.apiUrl) || PUBLIC_AUTH_PATHS.some((path) => request.url.startsWith(path))) {
        return next(request);
    }

    const auth = inject(AuthService);
    const router = inject(Router);

    return next(withToken(request, auth.accessToken())).pipe(
        catchError((error: unknown) => {
            if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
                return throwError(() => error);
            }

            return auth.refresh().pipe(
                catchError(() => {
                    router.navigate(['/auth/login'], { queryParams: { returnUrl: router.url } });
                    return throwError(() => error);
                }),
                switchMap(() => next(withToken(request, auth.accessToken())))
            );
        })
    );
};
