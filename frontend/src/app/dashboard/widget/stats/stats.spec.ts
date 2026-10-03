import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Stats } from './stats';

describe('Stats', () => {
  let component: Stats;
  let fixture: ComponentFixture<Stats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stats],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
