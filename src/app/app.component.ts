import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndicatorService } from './services/indicator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Frontend Nathaly';

  constructor(private indicatorService: IndicatorService) {}
  
  ngOnInit() {
    this.indicatorService.setTitle(this.title);
  }
}
