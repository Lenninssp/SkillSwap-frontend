import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';
import { ApiError } from '../../core/models/api-error.model';
import { LoginResponse } from '../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 text-center">Log In</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="email" formControlName="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" formControlName="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
        </div>
        <div class="pt-4">
          <button type="submit" [disabled]="isLoading()" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">
            {{ isLoading() ? 'Logging in...' : 'Log In' }}
          </button>
        </div>
      </form>
      <div class="mt-6 text-center text-sm text-gray-600">
        Don't have an account? <a routerLink="/register" class="font-medium text-indigo-600 hover:text-indigo-500">Register</a>
      </div>
    </div>
  `
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading.set(true);
    const { email, password } = this.loginForm.getRawValue();
    this.authService.login(email ?? '', password ?? '').subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if ('error' in res) {
          this.alertService.error(res.error);
        } else {
          this.alertService.success('Logged in successfully');
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.alertService.error('An unexpected error occurred');
      }
    });
  }
}
