import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Notifications } from './notifications';
import { MunicipalContentService } from '@/app/municipal/municipal-content.service';
import { of } from 'rxjs';

describe('Notifications', () => {
    let component: Notifications;
    let fixture: ComponentFixture<Notifications>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Notifications],
            providers: [{ provide: MunicipalContentService, useValue: { publications: () => of([]) } }]
        }).compileComponents();

        fixture = TestBed.createComponent(Notifications);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
