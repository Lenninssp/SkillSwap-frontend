import { Component, inject, signal, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReviewService } from '../../../../core/services/review/review';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-submit-review',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './submit-review.html',
})
export class SubmitReview {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly reviewService = inject(ReviewService);
  private readonly authService = inject(AuthService);

  jobId = signal<string | null>(null);
  rating = signal(5);
  comment = signal('');
  submitting = signal(false);
  error = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      this.jobId.set(this.route.snapshot.paramMap.get('id'));
      
      if (!this.authService.isLoggedIn()) {
        this.error.set('Please log in to submit a review.');
      }
    });
  }

  setRating(r: number): void {
    this.rating.set(r);
  }

  onSubmit(): void {
    const id = this.jobId();
    if (!id || this.submitting()) return;

    this.submitting.set(true);
    this.error.set(null);

    const reviewData = {
      rating: this.rating(),
      comment: this.comment()
    };

    this.reviewService.submitReview(id, reviewData).subscribe({
      next: () => {
        this.router.navigate(['/jobs', id]);
      },
      error: (err) => {
        this.error.set('Failed to submit review.');
        this.submitting.set(false);
      }
    });
  }
}
