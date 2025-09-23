import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceManagementPage } from './service-management-page';

describe('ServiceManagementPage', () => {
  let component: ServiceManagementPage;
  let fixture: ComponentFixture<ServiceManagementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceManagementPage]
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
