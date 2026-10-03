import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TerraNovaRequestDetail } from './request-detail/tn-request-detail';
import { AgoPipe } from './terra-nova.pipes';
import { TerraNovaStore } from './terra-nova.store';

/**
 * Espace « Terra Nova » des services municipaux : suivi des demandes publiées par l'API officielle.
 * Fournit le store partagé par les pages enfants (dashboard, demandes, notifications, pipeline).
 */
@Component({
    selector: 'app-terra-nova',
    imports: [RouterOutlet, ButtonModule, ToastModule, TooltipModule, AgoPipe, TerraNovaRequestDetail],
    templateUrl: './terra-nova.html',
    providers: [TerraNovaStore, MessageService]
})
export class TerraNova {
    protected readonly store = inject(TerraNovaStore);

    /** ok | error | pending */
    protected readonly apiState = computed(() => {
        const s = this.store.session();
        if (!s?.last_sync_attempt_at) return 'pending';
        return s.api_ok ? 'ok' : 'error';
    });
}
