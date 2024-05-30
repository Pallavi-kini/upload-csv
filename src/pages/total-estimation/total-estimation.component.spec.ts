import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEstimationComponent } from './total-estimation.component';

describe('TotalEstimationComponent', () => {
  let component: TotalEstimationComponent;
  let fixture: ComponentFixture<TotalEstimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalEstimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
