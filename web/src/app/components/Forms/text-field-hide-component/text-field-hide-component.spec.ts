import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldHideComponent } from './text-field-hide-component';

describe('TextFieldHideComponent', () => {
  let component: TextFieldHideComponent;
  let fixture: ComponentFixture<TextFieldHideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextFieldHideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextFieldHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
