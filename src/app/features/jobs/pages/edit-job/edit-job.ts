import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JobService } from '../../../../core/services/job/job';
import { JobCategory } from '../../../../core/enums/job-category.enum';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-job.html',
})
export class EditJob implements OnInit {
  jobId: string | null = null;
  categories = Object.values(JobCategory);
  
  jobData = {
    title: '',
    description: '',
    budget: 0,
    category: ''
  };

  loading = true;
  submitting = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.fetchJobDetails(this.jobId);
    }
  }

  fetchJobDetails(id: string): void {
    this.loading = true;
    this.jobService.getJobDetails(id).subscribe({
      next: (data) => {
        this.jobData = {
          title: data.title,
          description: data.description,
          budget: data.budget,
          category: data.category
        };
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load job details.';
        this.loading = false;
        console.error('Error fetching job details:', err);
      }
    });
  }

  onSubmit(): void {
    if (!this.jobId) return;

    this.submitting = true;
    this.error = null;

    this.jobService.updateJob(this.jobId, this.jobData).subscribe({
      next: () => {
        this.router.navigate(['/jobs', this.jobId]);
      },
      error: (err) => {
        this.error = 'Failed to update job. Please check your inputs.';
        this.submitting = false;
        console.error('Error updating job:', err);
      }
    });
  }
}
