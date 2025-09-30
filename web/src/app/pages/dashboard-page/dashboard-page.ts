import { Component, inject } from '@angular/core';
import { ButtonFullComponent } from '../../components/Buttons/button-component-full/button-component-full';
import { ButtonWithIconComponent } from '../../components/Buttons/button-with-icon-component/button-with-icon-component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [ButtonFullComponent, ButtonWithIconComponent, CommonModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css'
})
export class DashboardPage {
  private router = inject(Router);


  listAreas = [
    { name: 'Area 1', id: 1 },
    { name: 'Area 2', id: 2 },
    { name: 'Area 3', id: 3 },
    { name: 'Area 4', id: 4 },
    { name: 'Area 5', id: 5 },
  ];

  onDetailsArea(areaId: number) {
    this.router.navigate(['/area/details', areaId]);
  }

  onEditionArea(areaId: number) {
    this.router.navigate(['/area/edition', areaId]);
  }
}
