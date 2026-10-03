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


describe('LayoutService theme transitions', () => {
    it('still applies the theme when the browser skips a replaced transition', async () => {
        const start = spyOn(document, 'startViewTransition').and.callFake((callback) => {
            if (typeof callback === 'function') void callback();
            else if (callback?.update) void callback.update();
            return { ready: Promise.reject(new DOMException('Transition replaced', 'AbortError')), finished: Promise.resolve(), updateCallbackDone: Promise.resolve(), skipTransition: () => {} } as ViewTransition;
        });
        TestBed.configureTestingModule({});
        const service = TestBed.inject(LayoutService);
        TestBed.tick();
        const target = !service.layoutConfig().darkTheme;
        service.layoutConfig.update((config) => ({ ...config, darkTheme: target }));
        TestBed.tick();
        await Promise.resolve();
        expect(start).toHaveBeenCalled();
        expect(document.documentElement.classList.contains('app-dark')).toBe(target);
        document.documentElement.classList.remove('app-dark');
    });
});

