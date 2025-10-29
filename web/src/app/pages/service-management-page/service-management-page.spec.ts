import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceManagementPage } from './service-management-page';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('ServiceManagementPage', () => {
  let component: ServiceManagementPage;
  let fixture: ComponentFixture<ServiceManagementPage>;

  beforeEach(async () => {
    const apiMock = { get: jasmine.createSpy('get').and.returnValue(of({ data: [] })) };

    await TestBed.configureTestingModule({
      imports: [ServiceManagementPage],
      providers: [{ provide: ApiService, useValue: apiMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
