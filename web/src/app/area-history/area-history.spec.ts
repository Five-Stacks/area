import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AreaHistory } from './area-history';
import { ApiService } from '../services/api.service';

describe('AreaHistory', () => {
  let component: AreaHistory;
  let fixture: ComponentFixture<AreaHistory>;

  beforeEach(async () => {
    const apiMock = { get: jasmine.createSpy('get').and.returnValue(of({ data: [] })) };

    await TestBed.configureTestingModule({
      imports: [AreaHistory],
      providers: [{ provide: ApiService, useValue: apiMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
