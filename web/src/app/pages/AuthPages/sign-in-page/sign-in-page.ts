import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonFullComponent } from '../../../components/Buttons/button-component-full/button-component-full';
import { TextFieldComponent } from '../../../components/Forms/text-field-component/text-field-component';

@Component({
  selector: 'app-sign-in-page',
  imports: [ButtonFullComponent, TextFieldComponent],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.css'
})
export class SignInPage {
  private router = inject(Router);

  handleSignIn() {
    this.router.navigate(['/dashboard']);
  }
}
