import { HeaderDashBoardComponent } from '../../../components/Headers/header-component-dashboard/header-component-dashboard';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonFullComponent } from '../../../components/Buttons/button-component-full/button-component-full';
import { OptionsFieldComponent } from '../../../components/Forms/options-field-component/options-field-component';
import { TextFieldComponent } from '../../../components/Forms/text-field-component/text-field-component';


interface ActionField {
  id: number;
  input_field?: { placeholder: string };
  options_field?: { label: string; value: string }[];
  mandatory: boolean;
  name: string;
  title: string;
}

interface ApiResponse<T = unknown> {
  data: T;
}

interface Service {
  id: number;
  name: string;
}

interface BackendActionOrReaction {
  id: number;
  name: string;
  service_id: number;
  description?: string;
  config?: { fields?: ActionField[] };
}

interface ActionConfig {
  service_name?: string;
  name?: string;
  datas_form?: { fieldId: number; fieldName: string; response: string }[];
}

// Backend model for GET /area/:id
interface BackendArea {
  id: number;
  is_active?: boolean;
  reaction_ids?: number[];
  config?: {
    name?: string;
    description?: string;
    trigger?: {
      service_name?: string;
      name?: string;
      datas_form?: { fieldId: number; fieldName: string; response: string }[];
    };
    action?: {
      service_name?: string;
      name?: string;
      type?: string;
      datas_form?: { fieldId: number; fieldName: string; response: string }[];
    };
  };
}

interface AreaCreateRequest {

  action_id: number;
  reaction_ids: number[];
  is_active: boolean;
  config: {
    name?: string;
    trigger: {
      service_name?: string;
      name?: string;
      datas_form?: { fieldId: number; fieldName: string; response: string }[];
      reactionChosenId?: number;
    };
    actions: {
      service_name?: string;
      name?: string;
      datas_form?: { fieldId: number; fieldName: string; response: string }[];
    }[];
  };
}

@Component({
  selector: 'app-area-details-page',
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
  templateUrl: './area-details-page.html',
  styleUrl: './area-details-page.css'
})
export class AreaDetailsPage implements OnInit {
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
    id: number;
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
    id : -1,
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
  actionsList : ActionField[] = [];
  ActionsResponses: {
      response: string;
      fieldId: number;
      fieldName: string;
  }[] = [];

  @ViewChild('serviceField') serviceFieldComponent?: OptionsFieldComponent;

