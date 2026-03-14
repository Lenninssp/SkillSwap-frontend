import { Component, inject, signal, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobService } from '../../../../core/services/job.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Proposal } from '../../../../core/models/proposal.model';

@Component({
  selector: 'app-my-bids',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-bids.html',
})
export class MyBids {
  private readonly jobService = inject(JobService);
  private readonly authService = inject(AuthService);

  bids = signal<Proposal[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      if (!this.authService.isLoggedIn()) {
        this.error.set('Please log in to view your bids.');
        this.loading.set(false);
        return;
      }
      this.fetchMyBids();
    });
  }

  fetchMyBids(): void {
    this.jobService.getMyBids().subscribe({
      next: (data) => {
        this.bids.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load your bids.');
        this.loading.set(false);
      }
    });
  }

  onWithdraw(proposalId: string): void {
    if (confirm('Are you sure you want to withdraw this proposal?')) {
      this.jobService.withdrawProposal(proposalId).subscribe({
        next: () => {
          this.bids.update(list => list.filter(b => b.id !== proposalId));
          alert('Proposal withdrawn successfully.');
        },
        error: (err) => {
          alert(`Error: ${err.error?.error || 'Failed to withdraw proposal'}`);
        }
      });
    }
  }
}
