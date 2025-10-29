import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../Buttons/button-component/button-component';
import { ButtonFullComponent } from '../../Buttons/button-component-full/button-component-full';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-header',
  imports: [ButtonComponent, ButtonFullComponent],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css']
})
export class HeaderComponent {
  router = inject(Router);

  navigateToHome() {
    this.router.navigate(['/welcome']);
  }
}
