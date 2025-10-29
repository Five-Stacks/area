import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { AreaHistoryGlobal } from './area-history-global';
import { ApiService } from '../../services/api.service';

describe('AreaHistoryGlobal', () => {
  // Helper to configure the TestBed and create component with a mocked ApiService and Router
  async function setup(historyItems: any[] = [], areas: Record<number, any> = {}) {
    const apiMock = { get: jasmine.createSpy('get').and.callFake((url: string) => {
      if (url === 'areaExecution') return of({ data: historyItems });
      if (url.startsWith('area/')) {
        const id = Number(url.split('/')[1]);
        return of({ data: areas[id] ?? {} });
      }
      return of({ data: [] });
    }) };

    const routerMock = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [AreaHistoryGlobal],
      providers: [
        { provide: ApiService, useValue: apiMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AreaHistoryGlobal);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    return { apiMock, routerMock, fixture, component } as { apiMock: any; routerMock: any; fixture: ComponentFixture<AreaHistoryGlobal>; component: AreaHistoryGlobal };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('should call areaExecution and then call area/<id> for each history item', async () => {
    const items = [
      { id: 1, area_id: 10, executed_at: '2025-10-29T10:00:00Z', status: 'success', log: 'OK' },
      { id: 2, area_id: 20, executed_at: '2025-10-29T11:00:00Z', status: 'failure', log: 'Fail' }
    ];
    const areas = {
      10: { id: 10, config: { name: 'Area Ten' } },
      20: { id: 20, config: { name: 'Area Twenty' } }
    };

    const { apiMock } = await setup(items, areas);

    expect(apiMock.get).toHaveBeenCalledWith('areaExecution');
    expect(apiMock.get).toHaveBeenCalledWith('area/10');
    expect(apiMock.get).toHaveBeenCalledWith('area/20');
  });

  it('should render history items with area names and classes, and navigate on click', async () => {
    const items = [
      { id: 1, area_id: 10, executed_at: '2025-10-29T10:00:00Z', status: 'success', log: 'OK' }
    ];
    const areas = { 10: { id: 10, config: { name: 'Area Ten' } } };

    const { fixture, routerMock } = await setup(items, areas);
    const el: HTMLElement = fixture.nativeElement;

    const areaNames = el.querySelectorAll('.history-item-area-name');
    expect(areaNames.length).toBe(1);
    expect(areaNames[0].textContent).toContain('Area Ten');

    const descriptions = el.querySelectorAll('.history-item-description');
    expect(descriptions.length).toBe(1);
    expect(descriptions[0].textContent).toContain('OK');

    const details = el.querySelectorAll('.history-item-details');
    expect(details.length).toBe(1);
    expect(details[0].classList).toContain('success');

    // Click to navigate
    (details[0] as HTMLElement).click();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/area/history/10']);
  });

  it('should show "No history available." when there are no items', async () => {
    const { fixture } = await setup([], {});
    const el: HTMLElement = fixture.nativeElement;
    const noHistory = el.querySelector('.history-item-details');
    expect(noHistory).toBeTruthy();
    expect(noHistory!.textContent).toContain('No history available.');
  });
});
