import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../models/request/auth-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth'; // Replace with actual API
 
   constructor(private http: HttpClient) {}

     // Create User (POST request)
     loginUser(userData: AuthRequest): Observable<any> {
       return this.http.post<any>(`${this.apiUrl}/authenticate`, userData);
     }
}
