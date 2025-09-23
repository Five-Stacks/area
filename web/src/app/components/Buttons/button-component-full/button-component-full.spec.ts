import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFullComponent } from './button-component-full';

describe('ButtonFullComponent', () => {
  let component: ButtonFullComponent;
  let fixture: ComponentFixture<ButtonFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonFullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
