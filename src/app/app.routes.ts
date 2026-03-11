import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // Placeholder routes for navigation links
  { path: 'login', component: HomeComponent },
  { path: 'register', component: HomeComponent },
  { path: 'jobs', component: HomeComponent },
  { path: 'my-postings', component: HomeComponent },
  { path: 'my-bids', component: HomeComponent },
  { path: 'profile', component: HomeComponent },
];
