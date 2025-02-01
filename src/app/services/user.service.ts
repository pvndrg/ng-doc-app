import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest } from '../models/request/user-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'http://localhost:8080/api/users'; // Replace with actual API

  constructor(private http: HttpClient) {}

  // Create User (POST request)
  createUser(userData: UserRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, userData);
  }

  // Get User by Username (GET request)
  getUserByUsername(username: string): Observable<UserRequest> {
    return this.http.get<UserRequest>(`${this.apiUrl}/${username}`);
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
