import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit, afterNextRender, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Observable, finalize } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { apiErrorMessage } from '@/app/users/user.service';
import { ALERT_AUDIENCES, ALERT_ISSUERS, ALERT_LEVELS, AlertAudience, AlertIn, AlertLevel, CityAlertAdmin, LEVEL_DISPLAY } from './alert.model';
import { AlertService } from './alert.service';

interface AlertForm {
    title: string;
    message: string;
    instructions: string;
    level: AlertLevel;
    audience: AlertAudience;
    zone: string;
    issuer: string;
    startsAt: string; // datetime-local, vide = immédiatement
    endsAt: string; // datetime-local, vide = jusqu'à ce qu'elle soit terminée
    notifyByEmail: boolean;
}

type FormField = 'title' | 'message' | 'zone' | 'issuer' | 'endsAt';

const EMPTY_FORM: AlertForm = {
    title: '',
    message: '',
    instructions: '',
    level: 'Information',
    audience: 'Tous les habitants',
    zone: '',
    issuer: ALERT_ISSUERS[0],
    startsAt: '',
    endsAt: '',
    notifyByEmail: false
};

/** « 2026-10-04T14:30 » (heure locale) pour un champ datetime-local. */
export function toLocalInput(iso: string | null): string {
    if (!iso) return '';
    const date = new Date(iso);
    const pad = (value: number) => String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function toIso(local: string): string | null {
    return local ? new Date(local).toISOString() : null;
}

/** Publication des alertes et messages officiels (admin, managers) : D18, F29, F31, F73, F30. */
@Component({
    selector: 'app-alerts-admin',
    imports: [DatePipe, FormsModule, ButtonModule],
    templateUrl: './alerts-admin.html'
})
export class AlertsAdmin implements OnInit {
    private readonly api = inject(AlertService);
    private readonly auth = inject(AuthService);
    private readonly injector = inject(Injector);

    protected readonly levels = ALERT_LEVELS;
    protected readonly audiences = ALERT_AUDIENCES;
    protected readonly issuers = ALERT_ISSUERS;
    protected readonly display = LEVEL_DISPLAY;
    protected readonly isAdmin = () => this.auth.hasRole('admin');

    protected readonly alerts = signal<CityAlertAdmin[]>([]);
    protected readonly loading = signal(false);
    protected readonly listError = signal<string | null>(null);
    protected readonly notice = signal<string | null>(null);
    protected readonly busy = signal<string | null>(null);

    protected readonly formOpen = signal(false);
    protected readonly editing = signal<CityAlertAdmin | null>(null);
    protected readonly saving = signal(false);
    protected readonly formError = signal<string | null>(null);
    protected readonly attempted = signal(false);
    protected readonly suggesting = signal(false);
    protected readonly aiMessage = signal<string | null>(null);
    protected readonly aiError = signal<string | null>(null);
    protected form: AlertForm = { ...EMPTY_FORM };

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading.set(true);
        this.api
            .list()
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (alerts) => {
                    this.alerts.set(alerts);
                    this.listError.set(null);
                },
                error: (error: unknown) => this.listError.set(apiErrorMessage(error))
            });
    }

    protected openCreate(): void {
        this.editing.set(null);
        this.form = { ...EMPTY_FORM };
        this.openForm();
    }

    protected openEdit(alert: CityAlertAdmin): void {
        this.editing.set(alert);
        this.form = {
            title: alert.title,
            message: alert.message,
            instructions: alert.instructions,
            level: alert.level,
            audience: alert.audience,
            zone: alert.zone ?? '',
            issuer: alert.issuer,
            startsAt: toLocalInput(alert.starts_at),
            endsAt: toLocalInput(alert.ends_at),
            notifyByEmail: false
        };
        this.openForm();
    }

    protected closeForm(): void {
        this.formOpen.set(false);
        this.focusAfterRender('#alerts-admin-title');
    }

    /** Erreur du champ, affichée seulement après une tentative d'envoi. */
    protected fieldError(field: FormField): string | null {
        if (!this.attempted()) return null;
        const form = this.form;
        switch (field) {
            case 'title':
                return form.title.trim().length < 3 ? 'Le titre doit contenir au moins 3 caractères.' : null;
            case 'message':
                return form.message.trim().length < 3 ? 'Le message doit contenir au moins 3 caractères.' : null;
            case 'issuer':
                return form.issuer.trim().length < 2 ? 'Indiquez qui émet ce message.' : null;
            case 'zone':
                return form.audience === 'Habitants du quartier concerné' && !form.zone.trim() ? 'Indiquez le quartier concerné.' : null;
            case 'endsAt':
                return form.endsAt && new Date(form.endsAt) <= (form.startsAt ? new Date(form.startsAt) : new Date())
                    ? 'La fin d’affichage doit être postérieure au début.'
                    : null;
        }
    }

    protected describedBy(field: FormField, help: string): string {
        return this.fieldError(field) ? `${help} alert-${field}-error` : help;
    }

    protected suggest(): void {
        this.aiMessage.set(null);
        this.aiError.set(null);
        if (this.form.title.trim().length < 3 || this.form.message.trim().length < 3) {
            this.aiError.set('Renseignez d’abord le titre et le message : l’IA s’en sert pour proposer des recommandations.');
            return;
        }
        this.suggesting.set(true);
        this.api
            .recommend({
                title: this.form.title.trim(),
                message: this.form.message.trim(),
                level: this.form.level,
                audience: this.form.audience === 'Tous les habitants' ? 'Personnes vulnérables' : this.form.audience,
                zone: this.form.zone.trim() || null
            })
            .pipe(finalize(() => this.suggesting.set(false)))
            .subscribe({
                next: (text) => {
                    const current = this.form.instructions.trim();
                    this.form = { ...this.form, instructions: current ? `${current}\n${text}` : text };
                    this.aiMessage.set('Recommandations proposées par l’IA ajoutées aux consignes. Relisez-les et modifiez-les avant de publier.');
                    this.focusAfterRender('#alert-instructions');
                },
                error: (error: unknown) =>
                    this.aiError.set(
                        error instanceof HttpErrorResponse && error.status === 503
                            ? 'L’assistant IA est indisponible pour le moment. Rédigez les consignes vous-même : la publication reste possible.'
                            : apiErrorMessage(error)
                    )
            });
    }

    protected save(): void {
        this.attempted.set(true);
        const fields: FormField[] = ['title', 'message', 'zone', 'issuer', 'endsAt'];
        if (fields.some((field) => this.fieldError(field))) {
            this.formError.set('Le formulaire contient des erreurs : corrigez les champs signalés.');
            this.focusAfterRender('[aria-invalid="true"]');
            return;
        }
        this.formError.set(null);
        const payload: AlertIn = {
            title: this.form.title.trim(),
            message: this.form.message.trim(),
            instructions: this.form.instructions.trim(),
            level: this.form.level,
            audience: this.form.audience,
            zone: this.form.zone.trim() || null,
            issuer: this.form.issuer.trim(),
            starts_at: toIso(this.form.startsAt),
            ends_at: toIso(this.form.endsAt)
        };
        const editing = this.editing();
        this.saving.set(true);
        const request = editing ? this.api.update(editing.id, payload) : this.api.create({ ...payload, notify_by_email: this.form.notifyByEmail });
        request.pipe(finalize(() => this.saving.set(false))).subscribe({
            next: (saved) => {
                const emails = 'email_recipients' in saved && saved.email_recipients ? ` Un email est en cours d’envoi à ${saved.email_recipients} habitant(s).` : '';
                this.notice.set(editing ? `Alerte « ${saved.title} » modifiée.` : `Alerte « ${saved.title} » publiée : elle est visible sur toutes les pages.${emails}`);
                this.formOpen.set(false);
                this.load();
                this.focusAfterRender('#alerts-admin-notice');
            },
            error: (error: unknown) => {
                this.formError.set(apiErrorMessage(error));
                this.focusAfterRender('#alert-form-error');
            }
        });
    }

    protected end(alert: CityAlertAdmin): void {
        if (!confirm(`Terminer l’alerte « ${alert.title} » ? Elle ne sera plus affichée.`)) return;
        this.run(alert, this.api.end(alert.id), `Alerte « ${alert.title} » terminée.`);
    }

    protected remove(alert: CityAlertAdmin): void {
        if (!confirm(`Supprimer définitivement l’alerte « ${alert.title} » ? Préférez « Terminer » pour la garder dans l’historique.`)) return;
        this.run(alert, this.api.remove(alert.id), `Alerte « ${alert.title} » supprimée.`);
    }

    private run(alert: CityAlertAdmin, request: Observable<unknown>, message: string): void {
        this.busy.set(alert.id);
        request.pipe(finalize(() => this.busy.set(null))).subscribe({
            next: () => {
                this.notice.set(message);
                this.load();
            },
            error: (error: unknown) => this.notice.set(`Échec : ${apiErrorMessage(error)}`)
        });
    }

    private openForm(): void {
        this.attempted.set(false);
        this.formError.set(null);
        this.aiMessage.set(null);
        this.aiError.set(null);
        this.notice.set(null);
        this.formOpen.set(true);
        this.focusAfterRender('#alert-form-title');
    }

    private focusAfterRender(selector: string): void {
        afterNextRender(() => document.querySelector<HTMLElement>(selector)?.focus(), { injector: this.injector });
    }
}
