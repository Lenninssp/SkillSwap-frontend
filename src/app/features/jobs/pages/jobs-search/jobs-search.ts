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
  jobs: Job[] = [];
  categories = Object.values(JobCategory);
  
  filters = {
    title: '',
    category: '',
    minBudget: null,
    maxBudget: null
  };

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    const searchFilters: any = {};
    if (this.filters.title) searchFilters.title = this.filters.title;
    if (this.filters.category) searchFilters.category = this.filters.category;
    if (this.filters.minBudget !== null) searchFilters.minBudget = this.filters.minBudget;
    if (this.filters.maxBudget !== null) searchFilters.maxBudget = this.filters.maxBudget;
    
    console.log('Searching jobs with filters:', searchFilters);
    
    this.jobService.searchJobs(searchFilters).subscribe({
      next: (data) => {
        console.log('Search response:', data);
        this.jobs = data;
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }
}
