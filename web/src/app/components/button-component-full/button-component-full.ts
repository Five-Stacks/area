import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-full-component',
  imports: [],
  templateUrl: './button-component-full.html',
  styleUrl: './button-component-full.css'
})
export class ButtonFullComponent {
  @Input() label: string = 'Click Me';
  @Input() disabled: boolean = false;
  @Input() onClick: () => void = () => { };
}
