import { Component } from '@angular/core';
import { ButtonComponent } from '../button-component/button-component';
import { ButtonFullComponent } from '../button-component-full/button-component-full';
import { Router } from '@angular/router';

@Component({
  selector: 'area-header',
  imports: [ButtonComponent, ButtonFullComponent],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/welcome']);
  }
}
