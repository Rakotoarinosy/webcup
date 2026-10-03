import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'app-bestselling',
    standalone: true,
    imports: [CommonModule, ButtonModule, MenuModule],
    templateUrl: './bestselling.html',
    styleUrl: './bestselling.scss'
})
export class Bestselling {
    menu = null;

    items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-trash' }
    ];
}
