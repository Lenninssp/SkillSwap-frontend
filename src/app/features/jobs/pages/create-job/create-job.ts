import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JobService } from '../../../../core/services/job/job';
import { JobCategory } from '../../../../core/enums/job-category.enum';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-job.html',
})
export class CreateJob {
  private readonly jobService = inject(JobService);
  private readonly router = inject(Router);

  categories = Object.values(JobCategory);
  
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
        this.router.navigate(['/jobs', response.id || '']);
      },
      error: (err) => {
        this.error.set('Failed to create job. Please check your inputs.');
        this.submitting.set(false);
      }
    });
  }
}
