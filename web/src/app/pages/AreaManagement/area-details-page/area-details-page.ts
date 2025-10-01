import { Component, inject } from '@angular/core';
import { HeaderDashBoardComponent } from '../../../components/Headers/header-component-dashboard/header-component-dashboard';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from '../../../components/Forms/text-field-component/text-field-component';

@Component({
  selector: 'app-area-details-page',
  imports: [HeaderDashBoardComponent, CommonModule, TextFieldComponent],
  templateUrl: './area-details-page.html',
  styleUrl: './area-details-page.css'
})
export class AreaDetailsPage {
  isEditing: boolean = false;
  idEditing: number = -1; // 1, 2, ... for actions
  nameArea: string = '';

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
      id: number;
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
      { id: 1, name: 'Post Tweet', type: 'icon', urlImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/1200px-X_icon.svg.png' },
      { id: 2, name: 'Send Email', type: 'icon', urlImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mail_%28iOS%29.svg/1200px-Mail_%28iOS%29.svg.png' },
      { id: 3, name: 'Turn on Light', type: 'icon', urlImage: 'https://cdn-icons-png.flaticon.com/512/69/69172.png' },
      { id: 4, name: 'Log to Console', type: 'icon', urlImage: 'https://images.icon-icons.com/2248/PNG/512/console_icon_138727.png' },
      { id: 5, name: 'Create Calendar Event', type: 'icon', urlImage: 'https://icons.veryicon.com/png/o/miscellaneous/face-monochrome-icon/calendar-249.png' }
    ],
    active: true
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
}
