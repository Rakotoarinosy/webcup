import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { ConsultationDetail } from './consultation-detail';
import { Ideas } from './ideas';
import { MyParticipation } from './my-participation';
import { Consultation, MyParticipation as MyParticipationData, ratingText, share } from './participation.model';
import { ParticipationService } from './participation.service';
import { ServiceReviews } from './service-reviews';

const citizen = { user: () => ({ name: 'Awa' }), hasRole: (...roles: string[]) => roles.includes('citizen') };
const route = (id: string) => ({ provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id }) } } });

async function settle<T>(fixture: ComponentFixture<T>): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
}

const text = (fixture: ComponentFixture<unknown>) => (fixture.nativeElement as HTMLElement).textContent ?? '';

describe('participation helpers', () => {
    it('says ratings and shares in words', () => {
        expect(ratingText(null)).toBe('Pas encore de note');
        expect(ratingText(4.5)).toBe('4,5 sur 5');
        expect(share(1, 3)).toBe(33);
        expect(share(0, 0)).toBe(0);
    });
});

describe('ConsultationDetail', () => {
    const vote: Consultation = {
        id: 'v1',
        title: 'Priorité du jardin',
        question: 'Quel aménagement en premier ?',
        description: '',
        kind: 'Vote à choix',
        options: ['Parcelles', 'Verger'],
        rules: 'Une seule réponse par habitant.',
        opens_at: '2026-10-01T08:00:00Z',
        closes_at: '2026-12-01T08:00:00Z',
        phase: 'Ouverte',
        is_published: true,
        project_id: null,
        project_title: null,
        results: null,
        decision: null,
        decided_at: null,
        decided_by: null
    };
    let api: jasmine.SpyObj<ParticipationService>;
    let fixture: ComponentFixture<ConsultationDetail>;

    beforeEach(async () => {
        api = jasmine.createSpyObj<ParticipationService>('ParticipationService', ['consultation', 'myResponse', 'answer']);
        api.consultation.and.returnValue(of(vote));
        api.myResponse.and.returnValue(of(null));
        api.answer.and.returnValue(of({ id: 'r1', reference: 'CP-20261004-AAAA1111', consultation_id: 'v1', choice: 'Verger', comment: null, created_at: '2026-10-04T08:00:00Z', updated_at: '2026-10-04T08:00:00Z' }));
        await TestBed.configureTestingModule({
            imports: [ConsultationDetail],
            providers: [provideRouter([]), route('v1'), { provide: ParticipationService, useValue: api }, { provide: AuthService, useValue: citizen }]
        }).compileComponents();
        fixture = TestBed.createComponent(ConsultationDetail);
        await settle(fixture);
    });

    it('shows the rules and refuses an empty vote accessibly', async () => {
        expect(text(fixture)).toContain('Une seule réponse par habitant.');
        (fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement).click();
        await settle(fixture);
        expect(api.answer).not.toHaveBeenCalled();
        const group = fixture.nativeElement.querySelector('fieldset[role="radiogroup"]') as HTMLElement;
        expect(group.getAttribute('aria-invalid')).toBe('true');
        expect(fixture.nativeElement.querySelector('#choice-error').textContent).toContain('Choisissez');
    });

    it('confirms the recorded vote with its reference in a status message', async () => {
        (fixture.nativeElement.querySelector('#choice-1') as HTMLInputElement).click();
        await settle(fixture);
        (fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement).click();
        await settle(fixture);
        expect(api.answer).toHaveBeenCalledWith('v1', 'Verger', null);
        const status = fixture.nativeElement.querySelector('[role="status"]') as HTMLElement;
        expect(status.textContent).toContain('CP-20261004-AAAA1111');
        expect(status.textContent).toContain('bien été enregistré');
    });
});

describe('ServiceReviews', () => {
    it('offers labelled ratings, not only stars, and shows the average in words', async () => {
        const api = jasmine.createSpyObj<ParticipationService>('ParticipationService', ['serviceReviews', 'myReview', 'review']);
        api.serviceReviews.and.returnValue(
            of({ service_id: 's1', service_name: 'État civil', average: 4, count: 1, reviews: [{ id: 'a', rating: 4, comment: 'Rapide.', created_at: '2026-10-01T08:00:00Z', updated_at: '2026-10-01T08:00:00Z', response: 'Merci !', answered_by: 'Mairie', answered_at: '2026-10-02T08:00:00Z' }] })
        );
        api.myReview.and.returnValue(of(null));
        await TestBed.configureTestingModule({
            imports: [ServiceReviews],
            providers: [provideRouter([]), route('s1'), { provide: ParticipationService, useValue: api }, { provide: AuthService, useValue: citizen }]
        }).compileComponents();
        const fixture = TestBed.createComponent(ServiceReviews);
        await settle(fixture);

        expect(text(fixture)).toContain('4 sur 5');
        expect(text(fixture)).toContain('Merci !');
        const label = fixture.nativeElement.querySelector('label[for="rating-5"]') as HTMLElement;
        expect(label.textContent).toContain('Très satisfait');
        (fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement).click();
        await settle(fixture);
        expect(api.review).not.toHaveBeenCalled();
        expect(fixture.nativeElement.querySelector('#rating-error').textContent).toContain('note de 1 à 5');
        expect(fixture.nativeElement.querySelector('#review-comment').getAttribute('aria-describedby')).toContain('review-comment-error');
    });
});

