import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest } from '../models/request/user-request';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { PaginationRequest } from '../models/pagination-request';
import { PaginationResponse } from '../models/pagination-response';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'http://localhost:8080/api/users'; // Replace with actual API

  constructor(private http: HttpClient) {}


  // Function to get the JWT token from localStorage (or wherever it's stored)
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken'); // Replace with your method of storing the token
  }

  // Create User (POST request)
  createUser(userData: UserRequest): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/auth/create`, userData);
  }

  // Get User by Username (GET request)
  getUserByUsername(username: string): Observable<UserRequest> {
    return this.http.get<UserRequest>(`${this.apiUrl}/${username}`);
  }

  // Get all users with JWT token included in the headers
  getAllUsers(paginationRequest: PaginationRequest): Observable<PaginationResponse> {
    const token = this.getAuthToken();
  
    // Set the Authorization header
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  
    return this.http.post<PaginationResponse>(`${this.apiUrl}/get-all`, paginationRequest, { headers });
  }
  
  

  // Update User (PUT request)
  updateUser(userData: UserRequest): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, userData);
  }

  // Delete User (DELETE request)
  deleteUser(username: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${username}`);
  }

}
