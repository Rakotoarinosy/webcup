import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs';

import { Appointment, appointmentErrorMessage, durationLabel, saveBlob, statusSeverity } from './appointment.model';
import { AppointmentService } from './appointment.service';

/** « Mes rendez-vous » (F39) : à venir / passés, agenda, itinéraire et annulation. */
@Component({
    selector: 'app-my-appointments',
    imports: [NgTemplateOutlet, FormsModule, RouterLink, ButtonModule, TagModule],
    templateUrl: './my-appointments.html'
})
export class MyAppointments implements OnInit {
    private readonly api = inject(AppointmentService);

    readonly severity = statusSeverity;
    readonly duration = durationLabel;

    readonly appointments = signal<Appointment[]>([]);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly notice = signal<string | null>(null);
    /** Rendez-vous dont l'annulation est en cours de confirmation. */
    readonly confirming = signal<string | null>(null);
    readonly cancelling = signal(false);
    cancelReason = '';

    readonly upcoming = computed(() => this.appointments().filter((item) => item.is_upcoming));
    readonly past = computed(() =>
        this.appointments()
            .filter((item) => !item.is_upcoming)
            .reverse()
    );

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading.set(true);
        this.error.set(null);
        this.api
            .mine()
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (items) => this.appointments.set(items),
                error: (error: unknown) => this.error.set(appointmentErrorMessage(error))
            });
    }

    askCancel(appointment: Appointment): void {
        this.cancelReason = '';
        this.notice.set(null);
        this.confirming.set(appointment.id);
    }

    cancel(appointment: Appointment): void {
        if (this.cancelling()) return;
        this.cancelling.set(true);
        this.error.set(null);
        this.api
            .cancel(appointment.id, this.cancelReason.trim() || null)
            .pipe(finalize(() => this.cancelling.set(false)))
            .subscribe({
                next: (updated) => {
                    this.appointments.update((items) => items.map((item) => (item.id === updated.id ? updated : item)));
                    this.confirming.set(null);
                    this.notice.set(`Le rendez-vous ${updated.reference} est annulé. Le créneau est libéré.`);
                },
                error: (error: unknown) => this.error.set(appointmentErrorMessage(error))
            });
    }

    /** Limite d'annulation, en heure de la mairie (« 12 octobre 2026 à 07:30 »). */
    deadline(appointment: Appointment): string {
        const date = new Date(appointment.cancellation_deadline);
        const options: Intl.DateTimeFormatOptions = { timeZone: appointment.slot.time.timezone };
        const day = date.toLocaleDateString('fr-FR', { ...options, day: 'numeric', month: 'long', year: 'numeric' });
        const time = date.toLocaleTimeString('fr-FR', { ...options, hour: '2-digit', minute: '2-digit' });
        return `${day} à ${time} (${appointment.slot.time.utc_offset})`;
    }

    downloadCalendar(appointment: Appointment): void {
        this.api.calendar(appointment.id).subscribe({
            next: (blob) => saveBlob(blob, `${appointment.reference}.ics`),
            error: (error: unknown) => this.error.set(appointmentErrorMessage(error))
        });
    }
}
