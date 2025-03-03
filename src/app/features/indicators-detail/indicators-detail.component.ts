import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { IndicatorService } from '../../services/indicator.service';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-indicators-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './indicators-detail.component.html',
  styleUrl: './indicators-detail.component.sass'
})
export class IndicatorsDetailComponent {
  indicatorName: string = '';
  indicatorValues: any[] = [];
  indicatorData: any = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private indicatorService: IndicatorService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const indicator = params.get('id');
      if (indicator) {
        this.indicatorName = indicator;
        this.indicatorService.setIndicatorName(indicator);
        this.fetchIndicatorData(indicator);
      }
    });
  }

  fetchIndicatorData(indicator: string): void {
    const today = new Date();
    let startDate;

    if (['dolar', 'euro', 'uf'].includes(indicator)) {
      startDate = this.calculateStartDate(30);
    } else if (['ipc', 'utm'].includes(indicator)) {
      startDate = this.calculateStartDateFromYearStart();
    }

    if (startDate) {
      this.apiService.getIndicatorData(indicator, startDate, this.formatDate(today))
        .subscribe(
          (data) => {
            const mainKey = Object.keys(data)[0]; 

            if (mainKey && data && Object.keys(data).length > 0) {
              const values = data[mainKey] || [];
              this.indicatorData = {
                name: mainKey,
                values: values.map((item: { Valor: any; }) => ({
                  ...item,
                  formattedValue: `${this.getPrefix(mainKey)}${item.Valor}${this.getSufix(mainKey)}`
                }))
              };
              this.errorMessage = '';
              console.log('Nombre del indicador:', mainKey);
              console.log('Datos del indicador:', this.indicatorData);
            }
          },
          (error) => {
            console.error(`Error fetching ${indicator}:`, error);
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
    const date = new Date();
    return `${date.getFullYear()}-01-01`;
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
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
