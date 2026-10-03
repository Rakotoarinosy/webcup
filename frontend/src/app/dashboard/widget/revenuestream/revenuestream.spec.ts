import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Revenuestream } from './revenuestream';

describe('Revenuestream', () => {
  let component: Revenuestream;
  let fixture: ComponentFixture<Revenuestream>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Revenuestream]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Revenuestream);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
