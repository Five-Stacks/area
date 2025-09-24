import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonFullComponent } from '../../../components/Buttons/button-component-full/button-component-full';
import { TextFieldComponent } from '../../../components/Forms/text-field-component/text-field-component';
import { TextFieldHideComponent } from '../../../components/Forms/text-field-hide-component/text-field-hide-component';
import { GoogleConnectComponent } from '../../../components/Forms/google-connect-component/google-connect-component';

@Component({
  selector: 'app-sign-up-page',
  imports: [ButtonFullComponent, TextFieldComponent, RouterLink, TextFieldHideComponent, GoogleConnectComponent],
  templateUrl: './sign-up-page.html',
  styleUrls: ['./sign-up-page.css'],
})
export class SignUpPage {
  private router = inject(Router);

  email = '';
  password = '';
  confirmPassword = '';
  name = '';
  hintEmail = '';
  hintPassword = '';
  hintName = '';
  hintConfirmPassword = '';

  handleSignIn = () => {
    if (!this.email || !this.password || !this.name || !this.confirmPassword) {
      this.hintEmail = this.email ? '' : 'Email is required';
      this.hintPassword = this.password ? '' : 'Password is required';
      this.hintName = this.name ? '' : 'Name is required';
      this.hintConfirmPassword = this.confirmPassword ? '' : 'Confirm Password is required';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.hintConfirmPassword = 'Passwords do not match';
      return;
    }
    this.router.navigate(['/dashboard']);
  };
}
