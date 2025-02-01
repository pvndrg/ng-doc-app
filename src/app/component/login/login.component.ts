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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  // Mark the component as standalone
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  authService: AuthService;

  constructor(private aService: AuthService) {
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
  
        this.authService.loginUser(formValue).subscribe((res: AuthResponse) => {
          if(res.jwt){
            alert(res.jwt)
          } 
  
        });
      }
    }

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
