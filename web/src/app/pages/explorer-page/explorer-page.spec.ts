import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerPage } from './explorer-page';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('ExplorerPage', () => {
  // Helper to configure TestBed and create component with mocked ApiService
  async function setup(services: any[] = []) {
    const apiMock = { get: jasmine.createSpy('get').and.returnValue(of({ data: services })) };

    await TestBed.configureTestingModule({
      imports: [ExplorerPage],
      providers: [{ provide: ApiService, useValue: apiMock }]
    }).compileComponents();

    const fixture = TestBed.createComponent(ExplorerPage);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { apiMock, fixture, component } as { apiMock: any; fixture: ComponentFixture<ExplorerPage>; component: ExplorerPage };
  }

  it('should create', async () => {
    const { component } = await setup([]);
    expect(component).toBeTruthy();
  });

  it('should call ApiService.get with "service" and populate listServices', async () => {
    const mockServices = [
      { id: 1, name: 'Alpha', description: 'First' },
      { id: 2, name: 'Beta', description: 'Second' }
    ];

    const { apiMock, component } = await setup(mockServices);
    expect(apiMock.get).toHaveBeenCalledWith('service');
    expect(component.listServices.length).toBe(2);
    expect(component.listServices[0].name).toBe('Alpha');
  });

  it('filteredSerice should filter by searchService (case-insensitive)', async () => {
    const mockServices = [
      { id: 1, name: 'Alpha', description: 'First' },
      { id: 2, name: 'Beta', description: 'Second' },
      { id: 3, name: 'alphabet', description: 'Desc' }
    ];

    const { component } = await setup(mockServices);
    component.searchService = 'alp';
    const filtered = component.filteredSerice();
    expect(filtered.length).toBe(2);
    expect(filtered.map(s => s.name)).toContain('Alpha');
    expect(filtered.map(s => s.name)).toContain('alphabet');
  });
});
