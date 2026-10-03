import { Component, inject, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { MunicipalService } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';

@Component({ selector: 'app-municipal-services', imports: [CardModule], templateUrl: './municipal-services.html', styleUrl: './municipal-services.scss' })
export class MunicipalServices implements OnInit {
    private readonly content = inject(MunicipalContentService);
    readonly services = signal<MunicipalService[]>([]);
    ngOnInit(): void { this.content.services().subscribe({ next: (items) => this.services.set(items) }); }
}
