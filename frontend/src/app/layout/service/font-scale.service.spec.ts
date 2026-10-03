import { TestBed } from '@angular/core/testing';
import { FONT_SCALE_STORAGE_KEY, FONT_SCALE_STEPS, FontScaleService } from './font-scale.service';

describe('Font size preference', () => {
    let previous: string | null;
    beforeEach(() => {
        previous = localStorage.getItem(FONT_SCALE_STORAGE_KEY);
        localStorage.removeItem(FONT_SCALE_STORAGE_KEY);
    });
    afterEach(() => {
        if (previous === null) localStorage.removeItem(FONT_SCALE_STORAGE_KEY);
        else localStorage.setItem(FONT_SCALE_STORAGE_KEY, previous);
        document.documentElement.style.removeProperty('--font-scale');
        delete document.documentElement.dataset['fontScale'];
    });
    it('enlarges to 200 percent, applies and saves the choice, and respects both limits', () => {
        const service = TestBed.inject(FontScaleService);
        for (const scale of FONT_SCALE_STEPS) {
            expect(service.scale()).toBe(scale);
            if (scale !== 2) service.increase();
        }
        service.increase();
        TestBed.tick();
        expect(service.canIncrease()).toBeFalse();
        expect(document.documentElement.style.getPropertyValue('--font-scale')).toBe('2');
        expect(localStorage.getItem(FONT_SCALE_STORAGE_KEY)).toBe('2');
        for (let i = 0; i < 10; i++) service.decrease();
        expect(service.scale()).toBe(1);
        expect(service.canDecrease()).toBeFalse();
    });
    it('restores a valid preference and resets it to the original size', () => {
        localStorage.setItem(FONT_SCALE_STORAGE_KEY, '1.5');
        const service = TestBed.inject(FontScaleService);
        expect(service.scale()).toBe(1.5);
        service.reset();
        TestBed.tick();
        expect(service.scale()).toBe(1);
        expect(localStorage.getItem(FONT_SCALE_STORAGE_KEY)).toBe('1');
    });
    for (const stored of ['invalid', '1.9', '0', 'Infinity']) {
        it(`ignores an unsupported preference (${stored})`, () => {
            localStorage.setItem(FONT_SCALE_STORAGE_KEY, stored);
            expect(TestBed.inject(FontScaleService).scale()).toBe(1);
        });
    }
    it('works for the session when browser storage is blocked', () => {
        const read = spyOn(Storage.prototype, 'getItem').and.throwError('Storage blocked');
        const write = spyOn(Storage.prototype, 'setItem').and.throwError('Storage blocked');
        try {
            const service = TestBed.inject(FontScaleService);
            service.increase();
            expect(() => TestBed.tick()).not.toThrow();
            expect(service.scale()).toBe(1.15);
            expect(document.documentElement.style.getPropertyValue('--font-scale')).toBe('1.15');
        } finally {
            read.and.callThrough();
            write.and.callThrough();
        }
    });
});
