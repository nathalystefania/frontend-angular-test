import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { IndicatorService } from '../services/indicator.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatIconButton
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.sass'
})
export class LayoutComponent {
  showBackButton = false;
  indicatorName = '';
  title: string = '';

  constructor(
    private location: Location,
    private router: Router,
    private indicatorService: IndicatorService,
    @Inject(ChangeDetectorRef) private cdr: ChangeDetectorRef
  ) {
      this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
              this.showBackButton = event.url !== '/';
          }
          if (event instanceof NavigationEnd && event.url === '/') {
            this.indicatorService.setIndicatorName('');
          }
      });
      
      this.indicatorService.indicatorName$.subscribe((name) => {
        setTimeout(() => {
          this.indicatorName = name;
          this.cdr.markForCheck();
        });
      });
      this.indicatorService.title$.subscribe((newTitle) => {
        this.title = newTitle;
      });
  }

  goBack(): void {
      this.location.back();
  }

  isInRoute(route: string): boolean {
    return this.router.url === route;
  }
}
