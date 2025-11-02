import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonFullComponent } from '../../../components/Buttons/button-component-full/button-component-full';
import { TextFieldComponent } from '../../../components/Forms/text-field-component/text-field-component';
import { TextFieldHideComponent } from '../../../components/Forms/text-field-hide-component/text-field-hide-component';
import { AdminAuthService } from '../../../services/admin-auth.service';
import { ApiService } from '../../../services/api.service';

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
  private api = inject(ApiService);

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

  private isValidEmail(email: string): boolean {
    // Improved email validation regex (stricter, RFC 5322-like)
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  handleSignIn = () => {
    // Reset previous errors
    this.hintEmail = '';
    this.hintPassword = '';
    this.hintName = '';
    this.hintConfirmPassword = '';
    this.errorMessage = '';

    // Trim inputs
    this.email = this.email.trim();
    this.name = this.name.trim();

    // Validate inputs
    let hasError = false;
    if (!this.email) {
      this.hintEmail = 'Email is required';
      hasError = true;
    } else if (!this.isValidEmail(this.email)) {
      this.hintEmail = 'Invalid email format';
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
        if (success[0]) {
          this.api.tokenSaved = success[1];
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
