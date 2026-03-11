import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RegisterComponent } from './features/register/register.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'jobs', component: HomeComponent },
  { path: 'my-postings', component: HomeComponent },
  { path: 'my-bids', component: HomeComponent },
  { path: 'profile', component: HomeComponent },
];
