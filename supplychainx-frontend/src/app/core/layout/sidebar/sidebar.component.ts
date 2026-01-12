import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

/**
 * Interface pour un élément de menu
 */
interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles: string[]; // Rôles autorisés à voir ce menu
}

/**
 * Sidebar (menu latéral)
 * Affiche les menus selon le rôle de l'utilisateur
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <nav class="menu">
        @for (item of visibleMenuItems(); track item.route) {
          <a 
            [routerLink]="item.route" 
            routerLinkActive="active"
            class="menu-item"
          >
            <span class="menu-icon">{{ item.icon }}</span>
            <span class="menu-label">{{ item.label }}</span>
          </a>
        }
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      background-color: #2d3748;
      color: white;
      padding: 16px 0;
    }

    .menu {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }

    .menu-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
    }

    /* Menu actif */
    .menu-item.active {
      background-color: rgba(102, 126, 234, 0.2);
      border-left-color: #667eea;
      color: white;
      font-weight: 600;
    }

    .menu-icon {
      font-size: 20px;
      width: 24px;
      text-align: center;
    }

    .menu-label {
      font-size: 14px;
    }
  `]
})
export class SidebarComponent {
  // Liste complète des menus
  private readonly allMenuItems: MenuItem[] = [
    // Menu Admin
    {
      label: 'Tableau de bord Admin',
      icon: '👑',
      route: '/admin/dashboard',
      roles: ['ADMIN']
    },
    {
      label: 'Gestion des utilisateurs',
      icon: '👥',
      route: '/admin/users',
      roles: ['ADMIN']
    },

    // Menu Approvisionnement
    {
      label: 'Tableau de bord',
      icon: '📊',
      route: '/procurement/dashboard',
      roles: ['ADMIN', 'APPROVISIONNEMENT']
    },
    {
      label: 'Demandes d\'approvisionnement',
      icon: '📝',
      route: '/procurement/requests',
      roles: ['ADMIN', 'APPROVISIONNEMENT']
    },
    {
      label: 'Commandes fournisseurs',
      icon: '🛒',
      route: '/procurement/orders',
      roles: ['ADMIN', 'APPROVISIONNEMENT']
    },

    // Menu Production
    {
      label: 'Tableau de bord',
      icon: '📊',
      route: '/production/dashboard',
      roles: ['ADMIN', 'PRODUCTION']
    },
    {
      label: 'Ordres de fabrication',
      icon: '🏭',
      route: '/production/orders',
      roles: ['ADMIN', 'PRODUCTION']
    },
    {
      label: 'Gestion des stocks',
      icon: '📦',
      route: '/production/inventory',
      roles: ['ADMIN', 'PRODUCTION']
    },

    // Menu Livraison
    {
      label: 'Tableau de bord',
      icon: '📊',
      route: '/delivery/dashboard',
      roles: ['ADMIN', 'LIVRAISON']
    },
    {
      label: 'Livraisons en cours',
      icon: '🚚',
      route: '/delivery/shipments',
      roles: ['ADMIN', 'LIVRAISON']
    },
    {
      label: 'Historique',
      icon: '📋',
      route: '/delivery/history',
      roles: ['ADMIN', 'LIVRAISON']
    }
  ];

  // Signal pour les menus visibles
  visibleMenuItems = signal<MenuItem[]>([]);

  constructor(private readonly authService: AuthService) {
    this.loadMenuItems();
  }

  /**
   * Charge les menus selon le rôle de l'utilisateur
   */
  private loadMenuItems(): void {
    const user = this.authService.getCurrentUser();
    
    if (!user?.roles) {
      this.visibleMenuItems.set([]);
      return;
    }

    // Filtrer les menus selon les rôles de l'utilisateur
    const menus = this.allMenuItems.filter(item => 
      item.roles.some(role => user.roles?.includes(role as any))
    );

    this.visibleMenuItems.set(menus);
  }
}
