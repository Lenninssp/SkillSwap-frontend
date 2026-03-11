import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center py-12">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Welcome to SkillSwap
      </h1>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        The freelance marketplace for developers.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        @if (!authService.isLoggedIn()) {
          <a href="/register" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Get started
          </a>
          <button (click)="testAlert()" class="text-sm font-semibold leading-6 text-gray-900">
            Test Alert <span aria-hidden="true">→</span>
          </button>
        } @else {
          <a href="/jobs" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Browse Jobs
          </a>
        }
      </div>
    </div>
  `
})
export class HomeComponent {
  protected readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);

  testAlert() {
    this.alertService.success('Welcome to SkillSwap! This is a test alert.');
  }
}
