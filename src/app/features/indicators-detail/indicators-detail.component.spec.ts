import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsDetailComponent } from './indicators-detail.component';

describe('IndicatorsDetailComponent', () => {
  let component: IndicatorsDetailComponent;
  let fixture: ComponentFixture<IndicatorsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicatorsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicatorsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
