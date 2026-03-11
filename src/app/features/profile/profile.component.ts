import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { ReviewService } from '../../core/services/review.service';
import { AlertService } from '../../core/services/alert.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { Review } from '../../core/models/review.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly reviewService = inject(ReviewService);
  private readonly alertService = inject(AlertService);
  private readonly authService = inject(AuthService);

  readonly user = signal<User | null>(null);
  readonly reviews = signal<Review[]>([]);
  readonly isLoading = signal(true);
  readonly isLoadingReviews = signal(false);
  readonly errorMsg = signal<string | null>(null);

  constructor() {
    this.route.params.subscribe(params => {
      const username = params['username'];
      if (username) {
        this.loadProfile(username);
      } else {
        const currentUser = this.authService.currentUser();
        if (currentUser) {
          this.loadProfile(currentUser.username);
        } else {
          this.isLoading.set(false);
          this.errorMsg.set('Please login to view your profile');
        }
      }
    });
  }

  private loadProfile(username: string) {
    this.isLoading.set(true);
    this.errorMsg.set(null);
    this.user.set(null);
    this.reviews.set([]);

    this.userService.getPublicProfile(username).subscribe({
      next: (res) => {
        if ('error' in res) {
          this.errorMsg.set(res.error);
          this.isLoading.set(false);
          this.alertService.error(res.error);
        } else {
          const profile = res as User;
          this.user.set(profile);
          this.isLoading.set(false);
          if (profile.id) {
            this.loadReviews(profile.id);
          }
        }
      },
      error: () => {
        this.errorMsg.set('Failed to load profile');
        this.isLoading.set(false);
      }
    });
  }

  private loadReviews(userId: number) {
    this.isLoadingReviews.set(true);
    this.reviewService.getUserReviews(userId).subscribe({
      next: (res) => {
        this.isLoadingReviews.set(false);
        if ('error' in res) {
          this.alertService.error(res.error);
        } else {
          this.reviews.set(res as Review[]);
        }
      },
      error: () => {
        this.isLoadingReviews.set(false);
      }
    });
  }
}
