import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/Headers/header-component/header-component';
import { TextFieldComponent } from '../../components/Forms/text-field-component/text-field-component';
import { OptionsFieldComponent } from '../../components/Forms/options-field-component/options-field-component';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { CardService } from '../../card-service/card-service';

@Component({
  selector: 'app-explorer-page',
  imports: [HeaderComponent, TextFieldComponent, CommonModule, CardService],
  templateUrl: './explorer-page.html',
  styleUrl: './explorer-page.css'
})
export class ExplorerPage implements OnInit {
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