describe('Ideas', () => {
    it('lets a resident support someone else’s published idea', async () => {
        const api = jasmine.createSpyObj<ParticipationService>('ParticipationService', ['ideas', 'mine', 'toggleSupport', 'submitIdea']);
        api.ideas.and.returnValue(
            of([{ id: 'i1', reference: 'ID-1', title: 'Des bancs', description: 'Au marché.', theme: 'Cadre de vie', district: null, status: 'Reçue', support_count: 0, response: null, answered_by: null, answered_at: null, created_at: '2026-10-01T08:00:00Z' }])
        );
        api.mine.and.returnValue(of({ ideas: [], consultation_responses: [], reviews: [], supported_idea_ids: [] }));
        api.toggleSupport.and.returnValue(of({ supported: true, support_count: 1 }));
        await TestBed.configureTestingModule({
            imports: [Ideas],
            providers: [provideRouter([]), { provide: ParticipationService, useValue: api }, { provide: AuthService, useValue: citizen }]
        }).compileComponents();
        const fixture = TestBed.createComponent(Ideas);
        await settle(fixture);

        const support = fixture.nativeElement.querySelector('button[aria-label="Soutenir l’idée : Des bancs"]') as HTMLButtonElement;
        support.click();
        await settle(fixture);
        expect(api.toggleSupport).toHaveBeenCalledWith('i1');
        expect(text(fixture)).toContain('1 soutien(s)');
        expect(text(fixture)).toContain('Votre soutien à « Des bancs » est enregistré.');
    });
});

describe('MyParticipation', () => {
    it('lists every contribution with its reference, dated steps and the city answers', async () => {
        const data: MyParticipationData = {
            ideas: [
                {
                    id: 'i1',
                    reference: 'ID-20261001-AAAA',
                    title: 'Des bancs',
                    description: 'Au marché.',
                    theme: 'Cadre de vie',
                    district: null,
                    status: 'Retenue',
                    support_count: 3,
                    response: 'Quatre bancs au printemps.',
                    answered_by: 'Mairie',
                    answered_at: '2026-10-03T08:00:00Z',
                    created_at: '2026-10-01T08:00:00Z',
                    visibility: 'Publiée',
                    moderation_note: null,
                    updated_at: '2026-10-03T08:00:00Z',
                    history: [
                        { status: 'Reçue', at: '2026-10-01T08:00:00Z', note: null, by: null },
                        { status: 'Retenue', at: '2026-10-03T08:00:00Z', note: 'Quatre bancs au printemps.', by: 'Mairie' }
                    ]
                }
            ],
            consultation_responses: [
                {
                    id: 'r1',
                    reference: 'CP-20261002-BBBB',
                    consultation_id: 'v1',
                    choice: 'Verger',
                    comment: null,
                    created_at: '2026-10-02T08:00:00Z',
                    updated_at: '2026-10-02T08:00:00Z',
                    consultation_title: 'Priorité du jardin',
                    kind: 'Vote à choix',
                    phase: 'Décision publiée',
                    closes_at: '2026-10-03T08:00:00Z',
                    decision: 'Le verger sera planté.',
                    decided_at: '2026-10-04T08:00:00Z'
                }
            ],
            reviews: [],
            supported_idea_ids: []
        };
        const api = jasmine.createSpyObj<ParticipationService>('ParticipationService', ['mine']);
        api.mine.and.returnValue(of(data));
        await TestBed.configureTestingModule({ imports: [MyParticipation], providers: [provideRouter([]), { provide: ParticipationService, useValue: api }] }).compileComponents();
        const fixture = TestBed.createComponent(MyParticipation);
        await settle(fixture);

        const steps = Array.from(fixture.nativeElement.querySelectorAll('ol[aria-label="Suivi de l’idée ID-20261001-AAAA"] li')) as HTMLElement[];
        expect(steps.length).toBe(2);
        expect(steps.every((step) => step.querySelector('time') !== null)).toBeTrue();
        expect(text(fixture)).toContain('Quatre bancs au printemps.');
        expect(text(fixture)).toContain('CP-20261002-BBBB');
        expect(text(fixture)).toContain('Le verger sera planté.');
        expect(text(fixture)).toContain('Vous n’avez encore donné aucun avis');
    });
});
