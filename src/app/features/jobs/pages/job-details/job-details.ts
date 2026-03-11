import { Component, inject, signal, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobService } from '../../../../core/services/job/job';
import { AuthService } from '../../../../core/services/auth.service';
import { Job } from '../../../../core/models/job.model';
import { JobStatus } from '../../../../core/enums/job-status.enum';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-details.html',
})
export class JobDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly jobService = inject(JobService);
  private readonly authService = inject(AuthService);

  job = signal<Job | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  jobStatus = JobStatus;

  constructor() {
    // This hook only runs in the browser, after the initial render.
    // Perfect for clean, token-based API calls.
    afterNextRender(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (!this.authService.isLoggedIn()) {
        this.error.set('Please log in to view job details.');
        this.loading.set(false);
      } else if (id) {
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
        this.job.set(Array.isArray(data) ? data[0] : data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.status === 401 ? 'Session expired.' : 'Job not found.');
        this.loading.set(false);
      }
    });
  }

  onComplete(): void {
    const currentJob = this.job();
    if (!currentJob) return;
    
    this.jobService.completeJob(currentJob.id).subscribe({
      next: () => this.job.update(j => j ? { ...j, status: JobStatus.COMPLETED } : null)
    });
  }
}
