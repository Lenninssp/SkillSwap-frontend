import { Component, inject, signal, afterNextRender } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../../core/services/job.service';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';
import { Job } from '../../../../core/models/job.model';
import { User } from '../../../../core/models/user.model';
import { Proposal } from '../../../../core/models/proposal.model';
import { JobStatus } from '../../../../core/enums/job-status.enum';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './job-details.html',
})
export class JobDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly jobService = inject(JobService);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly location = inject(Location);

  job = signal<Job | null>(null);
  proposals = signal<Proposal[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  isOwner = signal(false);
  hasApplied = signal(false);
  appliedProposalId = signal<string | null>(null);
  jobStatus = JobStatus;

  // Job application state
  showApplyForm = signal(false);
  bidAmount = signal<number>(0);
  bidMessage = signal('');
  submittingProposal = signal(false);

  constructor() {
    afterNextRender(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (!this.authService.isLoggedIn()) {
        this.error.set('Please log in to view job details.');
        this.loading.set(false);
      } else if (id) {
        this.fetchJobDetails(id);
      } else {
        this.error.set('Job ID not found.');
        this.loading.set(false);
      }
    });
  }

  fetchJobDetails(id: string): void {
    this.jobService.getJobDetails(id).subscribe({
      next: (data) => {
        const jobData = Array.isArray(data) ? data[0] : data;
        this.job.set(jobData);
        this.bidAmount.set(jobData.budget);
        
        const user = this.authService.currentUser();
        if (user && jobData) {
          const match = String(user.id) === String(jobData.owner_id);
          this.isOwner.set(match);
          
          if (match) {
            this.fetchProposals(id);
          } else {
            // Check if current user has already applied
            this.fetchMyBids(id);
          }
        }
        
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.status === 401 ? 'Session expired.' : 'Job not found.');
        this.loading.set(false);
      }
    });
  }

  fetchProposals(jobId: string): void {
    this.jobService.getProposals(jobId).subscribe({
      next: (data) => {
        this.proposals.set(data);
        
        const currentJob = this.job();
        if (currentJob && currentJob.status === JobStatus.IN_PROGRESS && !currentJob.freelancer) {
          const accepted = data.find(p => p.status === 'accepted' || p.status === 'Accepted');
          const targetProposal = accepted || (data.length === 1 ? data[0] : null);

          if (targetProposal && targetProposal.freelancer_id) {
            this.userService.getUserById(targetProposal.freelancer_id).subscribe(res => {
              if (!('error' in res)) {
                const userData = res as User;
                this.job.update(j => j ? { 
                  ...j, 
                  freelancer: {
                    id: userData.id,
                    username: userData.username,
                    name: userData.name,
                    rating_avg: userData.rating_avg
                  }, 
                  freelancer_id: targetProposal.freelancer_id 
                } : null);
              }
            });
          }
        }
      },
      error: (err) => {}
    });
  }

  fetchMyBids(jobId: string): void {
    this.jobService.getMyBids().subscribe({
      next: (bids) => {
        const myBid = bids.find(b => String(b.job_id) === String(jobId));
        if (myBid) {
          this.hasApplied.set(true);
          this.appliedProposalId.set(myBid.id);
        }
      },
      error: (err) => {}
    });
  }

  onAcceptProposal(proposalId: string, freelancerId: string): void {
    const currentJob = this.job();
    if (!currentJob) return;

    this.jobService.acceptProposal(proposalId).subscribe({
      next: () => {
        this.fetchJobDetails(currentJob.id);
        this.proposals.set([]);
      },
      error: (err) => {
        const msg = err.error?.error || 'Failed to accept bid';
        alert(`API Error: ${msg}`);
      }
    });
  }

  onApply(): void {
    const currentJob = this.job();
    if (!currentJob || this.submittingProposal()) return;

    this.submittingProposal.set(true);
    this.jobService.submitProposal(currentJob.id, {
      price: this.bidAmount(),
      message: this.bidMessage()
    }).subscribe({
      next: (response) => {
        alert('Proposal submitted successfully!');
        this.showApplyForm.set(false);
        this.submittingProposal.set(false);
        this.hasApplied.set(true);
        
        if (response && response.proposal_id) {
          this.appliedProposalId.set(response.proposal_id);
        }
      },
      error: (err) => {
        if (err.status === 409) {
          this.hasApplied.set(true);
          this.showApplyForm.set(false);
          
          // Re-fetch bids to get the ID if it's missing
          this.fetchMyBids(currentJob.id);
          alert('You have already submitted a proposal for this job.');
        } else {
          alert(`Error: ${err.error?.error || 'Failed to submit proposal'}`);
        }
        this.submittingProposal.set(false);
      }
    });
  }

  onWithdrawProposal(): void {
    const proposalId = this.appliedProposalId();
    const currentJob = this.job();
    if (!proposalId || !currentJob) return;

    if (confirm('Are you sure you want to withdraw your proposal?')) {
      this.jobService.withdrawProposal(proposalId).subscribe({
        next: () => {
          alert('Proposal withdrawn successfully.');
          this.hasApplied.set(false);
          this.appliedProposalId.set(null);
          this.fetchJobDetails(currentJob.id);
        },
        error: (err) => {
          alert(`Error: ${err.error?.error || 'Failed to withdraw proposal'}`);
        }
      });
    }
  }

  onComplete(): void {
    const currentJob = this.job();
    if (!currentJob) return;
    
    this.jobService.completeJob(currentJob.id).subscribe({
      next: () => this.job.update(j => j ? { ...j, status: JobStatus.COMPLETED } : null),
      error: (err) => {
        const msg = err.error?.error || 'Failed to complete job';
        alert(`API Error: ${msg}`);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
