import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, ElementRef, Injector, OnInit, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { finalize } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LiveDataService } from '../shared/live-data.service';
import { ContactReceipt, MunicipalService } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';
import { MunicipalNavigation } from './municipal-navigation.service';

@Component({
    selector: 'app-municipal-contact',
    imports: [DatePipe, FormsModule, RouterLink, ButtonModule, InputTextModule, SelectModule, TextareaModule],
    templateUrl: './municipal-contact.html',
    styleUrl: './municipal-contact.scss'
})
export class MunicipalContact implements OnInit {
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly injector = inject(Injector);
    private readonly content = inject(MunicipalContentService);
    private readonly auth = inject(AuthService);
    private readonly route = inject(ActivatedRoute);
    readonly navigation = inject(MunicipalNavigation);
    readonly confirmation = viewChild<ElementRef<HTMLElement>>('confirmation');
    readonly sendError = viewChild<ElementRef<HTMLElement>>('sendError');
    readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');
    readonly servicesLoading = signal(false);
    readonly servicesError = signal<string | null>(null);
    readonly services = signal<MunicipalService[]>([]);
    readonly receipt = signal<ContactReceipt | null>(null);
    readonly recipient = signal('Services municipaux');
    readonly error = signal<string | null>(null);
    readonly sending = signal(false);
    form = { service_id: null as string | null, sender_name: '', sender_email: '', subject: '', message: '' };

    ngOnInit(): void {
        const user = this.auth.user();
        this.form.sender_name = user?.name ?? '';
        this.form.sender_email = user?.email ?? '';
        this.form.service_id = this.route.snapshot.queryParamMap.get('service');
        this.loadServices();
        this.live.watch(
            this.destroyRef,
            () => this.loadServices(),
            () => !this.sending() && !this.servicesLoading()
        );
    }

    loadServices(): void {
        if (this.servicesLoading()) return;
        this.servicesLoading.set(true);
        this.servicesError.set(null);
        this.content
            .services()
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.servicesLoading.set(false))
            )
            .subscribe({
                next: (items) => {
                    this.services.set(items);
                    if (this.form.service_id && !items.some((item) => item.id === this.form.service_id)) {
                        this.form.service_id = null;
                        this.servicesError.set('Ce service n’est plus disponible. Vous pouvez envoyer votre message aux services municipaux ou choisir un autre service.');
                    }
                },
                error: () => this.servicesError.set('La liste des services est indisponible. Vous pouvez quand même envoyer votre message à la mairie.')
            });
    }

    send(form: NgForm): void {
        if (this.sending()) return;
        for (const [name, minimum] of [
            ['sender_name', 2],
            ['subject', 3],
            ['message', 10]
        ] as const) {
            if (this.form[name].trim().length < minimum) form.controls[name]?.setErrors({ minlength: true });
        }
        if (form.invalid) {
            form.control.markAllAsTouched();
            return;
        }
        const payload = { ...this.form, sender_name: this.form.sender_name.trim(), sender_email: this.form.sender_email.trim(), subject: this.form.subject.trim(), message: this.form.message.trim() };
        this.recipient.set(this.services().find((service) => service.id === payload.service_id)?.name ?? 'Services municipaux');
        this.sending.set(true);
        this.error.set(null);
        this.content
            .sendContact(payload)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.sending.set(false))
            )
            .subscribe({
                next: (receipt) => {
                    this.receipt.set(receipt);
                    afterNextRender(() => this.confirmation()?.nativeElement.focus(), { injector: this.injector });
                },
                error: (error: unknown) => {
                    this.error.set(
                        error instanceof HttpErrorResponse && error.status === 404
                            ? 'Ce service n’est plus disponible. Choisissez un autre service ou laissez ce champ vide, puis réessayez.'
                            : 'L’envoi n’a pas pu être confirmé. Vos informations sont conservées. Vérifiez votre connexion puis réessayez.'
                    );
                    afterNextRender(() => this.sendError()?.nativeElement.focus(), { injector: this.injector });
                }
            });
    }

    newMessage(): void {
        this.receipt.set(null);
        this.error.set(null);
        this.form = { ...this.form, subject: '', message: '' };
        afterNextRender(() => this.nameInput()?.nativeElement.focus(), { injector: this.injector });
    }
}
