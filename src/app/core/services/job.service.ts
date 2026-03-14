import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  searchJobs(filters?: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/jobs/search`, filters || {});
  }

  createJob(jobData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/jobs`, jobData);
  }

  getJobDetails(jobId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/jobs/${jobId}`);
  }

  updateJob(jobId: string, updateData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/jobs/${jobId}`, updateData);
  }

  getMyPostings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/jobs/my-postings`);
  }

  completeJob(jobId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/jobs/${jobId}/complete`, {});
  }
// Proposals
getProposals(jobId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/jobs/${jobId}/proposals`);
}

getMyBids(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/proposals/my-bids`);
}

acceptProposal(proposalId: string): Observable<any> {

    return this.http.patch<any>(`${this.apiUrl}/proposals/${proposalId}/accept`, {});
  }

  submitProposal(jobId: string, proposalData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/jobs/${jobId}/proposals`, proposalData);
  }

  withdrawProposal(proposalId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/proposals/${proposalId}`);
  }
}
