import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { MunicipalContentService } from './municipal-content.service';
import { MunicipalPublication, MunicipalService } from './municipal-content.model';

@Component({
    selector: 'app-municipal-home',
    imports: [DatePipe, RouterLink, ButtonModule, CardModule],
    templateUrl: './municipal-home.html',
    styleUrl: './municipal-home.scss'
})
export class MunicipalHome implements OnInit {
    private readonly content = inject(MunicipalContentService);
    readonly services = signal<MunicipalService[]>([]);
    readonly publications = signal<MunicipalPublication[]>([]);

    ngOnInit(): void {
        this.content.services().subscribe({ next: (items) => this.services.set(items.slice(0, 3)) });
        this.content.publications().subscribe({ next: (items) => this.publications.set(items.slice(0, 2)) });
    }
}
