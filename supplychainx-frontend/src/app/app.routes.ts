import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { AppLayoutComponent } from './core/layout/app-layout/app-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'login',
    loadComponent: () => import('./features/auth/components/login/login.component')
      .then(m => m.LoginComponent)
  },
  
  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/components/unauthorized/unauthorized.component')
      .then(m => m.UnauthorizedComponent)
  },
  
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'procurement',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'APPROVISIONNEMENT'] },
        loadChildren: () => import('./features/procurement/procurement.routes')
          .then(m => m.PROCUREMENT_ROUTES)
      },
      
      {
        path: 'production',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'PRODUCTION'] },
        loadChildren: () => import('./features/production/production.routes')
          .then(m => m.PRODUCTION_ROUTES)
      },
      
      {
        path: 'delivery',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'LIVRAISON'] },
        loadChildren: () => import('./features/delivery/delivery.routes')
          .then(m => m.DELIVERY_ROUTES)
      },
      
      {
        path: 'admin',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadChildren: () => import('./features/admin/admin.routes')
          .then(m => m.ADMIN_ROUTES)
      }
    ]
  },
  
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component')
      .then(m => m.NotFoundComponent)
  }
];
