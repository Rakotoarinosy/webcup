import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
interface AppNotification {
    id: number;
    title: string;
    type: 'new' | 'assigned' | 'completed' | 'delayed';
    icon: string;
    time: string;
    read: boolean;
}

@Component({
    selector: 'app-notifications',
    imports: [CommonModule, ButtonModule, BadgeModule],
    templateUrl: './notifications.html',
    styleUrl: './notifications.scss'
})
export class Notifications {
    showPanel = false;

    notifications: AppNotification[] = [
        { id: 1, title: 'Nouvelle demande #124', type: 'new', icon: 'pi-folder-open text-blue-500', time: 'Il y a 5 min', read: false },
        { id: 2, title: 'Demande #98 assignée', type: 'assigned', icon: 'pi-user-plus text-orange-500', time: 'Il y a 1 heure', read: false },
        { id: 3, title: 'Intervention #45 terminée', type: 'completed', icon: 'pi-check-circle text-green-500', time: 'Il y a 3 heures', read: false },
        { id: 4, title: 'Demande #76 en retard', type: 'delayed', icon: 'pi-exclamation-triangle text-red-500', time: 'Il y a 1 jour', read: true }
    ];

    get unreadCount(): number {
        return this.notifications.filter((n) => !n.read).length;
    }

    togglePanel(event: Event) {
        event.stopPropagation();
        this.showPanel = !this.showPanel;
    }

    markAsRead(notification: AppNotification) {
        if (!notification.read) {
            notification.read = true;
        }
    }

    markAllAsRead() {
        this.notifications.forEach((n) => (n.read = true));
    }

    getIconStyle(type: string): string {
        switch (type) {
            case 'new':
                return 'bg-blue-100 dark:bg-blue-400/10';
            case 'assigned':
                return 'bg-orange-100 dark:bg-orange-400/10';
            case 'completed':
                return 'bg-green-100 dark:bg-green-400/10';
            case 'delayed':
                return 'bg-red-100 dark:bg-red-400/10';
            default:
                return 'bg-gray-100 dark:bg-gray-400/10';
        }
    }

    // Fermer le panneau si on clique en dehors
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event) {
        this.showPanel = false;
    }
}
