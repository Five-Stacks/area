import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-component',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css'
})
export class ButtonComponent {
  @Input() label: string = 'Click Me';
  @Input() disabled: boolean = false;
  @Input() onClick: () => void = () => { };
}
