import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:8080/api'; // Adjust based on your server config
    private http: HttpClient = inject(HttpClient);

    get(endpoint: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${endpoint}`, { withCredentials: true }).pipe(
            catchError(error => {
                console.error(`GET ${endpoint} error:`, error);
                return of(null);
            })
        );
    }

    post(endpoint: string, data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data, { withCredentials: true }).pipe(
            catchError(error => {
                console.error(`POST ${endpoint} error:`, error);
                return of(null);
            })
        );
    }

    put(endpoint: string, data: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${endpoint}`, data, { withCredentials: true }).pipe(
            catchError(error => {
                console.error(`PUT ${endpoint} error:`, error);
                return of(null);
            })
        );
    }

    delete(endpoint: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${endpoint}`, { withCredentials: true }).pipe(
            catchError(error => {
                console.error(`DELETE ${endpoint} error:`, error);
                return of(null);
            })
        );
    }
}
