import { Component, inject, Input } from '@angular/core';
import { ButtonFullComponent } from '../Buttons/button-component-full/button-component-full';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-card-service',
  imports: [ButtonFullComponent, CommonModule],
  templateUrl: './card-service.html',
  styleUrl: './card-service.css'
})
export class CardService {
  private apiService = inject(ApiService);

  @Input() name = '';
  @Input() id = '';
  @Input() description = '';
  @Input() connectedShow = false;
  @Input() connected = false;

  connectService = () => {
    window.location.href = this.apiService.apiUrl + '/oauth/' + this.name.toLowerCase();
  };
}
