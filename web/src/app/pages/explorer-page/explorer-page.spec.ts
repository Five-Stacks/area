import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerPage } from './explorer-page';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('ExplorerPage', () => {
  let component: ExplorerPage;
  let fixture: ComponentFixture<ExplorerPage>;

  beforeEach(async () => {
    const apiMock = { get: jasmine.createSpy('get').and.returnValue(of({ data: [] })) };

    await TestBed.configureTestingModule({
      imports: [ExplorerPage],
      providers: [{ provide: ApiService, useValue: apiMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
