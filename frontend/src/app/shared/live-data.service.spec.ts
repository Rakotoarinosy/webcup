import { DestroyRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DATA_CHANGE_KEY, LIVE_REFRESH_MS, LiveDataService } from './live-data.service';

describe('LiveDataService', () => {
    let live: LiveDataService;
    let destroy: () => void;
    let destroyRef: DestroyRef;
    let hidden: jasmine.Spy;
    beforeEach(() => {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date());
        TestBed.configureTestingModule({});
        live = TestBed.inject(LiveDataService);
        destroyRef = {
            destroyed: false,
            onDestroy: (callback: () => void) => {
                destroy = callback;
                return () => {};
            }
        } as DestroyRef;
        hidden = spyOnProperty(document, 'hidden', 'get').and.returnValue(false);
        spyOn(localStorage, 'setItem');
    });
    afterEach(() => {
        destroy?.();
        jasmine.clock().uninstall();
    });
    it('refreshes periodically and stops when the screen is destroyed', () => {
        const refresh = jasmine.createSpy('refresh');
        live.watch(destroyRef, refresh);
        jasmine.clock().tick(LIVE_REFRESH_MS + 200);
        expect(refresh).toHaveBeenCalledTimes(1);
        destroy();
        jasmine.clock().tick(LIVE_REFRESH_MS * 2);
        expect(refresh).toHaveBeenCalledTimes(1);
    });
    it('batches changes and waits until the screen is ready', () => {
        const refresh = jasmine.createSpy('refresh');
        let ready = false;
        live.watch(destroyRef, refresh, () => ready);
        live.notifyChange();
        jasmine.clock().tick(200);
        expect(refresh).not.toHaveBeenCalled();
        ready = true;
        live.notifyChange();
        live.notifyChange();
        jasmine.clock().tick(200);
        expect(refresh).toHaveBeenCalledTimes(1);
        destroy();
    });
    it('ignores hidden tabs and updates on focus or a change in another tab', () => {
        const refresh = jasmine.createSpy('refresh');
        live.watch(destroyRef, refresh);
        hidden.and.returnValue(true);
        window.dispatchEvent(new Event('focus'));
        jasmine.clock().tick(200);
        expect(refresh).not.toHaveBeenCalled();
        hidden.and.returnValue(false);
        window.dispatchEvent(new Event('focus'));
        jasmine.clock().tick(200);
        window.dispatchEvent(new StorageEvent('storage', { key: 'unrelated' }));
        jasmine.clock().tick(200);
        expect(refresh).toHaveBeenCalledTimes(1);
        window.dispatchEvent(new StorageEvent('storage', { key: DATA_CHANGE_KEY }));
        jasmine.clock().tick(200);
        expect(refresh).toHaveBeenCalledTimes(2);
        destroy();
    });
});
