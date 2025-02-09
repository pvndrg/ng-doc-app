import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserRequest } from '../../models/request/user-request';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { PaginationRequest } from '../../models/pagination-request';
import { PaginationResponse } from '../../models/pagination-response';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AgGridModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
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
        const roles: { roleName: string }[] = params.data.roles || [];
        return roles.map((role) => role.roleName).join(', ');
      },
    },
    { field: 'createdBy' },
    { field: 'createdDate' },
    { field: 'modifiedBy' },
    { field: 'modifiedDate' },
  ];

  rowData: any[] = [];
  userForm: FormGroup;
  users: User[] = [];
  paginationPageSize = 5; // Default page size
  paginationPageSizeSelector = [5, 10, 50, 100]; // Allowed page sizes
  currentPage = 1;
  private gridApi: any;
  private isFirstLoad = true; // Prevents unnecessary API call on gridReady

  constructor(private userService: UserService, private toastr: ToastrService) {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl(''),
      status: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  // Handle Grid Ready event
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setGridOption('pagination', true); // Ensure pagination is enabled
    this.getAllUser(this.currentPage, this.paginationPageSize);
  }

  // Handle Pagination Changes (Page Number or Page Size)
  onPaginationChanged(params: any) {
    if (this.isFirstLoad) {
      this.isFirstLoad = false; // Skip the first pagination event on load
      return;
    }
  
    if (params.api) {
      const newPageNumber = params.api.paginationGetCurrentPage() + 1; // ✅ No need for +1
      const newPageSize = params.api.paginationGetPageSize();
  
      // Check if page or size actually changed before making an API call
      if (newPageNumber !== this.currentPage || newPageSize !== this.paginationPageSize) {
        this.currentPage = newPageNumber;
        this.paginationPageSize = newPageSize;
        this.getAllUser(this.currentPage, this.paginationPageSize);
      }
    }
  }
  

  getAllUser(pageNumber: number = 0, pageSize: number = 10): void {
    const paginationRequest: PaginationRequest = {
      pageNumber: pageNumber - 1, // ✅ Convert 1-based page to 0-based
      pageSize,
      sortFields: ['name', 'email'],
      sortDirections: ['asc', 'desc'],
      searchFields: ['role', 'status'],
      searchValues: ['admin', 'active'],
    };
  
    this.userService.getAllUsers(paginationRequest).subscribe({
      next: (response: PaginationResponse) => {
        this.users = response.content;
        this.rowData = [...response.content];
  
        if (this.gridApi && this.gridApi.setRowData) {
          this.gridApi.setRowData(this.rowData);
        } else {
          console.error('gridApi is not properly initialized.');
        }
  
        console.log('Fetched Users:', response.content);
        this.toastr.success('Users fetched successfully!', 'Success');
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.toastr.error(
          'An error occurred while fetching users. Please try again later.',
          'Error'
        );
      },
    });
  }
  }
