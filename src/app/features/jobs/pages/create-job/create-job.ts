import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JobService } from '../../../../core/services/job/job';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-job.html',
})
export class CreateJob {
  private readonly jobService = inject(JobService);
  private readonly router = inject(Router);

  jobData = {
    title: signal(''),
    description: signal(''),
    budget: signal<number | null>(null),
    category: signal('')
  };

  submitting = signal(false);
  error = signal<string | null>(null);

  onSubmit(): void {
    if (this.submitting()) return;
    
    this.submitting.set(true);
    this.error.set(null);

    const data = {
      title: this.jobData.title(),
      description: this.jobData.description(),
      budget: this.jobData.budget(),
      category: this.jobData.category()
    };

    this.jobService.createJob(data).subscribe({
      next: (response) => {
        this.submitting.set(false);
        // Handle different ID field names from API (id, job_id, _id)
        const newId = response.id || response.job_id || response._id;
        if (newId) {
          this.router.navigate(['/jobs', newId]);
        } else {
          this.router.navigate(['/jobs']);
        }
      },
      error: (err) => {
        this.error.set('Failed to create job. Please check your inputs.');
        this.submitting.set(false);
      }
    });
  }
}
