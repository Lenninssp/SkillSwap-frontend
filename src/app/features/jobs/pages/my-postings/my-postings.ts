import { Component, inject, signal, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobService } from '../../../../core/services/job/job';
import { AuthService } from '../../../../core/services/auth.service';
import { Job } from '../../../../core/models/job.model';
import { JobStatus } from '../../../../core/enums/job-status.enum';

@Component({
  selector: 'app-my-postings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-postings.html',
})
export class MyPostings {
  private readonly jobService = inject(JobService);
  private readonly authService = inject(AuthService);

  jobs = signal<Job[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  jobStatus = JobStatus;

  constructor() {
    afterNextRender(() => {
      if (!this.authService.isLoggedIn()) {
        this.error.set('Please log in to view your postings.');
        this.loading.set(false);
        return;
      }
      this.fetchMyPostings();
    });
  }

  fetchMyPostings(): void {
    this.jobService.getMyPostings().subscribe({
      next: (data) => {
        this.jobs.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load your postings.');
        this.loading.set(false);
      }
    });
  }
}
