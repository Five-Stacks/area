import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDetailsPage } from './area-details-page';
import { ApiService } from '../../../services/api.service';
import { of } from 'rxjs';

describe('AreaDetailsPage', () => {
  let component: AreaDetailsPage;
  let fixture: ComponentFixture<AreaDetailsPage>;

  beforeEach(async () => {
    const apiMock = { get: jasmine.createSpy('get').and.returnValue(of({ data: [] })) };

    await TestBed.configureTestingModule({
      imports: [AreaDetailsPage],
      providers: [{ provide: ApiService, useValue: apiMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
