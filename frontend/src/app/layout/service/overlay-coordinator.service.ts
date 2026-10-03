import { Injectable, signal } from '@angular/core';

export type TopbarOverlay = 'config' | 'notifications' | 'account';

@Injectable({ providedIn: 'root' })
export class OverlayCoordinatorService {
    readonly active = signal<TopbarOverlay | null>(null);

    open(overlay: TopbarOverlay): void { this.active.set(overlay); }
    close(overlay?: TopbarOverlay): void {
        if (!overlay || this.active() === overlay) this.active.set(null);
    }
}
