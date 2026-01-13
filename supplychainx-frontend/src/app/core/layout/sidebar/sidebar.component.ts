import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles: string[];
}

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
  private readonly allMenuItems: MenuItem[] = [
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
    {
      label: 'Tableau de bord',
      icon: '📊',
      route: '/procurement/dashboard',
      roles: ['ADMIN', 'GESTIONNAIRE_APPROVISIONNEMENT', 'RESPONSABLE_ACHATS', 'SUPERVISEUR_LOGISTIQUE']
    },
    {
      label: 'Fournisseurs',
      icon: '🏢',
      route: '/procurement/suppliers',
      roles: ['ADMIN', 'GESTIONNAIRE_APPROVISIONNEMENT', 'RESPONSABLE_ACHATS', 'SUPERVISEUR_LOGISTIQUE']
    },
    {
      label: 'Matières premières',
      icon: '📦',
      route: '/procurement/raw-materials',
      roles: ['ADMIN', 'GESTIONNAIRE_APPROVISIONNEMENT', 'RESPONSABLE_ACHATS', 'SUPERVISEUR_LOGISTIQUE']
    },
    {
      label: 'Stock critique',
      icon: '⚠️',
      route: '/procurement/critical-stock',
      roles: ['ADMIN', 'GESTIONNAIRE_APPROVISIONNEMENT', 'RESPONSABLE_ACHATS', 'SUPERVISEUR_LOGISTIQUE']
    },
    {
      label: 'Commandes fournisseurs',
      icon: '🛒',
      route: '/procurement/supply-orders',
      roles: ['ADMIN', 'GESTIONNAIRE_APPROVISIONNEMENT', 'RESPONSABLE_ACHATS', 'SUPERVISEUR_LOGISTIQUE']
    },
    {
      label: 'Tableau de bord',
      icon: '📊',
      route: '/production/dashboard',
      roles: ['ADMIN', 'CHEF_PRODUCTION', 'PLANIFICATEUR', 'SUPERVISEUR_PRODUCTION']
    },
    {
      label: 'Produits finis',
      icon: '📦',
      route: '/production/products',
      roles: ['ADMIN', 'CHEF_PRODUCTION', 'PLANIFICATEUR', 'SUPERVISEUR_PRODUCTION']
    },
    {
      label: 'Ordres de production',
      icon: '🏭',
      route: '/production/orders',
      roles: ['ADMIN', 'CHEF_PRODUCTION', 'PLANIFICATEUR', 'SUPERVISEUR_PRODUCTION']
    },
    {
      label: 'Planification',
      icon: '📅',
      route: '/production/planning',
      roles: ['ADMIN', 'CHEF_PRODUCTION', 'PLANIFICATEUR']
    },
    {
      label: 'Gestion des stocks',
      icon: '📊',
      route: '/production/inventory',
      roles: ['ADMIN', 'CHEF_PRODUCTION', 'SUPERVISEUR_PRODUCTION']
    },
    {
      label: 'Tableau de bord',
      icon: '📊',
      route: '/delivery/dashboard',
      roles: ['ADMIN', 'GESTIONNAIRE_COMMERCIAL', 'RESPONSABLE_LOGISTIQUE', 'SUPERVISEUR_LIVRAISONS']
    },
    {
      label: 'Clients',
      icon: '👥',
      route: '/delivery/customers',
      roles: ['ADMIN', 'GESTIONNAIRE_COMMERCIAL', 'RESPONSABLE_LOGISTIQUE', 'SUPERVISEUR_LIVRAISONS']
    },
    {
      label: 'Commandes clients',
      icon: '📝',
      route: '/delivery/sales-orders',
      roles: ['ADMIN', 'GESTIONNAIRE_COMMERCIAL', 'RESPONSABLE_LOGISTIQUE', 'SUPERVISEUR_LIVRAISONS']
    },
    {
      label: 'Livraisons',
      icon: '🚚',
      route: '/delivery/shipments',
      roles: ['ADMIN', 'GESTIONNAIRE_COMMERCIAL', 'RESPONSABLE_LOGISTIQUE', 'SUPERVISEUR_LIVRAISONS']
    },
    {
      label: 'Historique livraisons',
      icon: '📋',
      route: '/delivery/history',
      roles: ['ADMIN', 'RESPONSABLE_LOGISTIQUE', 'SUPERVISEUR_LIVRAISONS']
    }
  ];

  visibleMenuItems = signal<MenuItem[]>([]);

  constructor(private readonly authService: AuthService) {
    this.loadMenuItems();
  }

  private loadMenuItems(): void {
    const user = this.authService.getCurrentUser();
    
    if (!user?.roles) {
      this.visibleMenuItems.set([]);
      return;
    }

    const menus = this.allMenuItems.filter(item => 
      item.roles.some(role => user.roles?.includes(role as any))
    );

    this.visibleMenuItems.set(menus);
  }
}
