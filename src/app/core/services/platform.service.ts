import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PlatformStats } from '../models/platform-stats.model';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getStats(): Observable<PlatformStats> {
    return this.http.get<PlatformStats>(`${this.apiUrl}/platform/stats`);
  }
}
