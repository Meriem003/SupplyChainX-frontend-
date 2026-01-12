import { Routes } from '@angular/router';

export const PRODUCTION_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/production-dashboard.component')
      .then(m => m.ProductionDashboardComponent)
  }
];