  ngOnInit() {
    const areaId = window.location.pathname.split('/').pop();
    this.apiService.get<ApiResponse<BackendArea>>(`area/${areaId}`).subscribe((data) => {
      if (!data || !data.data || !data.data.config) {
        this.router.navigate(['/dashboard']);
        return;
      }

      const cfg = data.data.config;
      this.area.id = data.data.id;
      this.area.name = cfg.name;
      this.area.description = cfg.description;
      this.area.active = data.data.is_active;
      this.area.trigger = {
        name: cfg.trigger?.name,
        serviceChosen: cfg.trigger?.service_name,
        urlImage: cfg.trigger?.service_name ? `/assets/icons/${cfg.trigger!.service_name!.toLowerCase()}.png` : undefined,
        datas_form: cfg.trigger?.datas_form
      };
      const reactionIds: number[] = (data.data.reaction_ids ?? []);
      this.area.actions = [];

      type ConfigWithActions = typeof cfg & { actions?: ActionConfig[]; action?: ActionConfig };
      const cfgWithActions = cfg as unknown as ConfigWithActions;
      const actionsConfigArray: ActionConfig[] = cfgWithActions.actions ?? (cfgWithActions.action ? [cfgWithActions.action as ActionConfig] : []);

      if (reactionIds.length > 0) {
        this.apiService.get<ApiResponse<BackendActionOrReaction[]>>('reaction').subscribe((respR: unknown) => {
          const reactionsAll = respR as ApiResponse<BackendActionOrReaction[]> | null;
          if (!reactionsAll) { this.area.actions = []; return; }

          this.apiService.get<ApiResponse<Service[]>>('service').subscribe((respS: unknown) => {
            const servicesAll = respS as ApiResponse<Service[]> | null;
            const serviceMap = new Map<number, string>();
            if (servicesAll) servicesAll.data.forEach(s => serviceMap.set(s.id, s.name));

            this.area.actions = reactionIds.map((rid, idx) => {
              const r = reactionsAll.data.find(x => x.id === rid);
              const svcName = r ? (serviceMap.get(r.service_id) ?? actionsConfigArray[idx]?.service_name) : actionsConfigArray[idx]?.service_name;
              return {
                id: idx + 1,
                name: r?.name ?? actionsConfigArray[idx]?.name,
                type: 'action',
                serviceChosen: svcName,
                urlImage: svcName ? `/assets/icons/${svcName.toLowerCase()}.png` : undefined,
                // Use the per-action datas_form if present in config.actions, otherwise fallback
                datas_form: actionsConfigArray[idx]?.datas_form ?? actionsConfigArray[0]?.datas_form
              };
            });
          });
        });
      }
      this.nameArea = this.area.name ? this.area.name : '';

      this.apiService.get<ApiResponse<Service[]>>('service').subscribe((services: unknown) => {
        const servicesResp = services as ApiResponse<Service[]> | null;
        if (!servicesResp) return;
        this.optionsServicesIds = [...servicesResp.data.map((service: Service) => service.id)];
        this.optionsServicesTrigger = ['Choose Service'];
        this.optionsServicesActions = ['Choose Service'];

        servicesResp.data.forEach((service: Service) => {
          this.apiService.get<ApiResponse<BackendActionOrReaction[]>>('reaction').subscribe((reactions: unknown) => {
            const reactionsResp = reactions as ApiResponse<BackendActionOrReaction[]> | null;
            if (!reactionsResp) return;
            reactionsResp.data.forEach((element: BackendActionOrReaction) => {
              if (element.service_id == service.id && !this.optionsServicesActions.includes(service.name)) {
                this.optionsServicesActions.push(service.name);
              }
            });
          });
          this.apiService.get<ApiResponse<BackendActionOrReaction[]>>('action').subscribe((actions: unknown) => {
            const actionsResp = actions as ApiResponse<BackendActionOrReaction[]> | null;
            if (!actionsResp) return;
            actionsResp.data.forEach((element: BackendActionOrReaction) => {
              if (element.service_id == service.id && !this.optionsServicesTrigger.includes(service.name)) {
                this.optionsServicesTrigger.push(service.name);
              }
            });
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
        if ((response.response === '' || response.response == null) && this.actionsList.find(a => a.id === response.fieldId)?.mandatory)
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
      this.idEditingAction = -1;
      this.step = 1;
    } else {
      this.idEditingAction = -1;
      this.step = 1;
      this.isEditing = true;
      this.idEditingTrigger = triggerId;
      this.optionsServices = this.optionsServicesTrigger;
      if (this.area.trigger.serviceChosen)
        this.serviceChosen = this.area.trigger.serviceChosen;
      else
        this.serviceChosen = '';

      // Prefer calling the child component instance via ViewChild
      if (this.serviceFieldComponent && typeof this.serviceFieldComponent.setSelectedOption === 'function') {
        try {
          this.serviceFieldComponent.setSelectedOption(this.serviceChosen);
        } catch (e) {
          console.error('serviceFieldComponent.setSelectedOption failed', e);
        }
      }
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
      // Preserve existing trigger.datas_form if user didn't change anything (ActionsResponses empty)
      const existingTrigger = this.area.trigger ?? {};
      const datasForm = (this.ActionsResponses && this.ActionsResponses.length > 0)
        ? this.ActionsResponses
        : existingTrigger.datas_form;
      this.area.trigger = {
        name: this.reactionChosen || existingTrigger.name,
        urlImage: (this.serviceChosen || existingTrigger.serviceChosen) ? `/assets/icons/${(this.serviceChosen || existingTrigger.serviceChosen)!.toLowerCase()}.png` : existingTrigger.urlImage,
        serviceChosen: this.serviceChosen || existingTrigger.serviceChosen,
        actionChosenId: this.actionChosen ?? existingTrigger.actionChosenId,
        datas_form: datasForm
      };
    } else if (this.idEditingAction !== -1) {
      // Preserve existing action.datas_form if user didn't change anything
      const existing = this.area.actions[this.idEditingAction - 1] ?? {};
      const datasForm = (this.ActionsResponses && this.ActionsResponses.length > 0)
        ? this.ActionsResponses
        : existing.datas_form;
      this.area.actions[this.idEditingAction - 1] = {
        id: this.idEditingAction,
        name: this.reactionChosen || existing.name,
        type: 'action',
        urlImage: (this.serviceChosen || existing.serviceChosen) ? `/assets/icons/${(this.serviceChosen || existing.serviceChosen)!.toLowerCase()}.png` : existing.urlImage,
        datas_form: datasForm,
        serviceChosen: this.serviceChosen || existing.serviceChosen
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
    this.apiService.get<ApiResponse<Service[]>>('service').subscribe((resp: unknown) => {
      const services = resp as ApiResponse<Service[]> | null;
      if (!services) return;
      let id = -1;
      services.data.forEach((service: Service) => {
        if (service.name === this.serviceChosen) id = service.id;
      });
      if (id === -1) return;
      this.apiService.get<ApiResponse<BackendActionOrReaction[]>>(`action/service/${id}`).subscribe((resp2: unknown) => {
        const actions = resp2 as ApiResponse<BackendActionOrReaction[]> | null;
        if (!actions) return;
        this.reactionsList = ['Choose Action'];
        actions.data.forEach((element: BackendActionOrReaction) => {
          this.reactionsList.push(element.name);
        });
        // Preserve existing selection if valid, otherwise set explicit default
        if (this.area.trigger.name && this.reactionsList.includes(this.area.trigger.name)) {
          this.reactionChosen = this.area.trigger.name;
        } else {
          this.reactionChosen = this.reactionsList[0];
        }
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
    this.apiService.get<ApiResponse<Service[]>>('service').subscribe((resp: unknown) => {
      const services = resp as ApiResponse<Service[]> | null;
      if (!services) return;
      let id = -1;
      services.data.forEach((service: Service) => {
        if (service.name === this.serviceChosen) id = service.id;
      });
      if (id === -1) return;
      this.apiService.get<ApiResponse<BackendActionOrReaction[]>>(`action/service/${id}`).subscribe((resp2: unknown) => {
        const actions = resp2 as ApiResponse<BackendActionOrReaction[]> | null;
        if (!actions) return;
        const config = actions.data.find((action: BackendActionOrReaction) => action.name === this.reactionChosen);
        this.actionsList = config ? (config.config?.fields ?? []) : [];
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
    this.apiService.get<ApiResponse<Service[]>>('service').subscribe((resp: unknown) => {
      const services = resp as ApiResponse<Service[]> | null;
      if (!services) return;
      let id = -1;
      services.data.forEach((service: Service) => {
        if (service.name === this.serviceChosen) id = service.id;
      });
      if (id === -1) return;
      this.apiService.get<ApiResponse<BackendActionOrReaction[]>>(`reaction/service/${id}`).subscribe((resp2: unknown) => {
        const actions = resp2 as ApiResponse<BackendActionOrReaction[]> | null;
        if (!actions) return;
        this.reactionsList = ['Choose Reaction'];
        actions.data.forEach((element: BackendActionOrReaction) => {
          this.reactionsList.push(element.name);
        });
        // Prefer existing trigger name when editing trigger, otherwise prefer action's existing name,
        // preserve current valid selection, otherwise default to the first item.
        if (this.idEditingTrigger !== -1) {
          if (this.area.trigger.name && this.reactionsList.includes(this.area.trigger.name)) {
            this.reactionChosen = this.area.trigger.name;
          } else if (this.reactionsList.includes(this.reactionChosen)) {
            // keep current
          } else {
            this.reactionChosen = this.reactionsList[0];
          }
        } else if (this.idEditingAction !== -1) {
          const actionName = this.area.actions[this.idEditingAction - 1]?.name;
          if (actionName && this.reactionsList.includes(actionName)) {
            this.reactionChosen = actionName;
          } else if (this.reactionsList.includes(this.reactionChosen)) {
            // keep current
          } else {
            this.reactionChosen = this.reactionsList[0];
          }
        } else {
          if (!this.reactionsList.includes(this.reactionChosen)) this.reactionChosen = this.reactionsList[0];
        }
      });
    });
  }

  onStepThreeAction = () => {
    this.apiService.get<ApiResponse<Service[]>>('service').subscribe((resp: unknown) => {
      const services = resp as ApiResponse<Service[]> | null;
      if (!services) return;
      let id = -1;
      services.data.forEach((service: Service) => {
        if (service.name === this.serviceChosen) id = service.id;
      });
      if (id === -1) return;
      this.apiService.get<ApiResponse<BackendActionOrReaction[]>>(`reaction/service/${id}`).subscribe((resp2: unknown) => {
        const actions = resp2 as ApiResponse<BackendActionOrReaction[]> | null;
        if (!actions) return;
        const config = actions.data.find((action: BackendActionOrReaction) => action.name === this.reactionChosen);
        this.actionsList = config ? (config.config?.fields ?? []) : [];
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

  optionsFieldValues(action: { options_field?: unknown } | undefined): string[] {
    if (!action || action.options_field == null) return [];
    const of = action.options_field as unknown;
    const vals = (of as { values?: unknown }).values ?? of;
    if (Array.isArray(vals)) return (vals as unknown[]).map(v => (typeof v === 'string' ? v : String(v)));
    try {
      return Array.from(vals as Iterable<unknown>).map(v => (typeof v === 'string' ? v : String(v)));
    } catch {
      return Object.keys(vals as Record<string, unknown>).map(k => String((vals as Record<string, unknown>)[k]));
    }
  }

  createAll() {
    // Check all fields are filled and create the area int the backend
    if (!this.isFormValid())
      return;

    const areaNew: AreaCreateRequest = {
      is_active: true,
      reaction_ids: [],
      action_id: -1,
      config: {
        name: this.area.name,
        trigger: {
          service_name: this.area.trigger.serviceChosen,
          name: this.area.trigger.name,
          datas_form: this.area.trigger.datas_form,
          reactionChosenId: this.area.trigger.actionChosenId
        },
        actions: this.area.actions.map(a => ({
          service_name: a.serviceChosen,
          name: a.name,
          datas_form: a.datas_form,
        }))
      }
    };

    // Resolve action (trigger) id
    this.apiService.get<ApiResponse<BackendActionOrReaction[]>>('action').subscribe((resp: unknown) => {
      const actions = resp as ApiResponse<BackendActionOrReaction[]> | null;
      if (!actions) return;
      actions.data.forEach((action: BackendActionOrReaction) => {
        if (action.name === this.area.trigger.name) areaNew.action_id = action.id
      });

      // Resolve all reaction ids from UI actions list
      this.apiService.get<ApiResponse<BackendActionOrReaction[]>>('reaction').subscribe((resp2: unknown) => {
        const reactions = resp2 as ApiResponse<BackendActionOrReaction[]> | null;
        if (!reactions) return;
        const ids: number[] = [];
        for (const act of this.area.actions) {
          if (!act.name) continue;
          const match = reactions.data.find((reaction: BackendActionOrReaction) => reaction.name === act.name);
          if (match) ids.push(match.id);
        }
        areaNew.reaction_ids = ids;

        if (areaNew.action_id === -1 || areaNew.reaction_ids.length === 0) return;
        this.apiService.put('area/' + this.area.id, areaNew).subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      });

    });
  }
}
