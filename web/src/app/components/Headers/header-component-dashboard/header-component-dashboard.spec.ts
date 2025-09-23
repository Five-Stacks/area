import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDashBoardComponent } from './header-component-dashboard';

describe('HeaderDashBoardComponent', () => {
  let component: HeaderDashBoardComponent;
  let fixture: ComponentFixture<HeaderDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDashBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
