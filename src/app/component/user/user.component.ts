import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserRequest } from '../../models/request/user-request';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';

import { AgGridModule } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';


@Component({
  selector: 'app-user',
  standalone: true,  // Mark the component as standalone
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AgGridModule
    
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

// ✅ Fix: Explicitly type columnDefs as ColDef<any>[]
// ✅ Column Definitions (Use correct field names)
// columnDefs: ColDef<any>[] = [
//   { field: 'firstName', headerName: 'First Name' },
//   { field: 'email', headerName: 'Email' },
//   { field: 'role', headerName: 'Role' }
// ];

columnDefs: ColDef<any>[] = [
  { field: 'id' },
  { field: 'username' },
  { field: 'password' },
  { field: 'email' },
  { field: 'mobile' },
  { field: 'firstName' },
  { field: 'lastName' },
  { field: 'isActive' },
  { field: 'emailVerified' },
  { field: 'mobileVerified' },
  { field: 'userLocked' },
  {
    field: 'roles',
    valueGetter: (params) => {
      const roles: { id: number; roleName: string }[] = params.data.roles || [];
      return roles.map((role: { roleName: string }) => role.roleName).join(', ');
    }
  },
  { field: 'createdBy' },
  { field: 'createdDate' },
  { field: 'modifiedBy' },
  { field: 'modifiedDate' }
];


rowData: any[] = []; // ✅ Initialize rowData as an empty array


  // rowData = [
  //   { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  //   { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  // ];
  
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

  // getAllUser(): void {
  //   this.userService.getAllUsers().subscribe({
  //     next: (users) => {
  //       this.users = users;
  //       console.log('Fetched Users:', users);

  //       // ✅ Transform `users` into `rowData` format required by Ag-Grid
  //       this.rowData = users.map(user => ({
  //         firstName: user.firstName, 
  //         email: user.email,
  //         role: user.roles.length ? user.roles.map(r => r.roleName).join(', ') : 'No Role' 
  //       }));

  //       this.toastr.success('Users fetched successfully!', 'Success');
  //     },
  //     error: (err) => {
  //       console.error('Error fetching users:', err);
  //       this.toastr.error('An error occurred while fetching users. Please try again later.', 'Error');
  //     }
  //   });
  // }

  getAllUser(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.rowData = users; // Assign users directly to rowData for AG Grid
        console.log('Fetched Users:', users);
        this.toastr.success('Users fetched successfully!', 'Success');
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.toastr.error('An error occurred while fetching users. Please try again later.', 'Error');
      },
    });
  }
}
