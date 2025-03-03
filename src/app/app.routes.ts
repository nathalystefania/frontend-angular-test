import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { IndicatorsComponent } from './features/indicators/indicators.component';
import { IndicatorsDetailComponent } from './features/indicators-detail/indicators-detail.component';
import { IndicatorsChartComponent } from './features/indicators-chart/indicators-chart.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [    
            { 
                path: '', component: IndicatorsComponent 
            },
            { 
                path: 'indicator/:id', component: IndicatorsDetailComponent
            },
            { 
                path: 'indicator/:id/chart', component: IndicatorsChartComponent
            }
        ]
    },
    { 
        path: '**', redirectTo: ''
    }
];
