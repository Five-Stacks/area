import { Component, Input } from '@angular/core';
import { ButtonFullComponent } from '../Buttons/button-component-full/button-component-full';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-service',
  imports: [ButtonFullComponent, CommonModule],
  templateUrl: './card-service.html',
  styleUrl: './card-service.css'
})
export class CardService {
  @Input() name = '';
  @Input() description = '';
  @Input() connectedShow = false;
  @Input() connected = false;
}
