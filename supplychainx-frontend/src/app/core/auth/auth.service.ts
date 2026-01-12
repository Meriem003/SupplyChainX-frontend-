import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { TokenService } from './token.service';
import { API_CONFIG } from '../config/api.config';
import { 
  LoginRequest, 
  LoginResponse, 
  RefreshTokenRequest, 
  RefreshTokenResponse, 
  User, 
  AuthState,
  ApiError 
} from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    loading: false,
    error: null
  });

  public authState$ = this.authStateSubject.asObservable();

  private readonly currentUserSignal = signal<User | null>(null);
  private readonly isAuthenticatedSignal = signal<boolean>(false);
  private readonly isLoadingSignal = signal<boolean>(false);

  public currentUser = this.currentUserSignal.asReadonly();
  public isAuthenticated = this.isAuthenticatedSignal.asReadonly();
  public isLoading = this.isLoadingSignal.asReadonly();

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.tokenService.getAccessToken();
    const user = this.tokenService.getUser() as User | null;

    if (token && user && !this.tokenService.isTokenExpired(token)) {
      this.setAuthenticatedState(user, token);
    } else {
      const refreshToken = this.tokenService.getRefreshToken();
      if (refreshToken) {
        this.refreshToken().subscribe({
          error: () => this.clearAuthState()
        });
      } else {
        this.clearAuthState();
      }
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.isLoadingSignal.set(true);

    const url = `${API_CONFIG.baseUrl}${API_CONFIG.auth.login}`;

    return this.http.post<any>(url, credentials).pipe(
      tap((backendResponse: any) => {
        const user: User = {
          id: backendResponse.userId,
          fullName: backendResponse.email.split('@')[0],
          email: backendResponse.email,
          roles: [backendResponse.role],
          active: true
        };

        this.tokenService.setAccessToken(backendResponse.accessToken);
        this.tokenService.setRefreshToken(backendResponse.refreshToken, credentials.rememberMe || false);
        this.tokenService.setUser(user);

        this.setAuthenticatedState(user, backendResponse.accessToken);

        console.log('✅ Connexion réussie:', user.email);
      }),
      catchError(error => {
        this.handleAuthError(error);
        return throwError(() => error);
      }),
      tap(() => this.isLoadingSignal.set(false))
    );
  }

  logout(): void {
    this.isLoadingSignal.set(true);

    const url = `${API_CONFIG.baseUrl}${API_CONFIG.auth.logout}`;
    const refreshToken = this.tokenService.getRefreshToken();

    this.http.post(url, { refreshToken }).subscribe({
      next: () => {
        console.log('✅ Déconnexion réussie côté serveur');
      },
      error: (error) => {
        console.warn('⚠️ Erreur lors de la déconnexion serveur:', error);
      },
      complete: () => {
        this.performLogout();
      }
    });
  }

  private performLogout(): void {
    this.tokenService.clearTokens();
    this.clearAuthState();
    this.isLoadingSignal.set(false);
    
    this.router.navigate(['/login']);
    
    console.log('🚪 Utilisateur déconnecté');
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.tokenService.getRefreshToken();

    if (!refreshToken) {
      console.error('❌ Aucun refresh token disponible');
      return throwError(() => new Error('No refresh token available'));
    }

    const url = `${API_CONFIG.baseUrl}${API_CONFIG.auth.refresh}`;
    const request: RefreshTokenRequest = { refreshToken };

    return this.http.post<RefreshTokenResponse>(url, request).pipe(
      tap(response => {
        this.tokenService.setAccessToken(response.accessToken);
        
        if (response.refreshToken) {
          const rememberMe = sessionStorage.getItem('supplychainx_remember_me') === 'true';
          this.tokenService.setRefreshToken(response.refreshToken, rememberMe);
        }

        console.log('🔄 Token rafraîchi avec succès');
      }),
      catchError(error => {
        console.error('❌ Erreur lors du rafraîchissement du token:', error);
        this.performLogout();
        return throwError(() => error);
      })
    );
  }

  isUserAuthenticated(): boolean {
    const token = this.tokenService.getAccessToken();
    return !!token && !this.tokenService.isTokenExpired(token);
  }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }

  fetchCurrentUser(): Observable<User> {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.auth.me}`;

    return this.http.get<User>(url).pipe(
      tap(user => {
        this.tokenService.setUser(user);
        this.currentUserSignal.set(user);
        console.log('👤 Informations utilisateur mises à jour');
      }),
      catchError(error => {
        console.error('❌ Erreur lors de la récupération de l\'utilisateur:', error);
        return throwError(() => error);
      })
    );
  }

  hasRole(role: string): boolean {
    return this.tokenService.hasRole(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return this.tokenService.hasAnyRole(roles);
  }

  private setAuthenticatedState(user: User, token: string): void {
    this.currentUserSignal.set(user);
    this.isAuthenticatedSignal.set(true);

    this.authStateSubject.next({
      isAuthenticated: true,
      user,
      accessToken: token,
      loading: false,
      error: null
    });
  }

  private clearAuthState(): void {
    this.currentUserSignal.set(null);
    this.isAuthenticatedSignal.set(false);

    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      loading: false,
      error: null
    });
  }

  private handleAuthError(error: HttpErrorResponse): void {
    const errorMessage = error.error instanceof ErrorEvent
      ? `Erreur: ${error.error.message}`
      : (error.error as ApiError)?.message || `Erreur ${error.status}`;

    this.authStateSubject.next({
      ...this.authStateSubject.value,
      loading: false,
      error: errorMessage
    });

    console.error('❌ Erreur d\'authentification:', errorMessage);
  }

  shouldRefreshToken(): boolean {
    const timeRemaining = this.tokenService.getTokenExpirationTime();
    const fiveMinutes = 5 * 60; // 5 minutes en secondes
    return timeRemaining > 0 && timeRemaining < fiveMinutes;
  }

  startTokenRefreshTimer(): void {
    const timeRemaining = this.tokenService.getTokenExpirationTime();
    
    if (timeRemaining <= 0) {
      return;
    }

    const refreshDelay = (timeRemaining - 120) * 1000;

    if (refreshDelay > 0) {
      setTimeout(() => {
        if (this.isUserAuthenticated()) {
          this.refreshToken().subscribe({
            next: () => {
              console.log('🔄 Token rafraîchi automatiquement');
              this.startTokenRefreshTimer(); // Redémarrer le timer
            },
            error: (error) => {
              console.error('❌ Échec du rafraîchissement automatique:', error);
            }
          });
        }
      }, refreshDelay);

      console.log(`⏰ Timer de rafraîchissement défini : ${refreshDelay / 1000}s`);
    }
  }
}
