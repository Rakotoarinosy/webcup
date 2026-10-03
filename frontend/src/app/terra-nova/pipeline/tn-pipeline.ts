import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { difficultyLabel, difficultySeverity, PIPELINE_STATUSES, PipelineStatus, STATUS_OPTIONS, TerraRequest, waveLabel } from '../terra-nova.model';
import { XpPipe } from '../terra-nova.pipes';
import { TerraNovaStore } from '../terra-nova.store';

const COLUMN_BORDERS: Record<PipelineStatus, string> = {
    todo: 'border-t-surface-400',
    in_progress: 'border-t-sky-500',
    validation: 'border-t-amber-500',
    done: 'border-t-green-500'
};

/** Kanban des demandes : glisser-déposer ou flèches, statut persisté côté backend. */
@Component({
    selector: 'app-terra-nova-pipeline',
    imports: [CdkDropListGroup, CdkDropList, CdkDrag, CdkDragPlaceholder, ButtonModule, SkeletonModule, TagModule, TooltipModule, XpPipe],
    templateUrl: './tn-pipeline.html'
})
export class TerraNovaPipeline {
    protected readonly store = inject(TerraNovaStore);
    protected readonly difficultyLabel = difficultyLabel;
    protected readonly difficultySeverity = difficultySeverity;
    protected readonly waveLabel = waveLabel;
    protected readonly borders = COLUMN_BORDERS;

    protected readonly columns = computed(() => {
        const sorted = [...this.store.requests()].sort((a, b) => b.xp_total - a.xp_total || a.request_code.localeCompare(b.request_code));
        return STATUS_OPTIONS.map((s) => {
            const requests = sorted.filter((r) => r.status === s.value);
            return { ...s, requests, xp: requests.reduce((sum, r) => sum + r.xp_total, 0) };
        });
    });

    protected drop(event: CdkDragDrop<PipelineStatus, PipelineStatus, TerraRequest>): void {
        if (event.previousContainer !== event.container) {
            this.store.updateStatus(event.item.data.request_code, event.container.data);
        }
    }

    protected move(event: Event, request: TerraRequest, step: 1 | -1): void {
        event.stopPropagation();
        const target = PIPELINE_STATUSES[PIPELINE_STATUSES.indexOf(request.status) + step];
        if (target) this.store.updateStatus(request.request_code, target);
    }

    protected isFirst(status: PipelineStatus): boolean {
        return status === PIPELINE_STATUSES[0];
    }

    protected isLast(status: PipelineStatus): boolean {
        return status === PIPELINE_STATUSES[PIPELINE_STATUSES.length - 1];
    }
}
