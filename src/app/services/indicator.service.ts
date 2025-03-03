import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IndicatorService {
  private indicatorNameSubject = new BehaviorSubject<string>('');
  private titleSubject = new BehaviorSubject<string>('');
  indicatorName$ = this.indicatorNameSubject.asObservable();
  title$ = this.titleSubject.asObservable();
  
  setIndicatorName(name: string) {
    this.indicatorNameSubject.next(name);
  }
  
  setTitle(newTitle: string) {
    this.titleSubject.next(newTitle);
  }
}
