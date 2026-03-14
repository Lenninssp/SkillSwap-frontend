import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PlatformService } from '../../core/services/platform.service';
import { PlatformStats } from '../../core/models/platform-stats.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <h1 class="text-5xl font-black tracking-tight text-gray-900 sm:text-7xl mb-6">
          Connect. <span class="text-blue-600">Swap.</span> Build.
        </h1>
        <p class="text-xl leading-8 text-gray-500 max-w-2xl mx-auto mb-10">
          The ultimate marketplace where developers and clients exchange skills and build amazing products together.
        </p>
        
        <div class="flex items-center justify-center gap-4">
          @if (!authService.isLoggedIn()) {
            <a routerLink="/register" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
              Join SkillSwap
            </a>
            <a routerLink="/login" class="bg-white border-2 border-gray-100 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95">
              Login
            </a>
          } @else {
            <a routerLink="/jobs" class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 text-lg">
              Explore Available Jobs
            </a>
          }
        </div>
      </div>

      <!-- Stats Section -->
      <div class="mt-24 bg-gray-50 rounded-[3rem] p-12 border border-gray-100">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div class="space-y-2">
            <p class="text-sm font-bold text-blue-600 uppercase tracking-widest">Global Users</p>
            <p class="text-5xl font-black text-gray-900">{{ stats()?.total_users || 0 }}</p>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-bold text-blue-600 uppercase tracking-widest">Active Projects</p>
            <p class="text-5xl font-black text-gray-900">{{ stats()?.active_jobs || 0 }}</p>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-bold text-blue-600 uppercase tracking-widest">Total Volume</p>
            <p class="text-5xl font-black text-gray-900">$\{{ stats()?.total_value_moved || 0 | number }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  protected readonly authService = inject(AuthService);
  private readonly platformService = inject(PlatformService);
  
  stats = signal<PlatformStats | null>(null);

  ngOnInit() {
    this.platformService.getStats().subscribe({
      next: (data) => this.stats.set(data),
      error: (err) => {}
    });
  }
}
