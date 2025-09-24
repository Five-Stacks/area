import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private apiUrl = 'http://localhost:8080/api'; // Adjust based on your server config

  constructor(private http: HttpClient) {
  }

  isAdmin(): Observable<boolean> {
    return this.http.get<{ isAdmin: boolean }>(`${this.apiUrl}/auth/is-admin`, { withCredentials: true }).pipe(
      map(response => response.isAdmin),
      catchError(error => {
        console.error('Error checking admin status:', error);
        return of(false);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ isAuthenticated: boolean }>(`${this.apiUrl}/auth/is-authenticated`, { withCredentials: true }).pipe(
      map(response => response.isAuthenticated),
      catchError(error => {
        console.error('Error checking authentication status:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        console.log('Logged out successfully');
      },
      error: (error) => {
        console.error('Logout error:', error);
      }
    });
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/auth/login`, { email, password }, { withCredentials: true }).pipe(
      map(response => response.success),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }
}