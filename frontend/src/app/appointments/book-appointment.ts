import { Component, ElementRef, Injector, OnInit, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Observable, finalize } from 'rxjs';

import { Appointment, AppointmentPolicy, AvailableDay, MODALITY_ICONS, ReminderDelay, Service, Slot, appointmentErrorMessage, durationLabel, saveBlob } from './appointment.model';
import { AppointmentService } from './appointment.service';

type Step = 'service' | 'day' | 'slot' | 'recap' | 'done';

const STEPS: { key: Exclude<Step, 'done'>; label: string }[] = [
    { key: 'service', label: 'Service' },
    { key: 'day', label: 'Jour' },
    { key: 'slot', label: 'Créneau' },
    { key: 'recap', label: 'Récapitulatif' }
];

/**
 * Prise de rendez-vous (F39) : service → jour → créneau → récapitulatif → confirmation.
 * Chaque horaire est affiché tel que décrit par le serveur : jour en toutes lettres, heure
 * et fuseau de la mairie, durée, lieu et interlocuteur. Rien n'est confirmé sans récapitulatif.
 */
@Component({
    selector: 'app-book-appointment',
    imports: [FormsModule, RouterLink, ButtonModule],
    templateUrl: './book-appointment.html'
})
export class BookAppointment implements OnInit {
    private readonly api = inject(AppointmentService);
    private readonly injector = inject(Injector);
    private readonly stepHeading = viewChild<ElementRef<HTMLElement>>('stepHeading');

    readonly steps = STEPS;
    readonly icons = MODALITY_ICONS;
    readonly duration = durationLabel;

    readonly step = signal<Step>('service');
    readonly policy = signal<AppointmentPolicy | null>(null);
    readonly services = signal<Service[]>([]);
    readonly days = signal<AvailableDay[]>([]);
    readonly slots = signal<Slot[]>([]);
    readonly service = signal<Service | null>(null);
    readonly day = signal<AvailableDay | null>(null);
    readonly slot = signal<Slot | null>(null);
    readonly booked = signal<Appointment | null>(null);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly sending = signal(false);

    readonly stepIndex = computed(() => STEPS.findIndex((item) => item.key === this.step()));

    form = { reason: '', reminders: [] as ReminderDelay[], contactPhone: '' };
    submitted = false;

    ngOnInit(): void {
        this.api.policy().subscribe({
            next: (policy) => {
                this.policy.set(policy);
                this.form.reminders = policy.reminder_options.filter((option) => option.is_default).map((option) => option.value);
            },
            error: () => this.policy.set(null)
        });
        this.loadServices();
    }

    loadServices(): void {
        this.run(this.api.services(), (services) => this.services.set(services));
    }

    chooseService(service: Service): void {
        this.service.set(service);
        this.day.set(null);
        this.slot.set(null);
        this.run(this.api.days(service.institut_id), (days) => {
            this.days.set(days);
            this.go('day');
        });
    }

    chooseDay(day: AvailableDay): void {
        const service = this.service();
        if (!service) return;
        this.day.set(day);
        this.slot.set(null);
        this.run(this.api.slots(service.institut_id, day.day), (slots) => {
            this.slots.set(slots);
            this.go('slot');
        });
    }

    chooseSlot(slot: Slot): void {
        this.slot.set(slot);
        this.go('recap');
    }

    back(): void {
        const order: Step[] = ['service', 'day', 'slot', 'recap'];
        const index = order.indexOf(this.step());
        if (index > 0) this.go(order[index - 1]);
    }

    toggleReminder(value: ReminderDelay, checked: boolean): void {
        const others = this.form.reminders.filter((item) => item !== value);
        this.form.reminders = checked ? [...others, value] : others;
    }

    confirm(form: NgForm): void {
        this.submitted = true;
        const slot = this.slot();
        if (!slot || form.invalid || this.sending()) {
            form.control.markAllAsTouched();
            return;
        }
        this.sending.set(true);
        this.error.set(null);
        this.api
            .book({
                slot_id: slot.id,
                reason: this.form.reason.trim(),
                reminders: this.form.reminders,
                contact_phone: slot.modality === 'phone' ? this.form.contactPhone.trim() || null : null
            })
            .pipe(finalize(() => this.sending.set(false)))
            .subscribe({
                next: (appointment) => {
                    this.booked.set(appointment);
                    this.go('done');
                },
                error: (error: unknown) => this.error.set(appointmentErrorMessage(error))
            });
    }

    downloadCalendar(appointment: Appointment): void {
        this.api.calendar(appointment.id).subscribe({
            next: (blob) => saveBlob(blob, `${appointment.reference}.ics`),
            error: (error: unknown) => this.error.set(appointmentErrorMessage(error))
        });
    }

    restart(): void {
        this.booked.set(null);
        this.service.set(null);
        this.day.set(null);
        this.slot.set(null);
        this.form.reason = '';
        this.submitted = false;
        this.loadServices();
        this.go('service');
    }

    private go(step: Step): void {
        this.error.set(null);
        this.step.set(step);
        // Le focus suit l'étape : un lecteur d'écran annonce le nouveau titre.
        afterNextRender(() => this.stepHeading()?.nativeElement.focus(), { injector: this.injector });
    }

    private run<T>(source: Observable<T>, next: (value: T) => void): void {
        this.loading.set(true);
        this.error.set(null);
        source.pipe(finalize(() => this.loading.set(false))).subscribe({
            next,
            error: (error: unknown) => this.error.set(appointmentErrorMessage(error))
        });
    }
}
