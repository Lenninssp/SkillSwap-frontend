import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  // Jobs search page
  searchJobs(filters?: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/jobs/search`, filters || {});
  }

  // Create job page 
  createJob(jobData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/jobs`, jobData);
  }

  // Job details page
  getJobDetails(jobId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/jobs/${jobId}`);
  }

  // Edit job (Owner only)
  updateJob(jobId: string, updateData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/jobs/${jobId}`, updateData);
  }

  // My postings page
  getMyPostings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/jobs/my-postings`);
  }

  // Complete job action
  completeJob(jobId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/jobs/${jobId}/complete`, {});
  }

  // Proposals
  getProposals(jobId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/jobs/${jobId}/proposals`);
  }

  acceptProposal(proposalId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/proposals/${proposalId}/accept`, {});
  }

  submitProposal(jobId: string, proposalData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/jobs/${jobId}/proposals`, proposalData);
  }
}
