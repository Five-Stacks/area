import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { AreaHistoryGlobal } from './area-history-global';
import { ApiService } from '../../services/api.service';

describe('AreaHistoryGlobal', () => {
  let component: AreaHistoryGlobal;
  let fixture: ComponentFixture<AreaHistoryGlobal>;

  beforeEach(async () => {
    const apiMock = { get: jasmine.createSpy('get').and.returnValue(of({ data: [] })) };
    const routerMock = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [AreaHistoryGlobal],
      providers: [
        { provide: ApiService, useValue: apiMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaHistoryGlobal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
