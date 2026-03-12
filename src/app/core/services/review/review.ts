import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  submitReview(jobId: string, reviewData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/jobs/${jobId}/reviews`, reviewData);
  }
}
