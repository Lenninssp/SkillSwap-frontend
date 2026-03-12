import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, of, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiError } from '../models/api-error.model';
import { RegisterData, RegisterResponse, LoginResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly userSignal = signal<User | null>(null);
  private readonly tokenSignal = signal<string | null>(null);

  readonly currentUser = computed(() => this.userSignal());
  readonly isLoggedIn = computed(() => !!this.tokenSignal());
  readonly token = computed(() => this.tokenSignal());

  constructor() {
    this.loadSession();
  }

  private loadSession() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        this.tokenSignal.set(token);
        this.userSignal.set(JSON.parse(userStr));
      } else {
      }
    }
  }

  login(email: string, password: string): Observable<LoginResponse | ApiError> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        this.setSession(response.token, response.user);
      }),
      catchError((err: HttpErrorResponse) => {
        return of(err.error as ApiError);
      })
    );
  }

  register(userData: RegisterData): Observable<RegisterResponse | ApiError> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, userData).pipe(
      catchError((err: HttpErrorResponse) => {
        return of(err.error as ApiError);
      })
    );
  }

  logout() {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.router.navigate(['/login']);
  }

  private setSession(token: string, user: User) {
    this.tokenSignal.set(token);
    this.userSignal.set(user);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
}
