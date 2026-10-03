import { computed, inject, Injectable, signal } from '@angular/core';

import { AuthService } from '@/app/auth/auth.service';
import { MunicipalPublication } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';

@Injectable({ providedIn: 'root' })
export class PublicationReadService {
    private readonly auth = inject(AuthService);
    private readonly content = inject(MunicipalContentService);
    private readonly publications = signal<MunicipalPublication[]>([]);
    private readonly seenIds = signal<Set<string>>(new Set());
    readonly unreadCount = computed(() => this.publications().filter((publication) => !this.seenIds().has(publication.id)).length);
    readonly notificationItems = computed(() =>
        this.publications()
            .map((publication) => ({
                key: `publication:${publication.id}`,
                publicationId: publication.id,
                title: publication.title,
                message: publication.summary,
                created_at: publication.published_at,
                is_read: this.seenIds().has(publication.id)
            }))
            .sort((left, right) => Date.parse(right.created_at) - Date.parse(left.created_at))
    );

    constructor() { this.restore(); this.refresh(); }

    refresh(): void {
        this.content.publications().subscribe({ next: (items) => this.publications.set(items), error: () => undefined });
    }

    markRead(id: string): void {
        const next = new Set(this.seenIds());
        next.add(id);
        this.seenIds.set(next);
        try { localStorage.setItem(this.key(), JSON.stringify([...next])); } catch { /* stockage optionnel */ }
    }

    private restore(): void {
        try {
            const value = JSON.parse(localStorage.getItem(this.key()) ?? '[]');
            this.seenIds.set(new Set(Array.isArray(value) ? value : []));
        } catch { this.seenIds.set(new Set()); }
    }

    private key(): string { return `municipal-publications-read:${this.auth.user()?.id ?? 'anonymous'}`; }
}
