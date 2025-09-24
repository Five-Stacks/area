import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonFullComponent } from '../../../components/Buttons/button-component-full/button-component-full';
import { TextFieldComponent } from '../../../components/Forms/text-field-component/text-field-component';
import { TextFieldHideComponent } from '../../../components/Forms/text-field-hide-component/text-field-hide-component';

@Component({
  selector: 'app-sign-in-page',
  imports: [ButtonFullComponent, TextFieldComponent, RouterLink, TextFieldHideComponent],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.css'
})
export class SignInPage {
  private router = inject(Router);

  handleSignIn() {
    this.router.navigate(['/dashboard']);
  }
}
