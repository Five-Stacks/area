import { Component } from '@angular/core';
import { HeaderDashBoardComponent } from '../../../components/Headers/header-component-dashboard/header-component-dashboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-area-creation-page',
  imports: [HeaderDashBoardComponent, CommonModule],
  templateUrl: './area-creation-page.html',
  styleUrl: './area-creation-page.css'
})
export class AreaCreationPage {
  isEditing: boolean = false;
  idEditing: number = -1; // 1, 2, ... for actions
  nameArea: string = '';

  area : {
    name?: string;
    description?: string;
    trigger: {
      name?: string;
      type?: string;
      urlImage?: string;
    };
    actions: {
      id?: number;
      name?: string;
      type?: string;
      urlImage?: string;
    }[];
    active?: boolean;
  } = {
    trigger: {},
    actions: [{}]
  };

  editTrigger(areaId: number) {
    if (this.isEditing && this.idEditing === areaId) {
      this.isEditing = false;
      this.idEditing = -1;
    } else {
      this.isEditing = true;
      this.idEditing = areaId;
    }
  }

  addAction() {
  }
}
