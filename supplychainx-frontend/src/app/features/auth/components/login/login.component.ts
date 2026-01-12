import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { LoginRequest } from '../../../../core/auth/auth.models';

/**
 * Composant de connexion SupplyChainX
 * Gère l'authentification des utilisateurs via JWT
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>SupplyChainX</h1>
          <p>Connectez-vous à votre compte</p>
        </div>

        <!-- Message d'erreur -->
        @if (errorMessage()) {
          <div class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{{ errorMessage() }}</span>
          </div>
        }

        <!-- Message de succès -->
        @if (successMessage()) {
          <div class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{{ successMessage() }}</span>
          </div>
        }
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email"
              placeholder="votre@email.com"
              class="form-control"
              [class.input-error]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
            />
            @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
              <span class="error-text">
                @if (loginForm.get('email')?.errors?.['required']) {
                  L'email est requis
                }
                @if (loginForm.get('email')?.errors?.['email']) {
                  Format d'email invalide
                }
              </span>
            }
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password"
              placeholder="••••••••"
              class="form-control"
              [class.input-error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
            />
            @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
              <span class="error-text">
                @if (loginForm.get('password')?.errors?.['required']) {
                  Le mot de passe est requis
                }
                @if (loginForm.get('password')?.errors?.['minlength']) {
                  Le mot de passe doit contenir au moins 6 caractères
                }
              </span>
            }
          </div>

          <div class="form-group-checkbox">
            <input 
              type="checkbox" 
              id="rememberMe" 
              formControlName="rememberMe"
            />
            <label for="rememberMe">Se souvenir de moi</label>
          </div>

          <button 
            type="submit" 
            class="btn-login"
            [disabled]="loginForm.invalid || isLoading()"
          >
            @if (isLoading()) {
              <span class="spinner"></span>
              <span>Connexion en cours...</span>
            } @else {
              <span>Se connecter</span>
            }
          </button>
        </form>

        <div class="login-footer">
          <p>Version 1.0.0 - Angular 19</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      max-width: 450px;
      width: 100%;
    }

    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .login-header h1 {
      font-size: 32px;
      font-weight: bold;
      color: #2d3748;
      margin-bottom: 10px;
    }

    .login-header p {
      color: #718096;
      font-size: 16px;
    }

    .alert {
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
    }

    .alert-error {
      background-color: #fee;
      color: #c53030;
      border: 1px solid #fc8181;
    }

    .alert-success {
      background-color: #f0fff4;
      color: #22543d;
      border: 1px solid #9ae6b4;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      font-weight: 500;
      color: #2d3748;
      font-size: 14px;
    }

    .form-control {
      padding: 12px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
    }

    .input-error {
      border-color: #fc8181 !important;
    }

    .error-text {
      color: #c53030;
      font-size: 12px;
      margin-top: -4px;
    }

    .form-group-checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .form-group-checkbox input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .form-group-checkbox label {
      font-size: 14px;
      color: #4a5568;
      cursor: pointer;
    }

    .btn-login {
      padding: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .btn-login:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
    }

    .btn-login:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #ffffff;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .login-footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
    }

    .login-footer p {
      color: #a0aec0;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .login-card {
        padding: 30px 20px;
      }

      .login-header h1 {
        font-size: 28px;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  
  // Signals pour gérer l'état du composant (Angular 19)
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    // Si déjà connecté, rediriger
    if (this.authService.isUserAuthenticated()) {
      this.redirectToDashboard();
    }
  }

  /**
   * Soumission du formulaire de connexion
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const credentials: LoginRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.successMessage.set('Connexion réussie ! Redirection...');
        
        // Démarrer le timer de rafraîchissement automatique
        this.authService.startTokenRefreshTimer();

        // Rediriger immédiatement après la connexion
        this.redirectToDashboard();
      },
      error: (error) => {
        this.isLoading.set(false);
        
        // Gérer les différents types d'erreurs
        if (error.status === 401) {
          this.errorMessage.set('Email ou mot de passe incorrect');
        } else if (error.status === 403) {
          this.errorMessage.set('Votre compte est désactivé. Contactez l\'administrateur.');
        } else if (error.status === 0) {
          this.errorMessage.set('Impossible de se connecter au serveur. Vérifiez votre connexion.');
        } else {
          this.errorMessage.set(
            error.error?.message || 'Une erreur est survenue lors de la connexion'
          );
        }

        console.error('Erreur de connexion:', error);
      }
    });
  }

  /**
   * Redirige l'utilisateur vers le dashboard approprié selon son rôle
   */
  private redirectToDashboard(): void {
    const user = this.authService.getCurrentUser();
    
    console.log('🔍 Redirection - Utilisateur:', user);
    
    if (!user?.roles?.length) {
      console.warn('⚠️ Aucun rôle trouvé, redirection vers /');
      this.router.navigate(['/']);
      return;
    }

    // Rediriger selon le premier rôle de l'utilisateur
    const primaryRole = user.roles[0];
    console.log('👤 Rôle principal:', primaryRole);

    switch (primaryRole) {
      case 'ADMIN':
        console.log('➡️ Redirection vers /admin/dashboard');
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'APPROVISIONNEMENT':
        console.log('➡️ Redirection vers /procurement/dashboard');
        this.router.navigate(['/procurement/dashboard']);
        break;
      case 'PRODUCTION':
        console.log('➡️ Redirection vers /production/dashboard');
        this.router.navigate(['/production/dashboard']);
        break;
      case 'LIVRAISON':
        console.log('➡️ Redirection vers /delivery/dashboard');
        this.router.navigate(['/delivery/dashboard']);
        break;
      default:
        console.warn('⚠️ Rôle non reconnu:', primaryRole);
        this.router.navigate(['/']);
    }
  }
}
