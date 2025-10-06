import { Component, inject } from '@angular/core';
import { HeaderDashBoardComponent } from '../../../components/Headers/header-component-dashboard/header-component-dashboard';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../../components/Buttons/button-component/button-component';
import { ButtonFullComponent } from '../../../components/Buttons/button-component-full/button-component-full';
import { OptionsFieldComponent } from '../../../components/Forms/options-field-component/options-field-component';
import { TextFieldComponent } from '../../../components/Forms/text-field-component/text-field-component';

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
  isEditing: boolean = false;
  idEditing: number = -1; // 1, 2, ... for actions
  nameArea: string = '';

  step: number = 1;

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
      type?: string;
      urlImage?: string;
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
    {
      name: 'GitHub',
      reaction_list: [
        {
          name: 'Created Issue',
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
    if (this.step === 1) {
      if (this.serviceChosen != '' && this.serviceChosen != 'Choose Reaction') return true;
    }
    return false;
  }

  editAction(actionId: number) {
    if (this.isEditing && this.idEditing === actionId) {
      this.isEditing = false;
      this.idEditing = -1;
    } else {
      this.isEditing = true;
      this.idEditing = actionId;
    }
  }

  editTrigger(triggerId: number) {
    if (this.isEditing && this.idEditing === triggerId) {
      this.isEditing = false;
      this.idEditing = -1;
    } else {
      this.isEditing = true;
      this.idEditing = triggerId;
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
      this.onNewStep(this.step);
    }
  }

  nextStep = () => {
    if (this.step < 4) {
      this.step += 1;
      this.onNewStep(this.step);
    } else {
      // save area
      this.idEditing = -1;
      this.isEditing = false;
      this.step = 1;
    }
  }

  onNewStep = (step: number) => {
    if (step == 2) {
      this.reactionsList = ['Choose Reaction'];
      this.reactionsList.push(...this.reactions.map(reaction => reaction.name));
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


  optionsServices : string[] = [];
  serviceChosen : string = '';
  reactionsList : string[] = [];
  reactionChosen : string = '';
  actionChosen : number = -1;
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
