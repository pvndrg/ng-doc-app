import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { PaginationRequest } from '../../models/pagination-request';

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
        const roles = params.data.roles || [];
        return roles.map((role: { roleName: string }) => role.roleName).join(', ');
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

  paginationPageSize = 5;
  paginationPageSizeSelector = [5, 20, 50, 100];

  private gridApi: any;
  private gridColumnApi: any;
  private isDataLoaded = false;

  constructor(private userService: UserService, private toastr: ToastrService) {
    this.userForm = new FormGroup({});
  }

  ngOnInit(): void {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getAllUser(1, this.paginationPageSize);
  }

  onPaginationChanged() {
    if (!this.gridApi) return;

    const currentPage = this.gridApi.paginationGetCurrentPage() + 1;
    const pageSize = this.gridApi.paginationGetPageSize();

    if (this.paginationPageSize !== pageSize) {
      this.paginationPageSize = pageSize;
      this.isDataLoaded = false; // Allow new API call
    }

    this.getAllUser(currentPage, this.paginationPageSize);
  }

  onPageSizeChanged(newPageSize: number) {
    this.paginationPageSize = newPageSize;
    this.isDataLoaded = false;
    this.getAllUser(1, this.paginationPageSize);
  }

  getAllUser(pageNumber: number = 1, pageSize: number = 10): void {
    if (this.isDataLoaded && this.paginationPageSize === pageSize) return;
    this.isDataLoaded = true;
    this.paginationPageSize = pageSize;

    const paginationRequest: PaginationRequest = {
      pageNumber,
      pageSize,
      sortFields: ['name', 'email'],
      sortDirections: ['asc', 'desc'],
      searchFields: ['role', 'status'],
      searchValues: ['admin', 'active'],
    };

    this.userService.getAllUsers(paginationRequest).subscribe({
      next: (users) => {
        this.users = users;
        this.rowData = [...users];
        if (this.gridApi) {
          this.gridApi.setRowData(this.rowData);
        }
        this.toastr.success('Users fetched successfully!', 'Success');
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.toastr.error('An error occurred while fetching users. Please try again later.', 'Error');
      },
    });
  }
}
