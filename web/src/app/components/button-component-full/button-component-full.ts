import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-button-full',
  standalone: true, // si standalone
  imports: [],
  templateUrl: './button-component-full.html',
  styleUrls: ['./button-component-full.css']
})
export class ButtonFullComponent {
  private router = inject(Router);

  @Input() label = 'Click Me';
  @Input() disabled = false;
  @Input() onClick?: () => void;
  @Input() path?: string | null = null;

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
