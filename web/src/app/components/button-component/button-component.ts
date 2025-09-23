import { Component, inject, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-button',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css'
})
export class ButtonComponent {
  router = inject(Router);

  @Input() label = 'Click Me';
  @Input() disabled = false;
  @Input() onClick?: () => void;
  @Input() path?: string|null = null;

  onClickHandler() {
    if (this.disabled) return;
    if (this.onClick) {
      this.onClick();
    }
    if (this.path) {
      this.router.navigate([this.path]);
    }
  }
}
