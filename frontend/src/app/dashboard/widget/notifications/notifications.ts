import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [ButtonModule, MenuModule],
    templateUrl: './notifications.html',
    styleUrl: './notifications.scss'
})
export class Notifications {
    items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-trash' }
    ];
}
