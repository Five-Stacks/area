import { Component, inject } from '@angular/core';
import { ButtonFullComponent } from '../../components/Buttons/button-component-full/button-component-full';
import { ButtonWithIconComponent } from '../../components/Buttons/button-with-icon-component/button-with-icon-component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TextFieldComponent } from '../../components/Forms/text-field-component/text-field-component';
import { OptionsFieldComponent } from '../../components/Forms/options-field-component/options-field-component';

@Component({
  selector: 'app-dashboard-page',
  imports: [ButtonFullComponent, ButtonWithIconComponent, CommonModule, TextFieldComponent, OptionsFieldComponent],
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
  }[] = [
    {
      id: 1,
      name: 'Area 1',
      AppsIcons: ['assets/icons/slack-icon.svg', 'assets/icons/discord-icon.svg', 'assets/icons/github-icon.svg'],
      active: true
    },
    {
      id: 2,
      name: 'Area 2',
      AppsIcons: ['assets/icons/slack-icon.svg', 'assets/icons/discord-icon.svg', 'assets/icons/github-icon.svg'],
      active: false
    },
    {
      id: 3,
      name: 'Area 3',
      AppsIcons: ['assets/icons/slack-icon.svg', 'assets/icons/discord-icon.svg', 'assets/icons/github-icon.svg'],
      active: true
    },
    {
      id: 4,
      name: 'Area 4',
      AppsIcons: ['assets/icons/slack-icon.svg', 'assets/icons/discord-icon.svg', 'assets/icons/github-icon.svg'],
      active: false
    }
  ];

  onDetailsArea(areaId: number) {
    this.router.navigate(['/area/details', areaId]);
  }

  onEditionArea(areaId: number) {
    this.router.navigate(['/area/edition', areaId]);
  }
}
