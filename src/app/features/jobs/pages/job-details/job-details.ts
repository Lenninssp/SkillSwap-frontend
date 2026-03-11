import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobService } from '../../../../core/services/job/job';
import { Job } from '../../../../core/models/job.model';
import { JobStatus } from '../../../../core/enums/job-status.enum';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-details.html',
})
export class JobDetails implements OnInit {
  job: Job | null = null;
  loading = true;
  error: string | null = null;
  jobStatus = JobStatus;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('JobDetails ID from route:', id);
    if (id) {
      this.fetchJobDetails(id);
    } else {
      this.error = 'No job ID provided.';
      this.loading = false;
    }
  }

  fetchJobDetails(id: string): void {
    this.loading = true;
    console.log('Fetching details for job:', id);
    this.jobService.getJobDetails(id).subscribe({
      next: (data) => {
        console.log('Job details received:', data);
        this.job = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching job details:', err);
        this.error = 'Failed to load job details. The job might not exist.';
        this.loading = false;
      }
    });
  }

  onComplete(): void {
    if (!this.job) return;
    
    this.jobService.completeJob(this.job.id.toString()).subscribe({
      next: () => {
        if (this.job) this.job.status = JobStatus.COMPLETED;
      },
      error: (err) => {
        console.error('Error completing job:', err);
      }
    });
  }
}
