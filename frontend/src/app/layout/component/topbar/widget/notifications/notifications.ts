import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, effect, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { catchError, EMPTY } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { NotificationService, PlatformNotification } from '@/app/notifications/notification.service';
import { PublicationReadService } from '@/app/municipal/publication-read.service';
import { OverlayCoordinatorService } from '@/app/layout/service/overlay-coordinator.service';

type PublicationNotification = ReturnType<PublicationReadService['notificationItems']>[number];
type DisplayNotification = (PlatformNotification | PublicationNotification) & { typeLabel: string };

@Component({
    selector: 'app-notifications',
    imports: [CommonModule, DatePipe, BadgeModule],
    templateUrl: './notifications.html',
    styleUrl: './notifications.scss'
})
export class Notifications {
    private readonly auth = inject(AuthService);
    private readonly api = inject(NotificationService);
    private readonly publications = inject(PublicationReadService);
    private readonly router = inject(Router);
    private readonly overlays = inject(OverlayCoordinatorService);

    readonly showPanel = signal(false);
    readonly notificationMenu = viewChild<ElementRef<HTMLElement>>('notificationMenu');
    readonly canView = this.auth.isAuthenticated;
    readonly unreadCount = computed(() => this.api.unreadCount() + this.publications.unreadCount());
    readonly allNotifications = computed<DisplayNotification[]>(() => [
        ...this.api.recent().map((notification) => ({ ...notification, typeLabel: notification.kind === 'alert' ? 'Alerte' : 'Demande' })),
        ...this.publications.notificationItems().map((notification) => ({ ...notification, typeLabel: 'Publication' }))
    ].sort((left, right) => Date.parse(right.created_at) - Date.parse(left.created_at)).slice(0, 12));
    readonly error = this.api.error;

    constructor() {
        effect(() => this.showPanel.set(this.overlays.active() === 'notifications'));
    }

    togglePanel(event: Event): void {
        event.stopPropagation();
        this.overlays.active() === 'notifications' ? this.overlays.close('notifications') : this.overlays.open('notifications');
    }

    @HostListener('document:pointerdown', ['$event'])
    closeOnOutsidePointerDown(event: PointerEvent): void {
        if (this.showPanel() && !this.notificationMenu()?.nativeElement.contains(event.target as Node)) this.overlays.close('notifications');
    }

    open(notification: PlatformNotification | PublicationNotification): void {
        this.overlays.close('notifications');
        if ('publicationId' in notification) {
            if (!notification.is_read) this.publications.markRead(notification.publicationId);
            void this.router.navigate(['/home/municipal/publications'], { queryParams: { publication: notification.publicationId } });
            return;
        }
        if (!notification.is_read) {
            this.api.markRead(notification.key).pipe(catchError(() => EMPTY)).subscribe();
        }
        if (notification.kind === 'alert' || !notification.request_id) {
            void this.router.navigate(['/home/alerts']);
            return;
        }
        const role = this.auth.user()?.role;
        void this.router.navigate(role === 'citizen' ? ['/home/my-requests', notification.request_id] : role === 'agent' ? ['/home/agent'] : ['/home/requests']);
    }

    markAllAsRead(event: Event): void {
        event.stopPropagation();
        if (!this.unreadCount()) return;

        this.publications.notificationItems().filter((item) => !item.is_read).forEach((item) => this.publications.markRead(item.publicationId));
        this.api.markAllRead().pipe(catchError(() => EMPTY)).subscribe();
    }

    openAll(): void {
        this.overlays.close('notifications');
        const role = this.auth.user()?.role;
        void this.router.navigate(role === 'citizen' ? ['/home/my-requests'] : role === 'agent' ? ['/home/agent'] : ['/home/requests']);
    }
}
