import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldComponent } from './text-field-component';

describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<TextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label as placeholder and hint text', () => {
    component.label = 'My Label';
    component.hint = 'Helpful hint';
    component.value = '';
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const hint = fixture.nativeElement.querySelector('.hint-text');

    expect(input).toBeTruthy();
    expect(input.placeholder).toBe('My Label');
    expect(hint.textContent).toContain('Helpful hint');
  });

  it('should emit valueChange on input', (done) => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();

    component.valueChange.subscribe((val: string) => {
      expect(val).toBe('hello');
      done();
    });

    // Simulate user typing
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  });

  it('should set input type from @Input type', () => {
    component.type = 'password';
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('password');
  });
});
