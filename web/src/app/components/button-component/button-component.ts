import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'area-button',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css'
})
export class ButtonComponent {
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
