import { Component, inject, signal, afterNextRender } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JobService } from '../../../../core/services/job.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-job.html',
})
export class EditJob {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly jobService = inject(JobService);
  private readonly authService = inject(AuthService);
  private readonly location = inject(Location);

  jobId = signal<string | null>(null);
  
  jobData = {
    title: '',
    description: '',
    budget: 0,
    category: ''
  };

  loading = signal(true);
  submitting = signal(false);
  error = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      const id = this.route.snapshot.paramMap.get('id');
      this.jobId.set(id);

      if (!this.authService.isLoggedIn()) {
        this.error.set('Please log in to edit this job.');
        this.loading.set(false);
        return;
      }

      if (id) {
        this.fetchJobDetails(id);
      } else {
        this.error.set('Job ID not found.');
        this.loading.set(false);
      }
    });
  }

  fetchJobDetails(id: string): void {
    this.jobService.getJobDetails(id).subscribe({
      next: (data) => {
        const job = Array.isArray(data) ? data[0] : data;
        
        // Owner check
        const user = this.authService.currentUser();
        if (user && String(job.owner_id) !== String(user.id)) {
          this.error.set('You are not authorized to edit this job.');
          this.loading.set(false);
          return;
        }

        this.jobData = {
          title: job.title,
          description: job.description,
          budget: job.budget,
          category: job.category
        };
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load job details.');
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    const id = this.jobId();
    if (!id || this.submitting()) return;

    this.submitting.set(true);
    this.error.set(null);

    this.jobService.updateJob(id, this.jobData).subscribe({
      next: () => {
        this.router.navigate(['/jobs', id]);
      },
      error: (err) => {
        this.error.set('Failed to update job. Please check your inputs.');
        this.submitting.set(false);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
