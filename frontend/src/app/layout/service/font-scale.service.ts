import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

export const FONT_SCALE_STORAGE_KEY = 'font-scale';
export const FONT_SCALE_STEPS = [1, 1.15, 1.3, 1.5, 2] as const;
export type FontScale = (typeof FONT_SCALE_STEPS)[number];

@Injectable({ providedIn: 'root' })
export class FontScaleService {
    private readonly document = inject(DOCUMENT);
    readonly scale = signal<FontScale>(this.readStoredScale());
    readonly canIncrease = computed(() => this.scale() < FONT_SCALE_STEPS[FONT_SCALE_STEPS.length - 1]);
    readonly canDecrease = computed(() => this.scale() > FONT_SCALE_STEPS[0]);

    constructor() {
        effect(() => {
            const scale = this.scale();
            this.document.documentElement.style.setProperty('--font-scale', String(scale));
            this.document.documentElement.dataset['fontScale'] = String(scale);
            try {
                this.document.defaultView?.localStorage.setItem(FONT_SCALE_STORAGE_KEY, String(scale));
            } catch {
                // The preference still works for this session when storage is unavailable.
            }
        });
    }

    increase(): void {
        this.move(1);
    }
    decrease(): void {
        this.move(-1);
    }
    reset(): void {
        this.scale.set(1);
    }

    private move(delta: number): void {
        const next = FONT_SCALE_STEPS[FONT_SCALE_STEPS.indexOf(this.scale()) + delta];
        if (next !== undefined) this.scale.set(next);
    }

    private readStoredScale(): FontScale {
        try {
            const stored = Number(this.document.defaultView?.localStorage.getItem(FONT_SCALE_STORAGE_KEY));
            return FONT_SCALE_STEPS.find((step) => step === stored) ?? 1;
        } catch {
            return 1;
        }
    }
}
