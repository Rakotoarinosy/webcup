import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { CreateUserIn, UpdateUserIn, User } from './user.model';

/** Client HTTP du domaine `user` : /api/v1/users. */
@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly http = inject(HttpClient);

    private readonly baseUrl = `${environment.apiUrl}/users`;

    list(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl);
    }

    get(id: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${id}`);
    }

    create(payload: CreateUserIn): Observable<User> {
        return this.http.post<User>(this.baseUrl, payload);
    }

    update(id: string, payload: UpdateUserIn): Observable<User> {
        return this.http.patch<User>(`${this.baseUrl}/${id}`, payload);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}

/**
 * Message lisible à partir d'une erreur de l'API.
 * Erreurs métier : { error, detail: string } — validation (422) : { detail: [{ msg, loc }] }.
 */
export function apiErrorMessage(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
        return 'Erreur inattendue';
    }

    if (error.status === 0) {
        return 'API injoignable : le backend est-il lancé (make dev dans backend/) ?';
    }

    const detail = error.error?.detail;

    if (typeof detail === 'string') {
        return detail;
    }

    if (Array.isArray(detail)) {
        return detail.map((item) => `${item.loc?.at(-1) ?? ''} : ${item.msg}`).join('\n');
    }

    return `Erreur ${error.status}`;
}
