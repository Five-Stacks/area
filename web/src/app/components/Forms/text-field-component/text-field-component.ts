import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@Component({
  selector: 'app-text-field-component',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './text-field-component.html',
  styleUrl: './text-field-component.css',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    }
  ]
})
export class TextFieldComponent {
  @Input() label = 'Input';
}
