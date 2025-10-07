import { Component, inject, OnInit } from '@angular/core';
import { ButtonFullComponent } from '../../components/Buttons/button-component-full/button-component-full';
import { ButtonWithIconComponent } from '../../components/Buttons/button-with-icon-component/button-with-icon-component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TextFieldComponent } from '../../components/Forms/text-field-component/text-field-component';
import { OptionsFieldComponent } from '../../components/Forms/options-field-component/options-field-component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    ButtonFullComponent,
    ButtonWithIconComponent,
    CommonModule,
    TextFieldComponent,
    OptionsFieldComponent,
    RouterLink
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css'
})
export class DashboardPage implements OnInit {
  searchTerm = '';
  appsFilter = 'All Apps';
  statusFilter = 'All Status'

  listApps: string[] = ['All Apps'];
  listStatus: string[] = ['All Status', 'Active', 'Inactive'];

  private router = inject(Router);
  private apiService = inject(ApiService);

  listAreas : {
    id: number
    name: string
    AppsIcons: {
      name: string
      url: string
    }[]
    active: boolean
    selected?: boolean
    isToggling?: boolean
  }[] = [];

  onDetailsArea(areaId: number) {
    this.router.navigate(['/area/details', areaId]);
  }

  onEditionArea(areaId: number) {
    this.router.navigate(['/area/edition', areaId]);
  }

  getIconsArea(areaId: number): {
    name: string
    url: string
  }[] {
    const area = this.listAreas.find(a => a.id === areaId);
    if (!area) return [];
    if (area.AppsIcons.length > 3) {
      let newIcons = [];
      newIcons = area.AppsIcons.slice(0, 2);
      newIcons.push({ name: 'More', url: 'https://static.thenounproject.com/png/683450-200.png' });
      return newIcons;
    }
    return area.AppsIcons;
  }

  selectArea(areaId: number) {
    this.listAreas = this.listAreas.map(area => ({
      ...area,
      selected: area.id === areaId ? !area.selected : area.selected
    }));
  }

  getFilteredAreas() : {
    id: number
    name: string
    AppsIcons: {
      name: string
      url: string
    }[]
    active: boolean
    selected?: boolean
    isToggling?: boolean
  }[] {
    let filtered = this.listAreas;
    if (this.searchTerm)
      filtered = filtered.filter(area => area.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    if (this.appsFilter && this.appsFilter !== 'All Apps')
      filtered = filtered.filter(area => area.AppsIcons.some(app => app.name === this.appsFilter));
    if (this.statusFilter && this.statusFilter !== 'All Status') {
      const isActive = this.statusFilter === 'Active';
      filtered = filtered.filter(area => area.active === isActive);
    }
    return filtered;
  }

  changeStatus(areaId: number) {
    const area = this.listAreas.find(a => a.id === areaId);
    if (area && !area.isToggling) {
      area.isToggling = true;

      setTimeout(() => {
        area.active = !area.active;
        area.isToggling = false;
      }, 150);
    }
  }

  ngOnInit() {
    this.apiService.get('area/').subscribe(data => {
      if (data) {
        this.listAreas = data.data;

        // Initialize listApps based on the unique app names from listAreas
        const appSet = new Set<string>();
        this.listAreas.forEach(area => {
          area.AppsIcons.forEach(app => {
            appSet.add(app.name);
          });
        });
        this.listApps = ['All Apps', ...Array.from(appSet)];
      }
    });

  }
}
