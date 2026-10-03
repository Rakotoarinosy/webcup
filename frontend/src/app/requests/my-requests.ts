import { LiveDataService } from '@/app/shared/live-data.service';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { Subscription, finalize, forkJoin } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { CitizenNotification, NotificationService } from '@/app/notifications/notification.service';
import { CitizenRequest, CitizenRequestPage, CitizenRequestQuery, CreateCitizenRequestIn, REQUEST_CATEGORIES, REQUEST_STATUSES, RequestCategory, RequestStatus } from './request.model';
import { CitizenRequestService } from './request.service';
import { apiErrorMessage } from '@/app/users/user.service';

interface RequestForm {
    title: string;
    description: string;
    category: RequestCategory;
    location: string;
}

const PAGE_SIZE = 10;
const EMPTY_FORM: RequestForm = { title: '', description: '', category: 'Autre', location: '' };

@Component({
    selector: 'app-my-requests',
    imports: [DatePipe, FormsModule, RouterLink, ButtonModule, SelectModule, ToastModule],
    templateUrl: './my-requests.html',
    providers: [MessageService]
})
export class MyRequests implements OnInit {
    private readonly live = inject(LiveDataService);
    private readonly requestsApi = inject(CitizenRequestService);
    private readonly notificationsApi = inject(NotificationService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);
    private readonly messages = inject(MessageService);
    protected readonly auth = inject(AuthService);

    protected readonly requests = signal<CitizenRequest[]>([]);
    protected readonly total = signal(0);
    protected readonly page = signal(1);
    protected readonly pages = signal(1);
    protected readonly statusFilter = signal<RequestStatus | null>(null);
    protected readonly selectedRequest = signal<CitizenRequest | null>(null);
    protected readonly notifications = signal<CitizenNotification[]>([]);
    protected readonly actionable = signal<CitizenRequest[]>([]);
    protected readonly attentionError = signal<string | null>(null);
    protected readonly loading = signal(false);
    protected readonly submitting = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly submitted = signal(false);
    protected readonly detailMode = signal(false);
    protected readonly categories = [...REQUEST_CATEGORIES];
    protected readonly statuses = [...REQUEST_STATUSES];
    protected form: RequestForm = { ...EMPTY_FORM };
    private listSubscription?: Subscription;
    private detailSubscription?: Subscription;
    private attentionSubscription?: Subscription;
    private announcedSubmissionId: string | null = null;

    ngOnInit(): void {
        this.live.watch(
            this.destroyRef,
            () => {
                const id = this.route.snapshot.paramMap.get('id');
                if (id) this.loadDetail(id);
                else {
                    this.load();
                    this.loadAttention();
                }
            },
            () => !this.loading() && !this.submitting()
        );
        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
            const id = params.get('id');
            this.detailMode.set(id !== null);
            this.submitted.set(false);
            if (id) {
                this.loadDetail(id);
            } else {
                this.selectedRequest.set(null);
                this.load();
                this.loadAttention();
            }
        });
        this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
            this.submitted.set(params.get('submitted') === '1');
            const request = this.selectedRequest();
            if (this.submitted() && request) this.announceSubmission(request);
        });
    }

    protected load(page = this.page()): void {
        this.listSubscription?.unsubscribe();
        const query: CitizenRequestQuery = {
            page,
            page_size: PAGE_SIZE,
            sort_by: 'created_at',
            sort_order: 'desc',
            mine: true
        };
        const status = this.statusFilter();
        if (status) query.status = status;

        this.loading.set(true);
        this.error.set(null);
        this.listSubscription = this.requestsApi
            .list(query)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: (result: CitizenRequestPage) => {
                    if (result.total_pages > 0 && result.page > result.total_pages) {
                        this.load(result.total_pages);
                        return;
                    }
                    this.requests.set(result.items);
                    this.total.set(result.total);
                    this.page.set(result.page);
                    this.pages.set(Math.max(1, result.total_pages));
                },
                error: (error: unknown) => this.error.set(apiErrorMessage(error))
            });
    }

    protected filterChanged(status: RequestStatus | null): void {
        this.statusFilter.set(status);
        this.load(1);
    }

    protected create(): void {
        if (this.submitting()) return;
        const citizenId = this.auth.user()?.id;
        if (!citizenId) {
            this.error.set('Connectez-vous pour envoyer une demande.');
            return;
        }

        const payload: CreateCitizenRequestIn = {
            ...this.form,
            priority: 'Normale',
            status: 'Nouveau',
            citizen_id: citizenId,
            assigned_agent_id: null
        };
        this.submitting.set(true);
        this.error.set(null);
        this.requestsApi
            .create(payload)
            .pipe(finalize(() => this.submitting.set(false)))
            .subscribe({
                next: (request) => {
                    this.form = { ...EMPTY_FORM };
                    void this.router.navigate(['/home/my-requests', request.id], { queryParams: { submitted: 1 } });
                },
                error: (error: unknown) => this.error.set(apiErrorMessage(error))
            });
    }

    protected pageBy(offset: number): void {
        const next = this.page() + offset;
        if (next < 1 || next > this.pages() || this.loading()) return;
        this.load(next);
    }

    protected markNotificationRead(notification: CitizenNotification): void {
        this.notifications.update((items) => items.filter((item) => item.key !== notification.key));
        this.notificationsApi.markRead(notification.key).subscribe({
            error: (error: unknown) => this.attentionError.set(`La notification n’a pas pu être marquée comme lue : ${apiErrorMessage(error)}`)
        });
    }

    private loadDetail(id: string): void {
        this.detailSubscription?.unsubscribe();
        if (this.selectedRequest()?.id !== id) this.selectedRequest.set(null);
        this.loading.set(true);
        this.error.set(null);
        this.detailSubscription = this.requestsApi
            .get(id)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: (request) => {
                    this.selectedRequest.set(request);
                    if (this.submitted()) this.announceSubmission(request);
                },
                error: (error: unknown) => {
                    this.error.set(error instanceof HttpErrorResponse && error.status === 404 ? 'Cette demande est introuvable.' : apiErrorMessage(error));
                }
            });
    }

    private loadAttention(): void {
        this.attentionSubscription?.unsubscribe();
        this.attentionSubscription = forkJoin({
            notifications: this.notificationsApi.list(),
            pending: this.requestsApi.list({
                page: 1,
                page_size: PAGE_SIZE,
                status: 'En attente',
                sort_by: 'created_at',
                sort_order: 'desc',
                mine: true
            })
        })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: ({ notifications, pending }) => {
                    this.notifications.set(notifications.items.filter((item) => !item.is_read));
                    this.actionable.set(pending.items);
                },
                error: (error: unknown) => this.attentionError.set(`Les éléments à surveiller n’ont pas pu être chargés : ${apiErrorMessage(error)}`)
            });
    }

    private announceSubmission(request: CitizenRequest): void {
        if (this.announcedSubmissionId === request.id) return;
        this.announcedSubmissionId = request.id;
        this.messages.add({
            severity: 'success',
            summary: 'Demande envoyée',
            detail: `Référence #${request.id.slice(0, 8)} · ${request.status}.`,
            life: 5000
        });
    }
}
