import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AreaDetailsPage } from './area-details-page';
import { ApiService } from '../../../services/api.service';
import { of } from 'rxjs';

describe('AreaDetailsPage', () => {
  // Each test will call setup() which configures the TestBed and creates a fresh component instance.
  it('should create', async () => {
    const { component } = await (async () => {
      const res = await (async function setupWrapper() {
        // reuse the setup helper defined later in the file
        // call the setup() function declared below by name via (global) lookup
  // but since setup is hoisted, we can call it directly
  return await setup();
      })();
      return res;
    })();
    expect(component).toBeTruthy();
  });
  
  async function setup({ areaData = null, services = [], actions = [], reactions = [], putSuccess = true }:
    { areaData?: unknown; services?: unknown[]; actions?: unknown[]; reactions?: unknown[]; putSuccess?: boolean } = {}) {

    // ensure pathname contains area id
    window.history.pushState({}, '', '/areas/1');

    const apiMock = {
      get: jasmine.createSpy('get').and.callFake((url: string) => {
        if (url.startsWith('area/')) return of({ data: areaData });
        if (url === 'service') return of({ data: services });
        if (url === 'action') return of({ data: actions });
        if (url === 'reaction') return of({ data: reactions });
        return of({ data: [] });
      }),
      put: jasmine.createSpy('put').and.returnValue(of(putSuccess ? {} : null))
    } as { get: jasmine.Spy; put: jasmine.Spy };

    const routerMock = { navigate: jasmine.createSpy('navigate') } as { navigate: jasmine.Spy };

    await TestBed.configureTestingModule({
      imports: [AreaDetailsPage],
      providers: [
        { provide: ApiService, useValue: apiMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AreaDetailsPage);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component, apiMock, routerMock } as { fixture: ComponentFixture<AreaDetailsPage>; component: AreaDetailsPage; apiMock: { get: jasmine.Spy; put: jasmine.Spy }; routerMock: { navigate: jasmine.Spy } };
  }

  it('should navigate to dashboard when area not found', async () => {
    const { apiMock, routerMock } = await setup({ areaData: null });
    expect(apiMock.get).toHaveBeenCalledWith('area/1');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should populate area fields and fetch services when area is returned', async () => {
    const area = {
      id: 1,
      is_active: true,
      reaction_ids: [200],
      config: {
        name: 'My Area',
        description: 'Desc',
        trigger: { service_name: 'GitHub', name: 'onPush', datas_form: [] },
        action: { service_name: 'Slack', name: 'send', type: 'action', datas_form: [] }
      }
    };
    const services = [{ id: 10, name: 'GitHub' }, { id: 20, name: 'Slack' }];
    // Provide a reaction matching reaction_ids so the component will populate area.actions
    const reactions = [{ id: 200, name: 'send', service_id: 20 }];
    const { component, apiMock } = await setup({ areaData: area, services, actions: [], reactions });

    expect(apiMock.get).toHaveBeenCalledWith('area/1');
    expect(apiMock.get).toHaveBeenCalledWith('service');
    expect(component.area.id).toBe(1);
    expect(component.nameArea).toBe('My Area');
    expect(component.area.trigger.serviceChosen).toBe('GitHub');
    expect(component.area.actions[0].serviceChosen).toBe('Slack');
  });

  it('createAll should call put and navigate when ids are found', async () => {
    const area = {
      id: 5,
      is_active: true,
      config: {
        name: 'A',
        description: 'D',
        trigger: { service_name: 'S', name: 'T', datas_form: [] },
        action: { service_name: 'S', name: 'Act', type: 'action', datas_form: [] }
      }
    };
    // Note: createAll first queries 'action' and matches items against trigger.name,
    // and then queries 'reaction' and matches items against action.name.
    // Provide mock data accordingly so IDs are found as the implementation expects.
    const actions = [{ id: 100, name: 'T' }]; // contains trigger name
    const reactions = [{ id: 200, name: 'Act' }]; // contains action name
    const { component, apiMock, routerMock } = await setup({ areaData: area, services: [{ id:1, name:'S' }], actions, reactions, putSuccess: true });

    expect(component.area.id).toBe(5);
  component.area.actions = [{ id: 1, name: 'Act', serviceChosen: 'S' }] as unknown as typeof component.area.actions;
  component.area.trigger = { name: 'T', serviceChosen: 'S' } as unknown as typeof component.area.trigger;
    component.area.name = 'AreaName';

    component.createAll();

    expect(apiMock.get).toHaveBeenCalled();
    expect(apiMock.put).toHaveBeenCalledWith('area/5', jasmine.any(Object));
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

});
