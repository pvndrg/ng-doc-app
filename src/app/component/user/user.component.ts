import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserRequest } from '../../models/request/user-request';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,  // Mark the component as standalone
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  
  userForm: FormGroup;
  userService: UserService;

  constructor(private uService: UserService) {
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


  // Submit form
  onSubmit(): void {
    const formValue = this.userForm.value;

    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);

      this.userService.createUser(formValue).subscribe((res: UserRequest) => {
        // if(res.result){
        //   alert("Project Create Successfully.")
        // } else {
        //   alert(res.message)
        // }

        alert(res);
      });
    }
  }

showPassword: boolean = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}

  
}
