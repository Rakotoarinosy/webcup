import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, provideRouter } from '@angular/router';

import { BreadcrumbComponent } from '../breadcrumb/breadcrumb';
import { AppSidebar } from '../sidebar/app.sidebar';
import { AppTopbar } from '../topbar/app.topbar';
import { AppLayout } from './app.layout';
import { AlertBanner } from '@/app/alerts/alert-banner';

describe('AppLayout accessibility', () => {
    let fixture: ComponentFixture<AppLayout>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [AppLayout], providers: [provideRouter([])] })
            .overrideComponent(AppLayout, {
                remove: { imports: [AppTopbar, AppSidebar, BreadcrumbComponent, AlertBanner] },
                add: { imports: [CommonModule, RouterModule], schemas: [CUSTOM_ELEMENTS_SCHEMA] }
            })
            .compileComponents();
        fixture = TestBed.createComponent(AppLayout);
        fixture.detectChanges();
    });

    it('starts with a skip link that targets the main landmark', () => {
        const root = fixture.nativeElement as HTMLElement;
        const firstFocusable = root.querySelector('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLAnchorElement;
        const main = root.querySelector('main') as HTMLElement;

        expect(firstFocusable.classList).toContain('skip-link');
        expect(firstFocusable.textContent?.trim()).toBe('Aller au contenu principal');
        expect(firstFocusable.getAttribute('href')).toBe('#main-content');
        expect(main.id).toBe('main-content');
        expect(main.getAttribute('tabindex')).toBe('-1');
    });

    it('moves focus to the main content without navigating', () => {
        const skip = fixture.nativeElement.querySelector('.skip-link') as HTMLAnchorElement;
        const event = new MouseEvent('click', { cancelable: true });
        skip.dispatchEvent(event);

        expect(event.defaultPrevented).toBeTrue();
        expect(document.activeElement?.id).toBe('main-content');
    });
});
