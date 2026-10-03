import { DestroyRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LiveDataService } from './live-data.service';

describe('LiveDataService', () => {
    let live: LiveDataService;
    let destroy: () => void;
    let destroyRef: DestroyRef;
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
    });
    afterEach(() => {
        destroy?.();
        jasmine.clock().uninstall();
    });
    it('does not refresh without a realtime signal', () => {
        const refresh = jasmine.createSpy('refresh');
        live.watch(destroyRef, refresh);
        jasmine.clock().tick(60_000);
        expect(refresh).not.toHaveBeenCalled();
        destroy();
        live.notifyChange();
        jasmine.clock().tick(50);
        expect(refresh).not.toHaveBeenCalled();
    });
    it('batches changes and waits until the screen is ready', () => {
        const refresh = jasmine.createSpy('refresh');
        let ready = false;
        live.watch(destroyRef, refresh, () => ready);
        live.notifyChange();
        jasmine.clock().tick(50);
        expect(refresh).not.toHaveBeenCalled();
        ready = true;
        live.notifyChange();
        live.notifyChange();
        jasmine.clock().tick(50);
        expect(refresh).toHaveBeenCalledTimes(1);
        destroy();
    });
    it('refreshes only when the realtime bridge signals a change', () => {
        const refresh = jasmine.createSpy('refresh');
        live.watch(destroyRef, refresh);
        live.notifyChange();
        jasmine.clock().tick(50);
        expect(refresh).toHaveBeenCalledTimes(1);
        destroy();
    });
});
