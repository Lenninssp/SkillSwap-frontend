import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';
import { ApiError } from '../../core/models/api-error.model';
import { RegisterData, RegisterResponse } from '../../core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly suggestedUsername = signal<string | null>(null);
  readonly skills = signal<string[]>([]);
  readonly skillInput = signal('');

  readonly registerForm = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    bio: ['', [Validators.required]]
  });

  addSkill(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = this.skillInput().trim();
      if (value && !this.skills().includes(value)) {
        this.skills.update(s => [...s, value]);
        this.skillInput.set('');
      }
    }
  }

  removeSkill(skill: string) {
    this.skills.update(s => s.filter(x => x !== skill));
  }

  updateSkillInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.skillInput.set(input.value);
  }

  useSuggestedUsername() {
    const suggested = this.suggestedUsername();
    if (suggested) {
      this.registerForm.patchValue({ username: suggested });
      this.suggestedUsername.set(null);
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.suggestedUsername.set(null);

    const formValue = this.registerForm.getRawValue();
    const formData: RegisterData = {
      name: formValue.name ?? '',
      username: formValue.username ?? '',
      email: formValue.email ?? '',
      password: formValue.password ?? '',
      bio: formValue.bio ?? '',
      skills: this.skills()
    };

    this.authService.register(formData).subscribe({
      next: (res: RegisterResponse | ApiError) => {
        this.isLoading.set(false);
        if ('error' in res) {
          const apiErr = res as ApiError;
          this.alertService.error(apiErr.error);
          if (apiErr.suggested_username) {
            this.suggestedUsername.set(apiErr.suggested_username);
          }
        } else {
          const successRes = res as RegisterResponse;
          this.alertService.success(successRes.message);
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.alertService.error('An unexpected error occurred');
      }
    });
  }

  // To avoid using "any" in subscribe, I used a type check above, 
  // but I can refine the subscribe callback further if needed.
}
