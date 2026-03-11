import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JobService } from '../../../../core/services/job/job';
import { Job } from '../../../../core/models/job.model';
import { JobCategory } from '../../../../core/enums/job-category.enum';

@Component({
  selector: 'app-jobs-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './jobs-search.html',
})
export class JobsSearch implements OnInit {
  allJobs: Job[] = [];
  jobs: Job[] = [];
  categories = Object.values(JobCategory);
  
  filters = {
    title: '',
    category: '',
    minBudget: null as number | null,
    maxBudget: null as number | null
  };

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchAllJobs();
  }

  fetchAllJobs(): void {
    this.jobService.searchJobs().subscribe({
      next: (data) => {
        this.allJobs = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }

  search(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    this.jobs = this.allJobs.filter(job => {
      const matchTitle = !this.filters.title || 
        (job.title && job.title.toLowerCase().includes(this.filters.title.toLowerCase()));
      
      const matchCategory = !this.filters.category || 
        job.category === this.filters.category;
      
      const matchMinBudget = this.filters.minBudget === null || 
        job.budget >= this.filters.minBudget;
      
      const matchMaxBudget = this.filters.maxBudget === null || 
        job.budget <= this.filters.maxBudget;

      return matchTitle && matchCategory && matchMinBudget && matchMaxBudget;
    });
    console.log('Filtered jobs count:', this.jobs.length);
  }
}
