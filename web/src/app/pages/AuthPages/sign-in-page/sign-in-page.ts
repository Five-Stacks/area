import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonFullComponent } from '../../../components/Buttons/button-component-full/button-component-full';
import { TextFieldComponent } from '../../../components/Forms/text-field-component/text-field-component';
import { TextFieldHideComponent } from '../../../components/Forms/text-field-hide-component/text-field-hide-component';
import { GoogleConnectComponent } from '../../../components/Forms/google-connect-component/google-connect-component';

@Component({
  selector: 'app-sign-in-page',
  imports: [ButtonFullComponent, TextFieldComponent, RouterLink, TextFieldHideComponent, GoogleConnectComponent],
  templateUrl: './sign-in-page.html',
  styleUrls: ['./sign-in-page.css'],
})
export class SignInPage {
  private router = inject(Router);

  email = '';
  password = '';
  hintEmail = '';
  hintPassword = '';

  handleSignIn = () => {
    console.log('Sign In', this.email, this.password);
    if (!this.email || !this.password) {
      this.hintEmail = this.email ? '' : 'Email is required';
      this.hintPassword = this.password ? '' : 'Password is required';
      return;
    }
    this.router.navigate(['/dashboard']);
  };

  onEmailChange(v: string) {
    this.email = v;
  }

  onPasswordChange(v: string) {
    this.password = v;
  }
}
