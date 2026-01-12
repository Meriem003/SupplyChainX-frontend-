import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-delivery-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="welcome-card">
        <h1>🚚 Dashboard Livraison</h1>
        <p class="welcome-text">Bienvenue, <strong>{{ userName() }}</strong> !</p>
        <p class="info-text">Le contenu du dashboard sera ajouté plus tard.</p>
        
        <div class="placeholder-content">
          <div class="placeholder-box">
            <h3>📦 Livraisons en cours</h3>
            <p>Fonctionnalité à venir...</p>
          </div>
          <div class="placeholder-box">
            <h3>🚛 Véhicules disponibles</h3>
            <p>Fonctionnalité à venir...</p>
          </div>
          <div class="placeholder-box">
            <h3>📋 Historique</h3>
            <p>Fonctionnalité à venir...</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .welcome-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #2d3748;
      margin-bottom: 20px;
      font-size: 32px;
    }

    .welcome-text {
      font-size: 18px;
      color: #4a5568;
      margin-bottom: 10px;
    }

    .info-text {
      color: #718096;
      font-style: italic;
      margin-bottom: 30px;
    }

    .placeholder-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }

    .placeholder-box {
      background: #f7fafc;
      padding: 24px;
      border-radius: 8px;
      border: 2px dashed #cbd5e0;
      text-align: center;
    }

    .placeholder-box h3 {
      color: #2d3748;
      margin-bottom: 10px;
      font-size: 18px;
    }

    .placeholder-box p {
      color: #a0aec0;
      font-size: 14px;
    }
  `]
})
export class DeliveryDashboardComponent {
  userName = signal<string>('Utilisateur');

  constructor(private readonly authService: AuthService) {
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName.set(user.fullName || user.email || 'Utilisateur');
    }
  }
}
