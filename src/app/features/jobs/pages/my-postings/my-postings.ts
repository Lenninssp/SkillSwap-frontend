import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobService } from '../../../../core/services/job/job';
import { Job } from '../../../../core/models/job.model';
import { JobStatus } from '../../../../core/enums/job-status.enum';

@Component({
  selector: 'app-my-postings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-postings.html',
})
export class MyPostings implements OnInit {
  jobs: Job[] = [];
  loading = true;
  error: string | null = null;
  jobStatus = JobStatus;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchMyPostings();
  }

  fetchMyPostings(): void {
    this.loading = true;
    this.jobService.getMyPostings().subscribe({
      next: (data) => {
        this.jobs = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load your postings.';
        this.loading = false;
        console.error('Error fetching my postings:', err);
      }
    });
  }
}
