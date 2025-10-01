import { Component, inject } from '@angular/core';
import { HeaderDashBoardComponent } from '../../../components/Headers/header-component-dashboard/header-component-dashboard';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-area-details-page',
  imports: [HeaderDashBoardComponent, CommonModule, RouterLink],
  templateUrl: './area-details-page.html',
  styleUrl: './area-details-page.css'
})
export class AreaDetailsPage {
  private router = inject(Router);

  area : {
    id: number;
    name: string;
    description: string;
    trigger: {
      name: string;
      type: string;
      urlImage: string;
    };
    actions: {
      name: string;
      type: string;
      urlImage: string;
    }[];
    active: boolean;
  } = {
    id: 1,
    name: 'Area 1',
    description: 'This is a description of Area 1. It can be quite long and detailed, providing all the necessary information about the area.',
    trigger: {
      name: 'Every day at 8:00 AM',
      type: 'Google',
      urlImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png'
    },
    actions: [
      { name: 'Post Tweet', type: 'icon', urlImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png' },
      { name: 'Post Tweet', type: 'icon', urlImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png' },
      { name: 'Post Tweet', type: 'icon', urlImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png' },
      { name: 'Post Tweet', type: 'icon', urlImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png' },
      { name: 'Post Tweet', type: 'icon', urlImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png' },
      { name: 'Post Tweet', type: 'icon', urlImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png' },
      { name: 'Post Tweet', type: 'icon', urlImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png' },
      { name: 'Date', type: 'date', urlImage: 'https://www.svgrepo.com/show/438428/date-round.svg' }
    ],
    active: true
  };

  editTrigger() {
    this.router.navigate(['/area/edition', this.area.id]);
  }
}
