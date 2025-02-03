import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private authService: AuthService,
    private router: Router, // To navigate after logout
    private toastr: ToastrService
  ) {}

  logout(): void {
    // Clear the stored JWT token
    this.authService.logout();
    console.log('User has been logged out successfully.');

    // Show a success message
    this.toastr.success('You have been logged out successfully.', 'Logged Out');

    // Redirect to the login page
    this.router.navigate(['/login']);
}

}
