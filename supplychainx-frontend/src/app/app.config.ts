import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { refreshTokenInterceptor } from './core/interceptors/refresh-token.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor,           // 1. Ajoute le token à chaque requête
        refreshTokenInterceptor,   // 2. Rafraîchit le token si expiré
        errorInterceptor          // 3. Gère les erreurs
      ])
    )
  ]
};
