import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'https://stingray-app-wxhhn.ondigitalocean.app';

  constructor(private http: HttpClient) {}

  submitReview(jobId: string, reviewData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/jobs/${jobId}/reviews`, reviewData);
  }
}
