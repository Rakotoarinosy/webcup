import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, filter, fromEvent, merge, timer } from 'rxjs';

export const LIVE_REFRESH_MS = 30_000;
export const DATA_CHANGE_KEY = 'kotrana-data-change';

@Injectable({ providedIn: 'root' })
export class LiveDataService {
    private readonly changes = new Subject<void>();

    watch(destroyRef: DestroyRef, refresh: () => void, ready: () => boolean = () => true): void {
        merge(timer(LIVE_REFRESH_MS, LIVE_REFRESH_MS), this.changes, fromEvent(window, 'focus'), fromEvent(document, 'visibilitychange'), fromEvent<StorageEvent>(window, 'storage').pipe(filter((event) => event.key === DATA_CHANGE_KEY)))
            .pipe(
                filter(() => !document.hidden),
                debounceTime(200),
                takeUntilDestroyed(destroyRef)
            )
            .subscribe(() => {
                if (ready()) refresh();
            });
    }

    notifyChange(): void {
        this.changes.next();
        try {
            // Un signal sans donnees personnelles permet aux autres onglets de se rafraichir.
            localStorage.setItem(DATA_CHANGE_KEY, `${Date.now()}-${Math.random()}`);
        } catch {
            /* Le rafraichissement local reste disponible sans stockage. */
        }
    }
}
