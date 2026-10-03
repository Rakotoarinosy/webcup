import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '@/environments/environment';
import { LiveDataService } from './live-data.service';

export const liveDataInterceptor: HttpInterceptorFn = (request, next) => {
    const api = new URL(environment.apiUrl, document.baseURI);
    const url = new URL(request.url, document.baseURI);
    const base = api.pathname.replace(/\/$/, '');
    const mutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method);
    if (!mutation || url.origin !== api.origin || !url.pathname.startsWith(`${base}/`) || url.pathname.startsWith(`${base}/auth/`)) return next(request);
    const live = inject(LiveDataService);
    return next(request).pipe(
        tap((event) => {
            if (event instanceof HttpResponse) live.notifyChange();
        })
    );
};
