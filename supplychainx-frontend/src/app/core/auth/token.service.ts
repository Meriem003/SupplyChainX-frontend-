import { Injectable } from '@angular/core';
import { JwtPayload } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly ACCESS_TOKEN_KEY = 'supplychainx_access_token';
  private readonly REFRESH_TOKEN_KEY = 'supplychainx_refresh_token';
  private readonly USER_KEY = 'supplychainx_user';
  private readonly REMEMBER_ME_KEY = 'supplychainx_remember_me';

  constructor() {}

  setAccessToken(token: string): void {
    if (token) {
      sessionStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    }
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  setRefreshToken(token: string, rememberMe: boolean = false): void {
    if (token) {
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(this.REFRESH_TOKEN_KEY, token);
      sessionStorage.setItem(this.REMEMBER_ME_KEY, String(rememberMe));
    }
  }

  getRefreshToken(): string | null {
    const rememberMe = sessionStorage.getItem(this.REMEMBER_ME_KEY) === 'true';
    const storage = rememberMe ? localStorage : sessionStorage;
    return storage.getItem(this.REFRESH_TOKEN_KEY);
  }

  setUser(user: any): void {
    if (user) {
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  getUser(): unknown {
    const userData = sessionStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  hasToken(): boolean {
    return this.getAccessToken() !== null;
  }

  isTokenExpired(token?: string): boolean {
    const tokenToCheck = token || this.getAccessToken();
    
    if (!tokenToCheck) {
      return true;
    }

    try {
      const payload = this.decodeToken(tokenToCheck);
      if (!payload?.exp) {
        return true;
      }

      const expirationDate = payload.exp * 1000;
      const now = Date.now();
      
      const bufferTime = 30 * 1000;
      
      return expirationDate <= (now + bufferTime);
    } catch (error) {
      console.error('Erreur lors de la vérification d\'expiration du token:', error);
      return true;
    }
  }

  decodeToken(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      
      if (parts.length !== 3) {
        console.error('Format de token invalide');
        return null;
      }

      const payload = parts[1];
      
      const base64 = payload.replaceAll('-', '+').replaceAll('_', '/');
      
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.codePointAt(0)?.toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }

  getTokenExpirationTime(token?: string): number {
    const tokenToCheck = token || this.getAccessToken();
    
    if (!tokenToCheck) {
      return 0;
    }

    try {
      const payload = this.decodeToken(tokenToCheck);
      if (!payload?.exp) {
        return 0;
      }

      const expirationDate = payload.exp * 1000;
      const now = Date.now();
      const timeRemaining = expirationDate - now;

      return timeRemaining > 0 ? Math.floor(timeRemaining / 1000) : 0;
    } catch (error) {
      console.error('Erreur lors du calcul du temps d\'expiration:', error);
      return 0;
    }
  }

  getUserRolesFromToken(): string[] {
    const token = this.getAccessToken();
    if (!token) {
      return [];
    }

    const payload = this.decodeToken(token);
    return payload?.roles || [];
  }

  hasRole(role: string): boolean {
    const roles = this.getUserRolesFromToken();
    return roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.getUserRolesFromToken();
    return roles.some(role => userRoles.includes(role));
  }

  clearTokens(): void {
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.REMEMBER_ME_KEY);

    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  debugToken(): void {
    const token = this.getAccessToken();
    if (!token) {
      console.log('❌ Aucun token trouvé');
      return;
    }

    const payload = this.decodeToken(token);
    const isExpired = this.isTokenExpired(token);
    const timeRemaining = this.getTokenExpirationTime(token);

    console.group('🔐 Token Debug Info');
    console.log('Token présent:', !!token);
    console.log('Token expiré:', isExpired);
    console.log('Temps restant (secondes):', timeRemaining);
    console.log('Payload décodé:', payload);
    console.log('Rôles:', this.getUserRolesFromToken());
    console.groupEnd();
  }
}
