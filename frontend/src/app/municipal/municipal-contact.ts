import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ContactReceipt, MunicipalService } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';

@Component({ selector: 'app-municipal-contact', imports: [FormsModule, ButtonModule, CardModule, InputTextModule, MessageModule, SelectModule, TextareaModule], templateUrl: './municipal-contact.html', styleUrl: './municipal-contact.scss' })
export class MunicipalContact implements OnInit {
    private readonly content = inject(MunicipalContentService);
    readonly services = signal<MunicipalService[]>([]);
    readonly receipt = signal<ContactReceipt | null>(null);
    readonly error = signal<string | null>(null);
    readonly sending = signal(false);
    form = { service_id: null as string | null, sender_name: '', sender_email: '', subject: '', message: '' };

    ngOnInit(): void { this.content.services().subscribe({ next: (items) => this.services.set(items) }); }
    send(form: NgForm): void {
        if (form.invalid) { return; }
        this.sending.set(true); this.error.set(null);
        this.content.sendContact(this.form).subscribe({
            next: (receipt) => { this.receipt.set(receipt); this.sending.set(false); form.resetForm({ service_id: null }); },
            error: () => { this.error.set("L'envoi a échoué. Veuillez réessayer."); this.sending.set(false); }
        });
    }
}
