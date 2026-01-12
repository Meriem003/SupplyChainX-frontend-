import { Routes } from '@angular/router';

export const DELIVERY_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/delivery-dashboard.component')
      .then(m => m.DeliveryDashboardComponent)
  }
];
