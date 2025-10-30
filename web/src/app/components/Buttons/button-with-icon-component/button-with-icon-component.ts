import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-button-icon',
  imports: [],
  templateUrl: './button-with-icon-component.html',
  styleUrls: ['./button-with-icon-component.css']
})
export class ButtonWithIconComponent {
  private router = inject(Router);

  @Input() label = 'Button';
  @Input() icon = 'https://www.eclatdeverre.com/wp-content/uploads/2020/12/default-featured-img-1.png';
  @Input() disabled = false;
  @Input() onClick?: () => void;
  @Input() path?: string;

  handleClick() {
    if (this.onClick) {
      this.onClick();
    }
    if (this.path) {
      this.router.navigate([this.path]);
    }
  }
}
