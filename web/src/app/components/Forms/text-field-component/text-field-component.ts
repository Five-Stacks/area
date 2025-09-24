import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-field-component',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './text-field-component.html',
  styleUrl: './text-field-component.css',
  standalone: true,
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    }
  ]
})
export class TextFieldComponent {
  @Input() label = 'Input';
  @Input() hint = '';

  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  
  onInput(v: string) {
    this.valueChange.emit(v);
  }

}
