import { Component, inject } from '@angular/core';
import { HeaderDashBoardComponent } from '../../components/Headers/header-component-dashboard/header-component-dashboard';
import { ApiService } from '../../services/api.service';
import { CardService } from '../../components/card-service/card-service';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from '../../components/Forms/text-field-component/text-field-component';

@Component({
  selector: 'app-service-management-page',
  imports: [HeaderDashBoardComponent, TextFieldComponent, CommonModule, CardService],
  templateUrl: './service-management-page.html',
  styleUrl: './service-management-page.css'
})
export class ServiceManagementPage {
  private apiService = inject(ApiService);

  searchService = '';
  listServices : {
    name: string;
    id: number;
    description: string;
  }[] = [];

  filteredSerice() {
    return this.listServices.filter(service =>
      service.name.toLowerCase().includes(this.searchService.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.apiService.get<any>('service').subscribe({
      next: (data) => {
        this.listServices = data.data;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
      }
    });
  }
}
