import { Routes } from '@angular/router';
import { JobsSearch } from './features/jobs/pages/jobs-search/jobs-search';
import { CreateJob } from './features/jobs/pages/create-job/create-job';
import { JobDetails } from './features/jobs/pages/job-details/job-details';
import { EditJob } from './features/jobs/pages/edit-job/edit-job';
import { MyPostings } from './features/jobs/pages/my-postings/my-postings';
import { SubmitReview } from './features/reviews/pages/submit-review/submit-review';

export const routes: Routes = [
  { path: 'jobs', component: JobsSearch },
  { path: 'jobs/create', component: CreateJob },
  { path: 'jobs/my-postings', component: MyPostings },
  { path: 'jobs/:id', component: JobDetails },
  { path: 'jobs/:id/edit', component: EditJob },
  { path: 'jobs/:id/review', component: SubmitReview },
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
];
