import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = (window as any).__env.API_URL;
  private apiKey = (window as any).__env.API_KEY;

  constructor(private http: HttpClient) {}

  getIndicatorData(indicator: string, startDate: string, endDate: string): Observable<any> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startYear = start.getFullYear();
    const startMonth = (start.getMonth() + 1).toString().padStart(2, '0');
    const endYear = end.getFullYear();
    const endMonth = (end.getMonth() + 1).toString().padStart(2, '0');
    const url = `${this.apiUrl}/${indicator}/periodo/${startYear}/${startMonth}/${endYear}/${endMonth}?apikey=${this.apiKey}&formato=json`;
  
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error(`Error en la petición de datos del indicador: ${indicator}`, error);
        return throwError(() => error);
      })
    );
  }

  private isValidDateRange(startDate: string, endDate: string): boolean {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= end;
  }

}
