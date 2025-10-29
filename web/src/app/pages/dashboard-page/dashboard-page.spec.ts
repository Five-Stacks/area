import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPage } from './dashboard-page';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let apiMock: { get: jasmine.Spy };

  beforeEach(async () => {
  apiMock = { get: jasmine.createSpy('get').and.returnValue(of({ data: [] })) } as { get: jasmine.Spy };

    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [{ provide: ApiService, useValue: apiMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should fetch areas and populate listAreas and listApps', () => {
    const areas = [
      { id: 42, config: { name: 'AreaOne', trigger: { service_name: 'GitHub' }, action: { service_name: 'Slack' } }, is_active: true }
    ];
    apiMock.get.and.returnValue(of({ data: areas }));
    component.ngOnInit();
    expect(apiMock.get).toHaveBeenCalledWith('area/');
    expect(component.listAreas.length).toBeGreaterThan(0);
    expect(component.listApps).toContain('GitHub');
  });

  it('getIconsArea should return More icon when more than 3 apps', () => {
    component.listAreas = [
      { id: 1, name: 'A', AppsIcons: [
        { name: 'A1', url: 'u1' },
        { name: 'A2', url: 'u2' },
        { name: 'A3', url: 'u3' },
        { name: 'A4', url: 'u4' }
      ], active: true }
    ];
    const icons = component.getIconsArea(1);
    expect(icons.length).toBe(3);
    expect(icons[2].name).toBe('More');
  });

  it('getFilteredAreas should filter by searchTerm', () => {
    component.listAreas = [
      { id: 1, name: 'Alpha', AppsIcons: [], active: true },
      { id: 2, name: 'Beta', AppsIcons: [], active: true }
    ] as unknown as typeof component.listAreas;
    component.searchTerm = 'Alpha';
    const filtered = component.getFilteredAreas();
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Alpha');
  });
});
