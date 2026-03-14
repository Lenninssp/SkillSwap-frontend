import { Component, inject, signal, afterNextRender } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReviewService } from '../../../../core/services/review/review';
import { JobService } from '../../../../core/services/job/job';
import { AuthService } from '../../../../core/services/auth.service';
import { Job } from '../../../../core/models/job.model';

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
  private readonly jobService = inject(JobService);
  private readonly authService = inject(AuthService);
  private readonly location = inject(Location);

  jobId = signal<string | null>(null);
  job = signal<Job | null>(null);
  rating = signal(5);
  comment = signal('');
  submitting = signal(false);
  error = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      const id = this.route.snapshot.paramMap.get('id');
      this.jobId.set(id);
      
      if (!this.authService.isLoggedIn()) {
        this.error.set('Please log in to submit a review.');
        return;
      }

      if (id) {
        this.fetchJobDetails(id);
      }
    });
  }

  fetchJobDetails(id: string): void {
    this.jobService.getJobDetails(id).subscribe({
      next: (data) => {
        const jobData = Array.isArray(data) ? data[0] : data;
        this.job.set(jobData);

        // Lookup freelancer ID
        if (!jobData.freelancer_id) {
          this.jobService.getProposals(id).subscribe(proposals => {
            if (proposals && proposals.length > 0) {
              // Find target
              const accepted = proposals.find(p => p.status === 'accepted' || p.status === 'Accepted');
              const target = accepted || proposals[0];
              
              if (target) {
                this.job.update(j => j ? { ...j, freelancer_id: target.freelancer_id } : null);
              }
            }
          });
        }
      },
    });
  }

  setRating(r: number): void {
    this.rating.set(r);
  }

  onSubmit(): void {
    const id = this.jobId();
    const currentJob = this.job();
    const currentUser = this.authService.currentUser();
    
    if (!id || !currentJob || !currentUser || this.submitting()) return;

    // Identify target
    let targetId = '';
    if (String(currentUser.id) === String(currentJob.owner_id)) {
      targetId = currentJob.freelancer_id || '';
    } else if (String(currentUser.id) === String(currentJob.freelancer_id)) {
      targetId = currentJob.owner_id || '';
    }

    if (!targetId) {
      alert('Error: Could not identify the person to review. Is a freelancer assigned?');
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    const reviewData = {
      target_id: targetId,
      rating: this.rating(),
      comment: this.comment()
    };


    this.reviewService.submitReview(id, reviewData).subscribe({
      next: () => {
        alert('Review posted successfully!');
        this.router.navigate(['/jobs', id]);
      },
      error: (err) => {
        const msg = err.error?.error || 'Failed to submit review.';
        this.error.set(msg);
        alert(`API Error: ${msg}`);
        this.submitting.set(false);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
