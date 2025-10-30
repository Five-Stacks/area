import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/Headers/header-component/header-component';
import { TextFieldComponent } from '../../components/Forms/text-field-component/text-field-component';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { CardService } from '../../components/card-service/card-service';

interface Service {
  name: string;
  id: number;
  description: string;
}

interface apiResponse<T> {
  data: T;
}

@Component({
  selector: 'app-explorer-page',
  imports: [HeaderComponent, TextFieldComponent, CommonModule, CardService],
  templateUrl: './explorer-page.html',
  styleUrls: ['./explorer-page.css']
})
export class ExplorerPage implements OnInit {
  private apiService = inject(ApiService);

  searchService = '';
  listServices : Service[] = [];

  filteredSerice() {
    return this.listServices.filter(service =>
      service.name.toLowerCase().includes(this.searchService.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.apiService.get<apiResponse<Service[]>>('service').subscribe({
      next: (data) => {
        this.listServices = data.data;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
      }
    });
  }
}
