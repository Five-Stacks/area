import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-service',
  imports: [],
  templateUrl: './card-service.html',
  styleUrl: './card-service.css'
})
export class CardService {
  @Input() name = '';
  @Input() description = '';
}
