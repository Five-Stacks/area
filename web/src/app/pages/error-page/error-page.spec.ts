import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ErrorPage } from './error-page';

describe('ErrorPage', () => {
  let component: ErrorPage;
  let fixture: ComponentFixture<ErrorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorPage],
      providers: [
        {
          provide: ActivatedRoute,
          // component reads ActivatedRoute.snapshot.queryParams
          useValue: { snapshot: { queryParams: {} } }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should creates', () => {
    expect(component).toBeTruthy();
  });
});
