import { Component, inject } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ButtonFullComponent } from '../../../components/Buttons/button-component-full/button-component-full';
import { TextFieldComponent } from '../../../components/Forms/text-field-component/text-field-component';
import { TextFieldHideComponent } from '../../../components/Forms/text-field-hide-component/text-field-hide-component';
import { GoogleConnectComponent } from '../../../components/Forms/google-connect-component/google-connect-component';
import { AdminAuthService } from '../../../services/admin-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in-page',
  imports: [ButtonFullComponent, TextFieldComponent, RouterLink, TextFieldHideComponent, GoogleConnectComponent, CommonModule],
  templateUrl: './sign-in-page.html',
  styleUrls: ['./sign-in-page.css'],
})
export class SignInPage {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private adminAuthService = inject(AdminAuthService);

  email = '';
  password = '';
  hintEmail = '';
  hintPassword = '';
  isLoading = false;
  errorMessage = '';

  handleSignIn = () => {
    // Reset previous errors
    this.hintEmail = '';
    this.hintPassword = '';
    this.errorMessage = '';

    // Validate inputs
    if (!this.email || !this.password) {
      this.hintEmail = this.email ? '' : 'Email is required';
      this.hintPassword = this.password ? '' : 'Password is required';
      return;
    }

    this.isLoading = true;

    // Use the authentication service
    this.adminAuthService.login(this.email, this.password).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          // Get return URL or default to dashboard
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigate([returnUrl]);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. Please try again.';
      }
    });
  };

  onEmailChange(v: string) {
    this.email = v;
    this.errorMessage = ''; // Clear error when user types
  }

  onPasswordChange(v: string) {
    this.password = v;
    this.errorMessage = ''; // Clear error when user types
  }
}
