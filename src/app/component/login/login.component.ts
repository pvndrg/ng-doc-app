import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/response/auth-response';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // Mark the component as standalone
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  authService: AuthService;
   // Inject Router

  constructor(private aService: AuthService, private router: Router) {
    this.authService = aService;
    this.loginForm = new FormGroup({}); // Initialize an empty FormGroup
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  // Submit form
  onSubmit(): void {
    const formValue = this.loginForm.value;

    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);

      this.authService.login(formValue).subscribe((res: AuthResponse) => {
        if (res.jwt) {
          this.authService.storeToken(res.jwt);
          console.log('Login successful!');
          this.router.navigate(['/dashboard']); // Redirect after login
        }
      });
    }
  }

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
