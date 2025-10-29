import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCreationPage } from './area-creation-page';
import { ApiService } from '../../../services/api.service';
import { of } from 'rxjs';

describe('AreaCreationPage', () => {
  let component: AreaCreationPage;
  let fixture: ComponentFixture<AreaCreationPage>;

  beforeEach(async () => {
    const apiMock = { get: jasmine.createSpy('get').and.returnValue(of({ data: [] })) };

    await TestBed.configureTestingModule({
      imports: [AreaCreationPage],
      providers: [{ provide: ApiService, useValue: apiMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
