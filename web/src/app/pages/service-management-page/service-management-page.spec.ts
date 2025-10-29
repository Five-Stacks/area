import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceManagementPage } from './service-management-page';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('ServiceManagementPage', () => {
  async function setup(services: unknown[] = [], userServices: unknown[] = []) {
    const apiMock = {
      get: jasmine.createSpy('get').and.callFake((url: string) => {
        if (url === 'service') return of({ data: services });
        if (url === 'userService') return of({ data: userServices });
        return of({ data: [] });
      })
    } as { get: jasmine.Spy };

    await TestBed.configureTestingModule({
      imports: [ServiceManagementPage],
      providers: [{ provide: ApiService, useValue: apiMock }]
    }).compileComponents();

    const fixture = TestBed.createComponent(ServiceManagementPage);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component, apiMock } as { fixture: ComponentFixture<ServiceManagementPage>; component: ServiceManagementPage; apiMock: { get: jasmine.Spy } };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('ngOnInit should fetch services and userServices and populate lists', async () => {
    const services = [{ id: 1, name: 'Alpha', description: 'A' }, { id: 2, name: 'Beta', description: 'B' }];
    const userServices = [{ id: 1, service_id: 2 }];
    const { component, apiMock } = await setup(services, userServices);

    expect(apiMock.get).toHaveBeenCalledWith('service');
    // userServices fetched after services; ensure it's called
    expect(apiMock.get).toHaveBeenCalledWith('userService');
    expect(component.listServices.length).toBe(2);
    expect(component.userServices.length).toBe(1);
  });

  it('isConnected should return true when service present in userServices', async () => {
    const services = [{ id: 1, name: 'Alpha', description: 'A' }];
    const userServices = [{ id: 10, service_id: 1 }];
    const { component } = await setup(services, userServices);
    expect(component.isConnected(1)).toBeTrue();
    expect(component.isConnected(2)).toBeFalse();
  });

  it('filteredSerice should filter by search and optionChoosed', async () => {
    const services = [
      { id: 1, name: 'Alpha', description: 'A' },
      { id: 2, name: 'Beta', description: 'B' },
      { id: 3, name: 'alphabet', description: 'C' }
    ];
    const userServices = [{ id: 1, service_id: 2 }];
    const { component } = await setup(services, userServices);

    // default All
    component.searchService = 'alp';
    component.optionChoosed = 'All';
    let filtered = component.filteredSerice();
    expect(filtered.length).toBe(2);

    // Connected only
    component.optionChoosed = 'Connected';
    filtered = component.filteredSerice();
    // only service id 2 is connected but doesn't match 'alp'
    expect(filtered.length).toBe(0);

    // Disconnected only
    component.optionChoosed = 'Disconnected';
    component.searchService = 'a';
    filtered = component.filteredSerice();
    // 'Alpha' and 'alphabet' match 'a' and are disconnected (id 1 and 3)
    expect(filtered.map(s => s.id).sort()).toEqual([1,3]);
  });
});
