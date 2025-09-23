import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'area-button-full',
  imports: [],
  templateUrl: './button-component-full.html',
  styleUrl: './button-component-full.css'
})
export class ButtonFullComponent {
  constructor(private router: Router) {}

  @Input() label: string = 'Click Me';
  @Input() disabled: boolean = false;
  @Input() onClick?: () => void = () => { };
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
