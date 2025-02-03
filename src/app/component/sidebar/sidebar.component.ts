import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
  isSidebarCollapsed = false;  // Flag to control the sidebar collapsed/expanded state
  isDropdownOpen = false; // Flag for the dropdown menu

  constructor(private authService: AuthService, private router: Router) {}

  // Method to toggle the sidebar collapsed/expanded state
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  // Method to toggle the dropdown menu
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }



  logout(): void {
    // Clear the stored JWT token
    this.authService.logout();
    console.log('User logged out');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}