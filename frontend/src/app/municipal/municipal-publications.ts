import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { MunicipalPublication } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';

@Component({ selector: 'app-municipal-publications', imports: [DatePipe, ButtonModule, CardModule, SelectModule], templateUrl: './municipal-publications.html', styleUrl: './municipal-publications.scss' })
export class MunicipalPublications implements OnInit {
    private readonly content = inject(MunicipalContentService);
    readonly publications = signal<MunicipalPublication[]>([]);
    readonly selectedCategory = signal<string | null>(null);
    readonly categories = computed(() => [...new Set(this.publications().map((item) => item.category))].map((label) => ({ label, value: label })));

    ngOnInit(): void { this.load(); }
    load(): void { this.content.publications(this.selectedCategory() ?? undefined).subscribe({ next: (items) => this.publications.set(items) }); }
    selectCategory(value: string | null): void { this.selectedCategory.set(value); this.load(); }
}
