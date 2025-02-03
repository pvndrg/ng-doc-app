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
import { ToastrService } from 'ngx-toastr';

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

  constructor(private aService: AuthService, private router: Router, private toastr: ToastrService) {
    this.authService = aService;
    this.loginForm = new FormGroup({}); // Initialize an empty FormGroup
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.showValidationErrors();
      return;
    }
  
    const formValue = this.loginForm.value;
    console.log('Form Submitted!', formValue);
    // this.toastr.success('Hello world!', 'Toastr fun!');
    this.authService.login(formValue).subscribe({
      next: (res: AuthResponse) => {
        if (res?.jwt) {
          this.authService.storeToken(res.jwt);
          console.log('Login successful!');
          this.router.navigate(['/dashboard']);
          this.toastr.success('Login successful!', 'Success');
        } else {
          console.log('Login failed!');
          this.toastr.error('Invalid credentials. Please try again.', 'Error');
          
        }
      },
      error: (err) => {
        // console.error('API Error:', err);
        console.log(err);
        // Ensure error object exists before reading properties
        const errorMessage = err?.error?.message || 'Server error. Please try again later.';
        this.toastr.error(errorMessage, 'Error');
        // this.toastr.success('Hello world!', 'Toastr fun!');
      }
    });
  }
  

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  private showValidationErrors(): void {
    if (!this.loginForm.controls['email'].valid) {
      this.toastr.error('Please enter a valid email address.', 'Validation Error');
    }
    if (!this.loginForm.controls['password'].valid) {
      this.toastr.error('Password must be at least 6 characters long.', 'Validation Error');
    }
  }
}


// this.toastr.success('Success message', 'Title');
// this.toastr.error('Error message', 'Title');
// this.toastr.warning('Warning message', 'Title');
// this.toastr.info('Info message', 'Title');
