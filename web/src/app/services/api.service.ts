import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    apiUrl = 'http://localhost:8080/api'; // Adjust based on your server config
    private http: HttpClient = inject(HttpClient);

    get<T = unknown>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { withCredentials: true }).pipe(
            catchError((error: unknown) => {
                console.error(`GET ${endpoint} error:`, error);
                return of(null as unknown as T);
            })
        );
    }

    post<T = unknown>(endpoint: string, data: unknown): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, { withCredentials: true }).pipe(
            catchError((error: unknown) => {
                console.error(`POST ${endpoint} error:`, error);
                return of(null as unknown as T);
            })
        );
    }

    put<T = unknown>(endpoint: string, data: unknown): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data, { withCredentials: true }).pipe(
            catchError((error: unknown) => {
                console.error(`PUT ${endpoint} error:`, error);
                return of(null as unknown as T);
            })
        );
    }

    delete<T = unknown>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, { withCredentials: true }).pipe(
            catchError((error: unknown) => {
                console.error(`DELETE ${endpoint} error:`, error);
                return of(null as unknown as T);
            })
        );
    }
}
