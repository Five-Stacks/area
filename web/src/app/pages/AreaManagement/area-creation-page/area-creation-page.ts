import { Component, inject } from '@angular/core';
import { HeaderDashBoardComponent } from '../../../components/Headers/header-component-dashboard/header-component-dashboard';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-area-creation-page',
  imports: [HeaderDashBoardComponent, CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule],
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
}
