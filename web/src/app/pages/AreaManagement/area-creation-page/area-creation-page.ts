import { Component, inject, OnInit } from '@angular/core';
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

interface ActionConfig {
  id: number;
  input_field?: {placeholder: string};
  options_field?: {label: string; value: string}[];
  name: string;
  title: string;
}


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
export class AreaCreationPage implements OnInit {
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

  optionsServicesIds : number[] = [];
  optionsServicesTrigger : string[] = [];
  optionsServicesActions : string[] = [];
  optionsServices : string[] = [];

  serviceChosen  = '';
  reactionsList : string[] = [];
  reactionChosen  = '';
  actionChosen  = -1;
  actionsList : ActionConfig[] = [];
  ActionsResponses: {
      response: string;
      fieldId: number;
      fieldName: string;
  }[] = [];

  ngOnInit() {
    this.apiService.get('service').subscribe(services => {
      this.optionsServicesIds = [...services.data.map((service: any) => service.id)];
      this.optionsServicesTrigger = ['Choose Service'];
      this.optionsServicesActions = ['Choose Service'];

      services.data.forEach((service: any) => {
        this.apiService.get('action').subscribe(reactions => {
          reactions.data.forEach((element : any) => {
            if (element.service_id == service.id && !this.optionsServicesActions.includes(service.name)) {
              this.optionsServicesActions.push(service.name);
            }
          });
        });
        this.apiService.get('reaction').subscribe(actions => {
          actions.data.forEach((element : any) => {
            if (element.service_id == service.id && !this.optionsServicesTrigger.includes(service.name)) {
              this.optionsServicesTrigger.push(service.name);
            }
          });
        });
      });
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
    const popup = document.querySelector('.popup-overlay');
    if (popup)
      popup.classList.remove('disabled-popup');
  }

  closePopupName() {
    const popup = document.querySelector('.popup-overlay');
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
      this.optionsServices = this.optionsServicesActions;
      if (this.area.actions[actionId - 1].serviceChosen)
        this.serviceChosen = this.area.actions[actionId - 1].serviceChosen!;
      else
        this.serviceChosen = '';
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
      this.optionsServices = this.optionsServicesTrigger;
      if (this.area.trigger.serviceChosen)
        this.serviceChosen = this.area.trigger.serviceChosen;
      else
        this.serviceChosen = '';
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
    for (let i = 0; i < this.area.actions.length; i++)
      this.area.actions[i].id = i + 1;
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

  moveAction(actionId: number, direction: number) {
    const index = this.area.actions.findIndex(action => action.id === actionId);
    if (index === -1) return; // Action not found
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= this.area.actions.length) return; // Out of bounds

    // Swap the actions
    const temp = this.area.actions[index];
    this.area.actions[index] = this.area.actions[newIndex];
    this.area.actions[newIndex] = temp;

    // Reassign IDs to maintain sequential order
    this.area.actions.forEach((action, idx) => {
      action.id = idx + 1;
    });
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
        name: this.reactionChosen,
        urlImage: `/assets/icons/${this.serviceChosen.toLowerCase()}.png`,
        serviceChosen: this.serviceChosen,
        actionChosenId: this.actionChosen,
        datas_form: this.ActionsResponses
      };
    } else {
      this.area.actions[this.idEditingAction - 1] = {
        id: this.idEditingAction,
        name: this.reactionChosen,
        type: 'action',
        urlImage: `/assets/icons/${this.serviceChosen.toLowerCase()}.png`,
        datas_form: this.ActionsResponses,
        serviceChosen: this.serviceChosen
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
      this.apiService.get(`reaction/service/${id}`).subscribe(actions => {
        this.reactionsList = ['Choose Action'];
        actions.data.forEach((element: { name: string, id: number, service_id: number, description?: string, config?: any }) => {
          this.reactionsList.push(element.name);
        });
        // If already chosen, keep it
        if (this.area.trigger.name && this.reactionsList.includes(this.area.trigger.name))
          this.reactionChosen = this.area.trigger.name;
      });
    });
  }

