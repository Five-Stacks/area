import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonFullComponent } from '../../../components/Buttons/button-component-full/button-component-full';
import { TextFieldComponent } from '../../../components/Forms/text-field-component/text-field-component';
import { TextFieldHideComponent } from '../../../components/Forms/text-field-hide-component/text-field-hide-component';
import { AdminAuthService } from '../../../services/admin-auth.service';

@Component({
  selector: 'app-sign-up-page',
  imports: [ButtonFullComponent, TextFieldComponent, RouterLink, TextFieldHideComponent],
  templateUrl: './sign-up-page.html',
  styleUrls: ['./sign-up-page.css'],
})
export class SignUpPage {
  private router = inject(Router);
  private adminAuthService = inject(AdminAuthService);
  private route = inject(ActivatedRoute);

  email = '';
  password = '';
  confirmPassword = '';
  name = '';
  hintEmail = '';
  hintPassword = '';
  hintName = '';
  hintConfirmPassword = '';
  isLoading = false;
  errorMessage = '';

  handleSignIn = () => {
    // Reset previous errors
    this.hintEmail = '';
    this.hintPassword = '';
    this.hintName = '';
    this.hintConfirmPassword = '';
    this.errorMessage = '';

    // Validate inputs
    let hasError = false;
    if (!this.email) {
      this.hintEmail = 'Email is required';
      hasError = true;
    }
    if (!this.password) {
      this.hintPassword = 'Password is required';
      hasError = true;
    }
    if (!this.name) {
      this.hintName = 'Name is required';
      hasError = true;
    }
    if (this.confirmPassword !== this.password) {
      this.hintConfirmPassword = 'Passwords do not match';
      hasError = true;
    }
    if (hasError) {
      return;
    }

    this.isLoading = true;

    // Use the authentication service
    this.adminAuthService.register(this.email, this.password, this.name).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          // Registration successful, navigate to login or dashboard
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration error:', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  };
}
