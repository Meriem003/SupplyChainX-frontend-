import { Routes } from '@angular/router';

export const PROCUREMENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/procurement-dashboard.component')
      .then(m => m.ProcurementDashboardComponent)
  }
];
