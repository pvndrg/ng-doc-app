import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { LoginComponent } from './component/login/login.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { SidebarComponent } from './component/sidebar/sidebar.component';

@Component({
  selector: 'app-root',

  imports: [CommonModule, RouterOutlet, SidebarComponent],  // Include RouterLink and RouterOutlet
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-auth-app';

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.getToken() !== null;
  }
}
