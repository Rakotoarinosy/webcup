import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

import { environment } from '@/environments/environment';
import { AuthService } from './auth.service';

const PUBLIC_AUTH_PATHS = ['login', 'refresh', 'logout', 'register'];
function withToken(request: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
    return token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request;
}

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const api = new URL(environment.apiUrl, document.baseURI);
    const url = new URL(request.url, document.baseURI);
    const basePath = api.pathname.replace(/\/$/, '');
    if (url.origin !== api.origin || !(url.pathname === basePath || url.pathname.startsWith(`${basePath}/`)) || PUBLIC_AUTH_PATHS.some((path) => url.pathname === `${basePath}/auth/${path}`)) return next(request);

    const auth = inject(AuthService);
    const router = inject(Router);
    const sentToken = auth.accessToken();
    const failSession = (error: unknown) => {
        auth.clearSession();
        router.navigate(['/auth/login'], { queryParams: { returnUrl: router.url } });
        return throwError(() => error);
    };
    const retry = () =>
        next(withToken(request, auth.accessToken())).pipe(
            catchError((error: unknown) => {
                return error instanceof HttpErrorResponse && error.status === 401 ? failSession(error) : throwError(() => error);
            })
        );
    return next(withToken(request, sentToken)).pipe(
        catchError((error: unknown) => {
            if (!(error instanceof HttpErrorResponse) || error.status !== 401) return throwError(() => error);
            // A late 401 may arrive after another request already refreshed the old token.
            if (auth.accessToken() && auth.accessToken() !== sentToken) return retry();
            return auth.refresh().pipe(
                catchError(() => failSession(error)),
                switchMap(retry)
            );
        })
    );
};
