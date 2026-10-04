import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { apiErrorMessage } from '@/app/users/user.service';
import { RequestReceipt } from './request.model';
import { CitizenRequestService } from './request.service';

function formatDate(iso: string): string {
    return new Date(iso).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' });
}

/** Texte de l'accusé, pour le fichier téléchargé. */
export function receiptText(receipt: RequestReceipt): string {
    return [
        'TERRA NOVA — ACCUSÉ DE RÉCEPTION',
        '',
        `Référence : ${receipt.reference}`,
        `Reçue le : ${formatDate(receipt.received_at)}`,
        `Service destinataire : ${receipt.service}`,
        `Demandeur : ${receipt.citizen_name}`,
        '',
        `Objet : ${receipt.title}`,
        `Type : ${receipt.category}`,
        `Lieu : ${receipt.location}`,
        `Description : ${receipt.description}`,
        '',
        `Statut à l'édition : ${receipt.status}`,
        `Accusé édité le : ${formatDate(receipt.issued_at)}`,
        '',
        'Conservez ce document : citez la référence pour toute question sur votre demande.'
    ].join('\n');
}

/** Accusé de réception imprimable (enregistrable en PDF) et téléchargeable : D16, F83. */
@Component({
    selector: 'app-request-receipt',
    imports: [DatePipe, RouterLink],
    template: `
        <div class="receipt-page">
            <nav class="receipt-actions no-print" aria-label="Actions sur l’accusé de réception">
                <a [routerLink]="backLink()" class="receipt-button"><i class="pi pi-arrow-left" aria-hidden="true"></i> Retour à la demande</a>
                @if (receipt()) {
                    <button type="button" class="receipt-button" (click)="print()"><i class="pi pi-print" aria-hidden="true"></i> Imprimer ou enregistrer en PDF</button>
                    <button type="button" class="receipt-button" (click)="download()"><i class="pi pi-download" aria-hidden="true"></i> Télécharger (.txt)</button>
                }
            </nav>

            <main id="main-content" tabindex="-1" class="receipt-sheet">
                @if (loading()) {
                    <p role="status">Chargement de l’accusé de réception…</p>
                } @else if (error(); as message) {
                    <p role="alert">{{ message }}</p>
                } @else if (receipt(); as r) {
                    <p class="receipt-brand">Terra Nova · Ville de Terra Nova</p>
                    <h1>Accusé de réception</h1>
                    <p>La ville de Terra Nova certifie avoir reçu la demande ci-dessous.</p>
                    <p class="receipt-reference">Référence : <strong>{{ r.reference }}</strong></p>
                    <dl>
                        <dt>Reçue le</dt>
                        <dd><time [attr.datetime]="r.received_at">{{ r.received_at | date: 'dd/MM/yyyy à HH:mm' }}</time></dd>
                        <dt>Service destinataire</dt>
                        <dd>{{ r.service }}</dd>
                        <dt>Demandeur</dt>
                        <dd>{{ r.citizen_name }}</dd>
                        <dt>Objet</dt>
                        <dd>{{ r.title }}</dd>
                        <dt>Type</dt>
                        <dd>{{ r.category }}</dd>
                        <dt>Lieu</dt>
                        <dd>{{ r.location }}</dd>
                        <dt>Description</dt>
                        <dd class="receipt-description">{{ r.description }}</dd>
                        <dt>Statut à l’édition</dt>
                        <dd>{{ r.status }}</dd>
                    </dl>
                    <p class="receipt-footer">Document édité le {{ r.issued_at | date: 'dd/MM/yyyy à HH:mm' }}. Conservez-le : citez la référence pour toute question sur votre demande.</p>
                }
            </main>
        </div>
    `,
    styles: [
        `
            .receipt-page {
                min-height: 100dvh;
                background: var(--surface-ground);
                padding: 1.5rem 1rem;
                color: var(--text-color);
            }
            .receipt-actions {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                max-width: 48rem;
                margin: 0 auto 1rem;
            }
            .receipt-button {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                border: 1px solid var(--surface-border);
                background: var(--surface-card);
                color: var(--text-color);
                border-radius: 0.5rem;
                padding: 0.6rem 0.9rem;
                font: inherit;
                cursor: pointer;
            }
            .receipt-button:focus-visible {
                outline: 3px solid var(--p-primary-color);
                outline-offset: 2px;
            }
            .receipt-sheet {
                max-width: 48rem;
                margin: auto;
                background: var(--surface-card);
                border: 1px solid var(--surface-border);
                border-radius: 0.75rem;
                padding: 2rem;
            }
            .receipt-brand {
                font-weight: 700;
                margin: 0;
            }
            .receipt-reference {
                font-size: 1.25rem;
            }
            dl {
                display: grid;
                grid-template-columns: minmax(9rem, auto) 1fr;
                gap: 0.5rem 1rem;
            }
            dt {
                font-weight: 600;
            }
            dd {
                margin: 0;
                overflow-wrap: anywhere;
            }
            .receipt-description {
                white-space: pre-line;
            }
            .receipt-footer {
                margin-top: 2rem;
                font-size: 0.9rem;
            }
            @media print {
                .no-print {
                    display: none !important;
                }
                .receipt-page {
                    background: #fff;
                    color: #000;
                    padding: 0;
                }
                .receipt-sheet {
                    border: 0;
                    padding: 0;
                    background: #fff;
                }
            }
        `
    ]
})
export class RequestReceiptPage implements OnInit {
    private readonly api = inject(CitizenRequestService);
    private readonly route = inject(ActivatedRoute);
    private readonly auth = inject(AuthService);

    protected readonly receipt = signal<RequestReceipt | null>(null);
    protected readonly loading = signal(true);
    protected readonly error = signal<string | null>(null);
    private requestId = '';

    ngOnInit(): void {
        this.requestId = this.route.snapshot.paramMap.get('id') ?? '';
        this.api
            .receipt(this.requestId)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (receipt) => this.receipt.set(receipt),
                error: (error: unknown) =>
                    this.error.set(error instanceof HttpErrorResponse && (error.status === 404 || error.status === 403) ? 'Cet accusé de réception est introuvable.' : apiErrorMessage(error))
            });
    }

    protected backLink(): string[] {
        return this.auth.user()?.role === 'citizen' ? ['/home/my-requests', this.requestId] : ['/home/requests'];
    }

    protected print(): void {
        window.print();
    }

    protected download(): void {
        const receipt = this.receipt();
        if (!receipt) return;
        const url = URL.createObjectURL(new Blob([receiptText(receipt)], { type: 'text/plain;charset=utf-8' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = `accuse-reception-${receipt.reference}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    }
}
