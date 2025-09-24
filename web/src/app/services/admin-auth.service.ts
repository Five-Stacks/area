import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private apiUrl = 'http://localhost:8080/api'; // Adjust based on your server config

  constructor(private http: HttpClient) {
  }

  isAdmin(): Observable<boolean> {
    return of(false);
  }

  isAuthenticated(): boolean {
    return false;
  }

  logout(): void {
  }

    login(email: string, password: string): Observable<boolean> {
        return of(true);
    }
}