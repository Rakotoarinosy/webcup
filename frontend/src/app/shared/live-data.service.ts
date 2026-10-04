import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime } from 'rxjs';
import { RealtimeService } from './realtime.service';

@Injectable({ providedIn: 'root' })
export class LiveDataService {
    private readonly changes = new Subject<void>();
    private readonly realtime = inject(RealtimeService, { optional: true });

    constructor() {
        this.realtime?.changes$.subscribe(() => this.notifyChange());
    }

    watch(destroyRef: DestroyRef, refresh: () => void, ready: () => boolean = () => true): void {
        this.changes
            .pipe(debounceTime(50), takeUntilDestroyed(destroyRef))
            .subscribe(() => {
                if (ready()) refresh();
            });
    }

    notifyChange(): void {
        this.changes.next();
    }
}
