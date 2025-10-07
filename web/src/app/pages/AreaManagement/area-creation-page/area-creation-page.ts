import { Component, inject } from '@angular/core';
import { HeaderDashBoardComponent } from '../../../components/Headers/header-component-dashboard/header-component-dashboard';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonFullComponent } from '../../../components/Buttons/button-component-full/button-component-full';
import { OptionsFieldComponent } from '../../../components/Forms/options-field-component/options-field-component';
import { TextFieldComponent } from '../../../components/Forms/text-field-component/text-field-component';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-area-creation-page',
  imports: [HeaderDashBoardComponent, CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonFullComponent,
    OptionsFieldComponent,
    TextFieldComponent
  ],
  templateUrl: './area-creation-page.html',
  styleUrl: './area-creation-page.css'
})
export class AreaCreationPage {
  private router = inject(Router);
  private apiService = inject(ApiService);

  isEditing = false;
  idEditingTrigger = -1; // 1, 2, ... for actions
  idEditingAction = -1; // 1, 2, ... for actions
  nameArea = '';

  step = 1;

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

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
      urlImage?: string;
    }[];
    active?: boolean;
  } = {
    trigger: {},
    actions: [{id: 1}],
  };

  reactions : {
    name: string;
    reaction_list: {
      name: string;
      config: {
        fields: {
          id: number;
          title: string;
          name: string;
          options_field?: { values: string[]; };
          input_field?: { placeholder: string; };
        }[]
      }
    } [];
  }[] = [];

  actions : {
    name: string;
    description?: string;
    config?: {
      fields: {
        id: number;
        title: string;
        name: string;
        options_field?: { values: string[]; };
        input_field?: { placeholder: string; };
      }[]
    }
  }[] = [];

  optionsServices : string[] = [];
  serviceChosen  = '';
  reactionsList : string[] = [];
  reactionChosen  = '';
  actionChosen  = -1;
  actionsList : any[] = [];
  ActionsResponses: {
      response: string;
      fieldId: number;
      fieldName: string;
  }[] = [];

  ngOnInit() {
    this.apiService.get('service').subscribe(services => {
      this.optionsServices = ['Choose Service', ...services.data.map((service: any) => service.name)];
    });
  }

  isButtonClickable(): boolean {
    if (this.step === 1 && this.idEditingTrigger !== -1)
      if (this.serviceChosen != '' && this.serviceChosen != 'Choose Service') return true;
    if (this.step === 1 && this.idEditingAction !== -1)
      if (this.serviceChosen != '' && this.serviceChosen != 'Choose Action Service') return true;
    if (this.step === 2)
      if (this.reactionChosen != '' && this.reactionChosen != 'Choose Reaction') return true;
    if (this.step === 3) {
      for (const response of this.ActionsResponses) {
        if (response.response === '' || response.response == null)
          return false;
      }
      return true;
    }
    if (this.step === 4) return true;
    return false;
  }

  openPopupName() {
    console.log('Opening name popup');
    let popup = document.querySelector('.popup-overlay');
    if (popup)
      popup.classList.remove('disabled-popup');
  }

  closePopupName() {
    let popup = document.querySelector('.popup-overlay');
    if (popup)
      popup.classList.add('disabled-popup');
  }

  confirmPopupName() {
    // If the name is empty, do nothing
    if (!this.nameArea || this.nameArea.trim() === '') return;
    // set area name and create
    this.area.name = this.nameArea.trim();
    this.createAll();
    this.closePopupName();
  }

  editAction(actionId: number) {
    if (this.isEditing && this.idEditingAction === actionId) {
      this.isEditing = false;
      this.idEditingAction = -1;
      this.idEditingTrigger = -1;
      this.step = 1;
    } else {
      if (this.isEditing)
        this.idEditingTrigger = -1;
      this.step = 1;
      this.isEditing = true;
      this.idEditingAction = actionId;
    }
  }

  editTrigger(triggerId: number) {
    if (this.isEditing && this.idEditingTrigger === triggerId) {
      this.isEditing = false;
      this.idEditingTrigger = -1;
      this.idEditingTrigger = -1;
      this.step = 1;
    } else {
      if (this.isEditing)
        this.idEditingAction = -1;
      this.step = 1;
      this.isEditing = true;
      this.idEditingTrigger = triggerId;
    }
  }

  addNewEmptyActionAfter(idArea: number) {
    const newAction = { id: this.area.actions.length + 1 };
    // Find the index of the action with the given idArea and insert the new action after it
    const index = this.area.actions.findIndex(action => action.id === idArea);
    if (index !== -1) {
      this.area.actions.splice(index + 1, 0, newAction);
    } else {
      // If the action with the given idArea is not found, insert first
      this.area.actions.unshift(newAction);
    }
  }

  previousStep = () => {
    if (this.step > 1) {
      this.step -= 1;
      if (this.idEditingTrigger !== -1)
        this.onNewStepTrigger(this.step);
      else if (this.idEditingAction !== -1)
        this.onNewStepAction(this.step);
    }
  }

  nextStep = () => {
    if (this.isButtonClickable() === false) return;
    if (this.step < 4) {
      this.step += 1;
      if (this.idEditingTrigger !== -1)
        this.onNewStepTrigger(this.step);
      else if (this.idEditingAction !== -1)
        this.onNewStepAction(this.step);
    } else {
      this.onSaveArea();
    }
  }

  deleteAction(actionId: number) {
    if (this.area.actions.length > 1) {
      this.area.actions = this.area.actions.filter(action => action.id !== actionId);
      // Reassign IDs to maintain sequential order
      this.area.actions.forEach((action, index) => {
        action.id = index + 1;
      });
    }
  }

  onSaveArea = () => {
    // save area
    this.area.name = this.nameArea;
    if (this.idEditingTrigger !== -1) {
      this.area.trigger = {
        name: this.reactions.find(reaction => reaction.name === this.serviceChosen)?.reaction_list.find(reaction => reaction.name === this.reactionChosen)?.name,
        urlImage: `/assets/icons/${this.serviceChosen.toLowerCase()}.png`,
        serviceChosen: this.serviceChosen,
        actionChosenId: this.actionChosen,
        datas_form: this.ActionsResponses
      };
    } else {
      this.area.actions[this.idEditingAction - 1] = {
        id: this.idEditingAction,
        name: this.reactions.find(reaction => reaction.name === this.serviceChosen)?.reaction_list.find(reaction => reaction.name === this.reactionChosen)?.name,
        type: 'action',
        urlImage: `/assets/icons/${this.serviceChosen.toLowerCase()}.png`,
      };
    }
    this.idEditingTrigger = -1;
    this.isEditing = false;
    this.step = 1;

    this.nameArea = '';
    this.serviceChosen = '';
    this.reactionChosen = '';
    this.actionChosen = -1;
    this.actionsList = [];
    this.ActionsResponses = [];
  }

  onStepTwoTrigger = () => {
    this.apiService.get("service").subscribe(services => {
      let id = -1;
      services.data.forEach((service: any) => {
        if (service.name === this.serviceChosen)
          id = service.id;
      });
      if (id === -1) return;
      this.apiService.get(`action/service/${id}`).subscribe(actions => {
        console.log(actions.data);
        this.reactionsList = ['Choose Action'];
        actions.data.forEach((element: { name: string, id: number, service_id: number, description?: string, config?: any }) => {
          console.log(element);
          this.reactionsList.push(element.name);
        });
        console.log(this.reactionsList);
      });
    });
  }

  onStepThreeTrigger = () => {
    this.apiService.get("service").subscribe(services => {
      let id = -1;
      services.data.forEach((service: any) => {
        if (service.name === this.serviceChosen)
          id = service.id;
      });
      if (id === -1) return;
      console.log(this.reactionChosen);
      this.apiService.get(`action/service/${id}`).subscribe(actions => {
        const config : any = actions.data.find((action: any) => action.name === this.reactionChosen);
        this.actionsList = config ? config.config.fields : [];
        this.ActionsResponses = new Array(this.actionsList.length).fill(null).map((_, index) => ({
          response: '',
          fieldId: this.actionsList[index].id,
          fieldName: this.actionsList[index].name
        }));
        this.actionChosen = config ? 1 : -1;
      });
    });
  }


  onNewStepTrigger = (step: number) => {
    if (step == 2) {
      this.onStepTwoTrigger();
    }
    if (step == 3) {
      this.onStepThreeTrigger();
    }
  }

  onStepTwoAction = () => {
    this.apiService.get("service").subscribe(services => {
      let id = -1;
      services.data.forEach((service: any) => {
        if (service.name === this.serviceChosen)
          id = service.id;
      });
      if (id === -1) return;
      this.apiService.get(`reaction/service/${id}`).subscribe(actions => {
        console.log(actions.data);
        this.reactionsList = ['Choose Reaction'];
        actions.data.forEach((element: { name: string, id: number, service_id: number, description?: string, config?: any }) => {
          console.log(element);
          this.reactionsList.push(element.name);
        });
        console.log(this.reactionsList);
      });
    });
  }

  onStepThreeAction = () => {
    this.apiService.get("service").subscribe(services => {
      let id = -1;
      services.data.forEach((service: any) => {
        if (service.name === this.serviceChosen)
          id = service.id;
      });
      if (id === -1) return;
      console.log(this.reactionChosen);
      this.apiService.get(`reaction/service/${id}`).subscribe(actions => {
        const config : any = actions.data.find((action: any) => action.name === this.reactionChosen);
        this.actionsList = config ? config.config.fields : [];
        this.ActionsResponses = new Array(this.actionsList.length).fill(null).map((_, index) => ({
          response: '',
          fieldId: this.actionsList[index].id,
          fieldName: this.actionsList[index].name
        }));
        this.actionChosen = config ? 1 : -1;
      });
    });
  }

  onNewStepAction = (step: number) => {
    if (step == 2) {
      this.onStepTwoAction();
    }
    if (step == 3) {
      this.onStepThreeAction();
    }
  }

  isFormValid() {
    // Check if the form is valid
    for (const action of this.area.actions)
      if (!action.name) return false;
    if (!this.area.trigger.name)
      return false;
    return true;
  }

  createAll() {
    // Check all fields are filled and create the area int the backend
    if (!this.isFormValid())
      return;
    this.area.active = true;
    this.router.navigate(['/dashboard']);
    // Call backend to create area
  }
}
