import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../models/request/auth-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Replace with actual API

  constructor(private http: HttpClient) {}

  // Create User (POST request)
  login(userData: AuthRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, userData);
  }

  // Store JWT token in LocalStorage
  storeToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  // Retrieve JWT token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Logout (Remove token)
  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
