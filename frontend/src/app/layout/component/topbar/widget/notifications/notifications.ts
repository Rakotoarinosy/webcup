import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { EMPTY, catchError, switchMap, timer } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { apiErrorMessage } from '@/app/users/user.service';
import { TerraNotification } from '@/app/terra-nova/terra-nova.model';
import { TerraNovaService } from '@/app/terra-nova/terra-nova.service';

const REFRESH_MS = 10_000;
const STAFF_ROLES = ['admin', 'manager', 'agent'] as const;

@Component({
    selector: 'app-notifications',
    imports: [CommonModule, DatePipe, BadgeModule],
    templateUrl: './notifications.html',
    styleUrl: './notifications.scss'
})
export class Notifications {
    private readonly auth = inject(AuthService);
    private readonly api = inject(TerraNovaService);
    private readonly router = inject(Router);

    readonly showPanel = signal(false);
    readonly notifications = signal<TerraNotification[]>([]);
    readonly error = signal<string | null>(null);
    readonly canView = computed(() => {
        const role = this.auth.user()?.role;
        return role !== undefined && STAFF_ROLES.some((staffRole) => staffRole === role);
    });
    readonly unreadCount = computed(() => this.notifications().filter((notification) => !notification.is_read).length);
    readonly recentNotifications = computed(() => this.notifications().slice(0, 8));

    constructor() {
        effect((onCleanup) => {
            if (!this.canView()) {
                this.notifications.set([]);
                this.showPanel.set(false);
                this.error.set(null);
                return;
            }

            const subscription = timer(0, REFRESH_MS)
                .pipe(
                    switchMap(() =>
                        this.api.notifications().pipe(
                            catchError((error: unknown) => {
                                this.error.set(apiErrorMessage(error));
                                return EMPTY;
                            })
                        )
                    )
                )
                .subscribe((response) => {
                    this.notifications.set(response.items);
                    this.error.set(null);
                });

            onCleanup(() => subscription.unsubscribe());
        });
    }

    togglePanel(event: Event): void {
        event.stopPropagation();
        this.showPanel.update((show) => !show);
    }

    open(notification: TerraNotification): void {
        this.showPanel.set(false);
        if (!notification.is_read) {
            this.setRead((item) => item.key === notification.key);
            this.api.markRead(notification.key).subscribe({
                error: (error: unknown) => {
                    this.error.set(apiErrorMessage(error));
                    this.refresh();
                }
            });
        }
        void this.router.navigate(['/home/terra-nova/notifications']);
    }

    markAllAsRead(event: Event): void {
        event.stopPropagation();
        if (!this.unreadCount()) return;

        this.setRead(() => true);
        this.api.markAllRead().subscribe({
            error: (error: unknown) => {
                this.error.set(apiErrorMessage(error));
                this.refresh();
            }
        });
    }

    openAll(): void {
        this.showPanel.set(false);
        void this.router.navigate(['/home/terra-nova/notifications']);
    }

    private setRead(matches: (notification: TerraNotification) => boolean): void {
        this.notifications.update((items) => items.map((item) => (matches(item) ? { ...item, is_read: true } : item)));
    }

    private refresh(): void {
        this.api.notifications().subscribe({
            next: (response) => {
                this.notifications.set(response.items);
                this.error.set(null);
            },
            error: (error: unknown) => this.error.set(apiErrorMessage(error))
        });
    }
}
