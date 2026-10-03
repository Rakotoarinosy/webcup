import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { difficultyLabel, difficultySeverity, PipelineStatus, STATUS_OPTIONS, waveLabel } from '../terra-nova.model';
import { ArrivalPipe, XpPipe } from '../terra-nova.pipes';
import { TerraNovaStore } from '../terra-nova.store';

/** Détail d'une demande Terra Nova (dialogue partagé par toutes les pages de la section). */
@Component({
    selector: 'app-terra-nova-request-detail',
    imports: [FormsModule, DialogModule, SelectModule, TagModule, ArrivalPipe, XpPipe],
    templateUrl: './tn-request-detail.html'
})
export class TerraNovaRequestDetail {
    protected readonly store = inject(TerraNovaStore);
    protected readonly statusOptions = STATUS_OPTIONS;
    protected readonly difficultyLabel = difficultyLabel;
    protected readonly difficultySeverity = difficultySeverity;
    protected readonly waveLabel = waveLabel;

    protected onVisibleChange(visible: boolean): void {
        if (!visible) this.store.closeDetail();
    }

    protected setStatus(code: string, status: PipelineStatus): void {
        this.store.updateStatus(code, status);
    }
}
