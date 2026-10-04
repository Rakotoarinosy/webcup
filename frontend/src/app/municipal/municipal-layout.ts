import { AppFontSize } from '../layout/component/fontsize/app.fontsize';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AlertBanner } from '../alerts/alert-banner';

@Component({
    selector: 'app-municipal-layout',
    imports: [RouterLink, RouterLinkActive, RouterOutlet, AppFontSize, AlertBanner],
    templateUrl: './municipal-layout.html',
    styles: [
        `
            :host {
                display: block;
                min-height: 100dvh;
                background: var(--surface-ground);
            }
            header {
                padding: 1rem clamp(1rem, 4vw, 3rem);
                border-bottom: 1px solid var(--surface-border);
                background: var(--surface-card);
            }
            .header-row {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 1rem;
                max-width: 1100px;
                margin: auto;
            }
            .brand {
                font-size: 1.5rem;
                font-weight: 800;
                color: var(--p-primary-color);
            }
            nav {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                flex: 1;
            }
            a {
                border-radius: 0.5rem;
                padding: 0.65rem 0.75rem;
            }
            nav a:hover,
            nav a.active {
                background: var(--p-primary-50);
                color: var(--p-primary-700);
            }
            a:focus-visible {
                outline: 2px solid var(--p-primary-color);
                outline-offset: 3px;
            }
            .account {
                color: var(--p-primary-color);
                font-weight: 600;
                overflow-wrap: anywhere;
            }
            main {
                padding-block: 1.5rem 3rem;
            }
            .alerts-zone {
                max-width: 1100px;
                margin: 1rem auto 0;
                padding-inline: clamp(1rem, 4vw, 3rem);
            }
            @media (max-width: 600px) {
                nav {
                    order: 3;
                    flex-basis: 100%;
                }
                .account {
                    margin-left: auto;
                    max-width: 55%;
                }
            }
        `
    ]
})
export class MunicipalLayout {
    readonly auth = inject(AuthService);

    /** Lien d'évitement : focus sur le contenu sans changer d'URL (la base href ferait recharger la page). */
    skipToContent(event: Event): void {
        event.preventDefault();
        const main = document.getElementById('main-content');
        main?.focus();
        main?.scrollIntoView();
    }
}
