import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recentsales } from './recentsales';

describe('Recentsales', () => {
  let component: Recentsales;
  let fixture: ComponentFixture<Recentsales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recentsales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recentsales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
