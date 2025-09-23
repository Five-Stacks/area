import { Component, inject, Inject } from '@angular/core';
import { ButtonComponent } from '../button-component/button-component';
import { ButtonFullComponent } from '../button-component-full/button-component-full';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-header',
  imports: [ButtonComponent, ButtonFullComponent],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {
  router = inject(Router);

  navigateToHome() {
    this.router.navigate(['/welcome']);
  }
}
