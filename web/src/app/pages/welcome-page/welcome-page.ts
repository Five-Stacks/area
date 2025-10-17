import { Component, inject, OnInit } from '@angular/core';
import { ButtonFullComponent } from '../../components/Buttons/button-component-full/button-component-full';
import { HeaderComponent } from '../../components/Headers/header-component/header-component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CardService } from '../../components/card-service/card-service';

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
  serviceList: {
    name: string;
    description: string;
    id: number;
  }[] = [];

  ngOnInit() {
    this.apiService.get<any>('service').subscribe({
      next: (data) => {
        this.serviceList = (data.data || []).slice(0, 5);
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      }
    });
  }
}
