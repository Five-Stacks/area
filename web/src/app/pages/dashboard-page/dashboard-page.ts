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
  private router = inject(Router);

  listAreas : {
    id: number
    name: string
    AppsIcons: string[]
    active: boolean
    selected?: boolean
    isToggling?: boolean
  }[] = [
    {
      id: 1,
      name: 'Area 1',
      AppsIcons: [
        'https://www.svgrepo.com/show/438428/date-round.svg'],
      active: true
    },
    {
      id: 2,
      name: 'Area 2',
      AppsIcons: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png',
          'https://www.svgrepo.com/show/438428/date-round.svg'
        ],
      active: false
    },
    {
      id: 3,
      name: 'Area 3',
      AppsIcons: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png',
        'https://www.svgrepo.com/show/438428/date-round.svg'
      ],
      active: true
    },
    {
      id: 4,
      name: 'Area 4',
      AppsIcons: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png',
        'https://www.svgrepo.com/show/438428/date-round.svg'
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

  getIconsArea(areaId: number): string[] {
    const area = this.listAreas.find(a => a.id === areaId);
    if (!area) return [];
    if (area.AppsIcons.length > 3) {
      let newIcons = [];
      newIcons = area.AppsIcons.slice(0, 2);
      newIcons.push('https://static.thenounproject.com/png/683450-200.png');
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

  changeStatus(areaId: number) {
    const area = this.listAreas.find(a => a.id === areaId);
    if (area && !area.isToggling) {
      area.isToggling = true;

      // Délai pour permettre l'animation CSS
      setTimeout(() => {
        area.active = !area.active;
        area.isToggling = false;
      }, 150); // La moitié de la durée de l'animation CSS (300ms)
    }
  }
}
