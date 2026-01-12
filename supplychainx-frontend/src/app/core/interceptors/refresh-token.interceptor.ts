import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/token.service';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/login') && !req.url.includes('/auth/refresh')) {
        const refreshToken = tokenService.getRefreshToken();

        if (refreshToken) {
          return authService.refreshToken().pipe(
            switchMap(() => {
              const newToken = tokenService.getAccessToken();
              
              const clonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              
              return next(clonedRequest);
            }),
            catchError((refreshError) => {
              console.error('Échec du refresh token:', refreshError);
              authService.logout();
              router.navigate(['/login']);
              return throwError(() => refreshError);
            })
          );
        } else {
          authService.logout();
          router.navigate(['/login']);
        }
      }

      return throwError(() => error);
    })
  );
};
