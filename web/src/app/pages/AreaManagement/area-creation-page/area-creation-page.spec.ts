import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCreationPage } from './area-creation-page';
import { ApiService } from '../../../services/api.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('AreaCreationPage', () => {
  // Helper to configure TestBed and create component with a mocked ApiService and Router
  async function setup(params: { services?: unknown[]; actions?: unknown[]; reactions?: unknown[]; userServices?: unknown[]; postSuccess?: boolean } = {}) {
    const { services = [], actions = [], reactions = [], userServices = [], postSuccess = true } = params;
    const apiMock = {
      get: jasmine.createSpy('get').and.callFake((url: string) => {
        if (url === 'userService') return of({ data: userServices });
        if (url === 'service') return of({ data: services });
        if (url === 'action') return of({ data: actions });
        if (url === 'reaction') return of({ data: reactions });
        if (url.startsWith('action/service/')) return of({ data: actions });
        if (url.startsWith('reaction/service/')) return of({ data: reactions });
        return of({ data: [] });
      }),
      post: jasmine.createSpy('post').and.returnValue(of(postSuccess ? {} : null))
    } as { get: jasmine.Spy; post: jasmine.Spy };

    const routerMock = { navigate: jasmine.createSpy('navigate') } as { navigate: jasmine.Spy };

    await TestBed.configureTestingModule({
      imports: [AreaCreationPage],
      providers: [
        { provide: ApiService, useValue: apiMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AreaCreationPage);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { apiMock, routerMock, fixture, component } as { apiMock: { get: jasmine.Spy; post: jasmine.Spy }; routerMock: { navigate: jasmine.Spy }; fixture: ComponentFixture<AreaCreationPage>; component: AreaCreationPage };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('ngOnInit should populate service options from API', async () => {
  const services = [{ id: 1, name: 'S1' }, { id: 2, name: 'S2' }];
  // userService should contain service_id references the user has access to
  const userServices = [{ service_id: 1 }, { service_id: 2 }];
  const { component, apiMock } = await setup({ services, actions: [], reactions: [], userServices });
    // ngOnInit called during setup; ensure api called for 'service'
    expect(apiMock.get).toHaveBeenCalledWith('service');
    expect(component.optionsServicesIds).toEqual([1, 2]);
    expect(component.optionsServicesTrigger).toContain('Choose Service');
    expect(component.optionsServicesActions).toContain('Choose Service');
  });

  it('addNewEmptyActionAfter should insert action after given id and reindex', async () => {
    const { component } = await setup();
    component.area.actions = [{ id: 1 }, { id: 2 }, { id: 3 }];
    component.addNewEmptyActionAfter(2);
    expect(component.area.actions.length).toBe(4);
    expect(component.area.actions.map(a => a.id)).toEqual([1,2,3,4]);
  });

  it('moveAction should swap actions and reassign ids', async () => {
    const { component } = await setup();
    component.area.actions = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }];
    component.moveAction(1, 1); // move first forward
    expect(component.area.actions.map(a => a.name)).toEqual(['b','a','c']);
    expect(component.area.actions.map(a => a.id)).toEqual([1,2,3]);
  });

  it('deleteAction should remove action and reindex when more than one action', async () => {
    const { component } = await setup();
    component.area.actions = [{ id: 1 }, { id: 2 }];
    component.deleteAction(1);
    expect(component.area.actions.length).toBe(1);
    expect(component.area.actions[0].id).toBe(1);
  });

  it('isFormValid should return false when trigger name missing or action name missing', async () => {
    const { component } = await setup();
    component.area.actions = [{ id: 1, name: 'ok' }];
  component.area.trigger = { name: undefined } as unknown as typeof component.area.trigger;
    expect(component.isFormValid()).toBeFalse();
  component.area.trigger = { name: 'trigger' } as unknown as typeof component.area.trigger;
  component.area.actions = [{ id: 1 } as unknown as typeof component.area.actions[0]] as unknown as typeof component.area.actions;
    expect(component.isFormValid()).toBeFalse();
  component.area.actions = [{ id: 1, name: 'ok' } as unknown as typeof component.area.actions[0]] as unknown as typeof component.area.actions;
    expect(component.isFormValid()).toBeTrue();
  });

  it('createAll should call post and navigate on success when form valid', async () => {
    const actions = [{ id: 10, name: 'act' }];
    const reactions = [{ id: 20, name: 'trig' }];
    const services = [{ id: 1, name: 'S1' }];

    const { component, apiMock, routerMock } = await setup({ services, actions, reactions, postSuccess: true });

    // prepare area with names so isFormValid true
  component.area.actions = [{ id: 1, name: 'act', serviceChosen: 'S1' }] as unknown as typeof component.area.actions;
  component.area.trigger = { name: 'trig', serviceChosen: 'S1' } as unknown as typeof component.area.trigger;
    component.area.name = 'AreaName';
    component.nameArea = 'AreaName';

    // call createAll
    component.createAll();

    // should have called API to find reaction/action ids and then post
    expect(apiMock.get).toHaveBeenCalled();
    expect(apiMock.post).toHaveBeenCalledWith('area', jasmine.any(Object));
    // router navigate is called after post success
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

});
