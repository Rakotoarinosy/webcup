import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CitizenRequestService } from '@/app/requests/request.service';
import { AgentWorkspace } from './agent-workspace';

describe('AgentWorkspace pending counter', () => {
    let fixture: ComponentFixture<AgentWorkspace>;
    let byStatus: Record<string, number>;

    beforeEach(async () => {
        byStatus = { Nouveau: 0, 'En cours': 2, 'En attente': 1, Résolu: 0, Rejeté: 0 };
        await TestBed.configureTestingModule({
            imports: [AgentWorkspace],
            providers: [
                {
                    provide: CitizenRequestService,
                    useValue: {
                        list: () => of({ items: [], total: 0, page: 1, page_size: 20, total_pages: 1 }),
                        dashboard: () => of({ total: 3, by_status: byStatus }),
                        changeStatus: () => of({}),
                        events: () => of([])
                    }
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AgentWorkspace);
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('counts in-progress and waiting requests as to be handled', () => {
        expect(fixture.nativeElement.textContent).toContain('Demandes à traiter');
        expect(fixture.nativeElement.textContent).toContain('3');
    });

    it('uses a neutral message when nothing is waiting', async () => {
        byStatus = { Nouveau: 0, 'En cours': 0, 'En attente': 0, Résolu: 0, Rejeté: 0 };
        const refreshButton = [...fixture.nativeElement.querySelectorAll('button')].find((button) => button.textContent.includes('Actualiser')) as HTMLButtonElement;
        refreshButton.click();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('Aucune demande ne nécessite une prise en charge.');
    });
});
