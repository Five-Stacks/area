import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonFullComponent } from '../../../components/Buttons/button-component-full/button-component-full';

@Component({
  selector: 'app-sign-in-page',
  imports: [ButtonFullComponent],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.css'
})
export class SignInPage {
  private router = inject(Router);

  handleSignIn() {
    this.router.navigate(['/dashboard']);
  }
}
