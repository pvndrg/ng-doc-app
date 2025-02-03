import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private authService: AuthService,
    private router: Router // To navigate after logout
  ) {}

  logout(): void {
    // Clear the stored JWT token
    this.authService.logout();
    console.log('User logged out');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
