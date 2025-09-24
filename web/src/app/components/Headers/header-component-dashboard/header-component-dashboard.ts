import { Component, inject, Input } from '@angular/core';
import { ButtonFullComponent } from '../../Buttons/button-component-full/button-component-full';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-header-dashboard',
  imports: [ButtonFullComponent],
  templateUrl: './header-component-dashboard.html',
  styleUrl: './header-component-dashboard.css'
})
export class HeaderDashBoardComponent {
  router = inject(Router);
  @Input() title = 'Dashboard';

  navigateToHome() {
    this.router.navigate(['/dashboard']);
  }
}
