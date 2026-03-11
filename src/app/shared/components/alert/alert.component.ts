import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      @for (alert of alertService.alerts(); track alert.id) {
        <div
          [ngClass]="{
            'bg-green-500': alert.type === 'success',
            'bg-red-500': alert.type === 'error',
            'bg-blue-500': alert.type === 'info',
            'bg-yellow-500': alert.type === 'warning'
          }"
          class="text-white px-4 py-3 rounded shadow-lg flex justify-between items-center transition-all duration-300 animate-fade-in"
        >
          <span>{{ alert.message }}</span>
          <button (click)="alertService.removeAlert(alert.id)" class="ml-4 hover:text-gray-200">
            &times;
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class AlertComponent {
  protected readonly alertService = inject(AlertService);
}
