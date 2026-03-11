import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReviewService } from '../../../../core/services/review/review';

@Component({
  selector: 'app-submit-review',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './submit-review.html',
})
export class SubmitReview implements OnInit {
  jobId: string | null = null;
  
  reviewData = {
    rating: 5,
    comment: ''
  };

  submitting = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');
  }

  setRating(r: number): void {
    this.reviewData.rating = r;
  }

  onSubmit(): void {
    if (!this.jobId) return;

    this.submitting = true;
    this.error = null;

    this.reviewService.submitReview(this.jobId, this.reviewData).subscribe({
      next: () => {
        this.router.navigate(['/jobs', this.jobId]);
      },
      error: (err) => {
        this.error = 'Failed to submit review.';
        this.submitting = false;
        console.error('Error submitting review:', err);
      }
    });
  }
}
