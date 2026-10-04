import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import {
    CityProject,
    Consultation,
    ConsultationIn,
    ConsultationResponse,
    Contribution,
    Idea,
    IdeaAdmin,
    IdeaIn,
    IdeaStatus,
    IdeaVisibility,
    MyParticipation,
    ProjectIn,
    ProjectStatus,
    PublicIdea,
    Review,
    ReviewAdmin,
    ServiceRating,
    ServiceReviews
} from './participation.model';

function params(values: Record<string, string | null | undefined>): HttpParams {
    let result = new HttpParams();
    for (const [key, value] of Object.entries(values)) {
        if (value) result = result.set(key, value);
    }
    return result;
}

/** Client HTTP de la participation : /api/v1/participation. */
@Injectable({ providedIn: 'root' })
export class ParticipationService {
    private readonly http = inject(HttpClient);
    private readonly url = `${environment.apiUrl}/participation`;

    mine(): Observable<MyParticipation> {
        return this.http.get<MyParticipation>(`${this.url}/mine`);
    }

    // projets
    projects(status: ProjectStatus | null = null, district: string | null = null): Observable<CityProject[]> {
        return this.http.get<CityProject[]>(`${this.url}/projects`, { params: params({ status, district }) });
    }

    project(id: string): Observable<CityProject> {
        return this.http.get<CityProject>(`${this.url}/projects/${encodeURIComponent(id)}`);
    }

    managedProjects(): Observable<CityProject[]> {
        return this.http.get<CityProject[]>(`${this.url}/projects/manage`);
    }

    createProject(payload: ProjectIn): Observable<CityProject> {
        return this.http.post<CityProject>(`${this.url}/projects`, payload);
    }

    updateProject(id: string, payload: Partial<ProjectIn>): Observable<CityProject> {
        return this.http.patch<CityProject>(`${this.url}/projects/${encodeURIComponent(id)}`, payload);
    }

    publishNews(id: string, title: string, content: string): Observable<CityProject> {
        return this.http.post<CityProject>(`${this.url}/projects/${encodeURIComponent(id)}/updates`, { title, content });
    }

    // consultations
    consultations(projectId: string | null = null): Observable<Consultation[]> {
        return this.http.get<Consultation[]>(`${this.url}/consultations`, { params: params({ project_id: projectId }) });
    }

    consultation(id: string): Observable<Consultation> {
        return this.http.get<Consultation>(`${this.url}/consultations/${encodeURIComponent(id)}`);
    }

    managedConsultations(): Observable<Consultation[]> {
        return this.http.get<Consultation[]>(`${this.url}/consultations/manage`);
    }

    createConsultation(payload: ConsultationIn): Observable<Consultation> {
        return this.http.post<Consultation>(`${this.url}/consultations`, payload);
    }

    updateConsultation(id: string, payload: Partial<ConsultationIn>): Observable<Consultation> {
        return this.http.patch<Consultation>(`${this.url}/consultations/${encodeURIComponent(id)}`, payload);
    }

    closeConsultation(id: string): Observable<Consultation> {
        return this.http.post<Consultation>(`${this.url}/consultations/${encodeURIComponent(id)}/close`, {});
    }

    publishDecision(id: string, decision: string): Observable<Consultation> {
        return this.http.post<Consultation>(`${this.url}/consultations/${encodeURIComponent(id)}/decision`, { decision });
    }

    contributions(id: string): Observable<Contribution[]> {
        return this.http.get<Contribution[]>(`${this.url}/consultations/${encodeURIComponent(id)}/contributions`);
    }

    myResponse(id: string): Observable<ConsultationResponse | null> {
        return this.http.get<ConsultationResponse | null>(`${this.url}/consultations/${encodeURIComponent(id)}/response`);
    }

    answer(id: string, choice: string | null, comment: string | null): Observable<ConsultationResponse> {
        return this.http.put<ConsultationResponse>(`${this.url}/consultations/${encodeURIComponent(id)}/response`, { choice, comment });
    }

    // idées
    ideas(status: IdeaStatus | null = null): Observable<PublicIdea[]> {
        return this.http.get<PublicIdea[]>(`${this.url}/ideas`, { params: params({ status }) });
    }

    submitIdea(payload: IdeaIn): Observable<Idea> {
        return this.http.post<Idea>(`${this.url}/ideas`, payload);
    }

    toggleSupport(id: string): Observable<{ supported: boolean; support_count: number }> {
        return this.http.post<{ supported: boolean; support_count: number }>(`${this.url}/ideas/${encodeURIComponent(id)}/support`, {});
    }

    managedIdeas(status: IdeaStatus | null = null, visibility: IdeaVisibility | null = null): Observable<IdeaAdmin[]> {
        return this.http.get<IdeaAdmin[]>(`${this.url}/ideas/manage`, { params: params({ status, visibility }) });
    }

    changeIdeaStatus(id: string, status: IdeaStatus, response: string | null): Observable<IdeaAdmin> {
        return this.http.post<IdeaAdmin>(`${this.url}/ideas/${encodeURIComponent(id)}/status`, { status, response });
    }

    moderateIdea(id: string, visibility: IdeaVisibility, note: string | null): Observable<IdeaAdmin> {
        return this.http.post<IdeaAdmin>(`${this.url}/ideas/${encodeURIComponent(id)}/moderation`, { visibility, note });
    }

    // avis sur les services
    ratings(): Observable<ServiceRating[]> {
        return this.http.get<ServiceRating[]>(`${this.url}/services/ratings`);
    }

    serviceReviews(serviceId: string): Observable<ServiceReviews> {
        return this.http.get<ServiceReviews>(`${this.url}/services/${encodeURIComponent(serviceId)}/reviews`);
    }

    myReview(serviceId: string): Observable<Review | null> {
        return this.http.get<Review | null>(`${this.url}/services/${encodeURIComponent(serviceId)}/review`);
    }

    review(serviceId: string, rating: number, comment: string): Observable<Review> {
        return this.http.put<Review>(`${this.url}/services/${encodeURIComponent(serviceId)}/review`, { rating, comment });
    }

    managedReviews(): Observable<ReviewAdmin[]> {
        return this.http.get<ReviewAdmin[]>(`${this.url}/reviews/manage`);
    }

    answerReview(id: string, response: string): Observable<ReviewAdmin> {
        return this.http.post<ReviewAdmin>(`${this.url}/reviews/${encodeURIComponent(id)}/answer`, { response });
    }

    moderateReview(id: string, hidden: boolean): Observable<ReviewAdmin> {
        return this.http.post<ReviewAdmin>(`${this.url}/reviews/${encodeURIComponent(id)}/moderation`, { hidden });
    }
}
