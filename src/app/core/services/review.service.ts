import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Review } from '../models/review.model';
import { ApiError } from '../models/api-error.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getUserReviews(userId: number): Observable<Review[] | ApiError> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews/user/${userId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return of(err.error as ApiError);
      })
    );
  }
}
