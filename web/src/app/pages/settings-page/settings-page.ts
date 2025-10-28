import { Component, inject, OnInit } from '@angular/core';
import { HeaderDashBoardComponent } from '../../components/Headers/header-component-dashboard/header-component-dashboard';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextFieldComponent } from '../../components/Forms/text-field-component/text-field-component';
import { TextFieldHideComponent } from '../../components/Forms/text-field-hide-component/text-field-hide-component';
import { ButtonFullComponent } from '../../components/Buttons/button-component-full/button-component-full';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-settings-page',
  imports: [HeaderDashBoardComponent, CommonModule, FormsModule, TextFieldComponent, TextFieldHideComponent, ButtonFullComponent],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css'
})
export class SettingsPage implements OnInit {
  private apiService = inject(ApiService);

  // form model
  name = '';
  email = '';
  password = '';

  // UI state
  loading = false;
  successMessage = '';
  errorMessage = '';

  // optional: if frontend stored a current user id in localStorage
  userId: number | null = null;

  ngOnInit(): void {
    // Restore cached `currentUser` from localStorage (if present)
    try {
      const raw = localStorage.getItem('currentUser') || localStorage.getItem('user');
      if (raw) {
        const u = JSON.parse(raw);
        this.name = u.name || '';
        this.email = u.email || '';
        if (u.id) this.userId = Number(u.id);
      }
    } catch (err) {
      // ignore parse errors
    }

    // Prefer the secure endpoint that uses the httpOnly cookie: auth/me
    this.apiService.get<any>('auth/me').subscribe({
      next: (res) => {
        const payload = res?.user ?? res?.data ?? res;
        if (payload && payload.id) {
          this.userId = Number(payload.id);
          this.name = payload.name ?? this.name;
          this.email = payload.email ?? this.email;
          return;
        }

        // If auth/me returned null-ish and we had a cached id, try GET /users/:id as a fallback
        if (this.userId !== null) {
          this.apiService.get<any>(`users/${this.userId}`).subscribe({
            next: (r2) => {
              const p2 = r2?.data ?? r2?.user ?? r2;
              if (p2) {
                const user = p2.id ? p2 : p2.user ?? p2;
                if (user) {
                  this.name = user.name ?? this.name;
                  this.email = user.email ?? this.email;
                }
              }
            },
            error: (err2) => {
              console.debug('Fallback GET user/:id failed or not authorized:', err2);
            }
          });
        }
      },
      error: (err) => {
        // If auth/me fails (not logged in or cookie missing), fallback to user/:id only if cached id exists
        console.debug('auth/me failed (user likely not authenticated):', err);
        if (this.userId !== null) {
          this.apiService.get<any>(`users/${this.userId}`).subscribe({
            next: (r2) => {
              const p2 = r2?.data ?? r2?.user ?? r2;
              if (p2) {
                const user = p2.id ? p2 : p2.user ?? p2;
                if (user) {
                  this.name = user.name ?? this.name;
                  this.email = user.email ?? this.email;
                }
              }
            },
            error: (err2) => {
              console.debug('Fallback GET user/:id failed or not authorized:', err2);
            }
          });
        }
      }
    });
  }

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    const payload: any = {};
    if (this.name) payload.name = this.name;
    if (this.email) payload.email = this.email;
    if (this.password) payload.password = this.password;

    // Validate email format client-side
    if (payload.email && !this.isValidEmail(payload.email)) {
      this.errorMessage = 'Invalid email address.';
      return;
    }

    // Sanity check
    if (!payload.name && !payload.email && !payload.password) {
      this.errorMessage = 'No changes detected.';
      return;
    }

    this.loading = true;

    // Preferred: call PUT /api/users/:id when we know the id
    if (this.userId !== null) {
      this.apiService.put(`users/${this.userId}`, payload).subscribe({
        next: (res: any) => {
          this.loading = false;
          this.successMessage = 'Profile updated.';
          // Clear password field
          this.password = '';
        },
        error: (err: any) => {
          this.loading = false;
          this.errorMessage = 'Error updating profile.';
          console.error('Error updating user:', err);
        }
      });
      return;
    }

    // Fallback: if we don't have an id, try a generic put to `users` (backend may not support it)
    this.apiService.put('users', payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.successMessage = 'Update submitted.';
        this.password = '';
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = 'Unable to update (endpoint not available).';
        console.error('Error updating user (fallback):', err);
      }
    });
  }

  // Simple email validation (basic RFC-like check)
  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

}
