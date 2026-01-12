import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Données invalides';
          break;

        case 401:
          errorMessage = 'Session expirée';
          break;

        case 403:
          errorMessage = 'Accès refusé';
          router.navigate(['/unauthorized']);
          break;

        case 404:
          errorMessage = error.error?.message || 'Ressource non trouvée';
          break;

        case 500:
          errorMessage = 'Erreur serveur, veuillez réessayer plus tard';
          break;

        case 0:
          errorMessage = 'Impossible de se connecter au serveur';
          break;

        default:
          errorMessage = error.error?.message || 'Une erreur est survenue';
      }

      console.error('Erreur HTTP:', errorMessage, error);
      return throwError(() => ({ message: errorMessage, status: error.status }));
    })
  );
};
