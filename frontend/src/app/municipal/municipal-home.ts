import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
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
    private readonly router = inject(Router);
    readonly services = signal<MunicipalService[]>([]);
    readonly featuredServices = signal<MunicipalService[]>([]);
    readonly publications = signal<MunicipalPublication[]>([]);
    readonly startError = signal<string | null>(null);

    ngOnInit(): void {
        this.content.services().subscribe({ next: (items) => this.services.set(items.slice(0, 3)) });
        this.content.featuredServices().subscribe({ next: (items) => this.featuredServices.set(items.slice(0, 6)) });
        this.content.publications().subscribe({ next: (items) => this.publications.set(items.slice(0, 2)) });
    }

    startService(service: MunicipalService): void {
        this.startError.set(null);
        this.content.startService(service.id).subscribe({
            next: () => void this.router.navigate(['/home/municipal/contact'], { queryParams: { service: service.id } }),
            error: () => this.startError.set('Impossible d’ouvrir cette démarche. Réessayez dans quelques instants.')
        });
    }
}
