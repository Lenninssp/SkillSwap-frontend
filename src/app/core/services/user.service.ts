import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../models/user.model';
import { ApiError } from '../models/api-error.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getPublicProfile(username: string): Observable<User | ApiError> {
    return this.http.get<User>(`${this.apiUrl}/users/${username}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return of(err.error as ApiError);
      })
    );
  }

  getUserById(userId: string): Observable<User | ApiError> {
    // User lookup fallback
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return of(err.error as ApiError);
      })
    );
  }
}
