import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { environment } from '@/environments/environment';
import { I18nService } from './i18n.service';

/** F27 : l'API renvoie les contenus (services, publications) dans la langue de l'interface. */
export const languageInterceptor: HttpInterceptorFn = (request, next) => {
    const api = new URL(environment.apiUrl, document.baseURI);
    const url = new URL(request.url, document.baseURI);
    if (url.origin !== api.origin || !url.pathname.startsWith(api.pathname.replace(/\/$/, '')) || request.headers.has('Accept-Language')) {
        return next(request);
    }
    return next(request.clone({ setHeaders: { 'Accept-Language': inject(I18nService).language() } }));
};
