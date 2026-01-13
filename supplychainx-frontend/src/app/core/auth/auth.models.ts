
export enum UserRole {
  ADMIN = 'ADMIN',
  APPROVISIONNEMENT = 'APPROVISIONNEMENT',
  PRODUCTION = 'PRODUCTION',
  LIVRAISON = 'LIVRAISON',
  GESTIONNAIRE_APPROVISIONNEMENT = 'GESTIONNAIRE_APPROVISIONNEMENT',
  RESPONSABLE_ACHATS = 'RESPONSABLE_ACHATS',
  SUPERVISEUR_LOGISTIQUE = 'SUPERVISEUR_LOGISTIQUE',
  CHEF_PRODUCTION = 'CHEF_PRODUCTION',
  PLANIFICATEUR = 'PLANIFICATEUR',
  SUPERVISEUR_PRODUCTION = 'SUPERVISEUR_PRODUCTION',
  GESTIONNAIRE_COMMERCIAL = 'GESTIONNAIRE_COMMERCIAL',
  RESPONSABLE_LOGISTIQUE = 'RESPONSABLE_LOGISTIQUE',
  SUPERVISEUR_LIVRAISONS = 'SUPERVISEUR_LIVRAISONS'
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  roles: UserRole[];
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  avatar?: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  roles: UserRole[];
  iat: number;
  exp: number;
  iss?: string;
  aud?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

export interface ApiError {
  timestamp: string;
  status: number;
  message: string;
  detail?: string;
  path: string;
  errors?: { [key: string]: string };
}
