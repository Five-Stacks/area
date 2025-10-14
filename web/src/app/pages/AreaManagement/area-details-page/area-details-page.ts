import { Component, inject } from '@angular/core';
import { HeaderDashBoardComponent } from '../../../components/Headers/header-component-dashboard/header-component-dashboard';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-details-page',
  imports: [HeaderDashBoardComponent, CommonModule],
  templateUrl: './area-details-page.html',
  styleUrl: './area-details-page.css'
})
export class AreaDetailsPage {
  apiService = inject(ApiService);
  router = inject(Router);

  isEditing = false;
  idEditing = -1; // 1, 2, ... for actions
  nameArea = '';

  area : {
    name?: string;
    description?: string;
    trigger: {
      name?: string;
      urlImage?: string;
      serviceChosen?: string;
      actionChosenId?: number;
      datas_form?: {
        fieldId: number;
        fieldName: string;
        response: string;
      }[];
    };
    actions: {
      id: number;
      name?: string;
      type?: string;
      serviceChosen?: string;
      urlImage?: string;
      datas_form?: {
        fieldId: number;
        fieldName: string;
        response: string;
      }[];
    }[];
    active?: boolean;
  } = {
    trigger: {},
    actions: [{id: 1}],
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

  ngOnInit() {
    const areaId = window.location.pathname.split('/').pop();
    this.apiService.get(`area/${areaId}`).subscribe((data : any) => {
      console.log(data.data);
      if (!data || !data.data || !data.data.config)
        this.router.navigate(['/dashboard']);
      this.area.name = data.data.config.name;
      this.area.description = data.data.config.description;
      this.area.active = data.data.is_active;
      this.area.trigger = {
        name: data.data.config.trigger?.name,
        serviceChosen: data.data.config.trigger?.service_name,
        urlImage: `/assets/icons/${data.data.config.trigger.service_name.toLowerCase()}.png`,
        datas_form: data.data.config.trigger?.datas_form
      };
      this.area.actions = [{
        name: data.data.config.action?.name,
        id: 1,
        type: data.data.config.action?.type,
        serviceChosen: data.data.config.action?.service_name,
        urlImage: `/assets/icons/${data.data.config.action.service_name.toLowerCase()}.png`,
        datas_form: data.data.config.action?.datas_form
      }];
    });
  }
}
