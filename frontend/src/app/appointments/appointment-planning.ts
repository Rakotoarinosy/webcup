import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Observable, finalize, map } from 'rxjs';

import { Agent } from '@/app/agents/agent.model';
import { AgentService } from '@/app/agents/agent.service';
import { AuthService } from '@/app/auth/auth.service';
import { Institut } from '@/app/instituts/institut.model';
import { InstitutService } from '@/app/instituts/institut.service';
import { APPOINTMENT_MODALITY_VALUES } from '@/app/shared/api-enums';
import { AppointmentModality, AppointmentPolicy, MODALITY_LABELS, PlanningSlot, WEEKDAYS, appointmentErrorMessage, durationLabel, statusSeverity } from './appointment.model';
import { AppointmentService } from './appointment.service';

interface SlotForm {
    mode: 'single' | 'series';
    institut_id: string;
    agent_id: string;
    modality: AppointmentModality;
    location: string;
    preparation: string;
    day: string;
    start_time: string;
    duration_minutes: number;
    first_day: string;
    last_day: string;
    weekdays: boolean[];
    day_start: string;
    day_end: string;
    break_minutes: number;
}

/** Date locale « AAAA-MM-JJ » (le calendrier de la mairie, saisi tel quel). */
export function isoDay(date: Date): string {
    const pad = (value: number) => String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function addDays(day: string, days: number): string {
    const [year, month, date] = day.split('-').map(Number);
    return isoDay(new Date(year, month - 1, date + days));
}

export function mondayOf(day: string): string {
    const [year, month, date] = day.split('-').map(Number);
    const weekday = (new Date(year, month - 1, date).getDay() + 6) % 7;
    return addDays(day, -weekday);
}

/**
 * Planning des rendez-vous (F39) pour agents, managers et admin : créer des créneaux
 * (unitaires ou en série), voir la semaine, noter honoré / absent, annuler avec un motif
 * communiqué à l'habitant, retirer un créneau libre. Chaque opération est journalisée.
 */
@Component({
    selector: 'app-appointment-planning',
    imports: [FormsModule, ButtonModule, TagModule],
    templateUrl: './appointment-planning.html'
})
export class AppointmentPlanning implements OnInit {
    private readonly api = inject(AppointmentService);
    private readonly auth = inject(AuthService);
    private readonly agentsApi = inject(AgentService);
    private readonly institutsApi = inject(InstitutService);

    readonly modalities = APPOINTMENT_MODALITY_VALUES;
    readonly modalityLabels = MODALITY_LABELS;
    readonly weekdays = WEEKDAYS;
    readonly severity = statusSeverity;
    readonly duration = durationLabel;

    readonly isAdmin = computed(() => this.auth.user()?.role === 'admin');
    readonly isAgent = computed(() => this.auth.user()?.role === 'agent');

    readonly policy = signal<AppointmentPolicy | null>(null);
    readonly weekStart = signal(mondayOf(isoDay(new Date())));
    readonly weekEnd = computed(() => addDays(this.weekStart(), 6));
    readonly institutFilter = signal('');
    readonly entries = signal<PlanningSlot[]>([]);
    readonly instituts = signal<Institut[]>([]);
    readonly agents = signal<Agent[]>([]);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly notice = signal<string | null>(null);
    readonly saving = signal(false);
    readonly formError = signal<string | null>(null);
    /** Rendez-vous dont l'annulation est en cours de saisie. */
    readonly cancelling = signal<string | null>(null);
    cancelReason = '';
    cancelSubmitted = false;

    readonly days = computed(() => {
        const groups = new Map<string, { label: string; slots: PlanningSlot[] }>();
        for (const slot of this.entries()) {
            const group = groups.get(slot.time.day) ?? { label: slot.time.day_label, slots: [] };
            group.slots.push(slot);
            groups.set(slot.time.day, group);
        }
        return [...groups.entries()].map(([day, group]) => ({ day, ...group }));
    });

    readonly agentChoices = computed(() => {
        const institut = this.isAdmin() ? this.form.institut_id : this.auth.user()?.institut_id;
        return this.agents().filter((agent) => agent.is_active && (!institut || agent.institut_id === institut));
    });

    form: SlotForm = this.emptyForm();
    submitted = false;

    ngOnInit(): void {
        this.api.policy().subscribe({ next: (policy) => this.policy.set(policy), error: () => this.policy.set(null) });
        if (this.isAdmin()) {
            this.institutsApi.list(true).subscribe({ next: (items) => this.instituts.set(items), error: () => this.instituts.set([]) });
        }
        if (!this.isAgent()) {
            this.agentsApi.list({ is_active: true }).subscribe({ next: (items) => this.agents.set(items), error: () => this.agents.set([]) });
        }
        this.load();
    }

    load(): void {
        this.loading.set(true);
        this.error.set(null);
        this.api
            .planning(this.weekStart(), this.weekEnd(), this.institutFilter() || null)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (entries) => this.entries.set(entries),
                error: (error: unknown) => this.error.set(appointmentErrorMessage(error))
            });
    }

    shiftWeek(weeks: number): void {
        this.weekStart.set(addDays(this.weekStart(), weeks * 7));
        this.load();
    }

    pickWeek(day: string): void {
        if (!day) return;
        this.weekStart.set(mondayOf(day));
        this.load();
    }

    filterInstitut(id: string): void {
        this.institutFilter.set(id);
        this.load();
    }

    create(form: NgForm): void {
        this.submitted = true;
        const weekdays = this.form.weekdays.map((checked, index) => (checked ? index : -1)).filter((index) => index >= 0);
        if (form.invalid || (this.form.mode === 'series' && !weekdays.length) || this.saving()) {
            form.control.markAllAsTouched();
            return;
        }
        const common = {
            institut_id: this.isAdmin() ? this.form.institut_id || null : null,
            agent_id: this.isAgent() ? null : this.form.agent_id || null,
            modality: this.form.modality,
            location: this.form.location.trim(),
            preparation: this.form.preparation.trim()
        };
        const request: Observable<{ created: number }> =
            this.form.mode === 'single'
                ? this.api.createSlot({ ...common, day: this.form.day, start_time: this.form.start_time, duration_minutes: this.form.duration_minutes }).pipe(map(() => ({ created: 1 })))
                : this.api.createSeries({
                      ...common,
                      first_day: this.form.first_day,
                      last_day: this.form.last_day,
                      weekdays,
                      day_start: this.form.day_start,
                      day_end: this.form.day_end,
                      duration_minutes: this.form.duration_minutes,
                      break_minutes: this.form.break_minutes
                  });
        this.saving.set(true);
        this.formError.set(null);
        request.pipe(finalize(() => this.saving.set(false))).subscribe({
            next: ({ created }) => {
                this.notice.set(`${created} créneau(x) créé(s).`);
                this.submitted = false;
                this.load();
            },
            error: (error: unknown) => this.formError.set(appointmentErrorMessage(error))
        });
    }

    close(slot: PlanningSlot): void {
        this.act(this.api.closeSlot(slot.id), `Le créneau de ${slot.time.start_time} le ${slot.time.day_label} est retiré.`);
    }

    attendance(slot: PlanningSlot, status: 'honored' | 'no_show'): void {
        if (!slot.appointment) return;
        const label = status === 'honored' ? 'honoré' : 'absent';
        this.act(this.api.attendance(slot.appointment.id, status), `Rendez-vous ${slot.appointment.reference} noté « ${label} ».`);
    }

    askCancel(slot: PlanningSlot): void {
        this.cancelReason = '';
        this.cancelSubmitted = false;
        this.cancelling.set(slot.appointment?.id ?? null);
    }

    confirmCancel(slot: PlanningSlot): void {
        this.cancelSubmitted = true;
        if (!slot.appointment || this.cancelReason.trim().length < 5) return;
        this.act(this.api.cancelByCity(slot.appointment.id, this.cancelReason.trim()), `Rendez-vous ${slot.appointment.reference} annulé. L’habitant est prévenu.`, () => this.cancelling.set(null));
    }

    hasStarted(slot: PlanningSlot): boolean {
        return new Date(slot.time.starts_at).getTime() <= Date.now();
    }

    private act(request: Observable<unknown>, success: string, done?: () => void): void {
        this.error.set(null);
        this.notice.set(null);
        request.subscribe({
            next: () => {
                this.notice.set(success);
                done?.();
                this.load();
            },
            error: (error: unknown) => this.error.set(appointmentErrorMessage(error))
        });
    }

    private emptyForm(): SlotForm {
        const today = isoDay(new Date());
        return {
            mode: 'single',
            institut_id: '',
            agent_id: '',
            modality: 'in_person',
            location: '',
            preparation: '',
            day: addDays(today, 1),
            start_time: '09:00',
            duration_minutes: 30,
            first_day: addDays(today, 1),
            last_day: addDays(today, 14),
            weekdays: [true, true, true, true, true, false, false],
            day_start: '08:30',
            day_end: '11:30',
            break_minutes: 0
        };
    }
}
