import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-options-field-component',
  imports: [],
  templateUrl: './options-field-component.html',
  styleUrl: './options-field-component.css'
})
export class OptionsFieldComponent {
  @Input() options: string[] = [];
  @Input() label: string = '';
  @Input() selectedOption: string = '';

  onOptionChange(event: any) {
    this.selectedOption = event.target.value;
  }
}
