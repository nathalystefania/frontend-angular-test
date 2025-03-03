import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { IndicatorService } from '../../services/indicator.service';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-indicators-chart',
  imports: [NgChartsModule, CommonModule],
  templateUrl: './indicators-chart.component.html',
  styleUrl: './indicators-chart.component.sass'
})
export class IndicatorsChartComponent {
  indicatorName: string = '';
  chartData: any[] = [];
  errorMessage: string = '';
  isBrowser: boolean;
  mainKey: string | undefined;
  currentDate: Date = new Date();
  public lineChartType: ChartType = 'line';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private indicatorService: IndicatorService,
  ) {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
          const indicator = params.get('id');
          if (indicator) {
              this.indicatorName = indicator;
              this.indicatorService.setIndicatorName(indicator);
              this.fetchChartData(indicator);
          }
      });
  }

  fetchChartData(indicator: string): void {
      const today = new Date();
      let startDate;

      if (['dolar', 'euro', 'uf'].includes(indicator)) {
          startDate = this.calculateStartDate(10); 
      } else if (['ipc', 'utm'].includes(indicator)) {
          startDate = this.calculateStartDateFromYearStart();
      }

      if (startDate) {
          this.apiService.getIndicatorData(indicator, startDate, this.formatDate(today))
              .subscribe(
                  (data) => {
                      const keyMap: { [key: string]: string } = {
                          dolar: 'Dolares',
                          euro: 'Euros',
                          uf: 'UFs',
                          ipc: 'IPCs',
                          utm: 'UTMs'
                      };
                      this.mainKey = keyMap[indicator.toLowerCase()];
                      const dataKey = keyMap[indicator.toLowerCase()];
                      this.chartData = data[dataKey] || [];
                  },
                  (error) => {
                      console.error(`Error fetching ${indicator} data:`, error);
                      this.errorMessage = `Error al cargar los datos de ${indicator}`;
                  }
              );
      }
  }

  calculateStartDate(days: number): string {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return this.formatDate(date);
  }

  calculateStartDateFromYearStart(): string {
      const date = new Date(new Date().getFullYear(), 0, 1);
      return this.formatDate(date);
  }

  formatDate(date: Date): string {
      return date.toISOString().split('T')[0]; 
  }

  getChartData() {
      return [{
            data: this.chartData.map((item: any) => parseFloat(item.Valor.replace(',', '.'))),
            label: this.indicatorName.toUpperCase(),
            backgroundColor: '#002884',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
      }];
  }

  getChartLabels() {
      return this.chartData.map((item: any) => item.Fecha);
  }

  getTodayValue(): string {
    if (this.chartData && this.chartData.length > 0) {
      const todayValue = this.chartData[this.chartData.length - 1]?.Valor || '0';
      const mainKey = this.mainKey || '';
      console.log('mainKey', mainKey)
      return `${this.getPrefix(mainKey)}${todayValue}${this.getSufix(mainKey)}`;
    }
    return 'Sin datos';
  }

  getPrefix(indicatorName: string): string {
    switch (indicatorName.toLowerCase()) {
      case 'ipcs':
        return '';
      default:
        return '$';
    }
  }
  
  getSufix(indicatorName: string): string {
    switch (indicatorName.toLowerCase()) {
      case 'ipcs':
        return '%';
      default:
        return '';
    }
  }
}