  getResponseByIndexTrigger = (index: number): string => {
    if (this.serviceChosen != this.area.trigger.serviceChosen || this.reactionChosen != this.area.trigger.name)
      return '';
    if (this.area.trigger.datas_form && this.area.trigger.datas_form[index])
      return this.area.trigger.datas_form[index].response;
    return '';
  }

  getResponseByIndexAction = (index: number): string => {
    if (this.serviceChosen != this.area.actions[this.idEditingAction - 1].serviceChosen || this.reactionChosen != this.area.actions[this.idEditingAction - 1].name)
      return '';
    if (this.area.actions[this.idEditingAction - 1].datas_form && this.area.actions[this.idEditingAction - 1].datas_form![index])
      return this.area.actions[this.idEditingAction - 1].datas_form![index].response;
    return '';
  }

  onStepThreeTrigger = () => {
    this.apiService.get("service").subscribe(services => {
      let id = -1;
      services.data.forEach((service: any) => {
        if (service.name === this.serviceChosen)
          id = service.id;
      });
      if (id === -1) return;
      this.apiService.get(`reaction/service/${id}`).subscribe(actions => {
        const config : any = actions.data.find((action: any) => action.name === this.reactionChosen);
        this.actionsList = config ? config.config.fields : [];
        this.ActionsResponses = new Array(this.actionsList.length).fill(null).map((_, index) => ({
          response: this.getResponseByIndexTrigger(index),
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
      this.apiService.get(`action/service/${id}`).subscribe(actions => {
        this.reactionsList = ['Choose Reaction'];
        actions.data.forEach((element: { name: string, id: number, service_id: number, description?: string, config?: any }) => {
          this.reactionsList.push(element.name);
        });
        // If already chosen, keep it
        if (this.idEditingTrigger !== -1) {
          if (this.area.trigger.name && this.reactionsList.includes(this.area.trigger.name))
            this.reactionChosen = this.area.trigger.name;
        } else if (this.idEditingAction !== -1) {
          if (this.area.actions[this.idEditingAction - 1].name && this.reactionsList.includes(this.area.actions[this.idEditingAction - 1].name!))
            this.reactionChosen = this.area.actions[this.idEditingAction - 1].name!;
        }
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
      this.apiService.get(`action/service/${id}`).subscribe(actions => {
        const config : any = actions.data.find((action: any) => action.name === this.reactionChosen);
        this.actionsList = config ? config.config.fields : [];
        this.ActionsResponses = new Array(this.actionsList.length).fill(null).map((_, index) => ({
          response: this.getResponseByIndexAction(index),
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

    const areaNew : {
      action_id:number,
      reaction_id:number,
      is_active:boolean,
      config: any
    } = {
      is_active: true,
      reaction_id: -1,
      action_id: -1,
      config: {
        name: this.area.name,
        trigger: {
          service_name: this.area.trigger.serviceChosen,
          name: this.area.trigger.name,
          datas_form: this.area.trigger.datas_form,
          reactionChosenId: this.area.trigger.actionChosenId
        },
        action: {
          service_name: this.area.actions[0].serviceChosen,
          name: this.area.actions[0].name,
          datas_form: this.area.actions[0].datas_form,
        }
      }
    };

    // Get reaction Id by name
    this.apiService.get("reaction").subscribe(reactions => {
      reactions.data.forEach((reaction: any) => {
        if (reaction.name === this.area.trigger.name)
          areaNew.reaction_id = reaction.id;
      });

      this.apiService.get("action").subscribe(actions => {
        actions.data.forEach((action: any) => {
          if (action.name === this.area.actions[0].name)
            areaNew.action_id = action.id;
        });

        this.apiService.post('area', areaNew).subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      });

    });
  }
}
