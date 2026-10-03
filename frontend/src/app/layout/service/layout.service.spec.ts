import { TestBed } from '@angular/core/testing';
import { HIGH_CONTRAST_STORAGE_KEY, LayoutService } from './layout.service';

describe('LayoutService high-contrast preference', () => {
    beforeEach(() => {
        localStorage.removeItem(HIGH_CONTRAST_STORAGE_KEY);
        document.documentElement.classList.remove('app-high-contrast');
        TestBed.configureTestingModule({});
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        localStorage.removeItem(HIGH_CONTRAST_STORAGE_KEY);
        document.documentElement.classList.remove('app-high-contrast');
    });

    it('restores a saved preference and applies the high-contrast style state', () => {
        localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, 'true');

        const layout = TestBed.inject(LayoutService);
        TestBed.flushEffects();

        expect(layout.highContrast()).toBeTrue();
        expect(document.documentElement.classList.contains('app-high-contrast')).toBeTrue();
    });

    it('persists changes and updates the global style state', () => {
        const layout = TestBed.inject(LayoutService);

        layout.setHighContrast(true);
        TestBed.flushEffects();

        expect(localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY)).toBe('true');
        expect(document.documentElement.classList.contains('app-high-contrast')).toBeTrue();

        layout.setHighContrast(false);
        TestBed.flushEffects();

        expect(localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY)).toBe('false');
        expect(document.documentElement.classList.contains('app-high-contrast')).toBeFalse();
    });
});
