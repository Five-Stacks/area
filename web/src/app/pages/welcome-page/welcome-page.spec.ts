import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomePage } from './welcome-page';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('WelcomePage', () => {
  let component: WelcomePage;
  let fixture: ComponentFixture<WelcomePage>;
  let apiMock: any;

  beforeEach(async () => {
    apiMock = { get: jasmine.createSpy('get').and.returnValue(of({ data: [] })) };

    await TestBed.configureTestingModule({
      imports: [WelcomePage],
      providers: [{ provide: ApiService, useValue: apiMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch services and populate serviceList on ngOnInit', () => {
    apiMock.get.calls.reset();
    apiMock.get.and.returnValue(of({ data: [{ id: 1, name: 'GitHub', description: 'Desc' }] }));
    component.ngOnInit();
    expect(apiMock.get).toHaveBeenCalledWith('service');
    expect(component.serviceList.length).toBe(1);
    expect(component.serviceList[0].id).toBe(1);
  });
});
