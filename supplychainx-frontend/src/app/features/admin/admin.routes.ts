import { Routes } from '@angular/router';

/**
 * Routes du module Administration
 * Accessible uniquement aux utilisateurs avec le rôle: ADMIN
 * 
 * Fonctionnalités:
 * - Gestion des utilisateurs (CRUD)
 * - Affectation des rôles
 * - Supervision globale du système
 * - Dashboard administrateur avec statistiques globales
 */
export const ADMIN_ROUTES: Routes = [
  // Redirection par défaut vers le dashboard
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  
  // Dashboard Admin
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/admin-dashboard.component')
      .then(m => m.AdminDashboardComponent)
  }
];
