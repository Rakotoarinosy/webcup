import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Injectable, NgZone, inject } from '@angular/core';

import { environment } from '@/environments/environment';

const GIS_SRC = 'https://accounts.google.com/gsi/client';

interface GoogleAccountsId {
    initialize(config: { client_id: string; callback: (response: { credential: string }) => void }): void;
    renderButton(parent: HTMLElement, options: Record<string, unknown>): void;
}

declare global {
    interface Window {
        google?: { accounts: { id: GoogleAccountsId } };
    }
}

/** Charge Google Identity Services à la demande et affiche son bouton officiel. */
@Injectable({ providedIn: 'root' })
export class GoogleIdentityService {
    private readonly http = inject(HttpClient);
    private readonly zone = inject(NgZone);
    private script: Promise<GoogleAccountsId> | null = null;


    async renderButton(host: HTMLElement, onCredential: (credential: string) => void): Promise<void> {
        const config = await firstValueFrom(this.http.get<{ google_client_id: string | null }>(environment.apiUrl + '/auth/config'));
        const clientId = config.google_client_id;
        if (!clientId) throw new Error('GOOGLE_UNAVAILABLE');
        const gid = await this.load();
        gid.initialize({
            client_id: clientId,
            callback: (response) => this.zone.run(() => onCredential(response.credential))
        });
        gid.renderButton(host, { type: 'standard', theme: 'outline', size: 'large', text: 'continue_with', locale: 'fr', width: host.clientWidth });
    }

    private load(): Promise<GoogleAccountsId> {
        this.script ??= new Promise<GoogleAccountsId>((resolve, reject) => {
            const ready = window.google?.accounts.id;
            if (ready) {
                resolve(ready);
                return;
            }
            const tag = document.createElement('script');
            tag.src = GIS_SRC;
            tag.async = true;
            tag.onload = () => {
                const gid = window.google?.accounts.id;
                if (gid) resolve(gid);
                else reject(new Error('GIS_UNAVAILABLE'));
            };
            tag.onerror = () => {
                this.script = null; // permet un nouvel essai
                reject(new Error('GIS_UNAVAILABLE'));
            };
            document.head.appendChild(tag);
        });

        return this.script;
    }
}