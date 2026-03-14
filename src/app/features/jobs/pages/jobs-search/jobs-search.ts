import { Component, inject, signal, computed, OnInit } from '@angular/core';
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
  private readonly jobService = inject(JobService);

  allJobs = signal<Job[]>([]);
  categories = Object.values(JobCategory);
  
  filters = {
    title: signal(''),
    category: signal(''),
    minBudget: signal<number | null>(null),
    maxBudget: signal<number | null>(null)
  };

  // Reactive filtering
  filteredJobs = computed(() => {
    const title = this.filters.title().toLowerCase();
    const category = this.filters.category();
    const min = this.filters.minBudget();
    const max = this.filters.maxBudget();

    return this.allJobs().filter(job => {
      const matchTitle = !title || (job.title && job.title.toLowerCase().includes(title));
      const matchCategory = !category || job.category === category;
      const matchMin = min === null || job.budget >= min;
      const matchMax = max === null || job.budget <= max;
      return matchTitle && matchCategory && matchMin && matchMax;
    });
  });

  ngOnInit(): void {
    this.jobService.searchJobs().subscribe(data => this.allJobs.set(data));
  }

  search(): void {
  }
}
