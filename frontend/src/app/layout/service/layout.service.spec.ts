import { TestBed } from '@angular/core/testing';
import { LayoutService } from './layout.service';

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
