import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <a routerLink="/" class="flex-shrink-0">
              <span class="text-2xl font-black text-blue-600 tracking-tighter">SkillSwap</span>
            </a>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                @if (authService.isLoggedIn()) {
                  <a routerLink="/jobs" routerLinkActive="text-blue-600" [routerLinkActiveOptions]="{exact: true}"
                     class="px-3 py-2 rounded-md text-sm font-bold text-gray-500 hover:text-gray-900 transition-all">Jobs</a>
                  <a routerLink="/jobs/my-postings" routerLinkActive="text-blue-600" 
                     class="px-3 py-2 rounded-md text-sm font-bold text-gray-500 hover:text-gray-900 transition-all">My Postings</a>
                  <a routerLink="/jobs/my-bids" routerLinkActive="text-blue-600" 
                     class="px-3 py-2 rounded-md text-sm font-bold text-gray-500 hover:text-gray-900 transition-all">My Bids</a>
                }
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6 space-x-4">
              @if (authService.isLoggedIn()) {
                <a routerLink="/profile" routerLinkActive="text-blue-600"
                   class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold transition-all">
                   Profile
                </a>
                <button (click)="authService.logout()" 
                        class="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm">
                  Logout
                </button>
              } @else {
                <a routerLink="/login" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold transition-all">Login</a>
                <a routerLink="/register" 
                   class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-md shadow-blue-100">
                   Register
                </a>
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
