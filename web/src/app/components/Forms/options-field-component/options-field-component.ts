import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-options-field-component',
  imports: [CommonModule],
  templateUrl: './options-field-component.html',
  styleUrl: './options-field-component.css'
})
export class OptionsFieldComponent {
  @Input() options: string[] = [];
  @Input() label: string = '';
  @Input() selectedOption: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onOptionChange(event: any) {
    this.selectedOption = event.target.value;
    this.valueChange.emit(this.selectedOption);
  }
}
