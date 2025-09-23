import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonFullComponent } from '../../../components/button-component-full/button-component-full';

@Component({
  selector: 'app-sign-up-page',
  imports: [ButtonFullComponent],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.css'
})
export class SignUpPage {
  private router = inject(Router);

  handleSignUp() {
    this.router.navigate(['/dashboard']);
  }
}
