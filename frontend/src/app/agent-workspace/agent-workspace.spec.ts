import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AgentWorkspaceService } from './agent-workspace.service';
import { AgentWorkspace } from './agent-workspace';

describe('AgentWorkspace pending counter', () => {
    let fixture: ComponentFixture<AgentWorkspace>;
    let summary: { total: number; nouveau: number; en_cours: number; en_attente: number; resolu: number; rejete: number };

    beforeEach(async () => {
        summary = { total: 4, nouveau: 2, en_cours: 1, en_attente: 1, resolu: 0, rejete: 0 };
        await TestBed.configureTestingModule({
            imports: [AgentWorkspace],
            providers: [
                {
                    provide: AgentWorkspaceService,
                    useValue: {
                        list: () => of({ items: [], total: 0, page: 1, page_size: 20, pages: 1 }),
                        summary: () => of(summary),
                        resolve: () => of({})
                    }
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AgentWorkspace);
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('shows new and waiting requests in the pending count', () => {
        expect(fixture.nativeElement.textContent).toContain('Demandes à prendre en charge');
        expect(fixture.nativeElement.textContent).toContain('3');
    });

    it('uses a neutral message when nothing is waiting', async () => {
        summary = { total: 0, nouveau: 0, en_cours: 0, en_attente: 0, resolu: 0, rejete: 0 };
        const refreshButton = [...fixture.nativeElement.querySelectorAll('button')].find((button) => button.textContent.includes('Actualiser')) as HTMLButtonElement;
        refreshButton.click();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('Aucune demande ne nécessite une prise en charge.');
    });
});
