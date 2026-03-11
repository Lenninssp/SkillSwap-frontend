import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-gray-800 text-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <a routerLink="/" class="flex-shrink-0 font-bold text-xl tracking-tight">
              SkillSwap
            </a>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                @if (authService.isLoggedIn()) {
                  <a routerLink="/jobs" routerLinkActive="bg-gray-900 text-white" 
                     class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Jobs</a>
                  <a routerLink="/my-postings" routerLinkActive="bg-gray-900 text-white" 
                     class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">My Postings</a>
                  <a routerLink="/my-bids" routerLinkActive="bg-gray-900 text-white" 
                     class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">My Bids</a>
                }
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6 space-x-4">
              @if (authService.isLoggedIn()) {
                <span class="text-sm font-medium text-gray-400">Hi, {{ authService.currentUser()?.name }}</span>
                <a routerLink="/profile" routerLinkActive="bg-gray-900 text-white" 
                   class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Profile</a>
                <button (click)="authService.logout()" 
                        class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Logout</button>
              } @else {
                <a routerLink="/login" routerLinkActive="bg-gray-900 text-white" 
                   class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Login</a>
                <a routerLink="/register" routerLinkActive="bg-gray-900 text-white" 
                   class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Register</a>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  protected readonly authService = inject(AuthService);
}
