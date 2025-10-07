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
  }[] = [
    { name: 'GitHub',
      reaction_list: [
        {
          name: 'New Issue',
          config: {
            fields: [
              {
                id: 1,
                title: 'Choose your Repository',
                name: 'Repository',
                input_field: { placeholder: 'user/repo' }
              },
              {
                id: 2,
                title: 'Issue Title Contains',
                name: 'Title',
                input_field: { placeholder: 'Issue title' }
              }
            ]
          }
        },
        {
          name: 'New Pull Request',
          config: {
            fields: [
              {
                id: 1,
                title: 'Choose your Repository',
                name: 'Repository',
                input_field: { placeholder: 'user/repo' }
              },
              {
                id: 2,
                title: 'Branch',
                name: 'Branch',
                input_field: { placeholder: 'main' }
              }
            ]
          }
        }
      ]
    },
    {
      name: 'Discord',
      reaction_list: [
        {
          name: 'New Message',
          config: {
            fields: [
              {
                id: 1,
                title: 'Channel ID',
                name: 'ChannelID',
                input_field: { placeholder: '123456789012345678' }
              },
              {
                id: 2,
                title: 'Message Content Contains',
                name: 'Content',
                input_field: { placeholder: 'Hello, World!' }
              }
            ]
          }
        }
      ]
    },
    {
      name: 'Gmail',
      reaction_list: [
        {
          name: 'New Email',
          config: {
            fields: [
              {
                id: 1,
                title: 'Sender Email Address',
                name: 'From',
                input_field: { placeholder: 'sender@example.com' }
              }
            ]
          }
        }
      ]
    }
  ];

  actions : {
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
  }[] = [
    {
      name: 'GitHub',
      reaction_list: [
        {
          name: 'Create Issue',
          config: {
            fields: [
              {
                id: 1,
                title: 'Choose your Repository',
                name: 'Repository',
                input_field: { placeholder: 'user/repo' }
              },
              {
                id: 2,
                title: 'Issue Title',
                name: 'Title',
                input_field: { placeholder: 'Issue title' }
              },
              {
                id: 3,
                title: 'Issue Body',
                name: 'Body',
                input_field: { placeholder: 'Issue body' }
              }
            ]
          }
        },
        {
          name: 'New Commit',
          config: {
            fields: [
              {
                id: 1,
                title: 'Choose your Repository',
                name: 'Repository',
                input_field: { placeholder: 'user/repo' }
              },
              {
                id: 2,
                title: 'Branch',
                name: 'Branch',
                input_field: { placeholder: 'main' }
              }
            ]
          }
        }
      ]
    },
    {
      name: 'Discord',
      reaction_list: [
        {
          name: 'Send Message',
          config: {
            fields: [
              {
                id: 1,
                title: 'Channel ID',
                name: 'ChannelID',
                input_field: { placeholder: '123456789012345678' }
              },
              {
                id: 2,
                title: 'Message Content',
                name: 'Content',
                input_field: { placeholder: 'Hello, World!' }
              }
            ]
          }
        }
      ]
    },
    {
      name: 'Gmail',
      reaction_list: [
        {
          name: 'Send Email',
          config: {
            fields: [
              {
                id: 1,
                title: 'Recipient Email',
                name: 'To',
                input_field: { placeholder: 'recipient@example.com' }
              },
              {
                id: 2,
                title: 'Email Subject',
                name: 'Subject',
                input_field: { placeholder: 'Subject' }
              },
              {
                id: 3,
                title: 'Email Body',
                name: 'Body',
                input_field: { placeholder: 'Email body' }
              }
            ]
          }
        }
      ]
    }
  ];

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
      this.optionsServices = ['Choose Action Service'];
      this.actions.forEach(action => {
        if (!this.optionsServices.includes(action.name))
          this.optionsServices.push(action.name);
      });
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
      this.optionsServices = ['Choose Service'];
      this.reactions.forEach(reaction => {
        if (!this.optionsServices.includes(reaction.name))
          this.optionsServices.push(reaction.name);
      });
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

  onNewStepTrigger = (step: number) => {
    if (step == 2) {
      this.reactionsList = ['Choose Reaction'];
      const reaction = this.reactions.find(reaction => reaction.name === this.serviceChosen);
      reaction?.reaction_list.forEach(reaction => {
        if (!this.reactionsList.includes(reaction.name))
          this.reactionsList.push(reaction.name);
      });
    }
    if (step == 3) {
      const reaction = this.reactions.find(reaction => reaction.name === this.serviceChosen)?.reaction_list.find(reaction => reaction.name === this.reactionChosen);
      this.actionsList = reaction ? reaction.config.fields : [];
      this.ActionsResponses = new Array(this.actionsList.length).fill(null).map((_, index) => ({
        response: '',
        fieldId: this.actionsList[index].id,
        fieldName: this.actionsList[index].name
      }));
      this.actionChosen = reaction ? 1 : -1;
    }
  }

  onNewStepAction = (step: number) => {
    if (step == 2) {
      this.reactionsList = ['Choose Reaction'];
      const reaction = this.actions.find(reaction => reaction.name === this.serviceChosen);
      reaction?.reaction_list.forEach(reaction => {
        if (!this.reactionsList.includes(reaction.name))
          this.reactionsList.push(reaction.name);
      });
    }
    if (step == 3) {
      const reaction = this.actions.find(reaction => reaction.name === this.serviceChosen)?.reaction_list.find(reaction => reaction.name === this.reactionChosen);
      this.actionsList = reaction ? reaction.config.fields : [];
      this.ActionsResponses = new Array(this.actionsList.length).fill(null).map((_, index) => ({
        response: '',
        fieldId: this.actionsList[index].id,
        fieldName: this.actionsList[index].name
      }));
      this.actionChosen = reaction ? 1 : -1;
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

  optionsServices : string[] = [];
  serviceChosen  = '';
  reactionsList : string[] = [];
  reactionChosen  = '';
  actionChosen  = -1;
  actionsList : {
          id: number;
          title: string;
          name: string;
          options_field?: { values: string[] };
          input_field?: { placeholder: string; };
        }[] = [];
  ActionsResponses: {
      response: string;
      fieldId: number;
      fieldName: string;
  }[] = [];
}
