import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { LoginComponent } from './component/login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',

  imports: [CommonModule, RouterOutlet],  // Include RouterLink and RouterOutlet
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-auth-app';
}
