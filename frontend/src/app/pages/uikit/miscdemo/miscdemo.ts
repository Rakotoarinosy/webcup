import { Component, OnDestroy, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';

const PROGRESS_TICK_MS = 2000;

@Component({
    selector: 'app-misc-demo',
    imports: [ProgressBarModule, BadgeModule, AvatarModule, TagModule, ChipModule, ButtonModule, SkeletonModule, AvatarGroupModule, OverlayBadgeModule],
    templateUrl: './miscdemo.html',
    styleUrl: './miscdemo.scss'
})
export class MiscDemo implements OnInit, OnDestroy {
    value = 0;

    interval: any;

    ngOnInit() {
        // Advance the progress bar by a random step until it reaches 100.
        this.interval = setInterval(() => {
            this.value = this.value + Math.floor(Math.random() * 10) + 1;
            if (this.value >= 100) {
                this.value = 100;
                clearInterval(this.interval);
            }
        }, PROGRESS_TICK_MS);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
