import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RegisterComponent } from './features/register/register.component';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'jobs', component: HomeComponent },
  { path: 'my-postings', component: HomeComponent },
  { path: 'my-bids', component: HomeComponent },
];
