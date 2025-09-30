import { Component, inject } from '@angular/core';
import { ButtonFullComponent } from '../../components/Buttons/button-component-full/button-component-full';
import { ButtonWithIconComponent } from '../../components/Buttons/button-with-icon-component/button-with-icon-component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TextFieldComponent } from '../../components/Forms/text-field-component/text-field-component';
import { OptionsFieldComponent } from '../../components/Forms/options-field-component/options-field-component';

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
export class DashboardPage {
  searchTerm: string = '';
  appsFilter: string = 'All Apps';
  statusFilter: string = 'All Status'

  listApps: string[] = ['All Apps'];
  listStatus: string[] = ['All Status', 'Active', 'Inactive'];

  private router = inject(Router);

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
  }[] = [
    {
      id: 1,
      name: 'Area 1',
      AppsIcons: [
        { name: 'Date', url: 'https://www.svgrepo.com/show/438428/date-round.svg' }
      ],
      active: true
    },
    {
      id: 2,
      name: 'Area 2',
      AppsIcons: [
        { name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' },
        { name: 'X', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png' },
        { name: 'X', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png' },
        { name: 'Date', url: 'https://www.svgrepo.com/show/438428/date-round.svg' }
      ],
      active: false
    },
    {
      id: 3,
      name: 'Area 3',
      AppsIcons: [
        { name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' },
        { name: 'Date', url: 'https://www.svgrepo.com/show/438428/date-round.svg' }
      ],
      active: true
    },
    {
      id: 4,
      name: 'Area 4',
      AppsIcons: [
        { name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' },
        { name: 'X', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png' },
        { name: 'Date', url: 'https://www.svgrepo.com/show/438428/date-round.svg' }
      ],
      active: false
    }
  ];

  onDetailsArea(areaId: number) {
    this.router.navigate(['/area/details', areaId]);
  }

  onEditionArea(areaId: number) {
    this.router.navigate(['/area/edition', areaId]);
  }

  getIconsArea(areaId: number): any[] {
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

  getFilteredAreas() : any[] {
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
    // Initialize listApps based on the unique app names from listAreas
    const appSet = new Set<string>();
    this.listAreas.forEach(area => {
      area.AppsIcons.forEach(app => {
        appSet.add(app.name);
      });
    });
    this.listApps = ['All Apps', ...Array.from(appSet)];
  }
}
