import { Component, inject, OnInit } from '@angular/core';
import { ButtonFullComponent } from '../../components/Buttons/button-component-full/button-component-full';
import { HeaderComponent } from '../../components/Headers/header-component/header-component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CardService } from '../../components/card-service/card-service';

interface Service {
  name: string;
  description: string;
  id: number;
}

interface apiResponse<T> {
  data: T;
}

@Component({
  selector: 'app-welcome-page',
  imports: [ButtonFullComponent, HeaderComponent, CommonModule, CardService],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.css'
})
export class WelcomePage implements OnInit {
  private apiService = inject(ApiService);

  handleButtonClick() {
    alert('Button clicked!');
  }
  serviceList: Service[] = [];

  ngOnInit() {
    this.apiService.get<apiResponse<Service[]>>('service').subscribe({
      next: (data) => {
        this.serviceList = (data.data || []).slice(0, 5);
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      }
    });
  }
}
