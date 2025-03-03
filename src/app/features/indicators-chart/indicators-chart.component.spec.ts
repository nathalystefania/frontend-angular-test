import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsChartComponent } from './indicators-chart.component';

describe('IndicatorsChartComponent', () => {
  let component: IndicatorsChartComponent;
  let fixture: ComponentFixture<IndicatorsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicatorsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicatorsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
