import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { CreateUserIn, Role, UpdateAccountIn, UpdateUserIn, User } from './user.model';

/** Client HTTP du domaine `user` : /api/v1/users. */
@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly http = inject(HttpClient);

    private readonly baseUrl = `${environment.apiUrl}/users`;

    list(search?: string): Observable<User[]> {
        let params = new HttpParams();
        if (search?.trim()) params = params.set('search', search.trim());
        return this.http.get<User[]>(this.baseUrl, { params });
    }

    get(id: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${id}`);
    }

    update(id: string, payload: UpdateUserIn): Observable<User> {
        return this.http.patch<User>(`${this.baseUrl}/${id}`, payload);
    }

    /** Tous les comptes, filtrables par rôle et par nom / email (admin). */
    listAccounts(role?: Role, search?: string): Observable<User[]> {
        let params = new HttpParams();
        if (role) params = params.set('role', role);
        if (search?.trim()) params = params.set('search', search.trim());
        return this.http.get<User[]>(`${this.baseUrl}/manage`, { params });
    }

    /** Modification complète d'un compte par l'admin : rôle, activation, mot de passe. */
    updateAccount(id: string, payload: UpdateAccountIn): Observable<User> {
        return this.http.patch<User>(`${this.baseUrl}/manage/${id}`, payload);
    }

    /** Création d'un compte avec un rôle (admin). */
    createAccount(payload: CreateUserIn): Observable<User> {
        return this.http.post<User>(this.baseUrl, payload);
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
