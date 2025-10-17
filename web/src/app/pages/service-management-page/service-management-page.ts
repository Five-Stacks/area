import { Component, inject, OnInit } from '@angular/core';
import { HeaderDashBoardComponent } from '../../components/Headers/header-component-dashboard/header-component-dashboard';
import { ApiService } from '../../services/api.service';
import { CardService } from '../../components/card-service/card-service';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from '../../components/Forms/text-field-component/text-field-component';
import { OptionsFieldComponent } from '../../components/Forms/options-field-component/options-field-component';

@Component({
  selector: 'app-service-management-page',
  imports: [HeaderDashBoardComponent, TextFieldComponent, CommonModule, CardService, OptionsFieldComponent],
  templateUrl: './service-management-page.html',
  styleUrl: './service-management-page.css'
})
export class ServiceManagementPage implements OnInit {
  private apiService = inject(ApiService);

  searchService = '';
  listServices : {
    name: string;
    id: number;
    description: string;
  }[] = [];

  userServices : {
    id: number;
    user_id?: number;
    service_id?: number;
    oauth_account_id?: number;
    created_at?: string;
  }[] = [];
  filterOptions: string[] = ["All", "Connected", "Disconnected"];
  optionChoosed: string = 'All';

  isConnected(serviceId: number): boolean {
    return this.userServices.some(userService => userService.service_id === serviceId);
  }

  filteredSerice() {
    return this.listServices.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(this.searchService.toLowerCase());
      if (this.optionChoosed === 'All') {
        return matchesSearch;
      } else if (this.optionChoosed === 'Connected') {
        return matchesSearch && this.isConnected(service.id);
      } else if (this.optionChoosed === 'Disconnected') {
        return matchesSearch && !this.isConnected(service.id);
      }
      return false;
    });
  }

  ngOnInit(): void {
    this.apiService.get<any>('service').subscribe({
      next: (data) => {
        this.listServices = data.data;
        this.apiService.get<any>('userService').subscribe({
          next: (userData) => {
            this.userServices = userData.data;
          },
          error: (err) => {
            console.error('Error fetching user services:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching services:', err);
      }
    });
  }
}
