import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';

const ORDER_EVENTS = [
    {
        status: 'Ordered',
        date: '15/10/2020 10:30',
        icon: 'pi pi-shopping-cart',
        color: '#9C27B0',
        image: 'game-controller.jpg'
    },
    {
        status: 'Processing',
        date: '15/10/2020 14:00',
        icon: 'pi pi-cog',
        color: '#673AB7'
    },
    {
        status: 'Shipped',
        date: '15/10/2020 16:15',
        icon: 'pi pi-envelope',
        color: '#FF9800'
    },
    {
        status: 'Delivered',
        date: '16/10/2020 10:00',
        icon: 'pi pi-check',
        color: '#607D8B'
    }
];

const YEAR_EVENTS = ['2020', '2021', '2022', '2023'];

@Component({
    selector: 'app-timeline-demo',
    imports: [CommonModule, TimelineModule, ButtonModule, CardModule],
    templateUrl: './timelinedemo.html',
    styleUrl: './timelinedemo.scss'
})
export class TimelineDemo {
    readonly events1: any[] = ORDER_EVENTS;

    readonly events2: any[] = YEAR_EVENTS;
}
