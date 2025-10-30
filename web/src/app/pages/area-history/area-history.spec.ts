import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AreaHistory } from './area-history';
import { ApiService } from '../../services/api.service';

describe('AreaHistory', () => {
  // Helper to configure the TestBed and create component with a mocked ApiService and optional pathname
  async function setup(data: unknown[] = [], pathname = '/areas/1') {
    const apiMock = { get: jasmine.createSpy('get').and.returnValue(of({ data })) } as { get: jasmine.Spy };

  // Set the browser pathname so the component picks up the area id we want
  // Using history.pushState avoids trying to redefine a non-configurable property.
  window.history.pushState({}, '', pathname);

    await TestBed.configureTestingModule({
      imports: [AreaHistory],
      providers: [{ provide: ApiService, useValue: apiMock }]
    }).compileComponents();

    const fixture = TestBed.createComponent(AreaHistory);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    return { apiMock, fixture, component } as { apiMock: { get: jasmine.Spy }; fixture: ComponentFixture<AreaHistory>; component: AreaHistory };
  }

  it('should create', async () => {
    const { component } = await setup([]);
    expect(component).toBeTruthy();
  });

  it('should call ApiService.get with the area id from the pathname', async () => {
    const { apiMock } = await setup([], '/areas/42');
    expect(apiMock.get).toHaveBeenCalledWith('areaExecution/42');
  });

  it('should render history items and apply success/failure classes', async () => {
    const items = [
      { id: 1, area_id: 1, executed_at: '2025-10-29T10:00:00Z', status: 'success', log: 'Everything OK' },
      { id: 2, area_id: 1, executed_at: '2025-10-29T11:00:00Z', status: 'failure', log: 'Something failed' }
    ];

    const { fixture } = await setup(items);

    const el: HTMLElement = fixture.nativeElement;
    const descriptions = el.querySelectorAll('.history-item-description');
    expect(descriptions.length).toBe(2);
    expect(descriptions[0].textContent).toContain('Everything OK');
    expect(descriptions[1].textContent).toContain('Something failed');

    const details = el.querySelectorAll('.history-item-details');
    expect(details.length).toBeGreaterThanOrEqual(2);
    expect(details[0].classList).toContain('success');
    expect(details[1].classList).toContain('failure');
  });

  it('should show "No history available." when the API returns an empty array', async () => {
    const { fixture } = await setup([]);
    const el: HTMLElement = fixture.nativeElement;
    const noHistory = el.querySelector('.history-item-details');
    expect(noHistory).toBeTruthy();
    expect(noHistory!.textContent).toContain('No history available.');
  });
});
