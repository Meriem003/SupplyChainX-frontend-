import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { TokenService } from '../auth/token.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[] || [];

  if (allowedRoles.length === 0) {
    return true;
  }

  // Essayer d'abord depuis le token
  let userRoles = tokenService.getUserRolesFromToken();
  
  // Si pas de rôles dans le token, essayer depuis le user stocké
  if (!userRoles || userRoles.length === 0) {
    const user = tokenService.getUser() as any;
    console.log('👤 User depuis storage:', user);
    userRoles = user?.roles || [];
  }

  console.log('🔍 Vérification des rôles');
  console.log('Rôles requis:', allowedRoles);
  console.log('Rôles utilisateur:', userRoles);

  const hasRole = userRoles.some((role: string) => allowedRoles.includes(role));

  if (hasRole) {
    console.log('✅ Accès autorisé');
    return true;
  }

  console.warn('🚫 Accès refusé : rôle insuffisant');
  
  router.navigate(['/unauthorized']);
  return false;
};
