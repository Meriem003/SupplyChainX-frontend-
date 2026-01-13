import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="app-layout">
      <app-header class="header"></app-header>
      
      <div class="main-container">
        <app-sidebar class="sidebar"></app-sidebar>
        
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100%;
    }

    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      z-index: 100;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .main-container {
      display: flex;
      margin-top: 64px;
      height: calc(100vh - 64px);
    }

    .sidebar {
      position: fixed;
      left: 0;
      top: 64px;
      width: 250px;
      height: calc(100vh - 64px);
      overflow-y: auto;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
      z-index: 50;
    }

    .content {
      flex: 1;
      margin-left: 250px;
      padding: 20px;
      overflow-y: auto;
      background-color: #f5f5f5;
    }

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
