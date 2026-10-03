import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { difficultyLabel, difficultySeverity, TerraNotification } from '../terra-nova.model';
import { AgoPipe, XpPipe } from '../terra-nova.pipes';
import { TerraNovaStore } from '../terra-nova.store';

/** Nouvelles demandes et vagues diffusées, avec état « lu » propre à chaque utilisateur. */
@Component({
    selector: 'app-terra-nova-notifications',
    imports: [DatePipe, FormsModule, ButtonModule, SelectButtonModule, SkeletonModule, TagModule, AgoPipe, XpPipe],
    templateUrl: './tn-notifications.html'
})
export class TerraNovaNotifications {
    protected readonly store = inject(TerraNovaStore);
    protected readonly difficultyLabel = difficultyLabel;
    protected readonly difficultySeverity = difficultySeverity;

    protected readonly filter = signal<'all' | 'unread'>('all');
    protected readonly filterOptions = [
        { value: 'all', label: 'Toutes' },
        { value: 'unread', label: 'Non lues' }
    ];

    protected readonly visible = computed(() => (this.filter() === 'unread' ? this.store.notifications().filter((n) => !n.is_read) : this.store.notifications()));

    protected open(notification: TerraNotification): void {
        this.store.markRead(notification);
        if (notification.request_code) this.store.openDetail(notification.request_code);
    }
}
