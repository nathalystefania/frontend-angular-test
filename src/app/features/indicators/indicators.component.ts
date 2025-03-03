import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-indicators',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.sass'
})
export class IndicatorsComponent implements OnInit {
  indicators: any[] = [];
  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchIndicators();
  }

  fetchIndicators(): void {
    const today = new Date().toISOString().split('T')[0];
    const startDate = this.calculateStartDate();
  
    const indicatorList = ['dolar', 'euro', 'uf', 'utm', 'ipc'];
    const indicatorAliases: { [key in 'dolar' | 'euro' | 'uf' | 'utm' | 'ipc']: string } = {
      dolar: 'USD',
      euro: 'EUR',
      uf: 'UF',
      utm: 'UTM',
      ipc: 'IPC'
    };
  
    indicatorList.forEach(indicator => {
      this.apiService.getIndicatorData(indicator, startDate, today).subscribe(
        (data) => {
          const key = Object.keys(data)[0];
          const values = data[key] || [];
          this.indicators.push({ 
            name: indicator, 
            alias: indicatorAliases[indicator as keyof typeof indicatorAliases] || indicator, 
            values
          });
          this.indicators.sort((a, b) => a.name.localeCompare(b.name));
        },
        (error) => {
          console.error(`Error fetching ${indicator}:`, error);
          this.errorMessage = `Error al cargar ${indicator}`;
        }
      );
    });
  }
  
  getPrefix(indicatorName: string): string {
    switch (indicatorName.toLowerCase()) {
      case 'ipc':
        return '';
      default:
        return '$';
    }
  }
  
  getSufix(indicatorName: string): string {
    switch (indicatorName.toLowerCase()) {
      case 'ipc':
        return '%';
      default:
        return '';
    }
  }

  
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}/${month}`;
  }
  
  calculateStartDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  }

  goToDetail(indicator: string): void {
    this.router.navigate(['/indicator', indicator]);
  }
  
  goToChart(indicator: string): void {
    this.router.navigate(['/indicator', indicator, 'chart']);
  }
}
