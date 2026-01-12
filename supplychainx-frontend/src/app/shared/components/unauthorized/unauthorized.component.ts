import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="error-container">
      <div class="error-content">
        <div class="error-icon">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z" fill="#dc2626"/>
          </svg>
        </div>
        <div class="error-code">403</div>
        <h1 class="error-title">Accès non autorisé</h1>
        <p class="error-message">
          Vous n'avez pas les permissions nécessaires pour accéder à cette ressource.
          Si vous pensez qu'il s'agit d'une erreur, veuillez contacter votre administrateur.
        </p>
        <div class="error-actions">
          <button class="btn btn-primary" (click)="goToHome()">
            <i class="icon-home"></i>
            Retour à l'accueil
          </button>
          <button class="btn btn-secondary" (click)="goBack()">
            <i class="icon-arrow-left"></i>
            Page précédente
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      padding: 20px;
    }

    .error-content {
      text-align: center;
      background: white;
      padding: 60px 40px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      max-width: 600px;
      width: 100%;
    }

    .error-icon {
      margin-bottom: 20px;
      animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }

    .error-code {
      font-size: 80px;
      font-weight: bold;
      color: #dc2626;
      line-height: 1;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .error-title {
      font-size: 32px;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 15px;
    }

    .error-message {
      font-size: 18px;
      color: #718096;
      margin-bottom: 40px;
      line-height: 1.6;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    .error-actions {
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 12px 30px;
      font-size: 16px;
      font-weight: 500;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(220, 38, 38, 0.4);
    }

    .btn-secondary {
      background: #e2e8f0;
      color: #4a5568;
    }

    .btn-secondary:hover {
      background: #cbd5e0;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .error-code {
        font-size: 60px;
      }

      .error-title {
        font-size: 24px;
      }

      .error-message {
        font-size: 16px;
      }

      .error-actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  `]
})
export class UnauthorizedComponent {
  constructor(private readonly router: Router) {}

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    globalThis.history.back();
  }
}
