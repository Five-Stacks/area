import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-field-hide-component',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './text-field-hide-component.html',
  styleUrl: './text-field-hide-component.css',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    }
  ]
})
export class TextFieldHideComponent {
  @Input() label = 'Input';

  hide = true;

  toggleHide(): void {
    this.hide = !this.hide;
  }
}
