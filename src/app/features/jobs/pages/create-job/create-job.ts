import { Component } from '@angular/core';
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
  categories = Object.values(JobCategory);
  
  jobData = {
    title: '',
    description: '',
    budget: null,
    category: ''
  };

  submitting = false;
  error: string | null = null;

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.submitting) return;
    
    this.submitting = true;
    this.error = null;

    console.log('Sending job data:', this.jobData);

    this.jobService.createJob(this.jobData).subscribe({
      next: (response) => {
        console.log('Job created successfully:', response);
        this.submitting = false;
        if (response && response.id) {
          this.router.navigate(['/jobs', response.id]);
        } else {
          this.router.navigate(['/jobs']);
        }
      },
      error: (err) => {
        this.error = 'Failed to create job. Please check your inputs.';
        this.submitting = false;
        console.error('Error creating job:', err);
      }
    });
  }
}
