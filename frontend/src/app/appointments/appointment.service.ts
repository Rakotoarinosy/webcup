import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { Appointment, AppointmentPolicy, AvailableDay, BookIn, CreateSeriesIn, CreateSlotIn, PlanningSlot, Service, Slot, StaffAppointment } from './appointment.model';

/** Client HTTP des rendez-vous : /api/v1/appointments. */
@Injectable({ providedIn: 'root' })
export class AppointmentService {
    private readonly http = inject(HttpClient);
    private readonly url = `${environment.apiUrl}/appointments`;

    policy(): Observable<AppointmentPolicy> {
        return this.http.get<AppointmentPolicy>(`${this.url}/policy`);
    }

    services(): Observable<Service[]> {
        return this.http.get<Service[]>(`${this.url}/services`);
    }

    days(institutId: string): Observable<AvailableDay[]> {
        return this.http.get<AvailableDay[]>(`${this.url}/services/${institutId}/days`);
    }

    slots(institutId: string, day: string): Observable<Slot[]> {
        return this.http.get<Slot[]>(`${this.url}/services/${institutId}/slots`, { params: { day } });
    }

    book(payload: BookIn): Observable<Appointment> {
        return this.http.post<Appointment>(this.url, payload);
    }

    mine(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.url}/mine`);
    }

    cancel(id: string, reason: string | null = null): Observable<Appointment> {
        return this.http.post<Appointment>(`${this.url}/${id}/cancel`, { reason });
    }

    calendar(id: string): Observable<Blob> {
        return this.http.get(`${this.url}/${id}/calendar.ics`, { responseType: 'blob' });
    }

    planning(fromDay: string, toDay: string, institutId: string | null = null): Observable<PlanningSlot[]> {
        const params: Record<string, string> = { from_day: fromDay, to_day: toDay };
        if (institutId) params['institut_id'] = institutId;
        return this.http.get<PlanningSlot[]>(`${this.url}/slots`, { params });
    }

    createSlot(payload: CreateSlotIn): Observable<Slot> {
        return this.http.post<Slot>(`${this.url}/slots`, payload);
    }

    createSeries(payload: CreateSeriesIn): Observable<{ created: number; slots: Slot[] }> {
        return this.http.post<{ created: number; slots: Slot[] }>(`${this.url}/slots/series`, payload);
    }

    closeSlot(id: string): Observable<Slot> {
        return this.http.post<Slot>(`${this.url}/slots/${id}/close`, {});
    }

    attendance(id: string, status: 'honored' | 'no_show'): Observable<StaffAppointment> {
        return this.http.post<StaffAppointment>(`${this.url}/${id}/attendance`, { status });
    }

    cancelByCity(id: string, reason: string): Observable<StaffAppointment> {
        return this.http.post<StaffAppointment>(`${this.url}/${id}/cancel`, { reason });
    }
}
