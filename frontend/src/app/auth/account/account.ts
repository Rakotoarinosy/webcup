import { LiveDataService } from '@/app/shared/live-data.service';
import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../auth.service';
import { apiErrorMessage } from '@/app/users/user.service';
import { AccountService, PersonalDemandesPage } from './account.service';

@Component({
    selector: 'app-account',
    imports: [DatePipe, RouterLink],
    templateUrl: './account.html'
})
export class Account implements OnInit {
    readonly auth = inject(AuthService);
    private readonly live = inject(LiveDataService);
    private readonly service = inject(AccountService);
    private readonly destroyRef = inject(DestroyRef);
    readonly result = signal<PersonalDemandesPage | null>(null);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly title = computed(() => (this.auth.hasRole('agent') ? 'Mes interventions' : this.auth.hasRole('citizen') ? 'Mes demandes' : 'Demandes de la commune'));
    readonly agentLinked = computed(() => !this.auth.hasRole('agent') || !!this.auth.user()?.agent_id);
    readonly statuses: Record<string, string | undefined> = { nouveau: 'Nouveau', accepte: 'Accepté', en_cours: 'En cours', resolu: 'Résolu', rejete: 'Rejeté' };

    ngOnInit(): void {
        this.live.watch(
            this.destroyRef,
            () => {
                this.load(this.result()?.page ?? 1);
            },
            () => !this.loading() && this.agentLinked()
        );
        if (this.agentLinked()) this.load();
    }

    load(page = 1): void {
        this.loading.set(true);
        this.error.set(null);
        this.service
            .list(page)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: (result) => this.result.set(result),
                error: (error: unknown) => this.error.set(apiErrorMessage(error))
            });
    }
}
