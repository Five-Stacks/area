import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button-component/button-component';

@Component({
  selector: 'app-area-button-icon',
  imports: [ButtonComponent],
  templateUrl: './button-with-icon-component.html',
  styleUrl: './button-with-icon-component.css'
})
export class ButtonWithIconComponent {
  @Input() label = 'Button';
  @Input() icon = 'https://www.eclatdeverre.com/wp-content/uploads/2020/12/default-featured-img-1.png';
  @Input() disabled = false;
  @Input() onClick?: () => void;
  @Input() path?: string;
}
