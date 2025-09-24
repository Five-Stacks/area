import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-field-hide-component',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, FormsModule
  ],
  templateUrl: './text-field-hide-component.html',
  styleUrls: ['./text-field-hide-component.css'],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ]
})
export class TextFieldHideComponent {
  @Input() label = 'Input';
  @Input() hint = '';

  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  hide = true;

  toggleHide(): void {
    this.hide = !this.hide;
  }

  onInput(v: string) {
    this.valueChange.emit(v);
  }
}
