import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserRequest } from '../../models/request/user-request';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  standalone: true,  // Mark the component as standalone
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  
  userForm: FormGroup;
  userService: UserService;

  users: User[] = [];


  constructor(private uService: UserService, private toastr: ToastrService) {
    this.userService = uService;
    this.userForm = new FormGroup({}); // Initialize an empty FormGroup
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Fetched Users:', users);
        // Success Toastr message
        this.toastr.success('Users fetched successfully!', 'Success');
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        // Error Toastr message
        this.toastr.error('An error occurred while fetching users. Please try again later.', 'Error');
      },
    });
  }

}
