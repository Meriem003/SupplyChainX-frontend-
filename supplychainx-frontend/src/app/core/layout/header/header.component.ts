import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="logo">
        <h1>📦 SupplyChainX</h1>
      </div>

      <div class="user-section">
        <div class="user-info">
          <span class="user-name">{{ userName() }}</span>
          <span class="user-role">{{ userRole() }}</span>
        </div>

        <button class="btn-logout" (click)="logout()" title="Se déconnecter">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Déconnexion
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      height: 64px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .logo h1 {
      font-size: 24px;
      font-weight: bold;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .user-section {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
    }

    .user-name {
      font-weight: 600;
      font-size: 14px;
    }

    .user-role {
      font-size: 12px;
      opacity: 0.9;
      background-color: rgba(255, 255, 255, 0.2);
      padding: 2px 8px;
      border-radius: 10px;
    }

    .btn-logout {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background-color: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      color: white;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-logout:hover {
      background-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      .header {
        padding: 0 12px;
      }

      .logo h1 {
        font-size: 18px;
      }

      .user-info {
        display: none;
      }

      .btn-logout {
        padding: 8px 12px;
        font-size: 0;
      }

      .btn-logout svg {
        margin: 0;
      }
    }
  `]
})
export class HeaderComponent {
  userName = signal<string>('Utilisateur');
  userRole = signal<string>('');

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    const user = this.authService.getCurrentUser();
    
    if (user) {
      this.userName.set(user.fullName || user.email || 'Utilisateur');
      
      if (user.roles && user.roles.length > 0) {
        this.userRole.set(user.roles[0]);
      }
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
