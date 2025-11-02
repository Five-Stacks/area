import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardService } from './card-service';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('CardService', () => {
  let component: CardService;
  let fixture: ComponentFixture<CardService>;

  beforeEach(async () => {
    const apiMock = { get: jasmine.createSpy('get').and.returnValue(of({ data: [] })) };

    await TestBed.configureTestingModule({
      imports: [CardService],
      providers: [{ provide: ApiService, useValue: apiMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
