import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { UserRequest } from '../../models/request/user-request';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  userForm: FormGroup;
    userService: UserService;
  
    constructor(private uService: UserService, private toastr: ToastrService) {
      this.userService = uService;
      this.userForm = new FormGroup({}); // Initialize an empty FormGroup
    }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });
  }


  onSubmit(): void {
    const formValue = this.userForm.value;
  
    if (this.userForm.valid) {
      console.log('Form Submitted!', formValue);
  
      this.userService.createUser(formValue).subscribe({
        next: (res: UserRequest) => {
          // if (res?.result) {
            if (res) {
            // Success message
            this.toastr.success('User created successfully!', 'Success');
          } 
          // else {
          //   // Error message
          //   this.toastr.error(res?.message || 'Something went wrong. Please try again.', 'Error');
          // }
        },
        error: (err) => {
          // Handle API call error
          console.error('Error during user creation:', err);
          this.toastr.error('An error occurred while creating the user. Please try again later.', 'Error');
        }
      });
    } else {
      // Form validation error message
      this.toastr.warning('Please fill out the form correctly before submitting.', 'Validation Error');
    }
  }
  

showPassword: boolean = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}

}
