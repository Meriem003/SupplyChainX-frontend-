import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

/**
 * Layout principal de l'application SupplyChainX
 * Structure : Header (en haut) + Sidebar (à gauche) + Contenu (à droite)
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="app-layout">
      <!-- Header en haut -->
      <app-header class="header"></app-header>
      
      <div class="main-container">
        <!-- Sidebar à gauche -->
        <app-sidebar class="sidebar"></app-sidebar>
        
        <!-- Contenu principal à droite (les pages s'affichent ici) -->
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    /* Structure générale de l'application */
    .app-layout {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100%;
    }

    /* Header fixé en haut */
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      z-index: 100;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    /* Conteneur principal (sidebar + contenu) */
    .main-container {
      display: flex;
      margin-top: 64px; /* Pour ne pas être caché par le header */
      height: calc(100vh - 64px);
    }

    /* Sidebar fixée à gauche */
    .sidebar {
      position: fixed;
      left: 0;
      top: 64px;
      width: 250px;
      height: calc(100vh - 64px);
      overflow-y: auto; /* Scroll si le menu est trop long */
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
      z-index: 50;
    }

    /* Zone de contenu principale */
    .content {
      flex: 1;
      margin-left: 250px; /* Espace pour la sidebar */
      padding: 20px;
      overflow-y: auto;
      background-color: #f5f5f5;
    }

    /* Responsive : sur mobile, cacher la sidebar par défaut */
    @media (max-width: 768px) {
      .sidebar {
        width: 0;
        overflow: hidden;
      }

      .content {
        margin-left: 0;
      }
    }
  `]
})
export class AppLayoutComponent {}
