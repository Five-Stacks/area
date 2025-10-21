import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-options-field-component',
  imports: [CommonModule],
  templateUrl: './options-field-component.html',
  styleUrls: ['./options-field-component.css']
})
export class OptionsFieldComponent implements OnInit  {
  @Input() options: string[] = [];
  @Input() label = '';
  @Input() selectedOption = '';
  @Output() valueChange = new EventEmitter<string>();

  ngOnInit() {
    this.selectedOption = this.label;
  }

  public setSelectedOption(option: string) {
    this.selectedOption = option;
    this.valueChange.emit(this.selectedOption);
  }

  onOptionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedOption = target.value;
    this.valueChange.emit(this.selectedOption);
  }
}
