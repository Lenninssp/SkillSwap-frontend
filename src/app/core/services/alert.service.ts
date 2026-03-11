import { Injectable, signal } from '@angular/core';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface Alert {
  id: number;
  type: AlertType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertsSignal = signal<Alert[]>([]);
  private counter = 0;

  readonly alerts = this.alertsSignal.asReadonly();

  success(message: string) {
    this.addAlert('success', message);
  }

  error(message: string) {
    this.addAlert('error', message);
  }

  info(message: string) {
    this.addAlert('info', message);
  }

  warning(message: string) {
    this.addAlert('warning', message);
  }

  private addAlert(type: AlertType, message: string) {
    const id = ++this.counter;
    this.alertsSignal.update(alerts => [...alerts, { id, type, message }]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => this.removeAlert(id), 5000);
  }

  removeAlert(id: number) {
    this.alertsSignal.update(alerts => alerts.filter(a => a.id !== id));
  }
}
