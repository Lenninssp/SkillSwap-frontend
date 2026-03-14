import { Routes } from '@angular/router';
import { JobsSearch } from './features/jobs/pages/jobs-search/jobs-search';
import { CreateJob } from './features/jobs/pages/create-job/create-job';
import { JobDetails } from './features/jobs/pages/job-details/job-details';
import { EditJob } from './features/jobs/pages/edit-job/edit-job';
import { MyPostings } from './features/jobs/pages/my-postings/my-postings';
import { MyBids } from './features/jobs/pages/my-bids/my-bids';
import { SubmitReview } from './features/reviews/pages/submit-review/submit-review';
import { HomeComponent } from './features/home/home.component';
import { RegisterComponent } from './features/register/register.component';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jobs', component: JobsSearch },
  { path: 'jobs/create', component: CreateJob, canActivate: [authGuard] },
  { path: 'jobs/my-postings', component: MyPostings, canActivate: [authGuard] },
  { path: 'jobs/my-bids', component: MyBids, canActivate: [authGuard] },
  { path: 'jobs/:id', component: JobDetails }, // Details stay public, logic inside handles private parts
  { path: 'jobs/:id/edit', component: EditJob, canActivate: [authGuard] },
  { path: 'jobs/:id/review', component: SubmitReview, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
];
