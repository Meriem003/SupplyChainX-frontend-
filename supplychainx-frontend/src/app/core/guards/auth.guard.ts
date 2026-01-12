import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { TokenService } from '../auth/token.service';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.getAccessToken();

  if (token && !tokenService.isTokenExpired(token)) {
    return true;
  }

  console.warn('🚫 Accès refusé : non connecté');
  router.navigate(['/login']);
  return false;
};
